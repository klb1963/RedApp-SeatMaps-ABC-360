"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePNR = void 0;
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var Context_1 = require("../../Context");
var LayerService_1 = require("sabre-ngv-core/services/LayerService");
var ISoapApiService_1 = require("sabre-ngv-communication/interfaces/ISoapApiService");
var PnrPublicService_1 = require("sabre-ngv-app/app/services/impl/PnrPublicService");
/*
CreatePNR Component, multi-stage data entry form based on react-bootstrap component library
*/
var CreatePNR = /** @class */ (function (_super) {
    __extends(CreatePNR, _super);
    function CreatePNR(e) {
        var _this = _super.call(this, e) || this;
        //bind event handlers to the component instance
        _this.handleChange = _this.handleChange.bind(_this);
        _this.executeService = _this.executeService.bind(_this);
        _this.closeAndRefresh = _this.closeAndRefresh.bind(_this);
        _this.goBack = _this.goBack.bind(_this);
        _this.goNext = _this.goNext.bind(_this);
        //fill default state values during component initialization
        _this.state = {
            stage: 1,
            traveler: {
                name: "",
                surname: "",
                typeCode: "ADT"
            },
            validation: {
                txtName: { isValid: false, status: null, helpMsg: null },
                txtSurname: { isValid: false, status: null, helpMsg: null },
                txtEmail: { isValid: false, status: null, helpMsg: null }
            }
        };
        return _this;
    }
    /*
    Method to handle field changes, perform validation and update state
    */
    CreatePNR.prototype.handleChange = function (e) {
        var ctlId = e.target.id;
        var fldValue = e.target.value;
        var validationState = this.state.validation;
        var tmpTraveler = this.state.traveler;
        var tmpTravelType = this.state.travelType;
        console.log("handleChange", ctlId, fldValue);
        if (ctlId === "txtName" || ctlId === "txtSurname") {
            var tmpValidation = validationState[ctlId];
            var length_1 = fldValue.length;
            if (ctlId === "txtName")
                tmpTraveler.name = fldValue;
            if (ctlId === "txtSurname")
                tmpTraveler.surname = fldValue;
            if (length_1 <= 0) {
                tmpValidation.isValid = false;
                tmpValidation.status = 'error';
                tmpValidation.helpMsg = "required field";
            }
            else if (length_1 <= 1) {
                tmpValidation.isValid = false;
                tmpValidation.status = 'warning';
                tmpValidation.helpMsg = "must be more than one character long";
            }
            else if (length_1 > 1) {
                tmpValidation.isValid = true;
                tmpValidation.status = 'success';
                tmpValidation.helpMsg = null;
            }
        }
        if (ctlId === "selAgeCode") {
            tmpTraveler.typeCode = fldValue;
        }
        if (ctlId === "selTravelType") {
            tmpTravelType = fldValue;
        }
        this.setState({
            traveler: tmpTraveler,
            travelType: tmpTravelType,
            validation: validationState
        });
    };
    //moves to the next stage
    CreatePNR.prototype.goNext = function (evt) {
        var currStage = this.state.stage;
        this.setState({ stage: currStage + 1 });
    };
    //rewind stage
    CreatePNR.prototype.goBack = function (evt) {
        this.setState({ stage: 1 });
    };
    /*
    Creates a UpdateReservationRQ request payload merging state data, then utilizes
    SOAP API service handler to send the request and parse results
    */
    CreatePNR.prototype.executeService = function () {
        var _this = this;
        var soapApiService = (0, Context_1.getService)(ISoapApiService_1.ISoapApiService);
        var pl1 = "\n        <UpdateReservationRQ Version=\"1.19.8\" xmlns=\"http://webservices.sabre.com/pnrbuilder/v1_19\">\n        <RequestType commitTransaction=\"false\" initialIgnore=\"true\">Stateful</RequestType>\n        <ReturnOptions IncludeUpdateDetails=\"true\" RetrievePNR=\"false\"/>\n            <ReservationUpdateList>\n                <ReservationUpdateItem>\n                    <PassengerNameUpdate op=\"C\">\n                        <TravelerName type=\"" + this.state.traveler.typeCode + "\">\n                            <Given>" + this.state.traveler.name + "</Given>\n                            <Surname>" + this.state.traveler.surname + "</Surname>\n                        </TravelerName>\n                    </PassengerNameUpdate>\n                </ReservationUpdateItem>\n                <ReservationUpdateItem>\n                    <RemarkUpdate op=\"C\">\n                        <RemarkText>THIS IS " + this.state.travelType + " TRAVEL TYPE REMARK</RemarkText>\n                    </RemarkUpdate>\n                </ReservationUpdateItem>\n            </ReservationUpdateList>\n        </UpdateReservationRQ>\n        ";
        soapApiService.callSws({ action: "UpdateReservationRQ", payload: pl1, authTokenType: "SESSION" })
            .then(function (res) {
            //validate API response
            console.log("Soap API call result", JSON.stringify(res));
            if (res.errorCode || (res.value && res.value.indexOf("<stl19:Error") >= 0)) {
                _this.setState({ stage: 4 });
            }
            else {
                _this.setState({ stage: 3 });
            }
        })
            .catch(function (err) {
            //exception calling soap API
            console.log("Soap API call error", err);
            _this.setState({ stage: 4 });
        });
    };
    CreatePNR.prototype.handleModalClose = function () {
        (0, Context_1.getService)(LayerService_1.LayerService).clearLayer(42);
    };
    /*
    Refreshes the Trip Summary panel after sucessfull UpdateReservationRQ response,
    this makes the changes written on the PNR to appear on the UI
    */
    CreatePNR.prototype.closeAndRefresh = function () {
        (0, Context_1.getService)(PnrPublicService_1.PnrPublicService).refreshData();
        this.handleModalClose();
    };
    /*
    Render parts of multi-stage form using react-bootstrap components
    The data entry form is wrapped by a Modal Dialog component
    */
    CreatePNR.prototype.render = function () {
        var _this = this;
        switch (this.state.stage) {
            case 1:
                var validateName = this.state.validation["txtName"];
                var validateSurname = this.state.validation["txtSurname"];
                return (React.createElement(react_bootstrap_1.Modal.Dialog, { className: "react-modal" },
                    React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true, onHide: function () { _this.handleModalClose(); } },
                        React.createElement(react_bootstrap_1.Modal.Title, null, "Data Entry Form (1 of 2)")),
                    React.createElement(react_bootstrap_1.Modal.Body, null,
                        React.createElement(react_bootstrap_1.Form, { autoComplete: "off" },
                            React.createElement(react_bootstrap_1.Panel, null,
                                React.createElement(react_bootstrap_1.Panel.Heading, null,
                                    React.createElement(react_bootstrap_1.Panel.Title, null, "About Traveler")),
                                React.createElement(react_bootstrap_1.Panel.Body, null,
                                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "txtName", validationState: validateName.status },
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Name"),
                                        React.createElement(react_bootstrap_1.FormControl, { type: "text", placeholder: "Enter traveler Name", value: this.state.traveler.name, onChange: this.handleChange }),
                                        validateName.helpMsg && React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                        (validateName.helpMsg) && React.createElement(react_bootstrap_1.HelpBlock, null, validateName.helpMsg)),
                                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "txtSurname", validationState: validateSurname.status },
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Surname"),
                                        React.createElement(react_bootstrap_1.FormControl, { type: "text", placeholder: "Enter traveler Surame", value: this.state.traveler.surname, onChange: this.handleChange }),
                                        validateSurname.isValid && React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                        (validateSurname.isValid && validateSurname.helpMsg) && React.createElement(react_bootstrap_1.HelpBlock, null, validateName.helpMsg)),
                                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "selAgeCode" },
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Passenger Type (Code)"),
                                        React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.traveler.typeCode, onChange: this.handleChange },
                                            React.createElement("option", { value: "select" }, "select"),
                                            React.createElement("option", { value: "ADT" }, "Adult"),
                                            React.createElement("option", { value: "CNN" }, "Child"),
                                            React.createElement("option", { value: "INF" }, "Infant"))))))),
                    React.createElement(react_bootstrap_1.Modal.Footer, null,
                        React.createElement(react_bootstrap_1.Button, { onClick: this.handleModalClose, className: "btn btn-secondary" }, "Cancel"),
                        React.createElement(react_bootstrap_1.Button, { className: "btn btn-primary", onClick: this.goNext }, "Next"))));
            case 2:
                return (React.createElement(react_bootstrap_1.Modal.Dialog, { className: "react-modal" },
                    React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true, onHide: function () { _this.handleModalClose(); } },
                        React.createElement(react_bootstrap_1.Modal.Title, null, "Data Entry Form (2 of 2)")),
                    React.createElement(react_bootstrap_1.Modal.Body, null,
                        React.createElement(react_bootstrap_1.Form, null,
                            React.createElement(react_bootstrap_1.Panel, null,
                                React.createElement(react_bootstrap_1.Panel.Heading, null,
                                    React.createElement(react_bootstrap_1.Panel.Title, null, "About Travel")),
                                React.createElement(react_bootstrap_1.Panel.Body, null,
                                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "selTravelType" },
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Travel Type"),
                                        React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", onChange: this.handleChange, value: this.state.travelType },
                                            React.createElement("option", { value: "select" }, "select"),
                                            React.createElement("option", { value: "business" }, "business"),
                                            React.createElement("option", { value: "leisure" }, "leisure"))),
                                    this.state.travelType === "business" &&
                                        React.createElement(react_bootstrap_1.FormGroup, null,
                                            React.createElement(react_bootstrap_1.ControlLabel, null, "Add Corporate ID ?"),
                                            React.createElement(react_bootstrap_1.InputGroup, null,
                                                React.createElement(react_bootstrap_1.InputGroup.Addon, null,
                                                    React.createElement("input", { type: "checkbox", "aria-label": "..." })),
                                                React.createElement(react_bootstrap_1.FormControl, { type: "text" }))),
                                    this.state.travelType === "leisure" &&
                                        React.createElement(react_bootstrap_1.FormGroup, null,
                                            React.createElement(react_bootstrap_1.ControlLabel, null, "Add Special Service Request ?"),
                                            React.createElement(react_bootstrap_1.InputGroup, null,
                                                React.createElement(react_bootstrap_1.InputGroup.Addon, null,
                                                    React.createElement("input", { type: "checkbox", "aria-label": "..." })),
                                                React.createElement(react_bootstrap_1.FormControl, { type: "text" }))))))),
                    React.createElement(react_bootstrap_1.Modal.Footer, null,
                        React.createElement(react_bootstrap_1.Button, { onClick: this.handleModalClose, className: "btn btn-secondary" }, "Cancel"),
                        React.createElement(react_bootstrap_1.Button, { className: "btn btn-primary", onClick: this.goBack }, "Back"),
                        React.createElement(react_bootstrap_1.Button, { className: "btn btn-primary btn-success", onClick: this.executeService }, "Create PNR"))));
            case 3:
                return (React.createElement(react_bootstrap_1.Alert, { bsStyle: "success", onDismiss: this.closeAndRefresh },
                    React.createElement("h4", null, "Success"),
                    React.createElement("hr", null),
                    React.createElement("p", null, "Operation completed sucessfully, data was written to the PNR, session status will be refreshed..."),
                    React.createElement("hr", null),
                    React.createElement("p", null,
                        React.createElement(react_bootstrap_1.Button, { bsStyle: "success", onClick: this.closeAndRefresh }, "Close"))));
            case 4:
                return (React.createElement(react_bootstrap_1.Alert, { bsStyle: "danger", onDismiss: this.handleModalClose },
                    React.createElement("h4", null, "Error"),
                    React.createElement("hr", null),
                    React.createElement("p", null, "The operation could not be completed, validate records and try again..."),
                    React.createElement("hr", null),
                    React.createElement("p", null,
                        React.createElement(react_bootstrap_1.Button, { bsStyle: "danger", onClick: this.goBack }, "Retry"),
                        React.createElement(react_bootstrap_1.Button, { onClick: this.handleModalClose }, "Cancel"))));
        }
    };
    return CreatePNR;
}(React.Component));
exports.CreatePNR = CreatePNR;
