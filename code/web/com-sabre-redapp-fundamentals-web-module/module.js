System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnr/CreatePNR", ["react","react-bootstrap","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-core/services/LayerService","sabre-ngv-communication/interfaces/ISoapApiService","sabre-ngv-app/app/services/impl/PnrPublicService"], false, function (require, exports, module) {
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


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnr/CreatePNR.js", ["com-sabre-redapp-fundamentals-web-module/components/createPnr/CreatePNR"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/createPnr/CreatePNR"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnr/createPnrForTwoPassengers", ["sabre-ngv-custom-forms/services/ICustomFormsService","sabre-ngv-app/app/services/impl/DatesService","sabre-ngv-commsg/services/ICommandMessageService","sabre-ngv-app/app/services/impl/InterstitialService","com-sabre-redapp-fundamentals-web-module/Context","com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph"], false, function (require, exports, module) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPnrForTwoPassengers = void 0;
var ICustomFormsService_1 = require("sabre-ngv-custom-forms/services/ICustomFormsService");
var DatesService_1 = require("sabre-ngv-app/app/services/impl/DatesService");
var ICommandMessageService_1 = require("sabre-ngv-commsg/services/ICommandMessageService");
var InterstitialService_1 = require("sabre-ngv-app/app/services/impl/InterstitialService");
var Context_1 = require("../../Context");
var openCustomFormParagraph_1 = require("../../utils/openCustomFormParagraph");
var createPnrForTwoPassengers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var twentyDaysAhead, flightCommand, form, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                twentyDaysAhead = (0, Context_1.getService)(DatesService_1.DatesService).getNow().add(20, 'days').format('DDMMM').toUpperCase();
                flightCommand = "1EK50Y" + twentyDaysAhead + "MUCDXB/SS2";
                form = {
                    title: 'Create PNR',
                    fields: [
                        {
                            id: 'name',
                            value: '-KLEIMANN/LEONIDMR\n-KLEIMANN/GALINAMRS'
                        },
                        {
                            id: 'flight',
                            value: flightCommand
                        },
                        {
                            id: 'ticket',
                            value: '01Y2'
                        },
                        {
                            id: 'agent',
                            label: 'Agent Info',
                            value: '6AGENT'
                        },
                        {
                            id: 'phone',
                            value: '912345678900'
                        },
                        {
                            id: 'timeLimit',
                            label: 'Ticketing time limit',
                            value: '7TAW/'
                        }
                    ],
                    actions: [
                        {
                            id: 'cancel',
                            label: 'Cancel'
                        },
                        {
                            id: 'ok',
                            label: 'Submit'
                        }
                    ]
                };
                return [4 /*yield*/, (0, Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(form)];
            case 1:
                result = _a.sent();
                if (result.action === 'ok') {
                    selfSubmitPnrAction(result);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.createPnrForTwoPassengers = createPnrForTwoPassengers;
var selfSubmitPnrAction = function (form) { return __awaiter(void 0, void 0, void 0, function () {
    var interstitialService, nameRq, flightRq, ticketRq, agentInfoRq, phoneRq, tawRq, nameRsStatus, flightsStatus, _a, ticketRsStatus, _b, agentInfoRsStatus, _c, phoneRsStatus, _d, tawRsStatus, _e, receivedFromStatus, _f, wpRsStatus, _g, pqRsStatus, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                interstitialService = (0, Context_1.getService)(InterstitialService_1.InterstitialService);
                nameRq = form.fields.find(function (field) { return field.id === 'name'; }).value;
                flightRq = form.fields.find(function (field) { return field.id === 'flight'; }).value;
                ticketRq = form.fields.find(function (field) { return field.id === 'ticket'; }).value;
                agentInfoRq = form.fields.find(function (field) { return field.id === 'agent'; }).value;
                phoneRq = form.fields.find(function (field) { return field.id === 'phone'; }).value;
                tawRq = form.fields.find(function (field) { return field.id === 'timeLimit'; }).value;
                interstitialService.showInterstitial(15000);
                return [4 /*yield*/, sendCommand(nameRq, 'Name')];
            case 1:
                nameRsStatus = _j.sent();
                _a = nameRsStatus;
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, sendCommand(flightRq, 'Flight list')];
            case 2:
                _a = (_j.sent());
                _j.label = 3;
            case 3:
                flightsStatus = _a;
                _b = flightsStatus;
                if (!_b) return [3 /*break*/, 5];
                return [4 /*yield*/, sendCommand(ticketRq, 'Ticket')];
            case 4:
                _b = (_j.sent());
                _j.label = 5;
            case 5:
                ticketRsStatus = _b;
                _c = ticketRsStatus;
                if (!_c) return [3 /*break*/, 7];
                return [4 /*yield*/, sendCommand(agentInfoRq, 'Agent Info')];
            case 6:
                _c = (_j.sent());
                _j.label = 7;
            case 7:
                agentInfoRsStatus = _c;
                _d = agentInfoRsStatus;
                if (!_d) return [3 /*break*/, 9];
                return [4 /*yield*/, sendCommand(phoneRq, 'Phone')];
            case 8:
                _d = (_j.sent());
                _j.label = 9;
            case 9:
                phoneRsStatus = _d;
                _e = phoneRsStatus;
                if (!_e) return [3 /*break*/, 11];
                return [4 /*yield*/, sendCommand(tawRq, 'TAW')];
            case 10:
                _e = (_j.sent());
                _j.label = 11;
            case 11:
                tawRsStatus = _e;
                _f = tawRsStatus;
                if (!_f) return [3 /*break*/, 13];
                return [4 /*yield*/, sendCommand('6LEONID', 'Received From')];
            case 12:
                _f = (_j.sent());
                _j.label = 13;
            case 13:
                receivedFromStatus = _f;
                _g = receivedFromStatus;
                if (!_g) return [3 /*break*/, 15];
                return [4 /*yield*/, sendCommand('WP', 'WP')];
            case 14:
                _g = (_j.sent());
                _j.label = 15;
            case 15:
                wpRsStatus = _g;
                _h = wpRsStatus;
                if (!_h) return [3 /*break*/, 17];
                return [4 /*yield*/, sendCommand('PQ', 'PQ')];
            case 16:
                _h = (_j.sent());
                _j.label = 17;
            case 17:
                pqRsStatus = _h;
                interstitialService.hideInterstitial();
                pqRsStatus && (0, openCustomFormParagraph_1.openCustomFormParagraph)('Create PNR', 'PNR created');
                return [2 /*return*/];
        }
    });
}); };
var sendCommand = function (command, failureSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var rsStatus, isSuccess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Context_1.getService)(ICommandMessageService_1.ICommandMessageService).send(command)];
            case 1:
                rsStatus = _a.sent();
                isSuccess = rsStatus.Status.Success;
                if (isSuccess && rsStatus.Status.Messages[0] && rsStatus.Status.Messages[0].Text.includes('SIGN IN')) {
                    isSuccess = false;
                    handleFailure('Command failed, not signed in.');
                }
                else if (!isSuccess) {
                    handleFailure(failureSegment);
                }
                return [2 /*return*/, isSuccess];
        }
    });
}); };
var handleFailure = function (segment) {
    (0, openCustomFormParagraph_1.openCustomFormParagraph)('Create PNR', segment + " creation failed");
};


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnr/createPnrForTwoPassengers.js", ["com-sabre-redapp-fundamentals-web-module/components/createPnr/createPnrForTwoPassengers"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/createPnr/createPnrForTwoPassengers"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnrForTwoPassengers", ["sabre-ngv-custom-forms/services/ICustomFormsService","sabre-ngv-app/app/services/impl/DatesService","sabre-ngv-commsg/services/ICommandMessageService","sabre-ngv-app/app/services/impl/InterstitialService","com-sabre-redapp-fundamentals-web-module/Context","com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph"], false, function (require, exports, module) {
"use strict";var __awaiter=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(a,i){function fulfilled(e){try{step(n.next(e))}catch(t){i(t)}}function rejected(e){try{step(n.throw(e))}catch(t){i(t)}}function step(e){e.done?a(e.value):function adopt(e){return e instanceof r?e:new r(function(t){t(e)})}(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var r,n,a,i,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function verb(i){return function(o){return function step(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(a=2&i[0]?n.return:i[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,i[1])).done)return a;switch(n=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(a=(a=s.trys).length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){s.label=i[1];break}if(6===i[0]&&s.label<a[1]){s.label=a[1],a=i;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(i);break}a[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(o){i=[6,o],n=0}finally{r=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,o])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createPnrForTwoPassengers=void 0;var ICustomFormsService_1=require("sabre-ngv-custom-forms/services/ICustomFormsService"),DatesService_1=require("sabre-ngv-app/app/services/impl/DatesService"),ICommandMessageService_1=require("sabre-ngv-commsg/services/ICommandMessageService"),InterstitialService_1=require("sabre-ngv-app/app/services/impl/InterstitialService"),Context_1=require("../Context"),openCustomFormParagraph_1=require("../utils/openCustomFormParagraph"),createPnrForTwoPassengers=function(){return __awaiter(void 0,void 0,void 0,function(){var e,t,r;return __generator(this,function(n){switch(n.label){case 0:return e=(0,Context_1.getService)(DatesService_1.DatesService).getNow().add(20,"days").format("DDMMM").toUpperCase(),t={title:"Create PNR",fields:[{id:"name",value:"-KLEIMANN/LEONIDMR\n-KLEIMANN/GALINAMRS"},{id:"flight",value:"1EK50Y"+e+"MUCDXB/SS2"},{id:"ticket",value:"01Y2"},{id:"agent",label:"Agent Info",value:"6AGENT"},{id:"phone",value:"912345678900"},{id:"timeLimit",label:"Ticketing time limit",value:"7TAW/"}],actions:[{id:"cancel",label:"Cancel"},{id:"ok",label:"Submit"}]},[4,(0,Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(t)];case 1:return"ok"===(r=n.sent()).action&&selfSubmitPnrAction(r),[2]}})})};exports.createPnrForTwoPassengers=createPnrForTwoPassengers;var selfSubmitPnrAction=function(e){return __awaiter(void 0,void 0,void 0,function(){var t,r,n,a,i,s,o,c,u,l,d,m,f,v,p,g,h;return __generator(this,function(b){switch(b.label){case 0:return t=(0,Context_1.getService)(InterstitialService_1.InterstitialService),r=e.fields.find(function(e){return"name"===e.id}).value,n=e.fields.find(function(e){return"flight"===e.id}).value,a=e.fields.find(function(e){return"ticket"===e.id}).value,i=e.fields.find(function(e){return"agent"===e.id}).value,s=e.fields.find(function(e){return"phone"===e.id}).value,o=e.fields.find(function(e){return"timeLimit"===e.id}).value,t.showInterstitial(15e3),[4,sendCommand(r,"Name")];case 1:return c=b.sent(),(u=c)?[4,sendCommand(n,"Flight list")]:[3,3];case 2:u=b.sent(),b.label=3;case 3:return(l=u)?[4,sendCommand(a,"Ticket")]:[3,5];case 4:l=b.sent(),b.label=5;case 5:return(d=l)?[4,sendCommand(i,"Agent Info")]:[3,7];case 6:d=b.sent(),b.label=7;case 7:return(m=d)?[4,sendCommand(s,"Phone")]:[3,9];case 8:m=b.sent(),b.label=9;case 9:return(f=m)?[4,sendCommand(o,"TAW")]:[3,11];case 10:f=b.sent(),b.label=11;case 11:return(v=f)?[4,sendCommand("6LEONID","Received From")]:[3,13];case 12:v=b.sent(),b.label=13;case 13:return(p=v)?[4,sendCommand("WP","WP")]:[3,15];case 14:p=b.sent(),b.label=15;case 15:return(h=p)?[4,sendCommand("PQ","PQ")]:[3,17];case 16:h=b.sent(),b.label=17;case 17:return g=h,t.hideInterstitial(),g&&(0,openCustomFormParagraph_1.openCustomFormParagraph)("Create PNR","PNR created"),[2]}})})},sendCommand=function(e,t){return __awaiter(void 0,void 0,void 0,function(){var r,n;return __generator(this,function(a){switch(a.label){case 0:return[4,(0,Context_1.getService)(ICommandMessageService_1.ICommandMessageService).send(e)];case 1:return r=a.sent(),(n=r.Status.Success)&&r.Status.Messages[0]&&r.Status.Messages[0].Text.includes("SIGN IN")?(n=!1,handleFailure("Command failed, not signed in.")):n||handleFailure(t),[2,n]}})})},handleFailure=function(e){(0,openCustomFormParagraph_1.openCustomFormParagraph)("Create PNR",e+" creation failed")};


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnrForTwoPassengers.js", ["com-sabre-redapp-fundamentals-web-module/components/createPnrForTwoPassengers"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/createPnrForTwoPassengers"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnrMucDxbForm", ["sabre-ngv-custom-forms/services/ICustomFormsService","sabre-ngv-app/app/services/impl/DatesService","sabre-ngv-commsg/services/ICommandMessageService","sabre-ngv-app/app/services/impl/InterstitialService","com-sabre-redapp-fundamentals-web-module/Context","com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph"], false, function (require, exports, module) {
"use strict";var __awaiter=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,a){function fulfilled(e){try{step(n.next(e))}catch(t){a(t)}}function rejected(e){try{step(n.throw(e))}catch(t){a(t)}}function step(e){e.done?i(e.value):function adopt(e){return e instanceof r?e:new r(function(t){t(e)})}(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var r,n,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function verb(a){return function(s){return function step(a){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,n=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(s){a=[6,s],n=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createPnrMucDxbForm=void 0;var ICustomFormsService_1=require("sabre-ngv-custom-forms/services/ICustomFormsService"),DatesService_1=require("sabre-ngv-app/app/services/impl/DatesService"),ICommandMessageService_1=require("sabre-ngv-commsg/services/ICommandMessageService"),InterstitialService_1=require("sabre-ngv-app/app/services/impl/InterstitialService"),Context_1=require("../Context"),openCustomFormParagraph_1=require("../utils/openCustomFormParagraph"),createPnrMucDxbForm=function(){return __awaiter(void 0,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return e={title:"Create PNR MUC-DXB",fields:[{id:"name",value:"-KLEIMANN/LEONID"},{id:"daysAhead",value:"20"},{id:"ticket",value:"01Y2"},{id:"agent",value:"6AGENT"},{id:"phone",value:"91234567"},{id:"timeLimit",value:"7TAW/"}],actions:[{id:"cancel",label:"Cancel"},{id:"ok",label:"Submit"}]},[4,(0,Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(e)];case 1:return"ok"===(t=r.sent()).action&&selfSubmitPnrMucDxbAction(t),[2]}})})};exports.createPnrMucDxbForm=createPnrMucDxbForm;var selfSubmitPnrMucDxbAction=function(e){return __awaiter(void 0,void 0,void 0,function(){var t,r,n,i,a,o,s,u,c,l,d,v;return __generator(this,function(m){switch(m.label){case 0:t=(0,Context_1.getService)(InterstitialService_1.InterstitialService),r=e.fields.find(function(e){return"name"===e.id}).value,n=(null===(v=e.fields.find(function(e){return"daysAhead"===e.id}))||void 0===v?void 0:v.value)||"20",i=parseInt(n,10)||20,a=(0,Context_1.getService)(DatesService_1.DatesService).getNow().add(i,"days").format("DDMMM").toUpperCase(),o="0EK"+a+"MUCDXB50Y",s=e.fields.find(function(e){return"ticket"===e.id}).value,u=e.fields.find(function(e){return"agent"===e.id}).value,c=e.fields.find(function(e){return"phone"===e.id}).value,l=e.fields.find(function(e){return"timeLimit"===e.id}).value,t.showInterstitial(15e3),m.label=1;case 1:return m.trys.push([1,10,11,12]),[4,sendCommand(r,"Name")];case 2:return m.sent(),[4,sendCommand(o,"Flight segment")];case 3:return m.sent(),[4,sendCommand(s,"Ticket")];case 4:return m.sent(),[4,sendCommand(u,"Agent info")];case 5:return m.sent(),[4,sendCommand(c,"Phone")];case 6:return m.sent(),[4,sendCommand(l,"Time limit")];case 7:return m.sent(),[4,sendCommand("WP","WP")];case 8:return m.sent(),[4,sendCommand("PQ","PQ")];case 9:return m.sent(),(0,openCustomFormParagraph_1.openCustomFormParagraph)("Create PNR MUC-DXB","PNR created"),[3,12];case 10:return d=m.sent(),console.error("Error during PNR creation:",d),[3,12];case 11:return t.hideInterstitial(),[7];case 12:return[2]}})})},sendCommand=function(e,t){return __awaiter(void 0,void 0,void 0,function(){var r,n,i;return __generator(this,function(a){switch(a.label){case 0:return[4,(0,Context_1.getService)(ICommandMessageService_1.ICommandMessageService).send(e)];case 1:if(!(r=a.sent()).Status.Success)throw new Error(t+" creation failed: "+(null===(i=null===(n=r.Status.Messages)||void 0===n?void 0:n[0])||void 0===i?void 0:i.Text));return[2]}})})};


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnrMucDxbForm.js", ["com-sabre-redapp-fundamentals-web-module/components/createPnrMucDxbForm"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/createPnrMucDxbForm"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/extractSegmentData", [], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSegmentData = void 0;
function extractSegmentData(segment) {
    return {
        flightNumber: segment.getSegmentId(),
        marketingCarrier: segment.getMarketingOperatingAirline(),
        departureDate: segment.getRawDepartureDate(),
        rbd: segment.getSelectedBookingClass() || 'N/A',
        origin: segment.getOriginIata(),
        destination: segment.getDestinationIata(),
        equipmentCode: segment.getEquipmentCode(),
        equipmentCodes: segment.getEquipmentCodes().map(function (codeInfo) { return String(codeInfo); }),
        segmentRph: segment.getRph()
    };
}
exports.extractSegmentData = extractSegmentData;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/extractSegmentData.js", ["com-sabre-redapp-fundamentals-web-module/components/extractSegmentData"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/extractSegmentData"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/getFlightFromSabreData", [], false, function (require, exports, module) {
"use strict";
// файл: getFlightFromSabreData.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlightFromSabreData = void 0;
var equipmentNames = {
    '388': 'Airbus A380',
    '77W': 'Boeing 777-300ER',
    '789': 'Boeing 787-9 Dreamliner',
    '320': 'Airbus A320',
    '321': 'Airbus A321',
    '738': 'Boeing 737-800',
    '319': 'Airbus A319',
    '744': 'Boeing 747-400',
    '359': 'Airbus A350-900',
    'E90': 'Embraer 190',
    // можно потом дополнить по мере необходимости
};
var getFlightFromSabreData = function (data, segmentIndex) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    if (segmentIndex === void 0) { segmentIndex = 0; }
    var segment = (_a = data.flightSegments) === null || _a === void 0 ? void 0 : _a[segmentIndex];
    if (!segment) {
        console.warn("\u26A0\uFE0F Segment index " + segmentIndex + " not found");
        return {
            id: '001',
            airlineCode: '',
            flightNo: '',
            departureDate: '',
            departure: '',
            arrival: '',
            cabinClass: '',
            equipment: ''
        };
    }
    console.log('📌 [getFlightFromSabreData] Полные данные сегмента:', JSON.stringify(segment, null, 2));
    var departureDateTime = segment.DepartureDateTime;
    var equipmentCode = ((_c = (_b = segment.Equipment) === null || _b === void 0 ? void 0 : _b.EncodeDecodeElement) === null || _c === void 0 ? void 0 : _c.Code) || '';
    var equipmentName = equipmentNames[equipmentCode] || equipmentCode; // Человекочитаемое название или код
    if (!departureDateTime) {
        console.warn('⚠️ [getFlightFromSabreData] DepartureDateTime отсутствует в данных сегмента!');
        return {
            id: '001',
            airlineCode: ((_e = (_d = segment.MarketingAirline) === null || _d === void 0 ? void 0 : _d.EncodeDecodeElement) === null || _e === void 0 ? void 0 : _e.Code) || '',
            flightNo: segment.FlightNumber || '',
            departureDate: '',
            departure: ((_g = (_f = segment.OriginLocation) === null || _f === void 0 ? void 0 : _f.EncodeDecodeElement) === null || _g === void 0 ? void 0 : _g.Code) || '',
            arrival: ((_j = (_h = segment.DestinationLocation) === null || _h === void 0 ? void 0 : _h.EncodeDecodeElement) === null || _j === void 0 ? void 0 : _j.Code) || '',
            cabinClass: '',
            equipment: equipmentName
        };
    }
    var departureDate = departureDateTime.split('T')[0]; // Оставляем только дату
    return {
        id: '001',
        airlineCode: (_l = (_k = segment.MarketingAirline) === null || _k === void 0 ? void 0 : _k.EncodeDecodeElement) === null || _l === void 0 ? void 0 : _l.Code,
        flightNo: segment.FlightNumber,
        departureDate: departureDate,
        departure: (_o = (_m = segment.OriginLocation) === null || _m === void 0 ? void 0 : _m.EncodeDecodeElement) === null || _o === void 0 ? void 0 : _o.Code,
        arrival: (_q = (_p = segment.DestinationLocation) === null || _p === void 0 ? void 0 : _p.EncodeDecodeElement) === null || _q === void 0 ? void 0 : _q.Code,
        cabinClass: '',
        equipment: equipmentName
    };
};
exports.getFlightFromSabreData = getFlightFromSabreData;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/getFlightFromSabreData.js", ["com-sabre-redapp-fundamentals-web-module/components/getFlightFromSabreData"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/getFlightFromSabreData"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre", ["com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-communication/interfaces/ISoapApiService","sabre-ngv-app/app/services/impl/PnrPublicService","com-sabre-redapp-fundamentals-web-module/utils/parcePnrData"], false, function (require, exports, module) {
"use strict";
// файл: code/components/loadPnrDetailsFromSabre.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPnrDetailsFromSabre = void 0;
/**
 * Загружает полные данные о текущем бронировании (PNR) из Sabre.
 *
 * Использует SOAP API запрос GetReservationRQ.
 * Извлекает активный Record Locator, отправляет запрос и парсит ответ в структуру PnrData.
 *
 * @param onDataLoaded Колбэк, вызываемый после успешной загрузки и парсинга данных PNR.
 */
var Context_1 = require("../Context");
var ISoapApiService_1 = require("sabre-ngv-communication/interfaces/ISoapApiService");
var PnrPublicService_1 = require("sabre-ngv-app/app/services/impl/PnrPublicService");
var parcePnrData_1 = require("../utils/parcePnrData");
var loadPnrDetailsFromSabre = function (onDataLoaded) { return __awaiter(void 0, void 0, void 0, function () {
    var pnrService, soapApiService, recordLocator, soapPayload, response, parsedData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pnrService = (0, Context_1.getService)(PnrPublicService_1.PnrPublicService);
                soapApiService = (0, Context_1.getService)(ISoapApiService_1.ISoapApiService);
                recordLocator = pnrService.getRecordLocator();
                if (!recordLocator) {
                    console.warn('No active PNR. Please create or retrieve a PNR first.');
                    return [2 /*return*/];
                }
                console.log('Record Locator:', recordLocator);
                soapPayload = "\n            <ns6:GetReservationRQ xmlns:ns6=\"http://webservices.sabre.com/pnrbuilder/v1_19\" Version=\"1.19.22\">\n                <ns6:RequestType>Stateful</ns6:RequestType>\n                <ns6:ReturnOptions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:type=\"ns6:ReturnOptions\" UnmaskCreditCard=\"false\" ShowTicketStatus=\"true\">\n                    <ns6:ViewName>Full</ns6:ViewName>\n                    <ns6:ResponseFormat>STL</ns6:ResponseFormat>\n                </ns6:ReturnOptions>\n            </ns6:GetReservationRQ>\n        ";
                return [4 /*yield*/, soapApiService.callSws({
                        action: 'GetReservationRQ',
                        payload: soapPayload,
                        authTokenType: 'SESSION'
                    })];
            case 1:
                response = _a.sent();
                console.log('GetReservationRQ Response:', response);
                parsedData = (0, parcePnrData_1.parsePnrData)(response.getParsedValue());
                console.log('🧩 Parsed PNR Data:', JSON.stringify(parsedData, null, 2));
                console.log('Segments:', parsedData.segments);
                // Вот здесь вызываем колбэк, передавая данные!
                onDataLoaded(parsedData);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error calling GetReservationRQ via ISoapApiService:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loadPnrDetailsFromSabre = loadPnrDetailsFromSabre;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre.js", ["com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ", ["com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-communication/interfaces/ISoapApiService"], false, function (require, exports, module) {
"use strict";var __awaiter=this&&this.__awaiter||function(e,r,n,t){return new(n||(n=Promise))(function(a,i){function fulfilled(e){try{step(t.next(e))}catch(r){i(r)}}function rejected(e){try{step(t.throw(e))}catch(r){i(r)}}function step(e){e.done?a(e.value):function adopt(e){return e instanceof n?e:new n(function(r){r(e)})}(e.value).then(fulfilled,rejected)}step((t=t.apply(e,r||[])).next())})},__generator=this&&this.__generator||function(e,r){var n,t,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function verb(i){return function(s){return function step(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,t&&(a=2&i[0]?t.return:i[0]?t.throw||((a=t.return)&&a.call(t),0):t.next)&&!(a=a.call(t,i[1])).done)return a;switch(t=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,t=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=r.call(e,o)}catch(s){i=[6,s],t=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.loadPnrUsingTravelItineraryReadRQ=void 0;var Context_1=require("../Context"),ISoapApiService_1=require("sabre-ngv-communication/interfaces/ISoapApiService");function loadPnrUsingTravelItineraryReadRQ(){return __awaiter(this,void 0,void 0,function(){var e,r;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,(0,Context_1.getService)(ISoapApiService_1.ISoapApiService).callSws({action:"TravelItineraryReadRQ",payload:'\n            <TravelItineraryReadRQ Version="3.9.0" xmlns="http://webservices.sabre.com/sabreXML/2011/10">\n                <MessagingDetails>\n                    <Transaction Code="PNR"/>\n                </MessagingDetails>\n            </TravelItineraryReadRQ>\n        ',authTokenType:"SESSION"})];case 1:return e=n.sent(),console.log("TravelItineraryReadRQ Response:",e),[3,3];case 2:return r=n.sent(),console.error("Error loading PNR using TravelItineraryReadRQ:",r),[3,3];case 3:return[2]}})})}exports.loadPnrUsingTravelItineraryReadRQ=loadPnrUsingTravelItineraryReadRQ;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ.js", ["com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadSeatMapFromSabre", ["com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-communication/interfaces/ISoapApiService"], false, function (require, exports, module) {
"use strict";
// файл: code/components/loadSeatMapFromSabre.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSeatMapFromSabre = void 0;
/**
 * Загружает SeatMap для заданного сегмента рейса и списка пассажиров.
 *
 * Использует Sabre EnhancedSeatMapRQ через SOAP API.
 * Формирует и отправляет запрос с данными о рейсе, пассажирах и классе обслуживания.
 *
 * @param flightSegment Данные сегмента рейса (город отправления, прибытия, дата, перевозчик и т.д.).
 * @param passengers Список пассажиров для запроса.
 * @param onSuccess Колбэк, вызываемый при успешном получении карты мест.
 * @param onError (опционально) Колбэк для обработки ошибок при вызове API.
 */
var Context_1 = require("../Context");
var ISoapApiService_1 = require("sabre-ngv-communication/interfaces/ISoapApiService");
var loadSeatMapFromSabre = function (flightSegment, passengers, onSuccess, onError) { return __awaiter(void 0, void 0, void 0, function () {
    var soapApiService, passengerBlocks, cabinDefinitionBlock, soapPayload, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                soapApiService = (0, Context_1.getService)(ISoapApiService_1.ISoapApiService);
                passengerBlocks = passengers.map(function (passenger) { return "\n            <ns4:FareAvailQualifiers passengerType=\"ADT\">\n                <ns4:TravellerID>" + passenger.travellerId + "</ns4:TravellerID>\n                <ns4:GivenName>" + passenger.givenName + "</ns4:GivenName>\n                <ns4:Surname>" + passenger.surname + "</ns4:Surname>\n                <ns4:SSR>TKNE</ns4:SSR>\n            </ns4:FareAvailQualifiers>\n        "; }).join('');
                cabinDefinitionBlock = flightSegment.bookingClass ? "\n        <ns4:CabinDefinition>\n            <ns4:RBD>" + flightSegment.bookingClass + "</ns4:RBD>\n        </ns4:CabinDefinition>\n        " : "\n            <ns4:CabinDefinition>\n                <ns4:Cabin>" + flightSegment.cabin + "</ns4:Cabin>\n            </ns4:CabinDefinition>\n        ";
                soapPayload = "\n            <ns4:EnhancedSeatMapRQ xmlns:ns4=\"http://stl.sabre.com/Merchandising/v8\">\n                <ns4:SeatMapQueryEnhanced>\n                    <ns4:RequestType>Payload</ns4:RequestType>\n\n                    <ns4:POS company=\"DI9L\" multiHost=\"DI9L\">\n                        <ns4:Actual city=\"MUC\"/>\n                        <ns4:PCC>DI9L</ns4:PCC>\n                    </ns4:POS>\n\n                    <ns4:Flight id=\"f1\" destination=\"" + flightSegment.destination + "\" origin=\"" + flightSegment.origin + "\">\n                        <ns4:DepartureDate>" + flightSegment.departureDate + "</ns4:DepartureDate>\n                        <ns4:Marketing carrier=\"" + flightSegment.marketingCarrier + "\">" + flightSegment.marketingFlightNumber + "</ns4:Marketing>\n                    </ns4:Flight>\n\n                    " + cabinDefinitionBlock + "\n\n                    <ns4:Currency>USD</ns4:Currency>\n\n                    " + passengerBlocks + "\n                </ns4:SeatMapQueryEnhanced>\n                <ns4:CalculateDiscount>true</ns4:CalculateDiscount>\n                <ns4:ShowOffers>true</ns4:ShowOffers> \n            </ns4:EnhancedSeatMapRQ>\n        ";
                console.log('📤 Sending EnhancedSeatMapRQ payload:', soapPayload);
                return [4 /*yield*/, soapApiService.callSws({
                        action: 'EnhancedSeatMapRQ',
                        payload: soapPayload,
                        authTokenType: 'SESSION'
                    })];
            case 1:
                response = _a.sent();
                console.log('✅ EnhancedSeatMapRQ Response:', response);
                onSuccess(response.getParsedValue());
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('❌ Error calling EnhancedSeatMapRQ:', error_1);
                if (onError) {
                    onError(error_1);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loadSeatMapFromSabre = loadSeatMapFromSabre;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadSeatMapFromSabre.js", ["com-sabre-redapp-fundamentals-web-module/components/loadSeatMapFromSabre"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/loadSeatMapFromSabre"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/openSeatMapsPopoverModal", ["react","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopoverModalWrapper"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.openSeatMapsPopoverModal=void 0;var React=require("react"),Context_1=require("../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapsPopoverModalWrapper_1=require("./SeatMapsPopoverModalWrapper"),openSeatMapsPopoverModal=function(){(0,Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal({component:React.createElement(SeatMapsPopoverModalWrapper_1.SeatMapsPopoverModalWrapper,{}),modalClassName:"seatmap-modal-class"})};exports.openSeatMapsPopoverModal=openSeatMapsPopoverModal;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/openSeatMapsPopoverModal.js", ["com-sabre-redapp-fundamentals-web-module/components/openSeatMapsPopoverModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/openSeatMapsPopoverModal"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/parcePnrData", [], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.parsePnrData=void 0;var parsePnrData=function(e){for(var t,n,a,l,i,r,s,o,g,m,v=[],u=[],d=e.getElementsByTagName("stl19:Passenger"),p=0;p<d.length;p++){var N=d[p],T=N.getAttribute("id")||"",x=(null===(t=N.getElementsByTagName("stl19:LastName")[0])||void 0===t?void 0:t.textContent)||"",y=(null===(n=N.getElementsByTagName("stl19:FirstName")[0])||void 0===n?void 0:n.textContent)||"";v.push({label:x+"/"+y,value:T,givenName:y,surname:x})}var B=e.getElementsByTagName("stl19:Air");for(p=0;p<B.length;p++){var C=B[p],E=(T=C.getAttribute("id")||"",(null===(a=C.getElementsByTagName("stl19:DepartureAirport")[0])||void 0===a?void 0:a.textContent)||""),D=(null===(l=C.getElementsByTagName("stl19:ArrivalAirport")[0])||void 0===l?void 0:l.textContent)||"",b=(null===(i=C.getElementsByTagName("stl19:DepartureDateTime")[0])||void 0===i?void 0:i.textContent)||"",A=C.getElementsByTagName("stl19:MarketingAirline")[0],h=C.getElementsByTagName("stl19:OperatingAirline")[0],k=(null===(r=null==A?void 0:A.textContent)||void 0===r?void 0:r.trim())||(null===(s=null==h?void 0:h.textContent)||void 0===s?void 0:s.trim())||"UNKNOWN",P=(null===(o=C.getElementsByTagName("stl19:MarketingFlightNumber")[0])||void 0===o?void 0:o.textContent)||"",c=(null===(g=C.getElementsByTagName("stl19:ResBookDesigCode")[0])||void 0===g?void 0:g.textContent)||"",f=(null===(m=C.getElementsByTagName("stl19:Equipment")[0])||void 0===m?void 0:m.textContent)||"",F="";b.includes("T")&&(F=b.split("T")[0]),u.push({label:E+" → "+D+" ("+k+P+")",value:T,origin:E,destination:D,departureDate:F,marketingCarrier:k,marketingFlightNumber:P,bookingClass:c,equipment:f})}return{passengers:v,segments:u}};exports.parsePnrData=parsePnrData;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/parcePnrData.js", ["com-sabre-redapp-fundamentals-web-module/components/parcePnrData"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/parcePnrData"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/parseSeatMapResponse", [], false, function (require, exports, module) {
"use strict";
// файл code/components/parseSeatMapResponse.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSeatMapResponse = void 0;
function parseSeatMapResponse(xmlDocument) {
    console.log('📥 Начинаем разбор ответа EnhancedSeatMapRS');
    var layout = {
        decks: [],
    };
    var availability = [];
    var passengers = [];
    // 1. Находим все кабины (Cabin)
    var cabinNodes = xmlDocument.getElementsByTagName('Cabin');
    for (var i = 0; i < cabinNodes.length; i++) {
        var cabinNode = cabinNodes[i];
        var rows = [];
        var rowNodes = cabinNode.getElementsByTagName('Row');
        for (var j = 0; j < rowNodes.length; j++) {
            var rowNode = rowNodes[j];
            var rowLabel = rowNode.getAttribute('number') || (j + 1).toString();
            var seatNodes = rowNode.getElementsByTagName('Seat');
            var seats = [];
            for (var k = 0; k < seatNodes.length; k++) {
                var seatNode = seatNodes[k];
                var seatLabel = seatNode.getAttribute('number') || '';
                var x = 50 + k * 50; // Простейшее позиционирование по X
                var y = 50 + j * 50; // Простейшее позиционирование по Y
                seats.push({ label: seatLabel, x: x, y: y });
            }
            rows.push({ label: rowLabel, seats: seats });
        }
        layout.decks.push({
            id: "deck-" + i,
            name: "Deck " + (i + 1),
            width: 600,
            height: 800,
            rows: rows,
        });
    }
    // 2. Находим предложения (Offers → места, доступные для покупки)
    var offerNodes = xmlDocument.getElementsByTagName('Offer');
    for (var i = 0; i < offerNodes.length; i++) {
        var offerNode = offerNodes[i];
        var seatNumber = offerNode.getAttribute('seatNumber');
        var priceNode = offerNode.querySelector('Price > TotalAmount');
        var price = (priceNode === null || priceNode === void 0 ? void 0 : priceNode.textContent) || '0';
        var currency = (priceNode === null || priceNode === void 0 ? void 0 : priceNode.getAttribute('currencyCode')) || 'USD';
        availability.push({
            label: seatNumber,
            price: parseFloat(price),
            currency: currency,
        });
    }
    // 3. Пассажиры (упрощённо, можно позже доработать)
    passengers.push({ id: 'PAX1', name: 'Passenger 1', type: 'ADT' });
    console.log('✅ Разобранные данные:', { layout: layout, availability: availability, passengers: passengers });
    return { layout: layout, availability: availability, passengers: passengers };
}
exports.parseSeatMapResponse = parseSeatMapResponse;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/parseSeatMapResponse.js", ["com-sabre-redapp-fundamentals-web-module/components/parseSeatMapResponse"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/parseSeatMapResponse"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/registerCommandHelperButton", ["sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-xp/configs/NoviceButtonConfig","com-sabre-redapp-fundamentals-web-module/Context","com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommandHelperButton = void 0;
var ExtensionPointService_1 = require("sabre-ngv-xp/services/ExtensionPointService");
var NoviceButtonConfig_1 = require("sabre-ngv-xp/configs/NoviceButtonConfig");
var Context_1 = require("../Context"); // если уже подключено в Main.ts
var SeatMapsPopover_1 = require("./SeatMapsPopover"); // это React-компонент для поповера
// НЕ РАБОТАЕТ!!! Кнопка не видна!
function registerCommandHelperButton() {
    var onClick = function (isOpen) {
        console.log('SeatMaps ABC 360 button clicked. Popover isOpen:', isOpen);
    };
    var onClose = function () {
        console.log('SeatMaps ABC 360 popover closed');
    };
    var config = new NoviceButtonConfig_1.NoviceButtonConfig('SeatMaps ABC 360', // Label
    'fa-plane', // Иконка FontAwesome
    'seatmaps-abc360', // CSS класс для поповера (можешь переопределить стили потом)
    SeatMapsPopover_1.SeatMapsPopover, // Компонент поповера
    -1000, // Приоритет: будет слева
    onClick, // При клике
    onClose // При закрытии
    );
    (0, Context_1.getService)(ExtensionPointService_1.ExtensionPointService).addConfig('novice-buttons', config);
}
exports.registerCommandHelperButton = registerCommandHelperButton;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/registerCommandHelperButton.js", ["com-sabre-redapp-fundamentals-web-module/components/registerCommandHelperButton"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/registerCommandHelperButton"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent", ["react"], false, function (require, exports, module) {
"use strict";
// файл: code/components/SeatMapComponent.tsx
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
exports.SeatMapComponent = void 0;
var React = require("react");
var SeatMapComponent = /** @class */ (function (_super) {
    __extends(SeatMapComponent, _super);
    function SeatMapComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.iframeRef = React.createRef();
        _this.handleLoadSeatMap = function () {
            // 🚀 Вместо запроса - тестовый layout
            var dummyLayout = {
                decks: [
                    {
                        id: 'main-deck',
                        name: 'Deck 1',
                        width: 600,
                        height: 400,
                        rows: [
                            { label: '1', seats: [{ label: 'A', x: 50, y: 50 }, { label: 'B', x: 100, y: 50 }] },
                            { label: '2', seats: [{ label: 'A', x: 50, y: 100 }] }
                        ]
                    }
                ]
            };
            _this.setState({ layout: dummyLayout }, function () {
                console.log('✅ Dummy layout set. Sending to iframe...');
                _this.sendSeatMapData();
            });
        };
        _this.sendSeatMapData = function () {
            var iframe = _this.iframeRef.current;
            if (!(iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow)) {
                console.warn('⚠️ iframe not ready');
                return;
            }
            var seatMapData = {
                config: {},
                flight: {
                    id: 'f1',
                    airlineCode: 'EK',
                    flightNo: '50',
                    departureDate: '2025-05-30',
                    departure: 'MUC',
                    arrival: 'DXB',
                    cabinClass: 'Y'
                },
                layout: _this.state.layout
            };
            iframe.contentWindow.postMessage({
                type: 'seatMaps',
                config: JSON.stringify(seatMapData.config),
                flight: JSON.stringify(seatMapData.flight),
                layout: JSON.stringify(seatMapData.layout)
            }, '*');
            console.log('📤 Sent seatMapData to iframe:', seatMapData);
        };
        _this.state = {
            layout: null
        };
        return _this;
    }
    SeatMapComponent.prototype.render = function () {
        var _a = this.props, passengerIds = _a.passengerIds, segmentId = _a.segmentId;
        var layout = this.state.layout;
        return (React.createElement("div", { style: { padding: '20px', backgroundColor: '#fff', minHeight: '400px' } },
            React.createElement("h2", null, "Seat Map"),
            React.createElement("p", null,
                React.createElement("strong", null, "Flight Segment:"),
                " ",
                segmentId),
            React.createElement("p", null,
                React.createElement("strong", null, "Selected Passengers:")),
            React.createElement("ul", null, passengerIds.map(function (passengerId, index) { return (React.createElement("li", { key: index }, passengerId)); })),
            React.createElement("hr", null),
            !layout ? (React.createElement("div", { style: {
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#eef',
                    borderRadius: '8px',
                    textAlign: 'center'
                } },
                React.createElement("p", null,
                    React.createElement("em", null, "Seat map visualization coming soon+++")),
                React.createElement("button", { className: "btn btn-primary", onClick: this.handleLoadSeatMap }, "\uD83D\uDE80 Load Dummy Seat Map"))) : (React.createElement("iframe", { ref: this.iframeRef, src: "https://quicket.io/react-proxy-app/", width: "100%", height: "800", style: { border: '1px solid #ccc', marginTop: '20px' }, title: "SeatMapIframe", onLoad: this.sendSeatMapData }))));
    };
    return SeatMapComponent;
}(React.Component));
exports.SeatMapComponent = SeatMapComponent;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentAvail", ["react","react","com-sabre-redapp-fundamentals-web-module/components/getFlightFromSabreData"], false, function (require, exports, module) {
"use strict";
// SeatMapComponentAvail.tsx
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var getFlightFromSabreData_1 = require("../components/getFlightFromSabreData");
var _a = (0, react_1.useState)('Economy'), selectedCabinClass = _a[0], setSelectedCabinClass = _a[1];
var cabinClasses = [
    { label: 'Economy', value: 'Economy' },
    { label: 'Premium Economy', value: 'PremiumEconomy' },
    { label: 'Business', value: 'Business' },
    { label: 'First', value: 'First' }
];
var SeatMapComponentAvail = function (_a) {
    var config = _a.config, data = _a.data;
    var _b = (0, react_1.useState)(0), segmentIndex = _b[0], setSegmentIndex = _b[1];
    var iframeRef = (0, react_1.useRef)(null);
    // 🔍 Логируем входящие данные
    console.log('🔹 [SeatMapComponent] received props:', { config: config, data: data });
    var flight = (0, getFlightFromSabreData_1.getFlightFromSabreData)(data, segmentIndex); // это сегмент полета c датой
    var flightSegments = data.flightSegments || [];
    // 🔍 Логируем сформированный flight
    console.log('✈️ [SeatMapComponent] parsed flight:', flight);
    var seatMapData = {
        config: config,
        flight: flight,
        layout: {
            decks: [
                {
                    id: 'main-deck',
                    name: 'Deck 1',
                    width: 600,
                    height: 400,
                    rows: [
                        { label: '1', seats: [{ label: 'A', x: 50, y: 50 }, { label: 'B', x: 100, y: 50 }] },
                        { label: '2', seats: [{ label: 'A', x: 50, y: 100 }] }
                    ]
                }
            ]
        },
        availability: [
            { label: '1A', price: 50, currency: 'USD', color: 'green', onlyForPassengerType: ['ADT'] },
            { label: '1B', price: 45, currency: 'USD', color: 'yellow', onlyForPassengerType: ['ADT'] },
            { label: '2A', price: 30, currency: 'USD', color: 'lightblue' }
        ],
        passengers: [{ id: 'PAX1', name: 'Иванов И.И.', type: 'ADT' }]
    };
    //============================
    var sendToIframe = function () {
        var iframe = iframeRef.current;
        if (!(iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow)) {
            console.warn('⚠️ iframe or contentWindow not available');
            return;
        }
        // 🔥 Обновляем flight.cabinClass перед отправкой
        var updatedFlight = __assign(__assign({}, (0, getFlightFromSabreData_1.getFlightFromSabreData)(data, segmentIndex)), { cabinClass: selectedCabinClass });
        var seatMapData = {
            config: config,
            flight: updatedFlight,
            layout: {
                decks: [
                    {
                        id: 'main-deck',
                        name: 'Deck 1',
                        width: 600,
                        height: 400,
                        rows: [
                            { label: '1', seats: [{ label: 'A', x: 50, y: 50 }, { label: 'B', x: 100, y: 50 }] },
                            { label: '2', seats: [{ label: 'A', x: 50, y: 100 }] }
                        ]
                    }
                ]
            },
            availability: [
                { label: '1A', price: 50, currency: 'USD', color: 'green', onlyForPassengerType: ['ADT'] },
                { label: '1B', price: 45, currency: 'USD', color: 'yellow', onlyForPassengerType: ['ADT'] },
                { label: '2A', price: 30, currency: 'USD', color: 'lightblue' }
            ],
            passengers: [{ id: 'PAX1', name: 'Иванов И.И.', type: 'ADT' }]
        };
        var message = {
            type: 'seatMaps',
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
            layout: JSON.stringify(seatMapData.layout),
            // availability: JSON.stringify(seatMapData.availability),
            // passengers: JSON.stringify(seatMapData.passengers)
        };
        console.log('📤 [SeatMapComponent] sending to iframe with data:', {
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
        });
        iframe.contentWindow.postMessage(message, '*');
    };
    //=========================
    console.log('🧠 SeatMapComponent is rendering!');
    (0, react_1.useEffect)(function () {
        console.log('🛠️ SeatMapComponent mounted');
        console.log("\uD83D\uDD04 Segment index changed: " + segmentIndex);
        sendToIframe(); // отправка при изменении сегмента
    }, [segmentIndex]);
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("div", { style: { marginBottom: '1rem', fontSize: '0.9rem', color: '#333' } },
            React.createElement("strong", null, "\uD83D\uDEEB Flight info:"),
            React.createElement("pre", null, JSON.stringify(flight, null, 2))),
        React.createElement("div", { style: { marginBottom: '1rem' } },
            React.createElement("label", { htmlFor: "segmentSelect" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0435\u0433\u043C\u0435\u043D\u0442: "),
            React.createElement("select", { id: "segmentSelect", value: segmentIndex, onChange: function (e) { return setSegmentIndex(Number(e.target.value)); } }, flightSegments.map(function (segment, index) {
                var _a, _b, _c, _d, _e, _f;
                return (React.createElement("option", { key: index, value: index },
                    ((_b = (_a = segment.MarketingAirline) === null || _a === void 0 ? void 0 : _a.EncodeDecodeElement) === null || _b === void 0 ? void 0 : _b.Code) || 'XX',
                    " ",
                    segment.FlightNumber || '000',
                    "\u00A0\u2192\u00A0",
                    ((_d = (_c = segment.OriginLocation) === null || _c === void 0 ? void 0 : _c.EncodeDecodeElement) === null || _d === void 0 ? void 0 : _d.Code) || '???',
                    " \u2013",
                    ((_f = (_e = segment.DestinationLocation) === null || _e === void 0 ? void 0 : _e.EncodeDecodeElement) === null || _f === void 0 ? void 0 : _f.Code) || '???'));
            }))),
        React.createElement("div", { style: { marginBottom: '1rem' } },
            React.createElement("label", { htmlFor: "cabinClassSelect" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043B\u0430\u0441\u0441 (\u043A\u0430\u0431\u0438\u043D\u0443): "),
            React.createElement("select", { id: "cabinClassSelect", value: selectedCabinClass, onChange: function (e) { return setSelectedCabinClass(e.target.value); } }, cabinClasses.map(function (cabin) { return (React.createElement("option", { key: cabin.value, value: cabin.value }, cabin.label)); }))),
        React.createElement("iframe", { ref: iframeRef, src: "https://quicket.io/react-proxy-app/", width: "100%", height: "800", style: { border: '1px solid #ccc' }, title: "SeatMapIframe", onLoad: function () {
                console.log('✅ [SeatMapComponent] iframe loaded, sending data...');
                sendToIframe();
            } })));
};
exports.default = SeatMapComponentAvail;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentAvail.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentAvail"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentAvail"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPnr", ["react","react"], false, function (require, exports, module) {
"use strict";
// файл: SeatMapComponentPnr.tsx
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var SeatMapComponentPnr = function (_a) {
    var layout = _a.layout, config = _a.config;
    var iframeRef = (0, react_1.useRef)(null);
    var flight = {
        id: '001',
        airlineCode: 'EK',
        flightNo: '50',
        departureDate: '2025-05-30',
        departure: 'MUC',
        arrival: 'DXB',
        cabinClass: 'Y'
    };
    var sendToIframe = function () {
        var iframe = iframeRef.current;
        if (!(iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow)) {
            console.warn('⚠️ iframe or contentWindow not available');
            return;
        }
        var message = {
            type: 'seatMaps',
            config: JSON.stringify(config),
            flight: JSON.stringify(flight),
            layout: JSON.stringify(layout),
            // availability и passengers пока не передаем
        };
        console.log('📤 [SeatMapComponentPnr] sending to iframe:', message);
        iframe.contentWindow.postMessage(message, '*');
    };
    (0, react_1.useEffect)(function () {
        console.log('🛠️ [SeatMapComponentPnr] mounted, sending seat map data to iframe');
        sendToIframe();
    }, [layout]);
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("h2", null, "\uD83D\uDEEB Seat Map from PNR"),
        React.createElement("iframe", { ref: iframeRef, src: "https://quicket.io/react-proxy-app/", width: "100%", height: "800", style: { border: '1px solid #ccc' }, title: "SeatMapIframe", onLoad: function () {
                console.log('✅ [SeatMapComponentPnr] iframe loaded, sending seat map data...');
                sendToIframe();
            } })));
};
exports.default = SeatMapComponentPnr;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPnr.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPnr"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPnr"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPricing", ["react","react"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var SeatMapComponentPricing = function (_a) {
    var config = _a.config, flightSegments = _a.flightSegments, selectedSegmentIndex = _a.selectedSegmentIndex;
    var _b = (0, react_1.useState)(selectedSegmentIndex), segmentIndex = _b[0], setSegmentIndex = _b[1];
    var iframeRef = (0, react_1.useRef)(null);
    var currentSegment = flightSegments[segmentIndex] || {};
    var seatMapData = {
        config: config,
        flight: {
            id: '001',
            airlineCode: currentSegment.marketingAirline || 'LH',
            flightNo: currentSegment.flightNumber || '123',
            departureDate: currentSegment.departureDateTime || '2025-04-22',
            departure: currentSegment.origin || 'MUC',
            arrival: currentSegment.destination || 'FRA',
            cabinClass: currentSegment.cabinClass || 'A'
        },
        layout: {
            decks: [
                {
                    id: 'main-deck',
                    name: 'Deck 1',
                    width: 600,
                    height: 400,
                    rows: [
                        { label: '1', seats: [{ label: 'A', x: 50, y: 50 }, { label: 'B', x: 100, y: 50 }] },
                        { label: '2', seats: [{ label: 'A', x: 50, y: 100 }] }
                    ]
                }
            ]
        },
        availability: [
            { label: '1A', price: 50, currency: 'USD', color: 'green', onlyForPassengerType: ['ADT'] },
            { label: '1B', price: 45, currency: 'USD', color: 'yellow', onlyForPassengerType: ['ADT'] },
            { label: '2A', price: 30, currency: 'USD', color: 'lightblue' }
        ],
        passengers: [{ id: 'PAX1', name: 'Иванов И.И.', type: 'ADT' }]
    };
    var sendToIframe = function () {
        var iframe = iframeRef.current;
        if (!(iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow)) {
            console.warn('⚠️ iframe or contentWindow not available');
            return;
        }
        var message = {
            type: 'seatMaps',
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
            layout: JSON.stringify(seatMapData.layout)
            // availability: JSON.stringify(seatMapData.availability),
            // passengers: JSON.stringify(seatMapData.passengers)
        };
        console.log('📤 [SeatMapComponent] sending to iframe:', message);
        iframe.contentWindow.postMessage(message, '*');
    };
    (0, react_1.useEffect)(function () {
        console.log("\uD83D\uDD04 Segment index changed: " + segmentIndex);
        sendToIframe();
    }, [segmentIndex]);
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("div", { style: { marginBottom: '1rem' } },
            React.createElement("label", { htmlFor: "segmentSelect" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0435\u0433\u043C\u0435\u043D\u0442: "),
            React.createElement("select", { id: "segmentSelect", value: segmentIndex, onChange: function (e) { return setSegmentIndex(Number(e.target.value)); } }, flightSegments.map(function (segment, index) { return (React.createElement("option", { key: index, value: index },
                segment.marketingAirline || 'XX',
                " ",
                segment.flightNumber || '000',
                " \u2192 ",
                segment.origin || '???',
                " \u2013 ",
                segment.destination || '???')); }))),
        React.createElement("div", { style: { marginBottom: '1rem', fontSize: '0.9rem', color: '#333' } },
            React.createElement("strong", null, "\uD83D\uDEEB Flight info:"),
            React.createElement("pre", null, JSON.stringify(currentSegment, null, 2))),
        React.createElement("iframe", { ref: iframeRef, src: "https://quicket.io/react-proxy-app/", width: "100%", height: "800", style: { border: '1px solid #ccc' }, title: "SeatMapIframe", onLoad: function () {
                console.log('✅ [SeatMapComponent] iframe loaded, sending data...');
                sendToIframe();
            } })));
};
exports.default = SeatMapComponentPricing;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPricing.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPricing"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPricing"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentShopping", ["react","react"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var SeatMapComponentShopping = function (_a) {
    var config = _a.config, data = _a.data;
    var _b = (0, react_1.useState)(0), segmentIndex = _b[0], setSegmentIndex = _b[1];
    var iframeRef = (0, react_1.useRef)(null);
    // Получаем текущий сегмент
    var flightSegments = data.flightSegments || [];
    var currentSegment = flightSegments[segmentIndex] || {};
    console.log('✈️ [SeatMapComponentShopping] Полученные данные:', data);
    // // 🔨 Пример данных для проверки
    // const flightData = {
    //     airlineCode: 'LH',
    //     flightNo: '123',
    //     departureDate: '2025-04-22',
    //     departure: 'MUC',
    //     arrival: 'FRA'
    // };
    var seatMapData = {
        config: config,
        flight: {
            id: '001',
            airlineCode: currentSegment.marketingAirline || 'LH',
            flightNo: currentSegment.flightNumber || '123',
            departureDate: currentSegment.departureDateTime || '2025-04-22',
            departure: currentSegment.origin || 'MUC',
            arrival: currentSegment.destination || 'FRA',
            cabinClass: currentSegment.cabinClass || 'A'
        },
        layout: {
            decks: [
                {
                    id: 'main-deck',
                    name: 'Deck 1',
                    width: 600,
                    height: 400,
                    rows: [
                        { label: '1', seats: [{ label: 'A', x: 50, y: 50 }, { label: 'B', x: 100, y: 50 }] },
                        { label: '2', seats: [{ label: 'A', x: 50, y: 100 }] }
                    ]
                }
            ]
        }
    };
    console.log('✈️ [SeatMapComponentShopping] Сформированные данные для отправки:', seatMapData);
    var sendToIframe = function () {
        var iframe = iframeRef.current;
        if (!(iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow)) {
            console.warn('⚠️ iframe или contentWindow не доступен.');
            return;
        }
        var message = {
            type: 'seatMaps',
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
            layout: JSON.stringify(seatMapData.layout),
        };
        console.log('📤 [SeatMapComponentShopping] Отправка данных в iframe:', message);
        iframe.contentWindow.postMessage(message, '*');
    };
    (0, react_1.useEffect)(function () {
        sendToIframe();
    }, [segmentIndex]);
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("div", { style: { marginBottom: '1rem', fontSize: '0.9rem', color: '#333' } },
            React.createElement("strong", null, "\uD83D\uDEEB Flight info:"),
            React.createElement("pre", null, JSON.stringify(currentSegment, null, 2))),
        React.createElement("div", { style: { marginBottom: '1rem' } },
            React.createElement("label", { htmlFor: "segmentSelect" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0435\u0433\u043C\u0435\u043D\u0442: "),
            React.createElement("select", { id: "segmentSelect", value: segmentIndex, onChange: function (e) { return setSegmentIndex(Number(e.target.value)); } }, flightSegments.map(function (segment, index) { return (React.createElement("option", { key: index, value: index },
                segment.marketingAirline || 'XX',
                " ",
                segment.flightNumber || '000',
                ": ",
                segment.origin,
                " \u2192 ",
                segment.destination)); }))),
        React.createElement("iframe", { ref: iframeRef, src: "https://quicket.io/react-proxy-app/", width: "100%", height: "800", style: { border: '1px solid #ccc' }, title: "SeatMapIframe", onLoad: sendToIframe })));
};
exports.default = SeatMapComponentShopping;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentShopping.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentShopping"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentShopping"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover", ["react","react-bootstrap","sabre-ngv-UIComponents/advancedDropdown/components/SimpleDropdown","com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre","com-sabre-redapp-fundamentals-web-module/components/loadSeatMapFromSabre","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/utils/XmlViewer"], false, function (require, exports, module) {
"use strict";
// файл: code/components/SeatMapsPopover.tsx
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapsPopover = void 0;
/**
 * SeatMapsPopover - интерфейс для загрузки и отображения карты мест рейса на основе данных PNR.
 *
 * Позволяет выбрать пассажиров, сегмент, класс обслуживания и перевозчика.
 * Отправляет запрос EnhancedSeatMapRQ в Sabre, отображает результат в модальном окне.
 *
 * Использует:
 * - loadPnrDetailsFromSabre() для получения данных PNR
 * - loadSeatMapFromSabre() для загрузки карты мест
 */
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var SimpleDropdown_1 = require("sabre-ngv-UIComponents/advancedDropdown/components/SimpleDropdown");
var loadPnrDetailsFromSabre_1 = require("./loadPnrDetailsFromSabre");
var loadSeatMapFromSabre_1 = require("./loadSeatMapFromSabre");
var Context_1 = require("../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var XmlViewer_1 = require("../utils/XmlViewer");
var SeatMapsPopover = /** @class */ (function (_super) {
    __extends(SeatMapsPopover, _super);
    function SeatMapsPopover(props) {
        var _this = _super.call(this, props) || this;
        _this.cabinClasses = [
            { label: 'Economy (Y)', value: 'Economy' },
            { label: 'Premium Economy (W)', value: 'PremiumEconomy' },
            { label: 'Business (J)', value: 'Business' },
            { label: 'First (F)', value: 'First' }
        ];
        _this.handlePassengerChange = function (passengerValue) {
            _this.setState(function (prevState) { return ({
                selectedPassengers: prevState.selectedPassengers.includes(passengerValue)
                    ? prevState.selectedPassengers.filter(function (p) { return p !== passengerValue; })
                    : __spreadArray(__spreadArray([], prevState.selectedPassengers, true), [passengerValue], false)
            }); });
        };
        _this.handleSegmentChange = function (options) {
            var selected = options.find(function (opt) { return opt.checked; });
            if (selected) {
                var fullData = _this.state.segments.find(function (seg) { return seg.value === selected.value; }) || null;
                _this.setState({ selectedSegment: selected.value, selectedSegmentFullData: fullData });
            }
        };
        _this.handleCabinClassChange = function (options) {
            var selected = options.find(function (opt) { return opt.checked; });
            if (selected)
                _this.setState({ selectedCabinClass: selected.value });
        };
        _this.handleMarketingCarrierChange = function (event) {
            _this.setState({
                selectedMarketingCarrier: event.target.value,
                customMarketingCarrier: event.target.value === 'Other' ? '' : ''
            });
        };
        _this.handleCustomMarketingCarrierChange = function (event) {
            _this.setState({ customMarketingCarrier: event.target.value.toUpperCase() });
        };
        _this.loadSeatMap = function (_a) {
            var availabilityInfo = _a.availabilityInfo, _b = _a.silent, silent = _b === void 0 ? false : _b;
            return __awaiter(_this, void 0, void 0, function () {
                var _c, selectedPassengers, selectedSegment, selectedCabinClass, selectedMarketingCarrier, customMarketingCarrier, segments, passengers, selectedSegmentData, marketingCarrierFinal, flightSegment, mappedPassengers;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _c = this.state, selectedPassengers = _c.selectedPassengers, selectedSegment = _c.selectedSegment, selectedCabinClass = _c.selectedCabinClass, selectedMarketingCarrier = _c.selectedMarketingCarrier, customMarketingCarrier = _c.customMarketingCarrier, segments = _c.segments, passengers = _c.passengers;
                            selectedSegmentData = segments.find(function (seg) { return seg.value === selectedSegment; });
                            if (!selectedSegmentData)
                                return [2 /*return*/, console.error('❌ No segment data found.')];
                            marketingCarrierFinal = selectedMarketingCarrier === 'Other' ? customMarketingCarrier : selectedMarketingCarrier;
                            flightSegment = {
                                id: selectedSegment,
                                origin: selectedSegmentData.origin,
                                destination: selectedSegmentData.destination,
                                departureDate: selectedSegmentData.departureDate,
                                marketingCarrier: marketingCarrierFinal,
                                marketingFlightNumber: selectedSegmentData.marketingFlightNumber,
                                flightNumber: selectedSegmentData.marketingFlightNumber,
                                bookingClass: selectedSegmentData.bookingClass,
                                equipment: selectedSegmentData.equipment,
                                cabin: selectedCabinClass
                            };
                            mappedPassengers = passengers.filter(function (p) { return selectedPassengers.includes(p.value); }).map(function (p) { return ({
                                id: p.value,
                                travellerId: Number(p.value),
                                givenName: p.givenName,
                                surname: p.surname
                            }); });
                            return [4 /*yield*/, (0, loadSeatMapFromSabre_1.loadSeatMapFromSabre)(flightSegment, mappedPassengers, function (response) {
                                    var prettyXml = new XMLSerializer().serializeToString(response);
                                    _this.setState({ lastXmlResponse: prettyXml });
                                    if (!silent) {
                                        (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal({
                                            header: availabilityInfo ? '🛫 Seat Map (Occupied)' : '🛫 Seat Map (Empty)',
                                            component: React.createElement(XmlViewer_1.XmlViewer, { xml: prettyXml }), modalClassName: 'seatmap-xml-modal'
                                        });
                                    }
                                })];
                        case 1:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.handleShowRawXml = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.state.lastXmlResponse) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadSeatMap({ availabilityInfo: false, silent: true })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal({
                            header: '📄 Last EnhancedSeatMapRS XML',
                            component: React.createElement(XmlViewer_1.XmlViewer, { xml: this.state.lastXmlResponse || '' }),
                            modalClassName: 'seatmap-xml-modal'
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            selectedPassengers: [],
            selectedSegment: '',
            selectedSegmentFullData: null,
            selectedCabinClass: 'Economy',
            selectedMarketingCarrier: 'LH',
            customMarketingCarrier: '',
            passengers: [],
            segments: [],
            lastXmlResponse: null
        };
        return _this;
    }
    SeatMapsPopover.prototype.componentDidMount = function () {
        var _this = this;
        (0, loadPnrDetailsFromSabre_1.loadPnrDetailsFromSabre)(function (data) {
            var selectedSegment = '';
            var selectedSegmentFullData = null;
            if (data.segments.length === 1) {
                selectedSegment = data.segments[0].value;
                selectedSegmentFullData = data.segments[0];
            }
            var selectedMarketingCarrier = 'LH';
            var customMarketingCarrier = '';
            if (data.segments.length > 0) {
                var marketingCarrier = data.segments[0].marketingCarrier.trim().toUpperCase();
                if (marketingCarrier === 'LH' || marketingCarrier === 'EK') {
                    selectedMarketingCarrier = marketingCarrier;
                }
                else if (marketingCarrier) {
                    selectedMarketingCarrier = 'Other';
                    customMarketingCarrier = marketingCarrier;
                }
            }
            _this.setState({
                passengers: data.passengers.map(function (p) { return (__assign(__assign({}, p), { checked: true })); }),
                selectedPassengers: data.passengers.map(function (p) { return p.value; }),
                segments: data.segments,
                selectedSegment: selectedSegment,
                selectedSegmentFullData: selectedSegmentFullData,
                lastXmlResponse: null,
                selectedMarketingCarrier: selectedMarketingCarrier,
                customMarketingCarrier: customMarketingCarrier
            });
        });
    };
    SeatMapsPopover.prototype.render = function () {
        var _this = this;
        var _a = this.state, passengers = _a.passengers, segments = _a.segments, selectedPassengers = _a.selectedPassengers, selectedSegment = _a.selectedSegment, selectedCabinClass = _a.selectedCabinClass, selectedMarketingCarrier = _a.selectedMarketingCarrier, customMarketingCarrier = _a.customMarketingCarrier;
        var isButtonDisabled = selectedPassengers.length === 0 || !selectedSegment;
        var selectedSegmentData = segments.find(function (seg) { return seg.value === selectedSegment; });
        return (React.createElement("div", { style: { padding: '20px', minWidth: '400px', backgroundColor: '#fff' } },
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null,
                    "Select Passengers (",
                    selectedPassengers.length,
                    ")"),
                React.createElement("div", { style: { marginTop: '10px' } }, passengers.map(function (passenger) { return (React.createElement("div", { key: passenger.value, style: { display: 'flex', alignItems: 'center', marginBottom: '5px' } },
                    React.createElement("input", { type: "checkbox", checked: selectedPassengers.includes(passenger.value), onChange: function () { return _this.handlePassengerChange(passenger.value); }, style: { marginRight: '8px' } }),
                    React.createElement("span", null, passenger.label))); }))),
            this.state.selectedSegmentFullData && (React.createElement("div", { style: { marginBottom: '10px', fontWeight: 'bold', color: '#333' } },
                "\u2708\uFE0F ",
                this.state.selectedSegmentFullData.origin,
                " \u2192 ",
                this.state.selectedSegmentFullData.destination,
                "(",
                this.state.selectedSegmentFullData.marketingCarrier,
                this.state.selectedSegmentFullData.marketingFlightNumber,
                ")",
                React.createElement("br", null),
                "\uD83D\uDCC5 Departure: ",
                this.state.selectedSegmentFullData.departureDate)),
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null, "Select Flight Segment"),
                React.createElement(SimpleDropdown_1.SimpleDropdown, { options: segments.map(function (seg) { return (__assign(__assign({}, seg), { checked: seg.value === selectedSegment })); }), onChange: this.handleSegmentChange })),
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null, "Select Cabin Class"),
                React.createElement(SimpleDropdown_1.SimpleDropdown, { options: this.cabinClasses.map(function (opt) { return (__assign(__assign({}, opt), { checked: opt.value === selectedCabinClass })); }), onChange: this.handleCabinClassChange })),
            selectedCabinClass && (React.createElement("div", { style: { marginTop: '10px', marginBottom: '10px', fontWeight: 'bold', color: '#0066cc' } },
                "\uD83C\uDF9F\uFE0F Selected Cabin: ",
                selectedCabinClass)),
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null, "Select Marketing Carrier"),
                React.createElement("select", { value: selectedMarketingCarrier, onChange: this.handleMarketingCarrierChange, className: "form-control" },
                    React.createElement("option", { value: "LH" }, "LH (Lufthansa)"),
                    React.createElement("option", { value: "EK" }, "EK (Emirates)"),
                    React.createElement("option", { value: "Other" }, "Other...")),
                selectedMarketingCarrier === 'Other' && (React.createElement("input", { type: "text", maxLength: 2, className: "form-control", placeholder: "e.g., AA, BA, AF", value: customMarketingCarrier, onChange: this.handleCustomMarketingCarrierChange }))),
            React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' } },
                React.createElement(react_bootstrap_1.Button, { className: "btn-info", disabled: isButtonDisabled, onClick: this.handleShowRawXml }, "\uD83D\uDCC4 Show Raw XML"),
                React.createElement("div", { style: { display: 'flex', gap: '10px' } },
                    React.createElement(react_bootstrap_1.Button, { className: "btn-primary", style: { flex: 1 }, disabled: isButtonDisabled, onClick: function () { return _this.loadSeatMap({ availabilityInfo: false }); } }, "\u2708\uFE0F Empty Seat Map"),
                    React.createElement(react_bootstrap_1.Button, { className: "btn-success", style: { flex: 1 }, disabled: isButtonDisabled, onClick: function () { return _this.loadSeatMap({ availabilityInfo: true }); } }, "\uD83D\uDC65 Occupied Seat Map")))));
    };
    return SeatMapsPopover;
}(React.Component));
exports.SeatMapsPopover = SeatMapsPopover;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopoverModalWrapper", ["react","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"], false, function (require, exports, module) {
"use strict";var __extends=this&&this.__extends||function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(t,o)};return function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function __(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(__.prototype=o.prototype,new __)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.SeatMapsPopoverModalWrapper=void 0;var React=require("react"),Context_1=require("../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapsPopover_1=require("./SeatMapsPopover"),SeatMapsPopoverModalWrapper=function(e){function SeatMapsPopoverModalWrapper(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleClose=function(){(0,Context_1.getService)(PublicModalService_1.PublicModalsService).closeReactModal()},t}return __extends(SeatMapsPopoverModalWrapper,e),SeatMapsPopoverModalWrapper.prototype.render=function(){return React.createElement("div",{style:{backgroundColor:"#fff",borderRadius:"8px",minWidth:"400px",minHeight:"350px",display:"flex",flexDirection:"column",overflow:"hidden"}},React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px",borderBottom:"1px solid #ddd",backgroundColor:"#f5f5f5",fontSize:"18px",fontWeight:"bold"}},React.createElement("span",null,"Select Passengers and Segment"),React.createElement("button",{style:{background:"none",border:"none",fontSize:"18px",cursor:"pointer"},onClick:this.handleClose},"✖")),React.createElement("div",{style:{flex:1,padding:"20px",overflowY:"auto"}},React.createElement(SeatMapsPopover_1.SeatMapsPopover,null)),React.createElement("div",{style:{padding:"10px 20px",borderTop:"1px solid #ddd",display:"flex",justifyContent:"flex-end",backgroundColor:"#f5f5f5"}},React.createElement("button",{className:"btn btn-default",onClick:this.handleClose},"Close")))},SeatMapsPopoverModalWrapper}(React.Component);exports.SeatMapsPopoverModalWrapper=SeatMapsPopoverModalWrapper;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopoverModalWrapper.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopoverModalWrapper"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopoverModalWrapper"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsXMLViewer", ["react"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SeatMapXmlViewer=void 0;var React=require("react"),SeatMapXmlViewer=function(e){var t=e.xml,a=e.onClose,r=function(e){var t="",a=0;return(e=e.replace(/(>)(<)(\/*)/g,"$1\r\n$2$3")).split("\r\n").forEach(function(e){var r=0;e.match(/.+<\/\w[^>]*>$/)?r=0:e.match(/^<\/\w/)?0!==a&&(a-=1):r=e.match(/^<\w([^>]*[^/])?>.*$/)?1:0,t+="  ".repeat(a)+e+"\r\n",a+=r}),t.trim()};return React.createElement("div",{style:{backgroundColor:"#fff",padding:"20px",borderRadius:"8px",width:"80%",maxHeight:"80vh",overflowY:"auto",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.15)"}},React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},React.createElement("h2",null,"🛫 EnhancedSeatMapRS XML"),React.createElement("button",{onClick:function(){var e=new Blob([r(t)],{type:"application/xml"}),a=URL.createObjectURL(e),o=document.createElement("a");o.href=a,o.download="EnhancedSeatMapRS.xml",document.body.appendChild(o),o.click(),document.body.removeChild(o)},style:{padding:"8px 16px",borderRadius:"4px",backgroundColor:"#007bff",color:"#fff",border:"none"}},"📥 Download XML")),React.createElement("pre",{style:{backgroundColor:"#f5f5f5",padding:"15px",borderRadius:"8px",fontSize:"0.85rem",overflowX:"auto",whiteSpace:"pre-wrap",wordBreak:"break-word",marginTop:"20px"}},r(t)),React.createElement("div",{style:{textAlign:"right",marginTop:"20px"}},React.createElement("button",{className:"btn btn-secondary",onClick:a},"Close")))};exports.SeatMapXmlViewer=SeatMapXmlViewer;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsXMLViewer.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapsXMLViewer"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapsXMLViewer"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/showSeatMapAvailModal", ["react","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentAvail","com-sabre-redapp-fundamentals-web-module/utils/quicketConfig"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSeatMapAvailModal = void 0;
var React = require("react");
var Context_1 = require("../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponentAvail_1 = require("./SeatMapComponentAvail");
var quicketConfig_1 = require("../utils/quicketConfig"); // config с настройками библиотеки для отображения карты салона
// data: PublicAirAvailabilityData 
function showSeatMapAvailModal(data) {
    var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService); // используем PublicModalsService
    // формируем options для передачи в модальное окно
    var options = {
        header: 'SeatMaps ABC 360 Viewer',
        // создаем React-компонент на основе SeatMapComponent
        component: React.createElement(SeatMapComponentAvail_1.default, {
            config: quicketConfig_1.quicketConfig,
            data: data // передаём data - объект типа PublicAirAvailabilityData целиком
        }),
        onHide: function () { return console.log('[SeatMap Modal] Closed'); }
    };
    modalService.showReactModal(options); // показываем модальное окно с его options
}
exports.showSeatMapAvailModal = showSeatMapAvailModal;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/showSeatMapAvailModal.js", ["com-sabre-redapp-fundamentals-web-module/components/showSeatMapAvailModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/showSeatMapAvailModal"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/showSeatMapPricingModal", ["react","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPricing","com-sabre-redapp-fundamentals-web-module/utils/quicketConfig"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSeatMapPricingModal = void 0;
var React = require("react");
var Context_1 = require("../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponentPricing_1 = require("./SeatMapComponentPricing");
var quicketConfig_1 = require("../utils/quicketConfig"); // config с настройками библиотеки для отображения карты салона
function showSeatMapPricingModal() {
    var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService);
    // 🟡 Получаем сохранённые сегменты из sessionStorage
    var raw = window.sessionStorage.getItem('flightSegmentsForPricing');
    var segments = [];
    try {
        segments = raw ? JSON.parse(raw) : [];
    }
    catch (e) {
        console.error('❌ Ошибка разбора данных flightSegmentsForPricing из sessionStorage:', e);
    }
    if (!segments.length) {
        alert('❗ Нет доступных сегментов рейса для отображения карты мест.');
        return;
    }
    var options = {
        header: 'SeatMap Viewer (Pricing)',
        component: React.createElement(SeatMapComponentPricing_1.default, {
            config: quicketConfig_1.quicketConfig,
            flightSegments: segments,
            selectedSegmentIndex: 0 // можно начать с первого
        }),
        onHide: function () { return console.log('[SeatMap Modal] Closed'); }
    };
    modalService.showReactModal(options);
}
exports.showSeatMapPricingModal = showSeatMapPricingModal;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/showSeatMapPricingModal.js", ["com-sabre-redapp-fundamentals-web-module/components/showSeatMapPricingModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/showSeatMapPricingModal"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/showSeatMapShoppingModal", ["react","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentAvail","com-sabre-redapp-fundamentals-web-module/utils/quicketConfig"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSeatMapShoppingModal = void 0;
var React = require("react");
var Context_1 = require("../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponentAvail_1 = require("./SeatMapComponentAvail");
var quicketConfig_1 = require("../utils/quicketConfig"); // config с настройками библиотеки для отображения карты салона
function showSeatMapShoppingModal(data) {
    var modalService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService); // используем PublicModalsService
    if (!modalService || typeof modalService.showReactModal !== 'function') {
        console.error('❌ [showSeatMapShoppingModal] PublicModalsService not available or not configured properly.');
        return;
    }
    // 📌 Закрыть все предыдущие модальные окна перед открытием нового
    try {
        modalService.closeReactModal();
        console.log('📌 [showSeatMapShoppingModal] All previous modals closed.');
    }
    catch (error) {
        console.error('❌ [showSeatMapShoppingModal] Error hiding modals:', error);
    }
    // формируем options для передачи в модальное окно
    var options = {
        header: 'SeatMaps ABC 360 Viewer',
        // создаем React-компонент на основе SeatMapComponent
        component: React.createElement(SeatMapComponentAvail_1.default, {
            config: quicketConfig_1.quicketConfig,
            data: data
        }),
        onHide: function () { return console.log('[SeatMap Shopping Modal] Closed'); }
    };
    console.log('📌 [showSeatMapShoppingModal] Modal data:', data);
    // Проверка на доступность метода `showReactModal`
    try {
        modalService.showReactModal(options); // показываем модальное окно с его options
    }
    catch (error) {
        console.error('❌ [showSeatMapShoppingModal] Error showing modal:', error);
    }
}
exports.showSeatMapShoppingModal = showSeatMapShoppingModal;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/showSeatMapShoppingModal.js", ["com-sabre-redapp-fundamentals-web-module/components/showSeatMapShoppingModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/showSeatMapShoppingModal"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/PricingTile", ["react","com-sabre-redapp-fundamentals-web-module/components/showSeatMapPricingModal"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingTile = void 0;
var React = require("react");
var showSeatMapPricingModal_1 = require("../showSeatMapPricingModal");
var PricingTile = function (data) {
    var handleClick = function () {
        console.log('🔘 Клик по кнопке SeatMaps ABC 360 в PricingTile');
        (0, showSeatMapPricingModal_1.showSeatMapPricingModal)(); // Вызов модального окна
    };
    // 📦 Формируем подпись с сегментами (origin-destination:airline flightNo ...)
    var segmentLabel = '';
    try {
        var raw = window.sessionStorage.getItem('flightSegmentsForPricing');
        var segments = raw ? JSON.parse(raw) : [];
        segmentLabel = segments.map(function (segment) {
            return segment.origin + "-" + segment.destination + ":" + segment.marketingAirline + " " + segment.flightNumber;
        }).join(' ');
    }
    catch (e) {
        console.error('⚠️ Ошибка при извлечении flightSegmentsForPricing в PricingTile:', e);
        segmentLabel = 'ABC Seat Map';
    }
    return (React.createElement("div", { className: "sdk-pricing-custom-tile-content", style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px'
        } },
        React.createElement("div", { style: { fontSize: '12px', marginBottom: '8px', textAlign: 'center' } }, segmentLabel),
        React.createElement("button", { className: "abc-seatmap-button", onClick: handleClick, style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 12px',
                backgroundColor: '#2f73bc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
            } }, "SeatMaps ABC 360")));
};
exports.PricingTile = PricingTile;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/PricingTile.js", ["com-sabre-redapp-fundamentals-web-module/components/widgets/PricingTile"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/widgets/PricingTile"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/PricingView", ["react","react","com-sabre-redapp-fundamentals-web-module/components/showSeatMapPricingModal"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingView = void 0;
var React = require("react");
var react_1 = require("react");
var showSeatMapPricingModal_1 = require("../showSeatMapPricingModal");
var PricingView = function (data) {
    (0, react_1.useEffect)(function () {
        console.log('🚀 PricingView data:', data); // Лог для отладки
        (0, showSeatMapPricingModal_1.showSeatMapPricingModal)(); // Вызов функции показа модального окна c данными (data)
    }, []);
    return (React.createElement("div", { className: 'sdk-pricing-custom-tile-content' },
        React.createElement("p", null, "\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u043C SeatMap Viewer...")));
};
exports.PricingView = PricingView;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/PricingView.js", ["com-sabre-redapp-fundamentals-web-module/components/widgets/PricingView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/widgets/PricingView"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapAvailTile", ["react"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapAvailTile = void 0;
var React = require("react");
var SeatMapAvailTile = function (data) {
    return (React.createElement("div", { className: 'sdk-seatmap-custom-tile-content', style: { padding: '10px' } },
        React.createElement("ol", null, data.flightSegments.map(function (segment, index) { return (React.createElement("li", { key: index },
            "Flight ",
            segment.MarketingAirline.FlightNumber)); })),
        React.createElement("button", { className: "abc-seatmap-button", style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 10px',
                backgroundColor: '#2f73bc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                height: '24px',
                marginBottom: '10px',
                marginLeft: '25px'
            } }, "SeatMaps ABC 360")));
};
exports.SeatMapAvailTile = SeatMapAvailTile;
// ========================================= 
// import * as React from 'react';
// import { PublicAirAvailabilityData } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityData';
// import { getService } from '../../../Context';
// import {ISeatMapService} from 'sabre-ngv-seatmap/services/ISeatMapService';
// export const SeatMapAvailTile = (data: PublicAirAvailabilityData): React.ReactElement => {
//     const handleOpenSeatMap = async (flightSegmentNumber: number) => {
//         console.log(`🛫 Opening Seat Map for segment: ${flightSegmentNumber}`);
//         try {
//             const response = await getService(ISeatMapService).openSeatMapForFlightSegment(flightSegmentNumber);
//             if (!response.modalOpenedCorrectly) {
//                 console.error(`⚠️ Error opening Seat Map: ${response.errorMessage}`);
//             }
//         } catch (error) {
//             console.error(`❌ Failed to open Seat Map:`, error);
//         }
//     };
//     return (
//         <div className={'sdk-seatmap-custom-tile-content'}>
//             <strong>ABC Seat Map</strong>
//             <ol>
//                 {data.flightSegments.map((segment, index) => (
//                     <li key={index}>
//                         Flight {segment.MarketingAirline.FlightNumber}
//                         <button onClick={() => handleOpenSeatMap(index + 1)}>🪑 Open Seat Map</button>
//                     </li>
//                 ))}
//             </ol>
//         </div>
//     );
// };


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapAvailTile.js", ["com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapAvailTile"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapAvailTile"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapAvailView", ["react","react","com-sabre-redapp-fundamentals-web-module/components/showSeatMapAvailModal"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapAvailView = void 0;
var React = require("react");
var react_1 = require("react");
var showSeatMapAvailModal_1 = require("../showSeatMapAvailModal");
var SeatMapAvailView = function (data) {
    (0, react_1.useEffect)(function () {
        console.log('🚀 SeatMapAvailView data:', data); // лог в онсоль
        (0, showSeatMapAvailModal_1.showSeatMapAvailModal)(data); // вызываем функцию показа модального окна c данными (data)
    }, []);
    return (React.createElement("div", { className: 'sdk-seatmap-custom-tile-content' },
        React.createElement("p", null, "\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u043C SeatMap Viewer...")));
};
exports.SeatMapAvailView = SeatMapAvailView;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapAvailView.js", ["com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapAvailView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapAvailView"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapShoppingTile", ["sabre-ngv-app/app/widgets/drawer/views/elements/Tile","sabre-ngv-app/app/common/mixins/WithoutFocusOnClick","sabre-ngv-core/decorators/classes/Initial","sabre-ngv-core/decorators/classes/Mixin","sabre-ngv-core/decorators/classes/view/CssClass","com-sabre-redapp-fundamentals-web-module/components/extractSegmentData"], false, function (require, exports, module) {
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapShoppingTile = void 0;
var Tile_1 = require("sabre-ngv-app/app/widgets/drawer/views/elements/Tile");
var WithoutFocusOnClick_1 = require("sabre-ngv-app/app/common/mixins/WithoutFocusOnClick");
var Initial_1 = require("sabre-ngv-core/decorators/classes/Initial");
var Mixin_1 = require("sabre-ngv-core/decorators/classes/Mixin");
var CssClass_1 = require("sabre-ngv-core/decorators/classes/view/CssClass");
var extractSegmentData_1 = require("../extractSegmentData");
var SeatMapShoppingTile = /** @class */ (function (_super) {
    __extends(SeatMapShoppingTile, _super);
    function SeatMapShoppingTile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentSegment = null;
        _this.sharedModel = null;
        return _this;
    }
    SeatMapShoppingTile.prototype.selfDrawerContextModelPropagated = function (cpa) {
        var _this = this;
        var _a, _b, _c;
        try {
            this.currentSegment = cpa;
            var segment = cpa;
            var sharedSegmentData = (0, extractSegmentData_1.extractSegmentData)(segment);
            // Сохраняем или повторно используем sharedModel
            if ((_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.sharedContextModel) === null || _b === void 0 ? void 0 : _b.set) {
                this.sharedModel = this.context.sharedContextModel;
                this.sharedModel.set('selectedSegmentForPricing', sharedSegmentData);
                console.log('✅ Сохранили сегмент в SharedContextModel:', sharedSegmentData);
            }
            else if ((_c = this.sharedModel) === null || _c === void 0 ? void 0 : _c.set) {
                this.sharedModel.set('selectedSegmentForPricing', sharedSegmentData);
                console.log('♻️ Повторно сохранили сегмент в SharedContextModel:', sharedSegmentData);
            }
            else {
                console.warn('⚠️ SharedContextModel недоступен — сегмент не сохранён.');
            }
            var segments = cpa.getShoppingItinerary().getFlightSegments();
            var label = segments.map(function (segment) {
                var origin = segment.getOriginIata();
                var destination = segment.getDestinationIata();
                var carrier = segment.getMarketingAirline();
                var flightNumber = segment.getFlightNumber();
                return origin + "-" + destination + ":" + carrier + " " + flightNumber;
            }).join(' ');
            var tileHtml = "\n                <div style=\"display: flex; flex-direction: column; align-items: center; font-size: 12px;\">\n                    <div style=\"margin-bottom: 8px;\">" + label + "</div>\n                    <button class=\"abc-seatmap-button\" style=\"\n                        padding: 0px 12px 12px 12px;\n                        background-color: #2f73bc;\n                        color: white;\n                        border: none;\n                        border-radius: 4px;\n                        cursor: pointer;\n                        font-size: 12px;\">\n                        SeatMaps ABC 360\n                    </button>\n                </div>\n            ";
            this.setDataContent(tileHtml);
            // Обработчик клика
            this.$el.off('click', '.abc-seatmap-button');
            this.$el.on('click', '.abc-seatmap-button', function () {
                console.log('🔁 Клик по кнопке — повторно инициируем View');
                _this.trigger('selfDrawerContextModelPropagated', _this.model); // ✅ нативно
            });
        }
        catch (error) {
            console.error('❌ Ошибка в selfDrawerContextModelPropagated:', error);
        }
    };
    SeatMapShoppingTile.prototype.selfSelectedFareChanged = function (cpa) {
        this.selfDrawerContextModelPropagated(cpa);
    };
    SeatMapShoppingTile = __decorate([
        (0, CssClass_1.CssClass)('com-sabre-redapp-example3-web-tilewidgets-web-module', { overwrite: false }),
        (0, Initial_1.Initial)({
            caption: 'SeatMaps ABC 360',
            className: 'web-air-shopping-widget-sample'
        }),
        (0, Mixin_1.Mixin)(WithoutFocusOnClick_1.WithoutFocusOnClick)
    ], SeatMapShoppingTile);
    return SeatMapShoppingTile;
}(Tile_1.Tile));
exports.SeatMapShoppingTile = SeatMapShoppingTile;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapShoppingTile.js", ["com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapShoppingTile"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapShoppingTile"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapShoppingView", ["react","react-dom","sabre-ngv-app/app/AbstractView","com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentShopping","com-sabre-redapp-fundamentals-web-module/utils/quicketConfig","sabre-ngv-core/decorators/classes/view/CssClass","sabre-ngv-core/decorators/classes/view/Template"], false, function (require, exports, module) {
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapShoppingView = void 0;
var React = require("react");
var ReactDOM = require("react-dom");
var AbstractView_1 = require("sabre-ngv-app/app/AbstractView");
var SeatMapComponentShopping_1 = require("../SeatMapComponentShopping");
var quicketConfig_1 = require("../../utils/quicketConfig");
var CssClass_1 = require("sabre-ngv-core/decorators/classes/view/CssClass");
var Template_1 = require("sabre-ngv-core/decorators/classes/view/Template");
var SeatMapShoppingView = /** @class */ (function (_super) {
    __extends(SeatMapShoppingView, _super);
    function SeatMapShoppingView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentSegment = null;
        _this.flightSegments = [];
        _this.selectedSegmentIndex = 0;
        return _this;
    }
    SeatMapShoppingView.prototype.selfDrawerContextModelPropagated = function (cpa) {
        console.log('📌 [SeatMapShoppingView] selfDrawerContextModelPropagated called with cpa:', cpa);
        this.currentSegment = cpa;
        this.updateFlightSegmentsFromSegment(cpa);
        this.tryRenderReactComponent();
    };
    SeatMapShoppingView.prototype.updateFlightSegmentsFromSegment = function (segment) {
        var segments = segment.getShoppingItinerary().getFlightSegments();
        var aircraftTypes = {
            '359': 'Airbus A350-900',
            '388': 'Airbus A380-800',
            '77W': 'Boeing 777-300ER',
            '320': 'Airbus A320',
            '321': 'Airbus A321',
            '738': 'Boeing 737-800',
            '787': 'Boeing 787 Dreamliner'
        };
        this.flightSegments = segments.map(function (s) {
            var _a;
            var departureDateTime = s.getDepartureDate();
            var equipmentCode = ((_a = s.getEquipmentCode) === null || _a === void 0 ? void 0 : _a.call(s)) || 'UNKNOWN';
            var equipmentDescription = aircraftTypes[equipmentCode] || 'Not Available';
            return {
                id: s.getSegmentId(),
                segmentId: s.getSegmentId(),
                flightNumber: s.getFlightNumber(),
                origin: s.getOriginIata(),
                destination: s.getDestinationIata(),
                airMiles: s.getAirMiles(),
                departureDateTime: departureDateTime ? departureDateTime.toISOString().split('T')[0] : 'UNKNOWN',
                marketingAirline: s.getMarketingAirline(),
                cabinClass: 'A',
                aircraft: {
                    code: equipmentCode,
                    description: equipmentDescription
                }
            };
        });
    };
    SeatMapShoppingView.prototype.tryRenderReactComponent = function (attempts) {
        var _this = this;
        if (attempts === void 0) { attempts = 0; }
        var MAX_ATTEMPTS = 10;
        var INTERVAL = 500;
        var rootElement = document.getElementById('seatmap-root');
        if (rootElement) {
            console.log('✅ [SeatMapShoppingView] Элемент seatmap-root найден. Начинаем рендеринг React компонента.');
            this.renderReactComponent();
        }
        else if (attempts < MAX_ATTEMPTS) {
            console.warn("\u26A0\uFE0F [SeatMapShoppingView] \u042D\u043B\u0435\u043C\u0435\u043D\u0442 seatmap-root \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 \u0447\u0435\u0440\u0435\u0437 " + INTERVAL + " \u043C\u0441. \u041F\u043E\u043F\u044B\u0442\u043A\u0430 " + (attempts + 1) + "/" + MAX_ATTEMPTS);
            setTimeout(function () { return _this.tryRenderReactComponent(attempts + 1); }, INTERVAL);
        }
        else {
            console.error('❌ [SeatMapShoppingView] Не удалось найти элемент seatmap-root после максимального числа попыток.');
        }
    };
    SeatMapShoppingView.prototype.renderReactComponent = function () {
        var _a;
        if (!this.currentSegment) {
            console.warn('⚠️ Нет сохранённого сегмента. React компонент не будет отрендерен.');
            return;
        }
        if (!((_a = this.flightSegments) === null || _a === void 0 ? void 0 : _a.length)) {
            console.warn('⚠️ flightSegments пуст. Переинициализация из текущего сегмента.');
            this.updateFlightSegmentsFromSegment(this.currentSegment);
        }
        var rootElement = document.getElementById('seatmap-root');
        if (rootElement) {
            ReactDOM.unmountComponentAtNode(rootElement);
            rootElement.innerHTML = '';
        }
        else {
            rootElement = document.createElement('div');
            rootElement.id = 'seatmap-root';
            document.body.appendChild(rootElement);
        }
        var data = {
            flightSegments: this.flightSegments,
            selectedSegmentIndex: this.selectedSegmentIndex
        };
        // 💾 Сохраняем flightSegments в sessionStorage для использования в Pricing
        try {
            window.sessionStorage.setItem('flightSegmentsForPricing', JSON.stringify(this.flightSegments));
            console.log('💾 [SeatMapShoppingView] Сегменты маршрута сохранены в sessionStorage:', this.flightSegments);
        }
        catch (error) {
            console.error('❌ Ошибка при сохранении данных в sessionStorage:', error);
        }
        ReactDOM.render(React.createElement(SeatMapComponentShopping_1.default, { config: quicketConfig_1.quicketConfig, data: data }), rootElement);
        console.log('📌 [SeatMapShoppingView] React Component успешно отрендерен в #seatmap-root.');
    };
    SeatMapShoppingView = __decorate([
        (0, CssClass_1.CssClass)('com-sabre-redapp-example3-web-customworkflow-web-module'),
        (0, Template_1.Template)('com-sabre-redapp-example3-web-customworkflow-web-module:ShoppingTileView')
    ], SeatMapShoppingView);
    return SeatMapShoppingView;
}(AbstractView_1.AbstractView));
exports.SeatMapShoppingView = SeatMapShoppingView;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapShoppingView.js", ["com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapShoppingView"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapShoppingView"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/XmlViewer", ["react"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.XmlViewer=void 0;var React=require("react"),formatXml=function(e){var t="",r=0;return(e=e.replace(/(>)(<)(\/*)/g,"$1\r\n$2$3")).split("\r\n").forEach(function(e){var a=0;e.match(/.+<\/\w[^>]*>$/)?a=0:e.match(/^<\/\w/)?0!==r&&(r-=1):a=e.match(/^<\w([^>]*[^/])?>.*$/)?1:0;var n="  ".repeat(r);t+=n+e+"\r\n",r+=a}),t.trim()},XmlViewer=function(e){var t=e.xml,r=formatXml(t);return React.createElement("div",{style:{padding:"20px",backgroundColor:"#fff",maxHeight:"80vh",overflowY:"auto"}},React.createElement("h3",null,"🛫 EnhancedSeatMapRS"),React.createElement("div",{style:{textAlign:"right",marginBottom:"10px"}},React.createElement("button",{onClick:function(){var e=new Blob([r],{type:"application/xml"}),t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download="EnhancedSeatMapRS.xml",a.click(),URL.revokeObjectURL(t)},className:"btn btn-primary"},"📥 Download XML")),React.createElement("pre",{style:{whiteSpace:"pre-wrap",wordBreak:"break-word",backgroundColor:"#f5f5f5",padding:"15px",borderRadius:"8px",fontSize:"0.85rem",overflowX:"auto"}},r))};exports.XmlViewer=XmlViewer;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/XmlViewer.js", ["com-sabre-redapp-fundamentals-web-module/components/XmlViewer"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/XmlViewer"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/Context", ["sabre-ngv-core/modules/ModuleContext","sabre-ngv-app/app/services/impl/I18nService"], false, function (require, exports, module) {
"use strict";
/*************************************/
/* Auto-generated file.              */
/* Do not modify it.                 */
/* You may remove it.                */
/* You may commit it.                */
/* You may push it.                  */
/* Remove it if module name changed. */
/* eslint:disable                    */
/*************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.getService = exports.registerService = exports.cf = exports.context = void 0;
var ModuleContext_1 = require("sabre-ngv-core/modules/ModuleContext");
var I18nService_1 = require("sabre-ngv-app/app/services/impl/I18nService");
/** @internal **/
exports.context = new ModuleContext_1.ModuleContext("com-sabre-redapp-fundamentals-web-module");
/** @internal **/
exports.cf = exports.context.cf.bind(exports.context);
/** @internal **/
exports.registerService = exports.context.registerService.bind(exports.context);
/** @internal **/
exports.getService = exports.context.getService.bind(exports.context);
/** @internal **/
exports.t = (0, exports.getService)(I18nService_1.I18nService).getScopedTranslator('com-sabre-redapp-fundamentals-web-module/translations');


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/Context.js", ["com-sabre-redapp-fundamentals-web-module/Context"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/Context"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/CreatePNR", ["react","react-bootstrap","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-core/services/LayerService","sabre-ngv-communication/interfaces/ISoapApiService","sabre-ngv-app/app/services/impl/PnrPublicService"], false, function (require, exports, module) {
"use strict";var __extends=this&&this.__extends||function(){var e=function(t,a){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])})(t,a)};return function(t,a){if("function"!=typeof a&&null!==a)throw new TypeError("Class extends value "+String(a)+" is not a constructor or null");function __(){this.constructor=t}e(t,a),t.prototype=null===a?Object.create(a):(__.prototype=a.prototype,new __)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.CreatePNR=void 0;var React=require("react"),react_bootstrap_1=require("react-bootstrap"),Context_1=require("./Context"),LayerService_1=require("sabre-ngv-core/services/LayerService"),ISoapApiService_1=require("sabre-ngv-communication/interfaces/ISoapApiService"),PnrPublicService_1=require("sabre-ngv-app/app/services/impl/PnrPublicService"),CreatePNR=function(e){function CreatePNR(t){var a=e.call(this,t)||this;return a.handleChange=a.handleChange.bind(a),a.executeService=a.executeService.bind(a),a.closeAndRefresh=a.closeAndRefresh.bind(a),a.goBack=a.goBack.bind(a),a.goNext=a.goNext.bind(a),a.state={stage:1,traveler:{name:"",surname:"",typeCode:"ADT"},validation:{txtName:{isValid:!1,status:null,helpMsg:null},txtSurname:{isValid:!1,status:null,helpMsg:null},txtEmail:{isValid:!1,status:null,helpMsg:null}}},a}return __extends(CreatePNR,e),CreatePNR.prototype.handleChange=function(e){var t=e.target.id,a=e.target.value,r=this.state.validation,o=this.state.traveler,l=this.state.travelType;if(console.log("handleChange",t,a),"txtName"===t||"txtSurname"===t){var n=r[t],c=a.length;"txtName"===t&&(o.name=a),"txtSurname"===t&&(o.surname=a),c<=0?(n.isValid=!1,n.status="error",n.helpMsg="required field"):c<=1?(n.isValid=!1,n.status="warning",n.helpMsg="must be more than one character long"):c>1&&(n.isValid=!0,n.status="success",n.helpMsg=null)}"selAgeCode"===t&&(o.typeCode=a),"selTravelType"===t&&(l=a),this.setState({traveler:o,travelType:l,validation:r})},CreatePNR.prototype.goNext=function(e){var t=this.state.stage;this.setState({stage:t+1})},CreatePNR.prototype.goBack=function(e){this.setState({stage:1})},CreatePNR.prototype.executeService=function(){var e=this,t=(0,Context_1.getService)(ISoapApiService_1.ISoapApiService),a='\n        <UpdateReservationRQ Version="1.19.8" xmlns="http://webservices.sabre.com/pnrbuilder/v1_19">\n        <RequestType commitTransaction="false" initialIgnore="true">Stateful</RequestType>\n        <ReturnOptions IncludeUpdateDetails="true" RetrievePNR="false"/>\n            <ReservationUpdateList>\n                <ReservationUpdateItem>\n                    <PassengerNameUpdate op="C">\n                        <TravelerName type="'+this.state.traveler.typeCode+'">\n                            <Given>'+this.state.traveler.name+"</Given>\n                            <Surname>"+this.state.traveler.surname+'</Surname>\n                        </TravelerName>\n                    </PassengerNameUpdate>\n                </ReservationUpdateItem>\n                <ReservationUpdateItem>\n                    <RemarkUpdate op="C">\n                        <RemarkText>THIS IS '+this.state.travelType+" TRAVEL TYPE REMARK</RemarkText>\n                    </RemarkUpdate>\n                </ReservationUpdateItem>\n            </ReservationUpdateList>\n        </UpdateReservationRQ>\n        ";t.callSws({action:"UpdateReservationRQ",payload:a,authTokenType:"SESSION"}).then(function(t){console.log("Soap API call result",JSON.stringify(t)),t.errorCode||t.value&&t.value.indexOf("<stl19:Error")>=0?e.setState({stage:4}):e.setState({stage:3})}).catch(function(t){console.log("Soap API call error",t),e.setState({stage:4})})},CreatePNR.prototype.handleModalClose=function(){(0,Context_1.getService)(LayerService_1.LayerService).clearLayer(42)},CreatePNR.prototype.closeAndRefresh=function(){(0,Context_1.getService)(PnrPublicService_1.PnrPublicService).refreshData(),this.handleModalClose()},CreatePNR.prototype.render=function(){var e=this;switch(this.state.stage){case 1:var t=this.state.validation.txtName,a=this.state.validation.txtSurname;return React.createElement(react_bootstrap_1.Modal.Dialog,{className:"react-modal"},React.createElement(react_bootstrap_1.Modal.Header,{closeButton:!0,onHide:function(){e.handleModalClose()}},React.createElement(react_bootstrap_1.Modal.Title,null,"Data Entry Form (1 of 2)")),React.createElement(react_bootstrap_1.Modal.Body,null,React.createElement(react_bootstrap_1.Form,{autoComplete:"off"},React.createElement(react_bootstrap_1.Panel,null,React.createElement(react_bootstrap_1.Panel.Heading,null,React.createElement(react_bootstrap_1.Panel.Title,null,"About Traveler")),React.createElement(react_bootstrap_1.Panel.Body,null,React.createElement(react_bootstrap_1.FormGroup,{controlId:"txtName",validationState:t.status},React.createElement(react_bootstrap_1.ControlLabel,null,"Name"),React.createElement(react_bootstrap_1.FormControl,{type:"text",placeholder:"Enter traveler Name",value:this.state.traveler.name,onChange:this.handleChange}),t.helpMsg&&React.createElement(react_bootstrap_1.FormControl.Feedback,null),t.helpMsg&&React.createElement(react_bootstrap_1.HelpBlock,null,t.helpMsg)),React.createElement(react_bootstrap_1.FormGroup,{controlId:"txtSurname",validationState:a.status},React.createElement(react_bootstrap_1.ControlLabel,null,"Surname"),React.createElement(react_bootstrap_1.FormControl,{type:"text",placeholder:"Enter traveler Surame",value:this.state.traveler.surname,onChange:this.handleChange}),a.isValid&&React.createElement(react_bootstrap_1.FormControl.Feedback,null),a.isValid&&a.helpMsg&&React.createElement(react_bootstrap_1.HelpBlock,null,t.helpMsg)),React.createElement(react_bootstrap_1.FormGroup,{controlId:"selAgeCode"},React.createElement(react_bootstrap_1.ControlLabel,null,"Passenger Type (Code)"),React.createElement(react_bootstrap_1.FormControl,{componentClass:"select",placeholder:"select",value:this.state.traveler.typeCode,onChange:this.handleChange},React.createElement("option",{value:"select"},"select"),React.createElement("option",{value:"ADT"},"Adult"),React.createElement("option",{value:"CNN"},"Child"),React.createElement("option",{value:"INF"},"Infant"))))))),React.createElement(react_bootstrap_1.Modal.Footer,null,React.createElement(react_bootstrap_1.Button,{onClick:this.handleModalClose,className:"btn btn-secondary"},"Cancel"),React.createElement(react_bootstrap_1.Button,{className:"btn btn-primary",onClick:this.goNext},"Next")));case 2:return React.createElement(react_bootstrap_1.Modal.Dialog,{className:"react-modal"},React.createElement(react_bootstrap_1.Modal.Header,{closeButton:!0,onHide:function(){e.handleModalClose()}},React.createElement(react_bootstrap_1.Modal.Title,null,"Data Entry Form (2 of 2)")),React.createElement(react_bootstrap_1.Modal.Body,null,React.createElement(react_bootstrap_1.Form,null,React.createElement(react_bootstrap_1.Panel,null,React.createElement(react_bootstrap_1.Panel.Heading,null,React.createElement(react_bootstrap_1.Panel.Title,null,"About Travel")),React.createElement(react_bootstrap_1.Panel.Body,null,React.createElement(react_bootstrap_1.FormGroup,{controlId:"selTravelType"},React.createElement(react_bootstrap_1.ControlLabel,null,"Travel Type"),React.createElement(react_bootstrap_1.FormControl,{componentClass:"select",placeholder:"select",onChange:this.handleChange,value:this.state.travelType},React.createElement("option",{value:"select"},"select"),React.createElement("option",{value:"business"},"business"),React.createElement("option",{value:"leisure"},"leisure"))),"business"===this.state.travelType&&React.createElement(react_bootstrap_1.FormGroup,null,React.createElement(react_bootstrap_1.ControlLabel,null,"Add Corporate ID ?"),React.createElement(react_bootstrap_1.InputGroup,null,React.createElement(react_bootstrap_1.InputGroup.Addon,null,React.createElement("input",{type:"checkbox","aria-label":"..."})),React.createElement(react_bootstrap_1.FormControl,{type:"text"}))),"leisure"===this.state.travelType&&React.createElement(react_bootstrap_1.FormGroup,null,React.createElement(react_bootstrap_1.ControlLabel,null,"Add Special Service Request ?"),React.createElement(react_bootstrap_1.InputGroup,null,React.createElement(react_bootstrap_1.InputGroup.Addon,null,React.createElement("input",{type:"checkbox","aria-label":"..."})),React.createElement(react_bootstrap_1.FormControl,{type:"text"}))))))),React.createElement(react_bootstrap_1.Modal.Footer,null,React.createElement(react_bootstrap_1.Button,{onClick:this.handleModalClose,className:"btn btn-secondary"},"Cancel"),React.createElement(react_bootstrap_1.Button,{className:"btn btn-primary",onClick:this.goBack},"Back"),React.createElement(react_bootstrap_1.Button,{className:"btn btn-primary btn-success",onClick:this.executeService},"Create PNR")));case 3:return React.createElement(react_bootstrap_1.Alert,{bsStyle:"success",onDismiss:this.closeAndRefresh},React.createElement("h4",null,"Success"),React.createElement("hr",null),React.createElement("p",null,"Operation completed sucessfully, data was written to the PNR, session status will be refreshed..."),React.createElement("hr",null),React.createElement("p",null,React.createElement(react_bootstrap_1.Button,{bsStyle:"success",onClick:this.closeAndRefresh},"Close")));case 4:return React.createElement(react_bootstrap_1.Alert,{bsStyle:"danger",onDismiss:this.handleModalClose},React.createElement("h4",null,"Error"),React.createElement("hr",null),React.createElement("p",null,"The operation could not be completed, validate records and try again..."),React.createElement("hr",null),React.createElement("p",null,React.createElement(react_bootstrap_1.Button,{bsStyle:"danger",onClick:this.goBack},"Retry"),React.createElement(react_bootstrap_1.Button,{onClick:this.handleModalClose},"Cancel")))}},CreatePNR}(React.Component);exports.CreatePNR=CreatePNR;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/CreatePNR.js", ["com-sabre-redapp-fundamentals-web-module/CreatePNR"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/CreatePNR"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/index", ["com-sabre-redapp-fundamentals-web-module/Main","com-sabre-redapp-fundamentals-web-module/Context"], false, function (require, exports, module) {
"use strict";
/*************************************/
/* Auto-generated file.              */
/* Do not modify it.                 */
/* You may remove it.                */
/* You may commit it.                */
/* You may push it.                  */
/* Remove it if module name changed. */
/* eslint:disable                    */
/*************************************/
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
var Main_1 = require("./Main");
var Context_1 = require("./Context");
/**
 *  Autogenerated class representing module in runtime.
 **/
var Module_com_sabre_redapp_fundamentals_web_module = /** @class */ (function (_super) {
    __extends(Module_com_sabre_redapp_fundamentals_web_module, _super);
    function Module_com_sabre_redapp_fundamentals_web_module(manifest) {
        var _this = _super.call(this, manifest) || this;
        Context_1.context.setModule(_this);
        return _this;
    }
    return Module_com_sabre_redapp_fundamentals_web_module;
}(Main_1.Main));
exports.default = Module_com_sabre_redapp_fundamentals_web_module;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/index.js", ["com-sabre-redapp-fundamentals-web-module/index"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/index"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/Main", ["react","sabre-ngv-core/modules/Module","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-xp/configs/RedAppSidePanelConfig","sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton","sabre-ngv-core/services/LayerService","sabre-ngv-airAvailability/services/PublicAirAvailabilityService","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/components/createPnr/CreatePNR","com-sabre-redapp-fundamentals-web-module/components/createPnr/createPnrForTwoPassengers","com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover","com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapAvailTile","com-sabre-redapp-fundamentals-web-module/components/widgets/SeatMapAvailView"], false, function (require, exports, module) {
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
exports.Main = void 0;
var React = require("react");
var Module_1 = require("sabre-ngv-core/modules/Module");
var Context_1 = require("./Context");
var ExtensionPointService_1 = require("sabre-ngv-xp/services/ExtensionPointService");
var RedAppSidePanelConfig_1 = require("sabre-ngv-xp/configs/RedAppSidePanelConfig");
var RedAppSidePanelButton_1 = require("sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton");
var LayerService_1 = require("sabre-ngv-core/services/LayerService");
var PublicAirAvailabilityService_1 = require("sabre-ngv-airAvailability/services/PublicAirAvailabilityService");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var CreatePNR_1 = require("./components/createPnr/CreatePNR");
var createPnrForTwoPassengers_1 = require("./components/createPnr/createPnrForTwoPassengers");
var SeatMapsPopover_1 = require("./components/SeatMapsPopover");
var SeatMapAvailTile_1 = require("./components/widgets/SeatMapAvailTile");
var SeatMapAvailView_1 = require("./components/widgets/SeatMapAvailView");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        // подключаем виджет для Availability
        this.registerSeatMapAvailTile();
        //
        var xp = (0, Context_1.getService)(ExtensionPointService_1.ExtensionPointService);
        var sidepanelMenu = new RedAppSidePanelConfig_1.RedAppSidePanelConfig([
            new RedAppSidePanelButton_1.RedAppSidePanelButton("Create PNR", "btn-secondary side-panel-button", function () { _this.showForm(); }, false),
            new RedAppSidePanelButton_1.RedAppSidePanelButton("SeatMaps ABC 360", "btn-secondary side-panel-button", function () { _this.openSeatMaps(); }, false),
            new RedAppSidePanelButton_1.RedAppSidePanelButton("Create PNR 2", "btn-secondary side-panel-button", function () { (0, createPnrForTwoPassengers_1.createPnrForTwoPassengers)(); }, false)
        ]);
        xp.addConfig("redAppSidePanel", sidepanelMenu);
    };
    Main.prototype.showForm = function () {
        var ls = (0, Context_1.getService)(LayerService_1.LayerService);
        ls.showOnLayer(CreatePNR_1.CreatePNR, { display: "areaView", position: 42 });
    };
    Main.prototype.openSeatMaps = function () {
        var publicModalsService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService);
        publicModalsService.showReactModal({
            header: 'Select Passengers and Segment',
            component: React.createElement(SeatMapsPopover_1.SeatMapsPopover),
            modalClassName: 'seatmap-modal-class'
        });
    };
    // AvailabilityTile
    Main.prototype.registerSeatMapAvailTile = function () {
        var airAvailabilityService = (0, Context_1.getService)(PublicAirAvailabilityService_1.PublicAirAvailabilityService); // внутренний сервис для предоставления данных в рамках Availability
        var showSeatMapAvailabilityModal = function (data) {
            console.log('📥 [Availability] Received Data:', JSON.stringify(data, null, 2));
            var modalOptions = {
                header: 'SeatMaps ABC 360',
                component: React.createElement(SeatMapAvailView_1.SeatMapAvailView, data),
                modalClassName: 'react-tile-modal-class'
            };
            (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal(modalOptions);
        };
        airAvailabilityService.createAirAvailabilitySearchTile(SeatMapAvailTile_1.SeatMapAvailTile, showSeatMapAvailabilityModal, 'SeatMaps ABC 360');
    };
    return Main;
}(Module_1.Module));
exports.Main = Main;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/Main.js", ["com-sabre-redapp-fundamentals-web-module/Main"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/Main"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph", ["sabre-ngv-custom-forms/services/ICustomFormsService","com-sabre-redapp-fundamentals-web-module/Context"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openCustomFormParagraph = void 0;
var ICustomFormsService_1 = require("sabre-ngv-custom-forms/services/ICustomFormsService");
var Context_1 = require("../Context");
var openCustomFormParagraph = function (title, msg) {
    var form = {
        title: title,
        fields: [
            {
                id: 'flight',
                type: 'PARAGRAPH',
                text: msg
            }
        ],
        actions: [
            {
                id: 'cancel',
                label: 'Close'
            }
        ]
    };
    (0, Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(form);
};
exports.openCustomFormParagraph = openCustomFormParagraph;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph.js", ["com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/parcePnrData", [], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePnrData = void 0;
var parsePnrData = function (xmlDoc) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var passengers = [];
    var segments = [];
    // --- Пассажиры ---
    var passengerNodes = xmlDoc.getElementsByTagName('stl19:Passenger');
    for (var i = 0; i < passengerNodes.length; i++) {
        var passenger = passengerNodes[i];
        var id = passenger.getAttribute('id') || '';
        var lastName = ((_a = passenger.getElementsByTagName('stl19:LastName')[0]) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        var firstName = ((_b = passenger.getElementsByTagName('stl19:FirstName')[0]) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        passengers.push({
            label: lastName + "/" + firstName,
            value: id,
            givenName: firstName,
            surname: lastName
        });
    }
    // --- Сегменты ---
    var airSegmentNodes = xmlDoc.getElementsByTagName('stl19:Air');
    for (var i = 0; i < airSegmentNodes.length; i++) {
        var segment = airSegmentNodes[i];
        var id = segment.getAttribute('id') || '';
        var origin_1 = ((_c = segment.getElementsByTagName('stl19:DepartureAirport')[0]) === null || _c === void 0 ? void 0 : _c.textContent) || '';
        var destination = ((_d = segment.getElementsByTagName('stl19:ArrivalAirport')[0]) === null || _d === void 0 ? void 0 : _d.textContent) || '';
        var departureDateTime = ((_e = segment.getElementsByTagName('stl19:DepartureDateTime')[0]) === null || _e === void 0 ? void 0 : _e.textContent) || '';
        var marketingCarrierNode = segment.getElementsByTagName('stl19:MarketingAirline')[0];
        var operatingCarrierNode = segment.getElementsByTagName('stl19:OperatingAirline')[0];
        var marketingCarrier = ((_f = marketingCarrierNode === null || marketingCarrierNode === void 0 ? void 0 : marketingCarrierNode.textContent) === null || _f === void 0 ? void 0 : _f.trim())
            || ((_g = operatingCarrierNode === null || operatingCarrierNode === void 0 ? void 0 : operatingCarrierNode.textContent) === null || _g === void 0 ? void 0 : _g.trim())
            || 'UNKNOWN';
        var marketingFlightNumber = ((_h = segment.getElementsByTagName('stl19:MarketingFlightNumber')[0]) === null || _h === void 0 ? void 0 : _h.textContent) || '';
        var bookingClass = ((_j = segment.getElementsByTagName('stl19:ResBookDesigCode')[0]) === null || _j === void 0 ? void 0 : _j.textContent) || '';
        var equipment = ((_k = segment.getElementsByTagName('stl19:Equipment')[0]) === null || _k === void 0 ? void 0 : _k.textContent) || '';
        // Извлекаем только дату из DepartureDateTime
        var departureDate = '';
        if (departureDateTime.includes('T')) {
            departureDate = departureDateTime.split('T')[0];
        }
        segments.push({
            label: origin_1 + " \u2192 " + destination + " (" + marketingCarrier + marketingFlightNumber + ")",
            value: id,
            origin: origin_1,
            destination: destination,
            departureDate: departureDate,
            marketingCarrier: marketingCarrier,
            marketingFlightNumber: marketingFlightNumber,
            bookingClass: bookingClass,
            equipment: equipment
        });
    }
    return { passengers: passengers, segments: segments };
};
exports.parsePnrData = parsePnrData;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/parcePnrData.js", ["com-sabre-redapp-fundamentals-web-module/utils/parcePnrData"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/utils/parcePnrData"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/quicketConfig", [], false, function (require, exports, module) {
"use strict";
// config для библиотеки quicket.io
Object.defineProperty(exports, "__esModule", { value: true });
exports.quicketConfig = void 0;
exports.quicketConfig = {
    width: 400,
    lang: 'EN',
    horizontal: false,
    rightToLeft: false,
    visibleFuselage: true,
    visibleWings: true,
    builtInDeckSelector: true,
    singleDeckMode: true,
    builtInTooltip: true,
    externalPassengerManagement: false,
    tooltipOnHover: false,
    colorTheme: {
        seatLabelColor: 'white',
        seatStrokeColor: 'gray'
    }
};


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/quicketConfig.js", ["com-sabre-redapp-fundamentals-web-module/utils/quicketConfig"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/utils/quicketConfig"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/XmlViewer", ["react"], false, function (require, exports, module) {
"use strict";
// файл: XmlViewer.tsx
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlViewer = void 0;
var React = require("react");
var formatXml = function (xml) {
    var PADDING = '  ';
    var reg = /(>)(<)(\/*)/g;
    var formatted = '';
    var pad = 0;
    xml = xml.replace(reg, '$1\r\n$2$3');
    xml.split('\r\n').forEach(function (node) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        }
        else if (node.match(/^<\/\w/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        }
        else if (node.match(/^<\w([^>]*[^/])?>.*$/)) {
            indent = 1;
        }
        else {
            indent = 0;
        }
        var padding = PADDING.repeat(pad);
        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted.trim();
};
var XmlViewer = function (_a) {
    var xml = _a.xml;
    var formattedXml = formatXml(xml);
    var downloadXml = function () {
        var blob = new Blob([formattedXml], { type: 'application/xml' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'EnhancedSeatMapRS.xml';
        a.click();
        URL.revokeObjectURL(url);
    };
    return (React.createElement("div", { style: { padding: '20px', backgroundColor: '#fff', maxHeight: '80vh', overflowY: 'auto' } },
        React.createElement("h3", null, "\uD83D\uDEEB EnhancedSeatMapRS"),
        React.createElement("div", { style: { textAlign: 'right', marginBottom: '10px' } },
            React.createElement("button", { onClick: downloadXml, className: "btn btn-primary" }, "\uD83D\uDCE5 Download XML")),
        React.createElement("pre", { style: {
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                overflowX: 'auto'
            } }, formattedXml)));
};
exports.XmlViewer = XmlViewer;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/XmlViewer.js", ["com-sabre-redapp-fundamentals-web-module/utils/XmlViewer"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/utils/XmlViewer"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module", ["com-sabre-redapp-fundamentals-web-module/index"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/index"))});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlUG5yL0NyZWF0ZVBOUi50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL2NyZWF0ZVBuci9jcmVhdGVQbnJGb3JUd29QYXNzZW5nZXJzLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1JlZEFwcC1TZWF0TWFwcyBBQkMgMzYwL2NvZGUvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWZ1bmRhbWVudGFscy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL2NyZWF0ZVBuckZvclR3b1Bhc3NlbmdlcnMuanMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvUmVkQXBwLVNlYXRNYXBzIEFCQyAzNjAvY29kZS93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZnVuZGFtZW50YWxzLXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlUG5yTXVjRHhiRm9ybS5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvZXh0cmFjdFNlZ21lbnREYXRhLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9nZXRGbGlnaHRGcm9tU2FicmVEYXRhLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9sb2FkUG5yRGV0YWlsc0Zyb21TYWJyZS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9SZWRBcHAtU2VhdE1hcHMgQUJDIDM2MC9jb2RlL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1mdW5kYW1lbnRhbHMtd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9sb2FkUG5yVXNpbmdUcmF2ZWxJdGluZXJhcnlSZWFkUlEuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2xvYWRTZWF0TWFwRnJvbVNhYnJlLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1JlZEFwcC1TZWF0TWFwcyBBQkMgMzYwL2NvZGUvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWZ1bmRhbWVudGFscy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL29wZW5TZWF0TWFwc1BvcG92ZXJNb2RhbC5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9SZWRBcHAtU2VhdE1hcHMgQUJDIDM2MC9jb2RlL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1mdW5kYW1lbnRhbHMtd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9wYXJjZVBuckRhdGEuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL3BhcnNlU2VhdE1hcFJlc3BvbnNlLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9yZWdpc3RlckNvbW1hbmRIZWxwZXJCdXR0b24udHMiLCJzcmMvY29kZS9jb21wb25lbnRzL1NlYXRNYXBDb21wb25lbnQudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwQ29tcG9uZW50QXZhaWwudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwQ29tcG9uZW50UG5yLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvU2VhdE1hcENvbXBvbmVudFByaWNpbmcudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwQ29tcG9uZW50U2hvcHBpbmcudHN4Iiwic3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwc1BvcG92ZXIudHN4IiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1JlZEFwcC1TZWF0TWFwcyBBQkMgMzYwL2NvZGUvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWZ1bmRhbWVudGFscy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL1NlYXRNYXBzUG9wb3Zlck1vZGFsV3JhcHBlci5qcyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9SZWRBcHAtU2VhdE1hcHMgQUJDIDM2MC9jb2RlL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1mdW5kYW1lbnRhbHMtd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwc1hNTFZpZXdlci5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1NlYXRNYXBBdmFpbE1vZGFsLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9zaG93U2VhdE1hcFByaWNpbmdNb2RhbC50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy93aWRnZXRzL1ByaWNpbmdUaWxlLnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvd2lkZ2V0cy9QcmljaW5nVmlldy50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL3dpZGdldHMvU2VhdE1hcEF2YWlsVGlsZS50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL3dpZGdldHMvU2VhdE1hcEF2YWlsVmlldy50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL3dpZGdldHMvU2VhdE1hcFNob3BwaW5nVGlsZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvd2lkZ2V0cy9TZWF0TWFwU2hvcHBpbmdWaWV3LnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1JlZEFwcC1TZWF0TWFwcyBBQkMgMzYwL2NvZGUvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWZ1bmRhbWVudGFscy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL1htbFZpZXdlci5qcyIsInNyYy9jb2RlL0NvbnRleHQudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvUmVkQXBwLVNlYXRNYXBzIEFCQyAzNjAvY29kZS93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZnVuZGFtZW50YWxzLXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL0NyZWF0ZVBOUi5qcyIsInNyYy9jb2RlL2luZGV4LnRzIiwic3JjL2NvZGUvTWFpbi50cyIsInNyYy9jb2RlL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoLnRzIiwic3JjL2NvZGUvdXRpbHMvcGFyY2VQbnJEYXRhLnRzIiwic3JjL2NvZGUvdXRpbHMvcXVpY2tldENvbmZpZy50cyIsInNyYy9jb2RlL3V0aWxzL1htbFZpZXdlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQixtREFBK0g7QUFDL0gseUNBQThDO0FBQzlDLHFFQUFvRTtBQUNwRSxzRkFBbUY7QUFDbkYscUZBQW9GO0FBa0NwRjs7RUFFRTtBQUNGO0lBQStCLDZCQUEyQjtJQUV0RCxtQkFBWSxDQUFDO1FBQWIsWUFDSSxrQkFBTSxDQUFDLENBQUMsU0F3Qlg7UUF0QkcsK0NBQStDO1FBQy9DLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDakQsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNyRCxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ3ZELEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDckMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUVyQywyREFBMkQ7UUFDM0QsS0FBSSxDQUFDLEtBQUssR0FBRztZQUNULEtBQUssRUFBQyxDQUFDO1lBQ1AsUUFBUSxFQUFDO2dCQUNMLElBQUksRUFBQyxFQUFFO2dCQUNQLE9BQU8sRUFBQyxFQUFFO2dCQUNWLFFBQVEsRUFBQyxLQUFLO2FBRWpCO1lBQ0QsVUFBVSxFQUFDO2dCQUNQLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLElBQUksRUFB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O2dCQUNuQixRQUFRLEVBQUUsU0FBUztnQkFDbkIsU0FBUyxFQUFFLE1BQU07YUFDcEIsSUFDSSxZQUFZLENBQ1gsQ0FDSixDQUNULENBQUM7QUFDTixDQUFDLENBQUM7QUFwQ1csUUFBQSxTQUFTLGFBb0NwQiIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7QnV0dG9uLCBGb3JtLCBGb3JtR3JvdXAsIE1vZGFsLCBJbnB1dEdyb3VwLCBDb250cm9sTGFiZWwsIEZvcm1Db250cm9sLCBIZWxwQmxvY2ssIFBhbmVsLCBBbGVydH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHsgZ2V0U2VydmljZSwgdCB9IGZyb20gXCIuLi8uLi9Db250ZXh0XCI7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tIFwic2FicmUtbmd2LWNvcmUvc2VydmljZXMvTGF5ZXJTZXJ2aWNlXCI7XG5pbXBvcnQge0lTb2FwQXBpU2VydmljZX0gZnJvbSBcInNhYnJlLW5ndi1jb21tdW5pY2F0aW9uL2ludGVyZmFjZXMvSVNvYXBBcGlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBQbnJQdWJsaWNTZXJ2aWNlIH0gZnJvbSBcInNhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvUG5yUHVibGljU2VydmljZVwiO1xuXG4vKlxuRGVmaW5lIGludGVyZmFjZSBmb3IgaGFuZGxpbmcgVHJhdmVsZXIgZGV0YWlscyBvbiB0aGUgUmVhY3QgY29tcG9uZW50IHN0YXRlXG4qL1xuZXhwb3J0IGludGVyZmFjZSBUcmF2ZWxlciB7XG4gICAgbmFtZTpzdHJpbmcsXG4gICAgc3VybmFtZTpzdHJpbmcsXG4gICAgZW1haWw/OnN0cmluZyxcbiAgICB0eXBlQ29kZT86J0FEVCcgfCAnSU5GJyB8ICdDTk4nLCAgICBcbn1cblxuLypcbkRlZmluZSBpbnRlcmZhY2UgZm9yIGhhbmRsaW5nIGZpZWxkIHZhbGlkYXRpb24gb24gdGhlIFJlYWN0IGNvbXBvbmVudCBzdGF0ZVxuKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRWYWxpZGF0aW9uIHtcbiAgICBbZmllbGRJZDpzdHJpbmddOntcbiAgICAgICAgaXNWYWxpZDpib29sZWFuLFxuICAgICAgICBzdGF0dXM6XCJlcnJvclwifFwid2FybmluZ1wifFwic3VjY2Vzc1wifG51bGwsXG4gICAgICAgIGhlbHBNc2c/OnN0cmluZyAgXG4gICAgfVxufVxuXG4vKlxuUmVhY3QgY29tcG9uZW50IHN0YXRlIGludGVyZmFjZSwgaG9sZHMgYWxsIGRhdGEgaGFuZGxlZCBieSB0aGUgRm9ybVxuKi9cbmV4cG9ydCBpbnRlcmZhY2UgbXlTdGF0ZSB7XG4gICAgc3RhZ2U6bnVtYmVyLFxuICAgIHRyYXZlbGVyPzpUcmF2ZWxlcixcbiAgICB0cmF2ZWxUeXBlPzpzdHJpbmcsXG4gICAgdHJhdmVsSW5mbz86QXJyYXk8c3RyaW5nPixcbiAgICB2YWxpZGF0aW9uPzpGaWVsZFZhbGlkYXRpb25cbn1cblxuLypcbkNyZWF0ZVBOUiBDb21wb25lbnQsIG11bHRpLXN0YWdlIGRhdGEgZW50cnkgZm9ybSBiYXNlZCBvbiByZWFjdC1ib290c3RyYXAgY29tcG9uZW50IGxpYnJhcnlcbiovXG5leHBvcnQgY2xhc3MgQ3JlYXRlUE5SIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LG15U3RhdGU+e1xuXG4gICAgY29uc3RydWN0b3IoZSl7XG4gICAgICAgIHN1cGVyKGUpO1xuXG4gICAgICAgIC8vYmluZCBldmVudCBoYW5kbGVycyB0byB0aGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5leGVjdXRlU2VydmljZSA9IHRoaXMuZXhlY3V0ZVNlcnZpY2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jbG9zZUFuZFJlZnJlc2ggPSB0aGlzLmNsb3NlQW5kUmVmcmVzaC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmdvQmFjayA9IHRoaXMuZ29CYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZ29OZXh0ID0gdGhpcy5nb05leHQuYmluZCh0aGlzKTtcblxuICAgICAgICAvL2ZpbGwgZGVmYXVsdCBzdGF0ZSB2YWx1ZXMgZHVyaW5nIGNvbXBvbmVudCBpbml0aWFsaXphdGlvblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhZ2U6MSxcbiAgICAgICAgICAgIHRyYXZlbGVyOntcbiAgICAgICAgICAgICAgICBuYW1lOlwiXCIsXG4gICAgICAgICAgICAgICAgc3VybmFtZTpcIlwiLFxuICAgICAgICAgICAgICAgIHR5cGVDb2RlOlwiQURUXCJcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWxpZGF0aW9uOntcbiAgICAgICAgICAgICAgICB0eHROYW1lOntpc1ZhbGlkOmZhbHNlLHN0YXR1czpudWxsLGhlbHBNc2c6bnVsbH0sXG4gICAgICAgICAgICAgICAgdHh0U3VybmFtZTp7aXNWYWxpZDpmYWxzZSxzdGF0dXM6bnVsbCxoZWxwTXNnOm51bGx9LFxuICAgICAgICAgICAgICAgIHR4dEVtYWlsOntpc1ZhbGlkOmZhbHNlLHN0YXR1czpudWxsLGhlbHBNc2c6bnVsbH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgTWV0aG9kIHRvIGhhbmRsZSBmaWVsZCBjaGFuZ2VzLCBwZXJmb3JtIHZhbGlkYXRpb24gYW5kIHVwZGF0ZSBzdGF0ZVxuICAgICovXG4gICAgaGFuZGxlQ2hhbmdlKGUpe1xuXG4gICAgICAgIGNvbnN0IGN0bElkID0gZS50YXJnZXQuaWQ7XG4gICAgICAgIGNvbnN0IGZsZFZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25TdGF0ZSA9IHRoaXMuc3RhdGUudmFsaWRhdGlvbjtcblxuICAgICAgICBjb25zdCB0bXBUcmF2ZWxlciA9IHRoaXMuc3RhdGUudHJhdmVsZXI7XG4gICAgICAgIGxldCB0bXBUcmF2ZWxUeXBlID0gdGhpcy5zdGF0ZS50cmF2ZWxUeXBlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlQ2hhbmdlXCIsY3RsSWQsZmxkVmFsdWUpO1xuXG4gICAgICAgIGlmKGN0bElkPT09XCJ0eHROYW1lXCIgfHwgY3RsSWQ9PT1cInR4dFN1cm5hbWVcIil7XG4gICAgICAgICAgICBjb25zdCB0bXBWYWxpZGF0aW9uID0gdmFsaWRhdGlvblN0YXRlW2N0bElkXVxuXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBmbGRWYWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICBpZihjdGxJZD09PVwidHh0TmFtZVwiKVxuICAgICAgICAgICAgICAgIHRtcFRyYXZlbGVyLm5hbWUgPSBmbGRWYWx1ZTtcbiAgICAgICAgICAgIGlmKGN0bElkPT09XCJ0eHRTdXJuYW1lXCIpXG4gICAgICAgICAgICAgICAgdG1wVHJhdmVsZXIuc3VybmFtZSA9IGZsZFZhbHVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihsZW5ndGg8PTApe1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLmhlbHBNc2cgPSBcInJlcXVpcmVkIGZpZWxkXCI7XG4gICAgICAgICAgICB9ZWxzZSBpZihsZW5ndGg8PTEpe1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uc3RhdHVzID0gJ3dhcm5pbmcnO1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uaGVscE1zZyA9IFwibXVzdCBiZSBtb3JlIHRoYW4gb25lIGNoYXJhY3RlciBsb25nXCI7XG4gICAgICAgICAgICB9ZWxzZSBpZihsZW5ndGg+MSl7XG4gICAgICAgICAgICAgICAgdG1wVmFsaWRhdGlvbi5pc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLnN0YXR1cyA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLmhlbHBNc2cgPSBudWxsO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihjdGxJZD09PVwic2VsQWdlQ29kZVwiKXtcbiAgICAgICAgICAgIHRtcFRyYXZlbGVyLnR5cGVDb2RlID0gZmxkVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjdGxJZD09PVwic2VsVHJhdmVsVHlwZVwiKXtcbiAgICAgICAgICAgIHRtcFRyYXZlbFR5cGUgPSBmbGRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHJhdmVsZXI6dG1wVHJhdmVsZXIsXG4gICAgICAgICAgICAgICAgdHJhdmVsVHlwZTp0bXBUcmF2ZWxUeXBlLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246dmFsaWRhdGlvblN0YXRlXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy9tb3ZlcyB0byB0aGUgbmV4dCBzdGFnZVxuICAgIGdvTmV4dChldnQpe1xuICAgICAgICBjb25zdCBjdXJyU3RhZ2UgPSB0aGlzLnN0YXRlLnN0YWdlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGFnZTpjdXJyU3RhZ2UrMX0pXG4gICAgfVxuXG4gICAgLy9yZXdpbmQgc3RhZ2VcbiAgICBnb0JhY2soZXZ0KXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhZ2U6MX0pXG4gICAgfVxuXG4gICAgLypcbiAgICBDcmVhdGVzIGEgVXBkYXRlUmVzZXJ2YXRpb25SUSByZXF1ZXN0IHBheWxvYWQgbWVyZ2luZyBzdGF0ZSBkYXRhLCB0aGVuIHV0aWxpemVzIFxuICAgIFNPQVAgQVBJIHNlcnZpY2UgaGFuZGxlciB0byBzZW5kIHRoZSByZXF1ZXN0IGFuZCBwYXJzZSByZXN1bHRzXG4gICAgKi9cbiAgICBleGVjdXRlU2VydmljZSgpe1xuICAgICAgICBjb25zdCBzb2FwQXBpU2VydmljZSA9IGdldFNlcnZpY2UoSVNvYXBBcGlTZXJ2aWNlKTtcbiAgICAgICAgY29uc3QgcGwxID0gYFxuICAgICAgICA8VXBkYXRlUmVzZXJ2YXRpb25SUSBWZXJzaW9uPVwiMS4xOS44XCIgeG1sbnM9XCJodHRwOi8vd2Vic2VydmljZXMuc2FicmUuY29tL3BucmJ1aWxkZXIvdjFfMTlcIj5cbiAgICAgICAgPFJlcXVlc3RUeXBlIGNvbW1pdFRyYW5zYWN0aW9uPVwiZmFsc2VcIiBpbml0aWFsSWdub3JlPVwidHJ1ZVwiPlN0YXRlZnVsPC9SZXF1ZXN0VHlwZT5cbiAgICAgICAgPFJldHVybk9wdGlvbnMgSW5jbHVkZVVwZGF0ZURldGFpbHM9XCJ0cnVlXCIgUmV0cmlldmVQTlI9XCJmYWxzZVwiLz5cbiAgICAgICAgICAgIDxSZXNlcnZhdGlvblVwZGF0ZUxpc3Q+XG4gICAgICAgICAgICAgICAgPFJlc2VydmF0aW9uVXBkYXRlSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPFBhc3Nlbmdlck5hbWVVcGRhdGUgb3A9XCJDXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VHJhdmVsZXJOYW1lIHR5cGU9XCIke3RoaXMuc3RhdGUudHJhdmVsZXIudHlwZUNvZGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdpdmVuPiR7dGhpcy5zdGF0ZS50cmF2ZWxlci5uYW1lfTwvR2l2ZW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN1cm5hbWU+JHt0aGlzLnN0YXRlLnRyYXZlbGVyLnN1cm5hbWV9PC9TdXJuYW1lPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9UcmF2ZWxlck5hbWU+XG4gICAgICAgICAgICAgICAgICAgIDwvUGFzc2VuZ2VyTmFtZVVwZGF0ZT5cbiAgICAgICAgICAgICAgICA8L1Jlc2VydmF0aW9uVXBkYXRlSXRlbT5cbiAgICAgICAgICAgICAgICA8UmVzZXJ2YXRpb25VcGRhdGVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8UmVtYXJrVXBkYXRlIG9wPVwiQ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJlbWFya1RleHQ+VEhJUyBJUyAke3RoaXMuc3RhdGUudHJhdmVsVHlwZX0gVFJBVkVMIFRZUEUgUkVNQVJLPC9SZW1hcmtUZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L1JlbWFya1VwZGF0ZT5cbiAgICAgICAgICAgICAgICA8L1Jlc2VydmF0aW9uVXBkYXRlSXRlbT5cbiAgICAgICAgICAgIDwvUmVzZXJ2YXRpb25VcGRhdGVMaXN0PlxuICAgICAgICA8L1VwZGF0ZVJlc2VydmF0aW9uUlE+XG4gICAgICAgIGA7XG5cbiAgICAgICAgc29hcEFwaVNlcnZpY2UuY2FsbFN3cyh7YWN0aW9uOlwiVXBkYXRlUmVzZXJ2YXRpb25SUVwiLHBheWxvYWQ6cGwxLGF1dGhUb2tlblR5cGU6XCJTRVNTSU9OXCJ9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgLy92YWxpZGF0ZSBBUEkgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNvYXAgQVBJIGNhbGwgcmVzdWx0XCIsSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gICAgICAgICAgICAgICAgaWYocmVzLmVycm9yQ29kZSB8fCAocmVzLnZhbHVlICYmIHJlcy52YWx1ZS5pbmRleE9mKFwiPHN0bDE5OkVycm9yXCIpPj0wKSApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGFnZTo0fSlcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhZ2U6M30pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaChcbiAgICAgICAgICAgIChlcnIpPT57XG4gICAgICAgICAgICAgICAgLy9leGNlcHRpb24gY2FsbGluZyBzb2FwIEFQSVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU29hcCBBUEkgY2FsbCBlcnJvclwiLGVycik7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhZ2U6NH0pXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGhhbmRsZU1vZGFsQ2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGdldFNlcnZpY2UoTGF5ZXJTZXJ2aWNlKS5jbGVhckxheWVyKDQyKTtcbiAgICB9XG4gICAgLypcbiAgICBSZWZyZXNoZXMgdGhlIFRyaXAgU3VtbWFyeSBwYW5lbCBhZnRlciBzdWNlc3NmdWxsIFVwZGF0ZVJlc2VydmF0aW9uUlEgcmVzcG9uc2UsIFxuICAgIHRoaXMgbWFrZXMgdGhlIGNoYW5nZXMgd3JpdHRlbiBvbiB0aGUgUE5SIHRvIGFwcGVhciBvbiB0aGUgVUlcbiAgICAqL1xuICAgIGNsb3NlQW5kUmVmcmVzaCgpe1xuICAgICAgICBnZXRTZXJ2aWNlKFBuclB1YmxpY1NlcnZpY2UpLnJlZnJlc2hEYXRhKCk7XG4gICAgICAgIHRoaXMuaGFuZGxlTW9kYWxDbG9zZSgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgUmVuZGVyIHBhcnRzIG9mIG11bHRpLXN0YWdlIGZvcm0gdXNpbmcgcmVhY3QtYm9vdHN0cmFwIGNvbXBvbmVudHNcbiAgICBUaGUgZGF0YSBlbnRyeSBmb3JtIGlzIHdyYXBwZWQgYnkgYSBNb2RhbCBEaWFsb2cgY29tcG9uZW50XG4gICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuXG4gICAgICAgIHN3aXRjaCh0aGlzLnN0YXRlLnN0YWdlKXtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVOYW1lID0gdGhpcy5zdGF0ZS52YWxpZGF0aW9uW1widHh0TmFtZVwiXTtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlU3VybmFtZSA9IHRoaXMuc3RhdGUudmFsaWRhdGlvbltcInR4dFN1cm5hbWVcIl07XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1vZGFsLkRpYWxvZyBjbGFzc05hbWU9XCJyZWFjdC1tb2RhbFwiPlxuICAgICAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbiBvbkhpZGU9eygpPT57dGhpcy5oYW5kbGVNb2RhbENsb3NlKCk7fX0+XG4gICAgICAgICAgICAgICAgPE1vZGFsLlRpdGxlPkRhdGEgRW50cnkgRm9ybSAoMSBvZiAyKTwvTW9kYWwuVGl0bGU+XG4gICAgICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgICAgPEZvcm0gYXV0b0NvbXBsZXRlPVwib2ZmXCI+XG4gICAgICAgICAgICAgICAgPFBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8UGFuZWwuSGVhZGluZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQYW5lbC5UaXRsZT5BYm91dCBUcmF2ZWxlcjwvUGFuZWwuVGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDwvUGFuZWwuSGVhZGluZz5cbiAgICAgICAgICAgICAgICAgICAgPFBhbmVsLkJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cInR4dE5hbWVcIiB2YWxpZGF0aW9uU3RhdGU9e3ZhbGlkYXRlTmFtZS5zdGF0dXN9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+TmFtZTwvQ29udHJvbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0cmF2ZWxlciBOYW1lXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnRyYXZlbGVyLm5hbWV9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbGlkYXRlTmFtZS5oZWxwTXNnICYmIDxGb3JtQ29udHJvbC5GZWVkYmFjayAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KHZhbGlkYXRlTmFtZS5oZWxwTXNnKSAmJiA8SGVscEJsb2NrPnt2YWxpZGF0ZU5hbWUuaGVscE1zZ308L0hlbHBCbG9jaz59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJ0eHRTdXJuYW1lXCIgdmFsaWRhdGlvblN0YXRlPXt2YWxpZGF0ZVN1cm5hbWUuc3RhdHVzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPlN1cm5hbWU8L0NvbnRyb2xMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdHJhdmVsZXIgU3VyYW1lXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnRyYXZlbGVyLnN1cm5hbWV9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbGlkYXRlU3VybmFtZS5pc1ZhbGlkICYmIDxGb3JtQ29udHJvbC5GZWVkYmFjayAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KHZhbGlkYXRlU3VybmFtZS5pc1ZhbGlkICYmIHZhbGlkYXRlU3VybmFtZS5oZWxwTXNnKSAmJiA8SGVscEJsb2NrPnt2YWxpZGF0ZU5hbWUuaGVscE1zZ308L0hlbHBCbG9jaz59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJzZWxBZ2VDb2RlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD5QYXNzZW5nZXIgVHlwZSAoQ29kZSk8L0NvbnRyb2xMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgY29tcG9uZW50Q2xhc3M9XCJzZWxlY3RcIiBwbGFjZWhvbGRlcj1cInNlbGVjdFwiIHZhbHVlPXt0aGlzLnN0YXRlLnRyYXZlbGVyLnR5cGVDb2RlfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2VsZWN0XCI+c2VsZWN0PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBRFRcIj5BZHVsdDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQ05OXCI+Q2hpbGQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIklORlwiPkluZmFudDwvb3B0aW9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8L1BhbmVsLkJvZHk+XG4gICAgICAgICAgICAgICAgPC9QYW5lbD5cbiAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9IGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCI+Q2FuY2VsPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmdvTmV4dH0+TmV4dDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICA8L01vZGFsLkRpYWxvZz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TW9kYWwuRGlhbG9nIGNsYXNzTmFtZT1cInJlYWN0LW1vZGFsXCI+XG4gICAgICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uIG9uSGlkZT17KCk9Pnt0aGlzLmhhbmRsZU1vZGFsQ2xvc2UoKTt9fT5cbiAgICAgICAgICAgICAgICA8TW9kYWwuVGl0bGU+RGF0YSBFbnRyeSBGb3JtICgyIG9mIDIpPC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgICA8Rm9ybT5cbiAgICAgICAgICAgICAgICA8UGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxQYW5lbC5IZWFkaW5nPjxQYW5lbC5UaXRsZT5BYm91dCBUcmF2ZWw8L1BhbmVsLlRpdGxlPjwvUGFuZWwuSGVhZGluZz5cbiAgICAgICAgICAgICAgICAgICAgPFBhbmVsLkJvZHk+XG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJzZWxUcmF2ZWxUeXBlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+VHJhdmVsIFR5cGU8L0NvbnRyb2xMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIGNvbXBvbmVudENsYXNzPVwic2VsZWN0XCIgcGxhY2Vob2xkZXI9XCJzZWxlY3RcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLnRyYXZlbFR5cGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNlbGVjdFwiPnNlbGVjdDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJ1c2luZXNzXCI+YnVzaW5lc3M8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJsZWlzdXJlXCI+bGVpc3VyZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50cmF2ZWxUeXBlPT09XCJidXNpbmVzc1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+QWRkIENvcnBvcmF0ZSBJRCA/PC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuQWRkb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBhcmlhLWxhYmVsPVwiLi4uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXAuQWRkb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50cmF2ZWxUeXBlPT09XCJsZWlzdXJlXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD5BZGQgU3BlY2lhbCBTZXJ2aWNlIFJlcXVlc3QgPzwvQ29udHJvbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLkFkZG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgYXJpYS1sYWJlbD1cIi4uLlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwLkFkZG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvUGFuZWwuQm9keT5cbiAgICAgICAgICAgICAgICA8L1BhbmVsPlxuXG4gICAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVNb2RhbENsb3NlfSBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiPkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5nb0JhY2t9PkJhY2s8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBidG4tc3VjY2Vzc1wiIG9uQ2xpY2s9e3RoaXMuZXhlY3V0ZVNlcnZpY2V9PkNyZWF0ZSBQTlI8L0J1dHRvbj5cblxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICA8L01vZGFsLkRpYWxvZz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPEFsZXJ0IGJzU3R5bGU9XCJzdWNjZXNzXCIgb25EaXNtaXNzPXt0aGlzLmNsb3NlQW5kUmVmcmVzaH0+XG4gICAgICAgICAgICAgICAgPGg0PlN1Y2Nlc3M8L2g0PlxuICAgICAgICAgICAgICAgIDxoci8+XG4gICAgICAgICAgICAgICAgPHA+T3BlcmF0aW9uIGNvbXBsZXRlZCBzdWNlc3NmdWxseSwgZGF0YSB3YXMgd3JpdHRlbiB0byB0aGUgUE5SLCBzZXNzaW9uIHN0YXR1cyB3aWxsIGJlIHJlZnJlc2hlZC4uLjwvcD5cbiAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJzdWNjZXNzXCIgb25DbGljaz17dGhpcy5jbG9zZUFuZFJlZnJlc2h9PkNsb3NlPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9BbGVydD5cbiAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPEFsZXJ0IGJzU3R5bGU9XCJkYW5nZXJcIiBvbkRpc21pc3M9e3RoaXMuaGFuZGxlTW9kYWxDbG9zZX0+XG4gICAgICAgICAgICAgICAgPGg0PkVycm9yPC9oND5cbiAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICBUaGUgb3BlcmF0aW9uIGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQsIHZhbGlkYXRlIHJlY29yZHMgYW5kIHRyeSBhZ2Fpbi4uLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJkYW5nZXJcIiBvbkNsaWNrPXt0aGlzLmdvQmFja30+UmV0cnk8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufSIsImltcG9ydCB7Q3VzdG9tRm9ybX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybSc7XG5pbXBvcnQge0lDdXN0b21Gb3Jtc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvc2VydmljZXMvSUN1c3RvbUZvcm1zU2VydmljZSc7XG5pbXBvcnQge0N1c3RvbUZvcm1Sc30gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybVJzJztcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9maWVsZHMvVGV4dEZpZWxkJztcbmltcG9ydCB7RGF0ZXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0RhdGVzU2VydmljZSc7XG5pbXBvcnQge0NvbW1hbmRNZXNzYWdlQmFzaWNSc30gZnJvbSAnc2FicmUtbmd2LXBvcy1jZG0vY29tbXNnJztcbmltcG9ydCB7SUNvbW1hbmRNZXNzYWdlU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWNvbW1zZy9zZXJ2aWNlcy9JQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlJztcbmltcG9ydCB7SW50ZXJzdGl0aWFsU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JbnRlcnN0aXRpYWxTZXJ2aWNlJztcblxuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi8uLi9Db250ZXh0JztcbmltcG9ydCB7b3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGh9IGZyb20gJy4uLy4uL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBuckZvclR3b1Bhc3NlbmdlcnMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgdHdlbnR5RGF5c0FoZWFkID0gZ2V0U2VydmljZShEYXRlc1NlcnZpY2UpLmdldE5vdygpLmFkZCgyMCwgJ2RheXMnKS5mb3JtYXQoJ0RETU1NJykudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBmbGlnaHRDb21tYW5kID0gYDFFSzUwWSR7dHdlbnR5RGF5c0FoZWFkfU1VQ0RYQi9TUzJgOyAvLyA4QT9AMDI7NT0+OiBNVUMsID01IEZSQVxuXG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGU6ICdDcmVhdGUgUE5SJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJy1LTEVJTUFOTi9MRU9OSURNUlxcbi1LTEVJTUFOTi9HQUxJTkFNUlMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmxpZ2h0Q29tbWFuZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpY2tldCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcwMVkyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2FnZW50JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0FnZW50IEluZm8nLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnNkFHRU5UJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3Bob25lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzkxMjM0NTY3ODkwMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0aW1lTGltaXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGlja2V0aW5nIHRpbWUgbGltaXQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnN1RBVy8nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnb2snLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3VibWl0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzZWxmU3VibWl0UG5yQWN0aW9uKHJlc3VsdCk7XG4gICAgfVxufVxuXG5jb25zdCBzZWxmU3VibWl0UG5yQWN0aW9uID0gYXN5bmMgKGZvcm06IEN1c3RvbUZvcm0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBpbnRlcnN0aXRpYWxTZXJ2aWNlID0gZ2V0U2VydmljZShJbnRlcnN0aXRpYWxTZXJ2aWNlKTtcblxuICAgIGNvbnN0IG5hbWVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICduYW1lJykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBmbGlnaHRScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdmbGlnaHQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHRpY2tldFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpY2tldCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgYWdlbnRJbmZvUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnYWdlbnQnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHBob25lUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAncGhvbmUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IHRhd1JxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ3RpbWVMaW1pdCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLnNob3dJbnRlcnN0aXRpYWwoMTUwMDApO1xuXG4gICAgY29uc3QgbmFtZVJzU3RhdHVzID0gYXdhaXQgc2VuZENvbW1hbmQobmFtZVJxLCAnTmFtZScpO1xuICAgIGNvbnN0IGZsaWdodHNTdGF0dXMgPSBuYW1lUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoZmxpZ2h0UnEsICdGbGlnaHQgbGlzdCcpO1xuICAgIGNvbnN0IHRpY2tldFJzU3RhdHVzID0gZmxpZ2h0c1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCh0aWNrZXRScSwgJ1RpY2tldCcpO1xuICAgIGNvbnN0IGFnZW50SW5mb1JzU3RhdHVzID0gdGlja2V0UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoYWdlbnRJbmZvUnEsICdBZ2VudCBJbmZvJyk7XG4gICAgY29uc3QgcGhvbmVSc1N0YXR1cyA9IGFnZW50SW5mb1JzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHBob25lUnEsICdQaG9uZScpO1xuICAgIGNvbnN0IHRhd1JzU3RhdHVzID0gcGhvbmVSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCh0YXdScSwgJ1RBVycpO1xuICAgIGNvbnN0IHJlY2VpdmVkRnJvbVN0YXR1cyA9IHRhd1JzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKCc2TEVPTklEJywgJ1JlY2VpdmVkIEZyb20nKTsgLy8gND4xMDI4OyBBTjQwXG4gICAgY29uc3Qgd3BSc1N0YXR1cyA9IHJlY2VpdmVkRnJvbVN0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCgnV1AnLCAnV1AnKTtcbiAgICBjb25zdCBwcVJzU3RhdHVzID0gd3BSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZCgnUFEnLCAnUFEnKTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2UuaGlkZUludGVyc3RpdGlhbCgpO1xuICAgIHBxUnNTdGF0dXMgJiYgb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgoJ0NyZWF0ZSBQTlInLCAnUE5SIGNyZWF0ZWQnKTtcbn1cblxuY29uc3Qgc2VuZENvbW1hbmQgPSBhc3luYyAoY29tbWFuZDogc3RyaW5nLCBmYWlsdXJlU2VnbWVudDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgY29uc3QgcnNTdGF0dXM6IENvbW1hbmRNZXNzYWdlQmFzaWNScyA9IGF3YWl0IGdldFNlcnZpY2UoSUNvbW1hbmRNZXNzYWdlU2VydmljZSkuc2VuZChjb21tYW5kKTtcbiAgICBsZXQgaXNTdWNjZXNzOiBib29sZWFuID0gcnNTdGF0dXMuU3RhdHVzLlN1Y2Nlc3M7XG5cbiAgICBpZiAoaXNTdWNjZXNzICYmIHJzU3RhdHVzLlN0YXR1cy5NZXNzYWdlc1swXSAmJiByc1N0YXR1cy5TdGF0dXMuTWVzc2FnZXNbMF0uVGV4dC5pbmNsdWRlcygnU0lHTiBJTicpKSB7XG4gICAgICAgIGlzU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBoYW5kbGVGYWlsdXJlKCdDb21tYW5kIGZhaWxlZCwgbm90IHNpZ25lZCBpbi4nKTtcbiAgICB9IGVsc2UgaWYgKCFpc1N1Y2Nlc3MpIHtcbiAgICAgICAgaGFuZGxlRmFpbHVyZShmYWlsdXJlU2VnbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzU3VjY2Vzcztcbn1cblxuY29uc3QgaGFuZGxlRmFpbHVyZSA9IChzZWdtZW50OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnQ3JlYXRlIFBOUicsIGAke3NlZ21lbnR9IGNyZWF0aW9uIGZhaWxlZGApO1xufSIsbnVsbCxudWxsLCJpbXBvcnQgeyBGbGlnaHRTZWdtZW50IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvY29tbW9uL2RhdGEvZmxpZ2h0L0ZsaWdodFNlZ21lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFNlZ21lbnREYXRhKHNlZ21lbnQ6IEZsaWdodFNlZ21lbnQpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmbGlnaHROdW1iZXI6IHNlZ21lbnQuZ2V0U2VnbWVudElkKCksXG4gICAgICAgIG1hcmtldGluZ0NhcnJpZXI6IHNlZ21lbnQuZ2V0TWFya2V0aW5nT3BlcmF0aW5nQWlybGluZSgpLFxuICAgICAgICBkZXBhcnR1cmVEYXRlOiBzZWdtZW50LmdldFJhd0RlcGFydHVyZURhdGUoKSxcbiAgICAgICAgcmJkOiBzZWdtZW50LmdldFNlbGVjdGVkQm9va2luZ0NsYXNzKCkgfHwgJ04vQScsXG4gICAgICAgIG9yaWdpbjogc2VnbWVudC5nZXRPcmlnaW5JYXRhKCksXG4gICAgICAgIGRlc3RpbmF0aW9uOiBzZWdtZW50LmdldERlc3RpbmF0aW9uSWF0YSgpLFxuICAgICAgICBlcXVpcG1lbnRDb2RlOiBzZWdtZW50LmdldEVxdWlwbWVudENvZGUoKSxcbiAgICAgICAgZXF1aXBtZW50Q29kZXM6IHNlZ21lbnQuZ2V0RXF1aXBtZW50Q29kZXMoKS5tYXAoY29kZUluZm8gPT4gU3RyaW5nKGNvZGVJbmZvKSksXG4gICAgICAgIHNlZ21lbnRScGg6IHNlZ21lbnQuZ2V0UnBoKClcbiAgICB9O1xufSIsIi8vIEQwOTs6IGdldEZsaWdodEZyb21TYWJyZURhdGEudHNcblxuY29uc3QgZXF1aXBtZW50TmFtZXM6IHsgW2NvZGU6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAnMzg4JzogJ0FpcmJ1cyBBMzgwJyxcbiAgJzc3Vyc6ICdCb2VpbmcgNzc3LTMwMEVSJyxcbiAgJzc4OSc6ICdCb2VpbmcgNzg3LTkgRHJlYW1saW5lcicsXG4gICczMjAnOiAnQWlyYnVzIEEzMjAnLFxuICAnMzIxJzogJ0FpcmJ1cyBBMzIxJyxcbiAgJzczOCc6ICdCb2VpbmcgNzM3LTgwMCcsXG4gICczMTknOiAnQWlyYnVzIEEzMTknLFxuICAnNzQ0JzogJ0JvZWluZyA3NDctNDAwJyxcbiAgJzM1OSc6ICdBaXJidXMgQTM1MC05MDAnLFxuICAnRTkwJzogJ0VtYnJhZXIgMTkwJyxcbiAgLy8gPD42PT4gPz5CPjwgND4/Pjs9OEJMID8+IDw1QDUgPTU+MUU+NDg8PkFCOFxufTtcblxuZXhwb3J0IGNvbnN0IGdldEZsaWdodEZyb21TYWJyZURhdGEgPSAoZGF0YTogYW55LCBzZWdtZW50SW5kZXg6IG51bWJlciA9IDApID0+IHtcbiAgY29uc3Qgc2VnbWVudCA9IGRhdGEuZmxpZ2h0U2VnbWVudHM/LltzZWdtZW50SW5kZXhdO1xuXG4gIGlmICghc2VnbWVudCkge1xuICAgIGNvbnNvbGUud2FybihgoA8gU2VnbWVudCBpbmRleCAke3NlZ21lbnRJbmRleH0gbm90IGZvdW5kYCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnMDAxJyxcbiAgICAgIGFpcmxpbmVDb2RlOiAnJyxcbiAgICAgIGZsaWdodE5vOiAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiAnJyxcbiAgICAgIGFycml2YWw6ICcnLFxuICAgICAgY2FiaW5DbGFzczogJycsXG4gICAgICBlcXVpcG1lbnQ6ICcnXG4gICAgfTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCc9zCBbZ2V0RmxpZ2h0RnJvbVNhYnJlRGF0YV0gHz47PUs1IDQwPT1LNSBBNTM8NT1CMDonLCBKU09OLnN0cmluZ2lmeShzZWdtZW50LCBudWxsLCAyKSk7XG5cbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZVRpbWUgPSBzZWdtZW50LkRlcGFydHVyZURhdGVUaW1lO1xuXG4gIGNvbnN0IGVxdWlwbWVudENvZGUgPSBzZWdtZW50LkVxdWlwbWVudD8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnJztcbiAgY29uc3QgZXF1aXBtZW50TmFtZSA9IGVxdWlwbWVudE5hbWVzW2VxdWlwbWVudENvZGVdIHx8IGVxdWlwbWVudENvZGU7IC8vICc1Oz4yNTo+RzhCMDU8PjUgPTA3MjA9ODUgODs4IDo+NFxuXG4gIGlmICghZGVwYXJ0dXJlRGF0ZVRpbWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ6APIFtnZXRGbGlnaHRGcm9tU2FicmVEYXRhXSBEZXBhcnR1cmVEYXRlVGltZSA+QkFDQkFCMkM1QiAyIDQwPT1LRSBBNTM8NT1CMCEnKTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICcwMDEnLFxuICAgICAgYWlybGluZUNvZGU6IHNlZ21lbnQuTWFya2V0aW5nQWlybGluZT8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnJyxcbiAgICAgIGZsaWdodE5vOiBzZWdtZW50LkZsaWdodE51bWJlciB8fCAnJyxcbiAgICAgIGRlcGFydHVyZURhdGU6ICcnLFxuICAgICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICcnLFxuICAgICAgYXJyaXZhbDogc2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICcnLFxuICAgICAgY2FiaW5DbGFzczogJycsXG4gICAgICBlcXVpcG1lbnQ6IGVxdWlwbWVudE5hbWVcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZGVwYXJ0dXJlRGF0ZSA9IGRlcGFydHVyZURhdGVUaW1lLnNwbGl0KCdUJylbMF07IC8vIB5BQjAyO081PCBCPjtMOj4gNDBCQ1xuXG4gIHJldHVybiB7XG4gICAgaWQ6ICcwMDEnLFxuICAgIGFpcmxpbmVDb2RlOiBzZWdtZW50Lk1hcmtldGluZ0FpcmxpbmU/LkVuY29kZURlY29kZUVsZW1lbnQ/LkNvZGUsXG4gICAgZmxpZ2h0Tm86IHNlZ21lbnQuRmxpZ2h0TnVtYmVyLFxuICAgIGRlcGFydHVyZURhdGUsXG4gICAgZGVwYXJ0dXJlOiBzZWdtZW50Lk9yaWdpbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlLFxuICAgIGFycml2YWw6IHNlZ21lbnQuRGVzdGluYXRpb25Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSxcbiAgICBjYWJpbkNsYXNzOiAnJyxcbiAgICBlcXVpcG1lbnQ6IGVxdWlwbWVudE5hbWVcbiAgfTtcbn07IiwiLy8gRDA5OzogY29kZS9jb21wb25lbnRzL2xvYWRQbnJEZXRhaWxzRnJvbVNhYnJlLnRzXG5cbi8qKlxuICogFzAzQEM2MDVCID8+Oz1LNSA0MD09SzUgPiBCNTpDSTU8IDFAPj04QD4yMD04OCAoUE5SKSA4NyBTYWJyZS5cbiAqIFxuICogGEE/PjtMN0M1QiBTT0FQIEFQSSA3MD9APkEgR2V0UmVzZXJ2YXRpb25SUS5cbiAqIBg3Mjs1OjA1QiAwOkI4Mj1LOSBSZWNvcmQgTG9jYXRvciwgPkI/QDAyO081QiA3MD9APkEgOCA/MEBBOEIgPkIyNUIgMiBBQkBDOkJDQEMgUG5yRGF0YS5cbiAqIFxuICogQHBhcmFtIG9uRGF0YUxvYWRlZCAaPjsxTTosIDJLN0syMDU8SzkgPz5BOzUgQ0E/NUg9PjkgNzAzQEM3OjggOCA/MEBBOD0zMCA0MD09S0UgUE5SLlxuICovXG5cbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7IElTb2FwQXBpU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1jb21tdW5pY2F0aW9uL2ludGVyZmFjZXMvSVNvYXBBcGlTZXJ2aWNlJztcbmltcG9ydCB7IFBuclB1YmxpY1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL1BuclB1YmxpY1NlcnZpY2UnO1xuaW1wb3J0IHsgcGFyc2VQbnJEYXRhLCBQbnJEYXRhIH0gZnJvbSAnLi4vdXRpbHMvcGFyY2VQbnJEYXRhJztcblxuZXhwb3J0IGNvbnN0IGxvYWRQbnJEZXRhaWxzRnJvbVNhYnJlID0gYXN5bmMgKG9uRGF0YUxvYWRlZDogKGRhdGE6IFBuckRhdGEpID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwbnJTZXJ2aWNlID0gZ2V0U2VydmljZShQbnJQdWJsaWNTZXJ2aWNlKTtcbiAgICAgICAgY29uc3Qgc29hcEFwaVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElTb2FwQXBpU2VydmljZSk7XG5cbiAgICAgICAgY29uc3QgcmVjb3JkTG9jYXRvciA9IHBuclNlcnZpY2UuZ2V0UmVjb3JkTG9jYXRvcigpO1xuXG4gICAgICAgIGlmICghcmVjb3JkTG9jYXRvcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdObyBhY3RpdmUgUE5SLiBQbGVhc2UgY3JlYXRlIG9yIHJldHJpZXZlIGEgUE5SIGZpcnN0LicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ1JlY29yZCBMb2NhdG9yOicsIHJlY29yZExvY2F0b3IpO1xuXG4gICAgICAgIGNvbnN0IHNvYXBQYXlsb2FkID0gYFxuICAgICAgICAgICAgPG5zNjpHZXRSZXNlcnZhdGlvblJRIHhtbG5zOm5zNj1cImh0dHA6Ly93ZWJzZXJ2aWNlcy5zYWJyZS5jb20vcG5yYnVpbGRlci92MV8xOVwiIFZlcnNpb249XCIxLjE5LjIyXCI+XG4gICAgICAgICAgICAgICAgPG5zNjpSZXF1ZXN0VHlwZT5TdGF0ZWZ1bDwvbnM2OlJlcXVlc3RUeXBlPlxuICAgICAgICAgICAgICAgIDxuczY6UmV0dXJuT3B0aW9ucyB4bWxuczp4c2k9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZVwiIHhzaTp0eXBlPVwibnM2OlJldHVybk9wdGlvbnNcIiBVbm1hc2tDcmVkaXRDYXJkPVwiZmFsc2VcIiBTaG93VGlja2V0U3RhdHVzPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bnM2OlZpZXdOYW1lPkZ1bGw8L25zNjpWaWV3TmFtZT5cbiAgICAgICAgICAgICAgICAgICAgPG5zNjpSZXNwb25zZUZvcm1hdD5TVEw8L25zNjpSZXNwb25zZUZvcm1hdD5cbiAgICAgICAgICAgICAgICA8L25zNjpSZXR1cm5PcHRpb25zPlxuICAgICAgICAgICAgPC9uczY6R2V0UmVzZXJ2YXRpb25SUT5cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNvYXBBcGlTZXJ2aWNlLmNhbGxTd3Moe1xuICAgICAgICAgICAgYWN0aW9uOiAnR2V0UmVzZXJ2YXRpb25SUScsXG4gICAgICAgICAgICBwYXlsb2FkOiBzb2FwUGF5bG9hZCxcbiAgICAgICAgICAgIGF1dGhUb2tlblR5cGU6ICdTRVNTSU9OJ1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZygnR2V0UmVzZXJ2YXRpb25SUSBSZXNwb25zZTonLCByZXNwb25zZSk7XG5cbiAgICAgICAgY29uc3QgcGFyc2VkRGF0YSA9IHBhcnNlUG5yRGF0YShyZXNwb25zZS5nZXRQYXJzZWRWYWx1ZSgpKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnPukgUGFyc2VkIFBOUiBEYXRhOicsIEpTT04uc3RyaW5naWZ5KHBhcnNlZERhdGEsIG51bGwsIDIpKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1NlZ21lbnRzOicsIHBhcnNlZERhdGEuc2VnbWVudHMpO1xuXG4gICAgICAgIC8vIBI+QiA3NDVBTCAySzdLMjA1PCA6PjsxTTosID81QDU0MDIwTyA0MD09SzUhXG4gICAgICAgIG9uRGF0YUxvYWRlZChwYXJzZWREYXRhKTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNhbGxpbmcgR2V0UmVzZXJ2YXRpb25SUSB2aWEgSVNvYXBBcGlTZXJ2aWNlOicsIGVycm9yKTtcbiAgICB9XG59OyIsbnVsbCwiLy8gRDA5OzogY29kZS9jb21wb25lbnRzL2xvYWRTZWF0TWFwRnJvbVNhYnJlLnRzXG5cbi8qKlxuICogFzAzQEM2MDVCIFNlYXRNYXAgNDtPIDcwNDA9PT4zPiBBNTM8NT1CMCBANTlBMCA4IEE/OEE6MCA/MEFBMDY4QD4yLlxuICogXG4gKiAYQT8+O0w3QzVCIFNhYnJlIEVuaGFuY2VkU2VhdE1hcFJRIEc1QDU3IFNPQVAgQVBJLlxuICogJD5APDhAQzVCIDggPkI/QDAyO081QiA3MD9APkEgQSA0MD09Szw4ID4gQDU5QTUsID8wQUEwNjhAMEUgOCA6OzBBQTUgPjFBO0M2ODIwPThPLlxuICogXG4gKiBAcGFyYW0gZmxpZ2h0U2VnbWVudCAUMD09SzUgQTUzPDU9QjAgQDU5QTAgKDM+QD40ID5CP0AwMjs1PThPLCA/QDgxS0I4TywgNDBCMCwgPzVANTI+N0c4OiA4IEIuNC4pLlxuICogQHBhcmFtIHBhc3NlbmdlcnMgIT84QT46ID8wQUEwNjhAPjIgNDtPIDcwP0A+QTAuXG4gKiBAcGFyYW0gb25TdWNjZXNzIBo+OzFNOiwgMks3SzIwNTxLOSA/QDggQ0E/NUg9PjwgPz47Q0c1PTg4IDowQEJLIDw1QUIuXG4gKiBAcGFyYW0gb25FcnJvciAoPj9GOD49MDtMPT4pIBo+OzFNOiA0O08gPjFAMDE+Qjo4ID5IODE+OiA/QDggMks3PjI1IEFQSS5cbiAqL1xuXG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBJU29hcEFwaVNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtY29tbXVuaWNhdGlvbi9pbnRlcmZhY2VzL0lTb2FwQXBpU2VydmljZSc7XG5cbmludGVyZmFjZSBQYXNzZW5nZXIge1xuICAgIHRyYXZlbGxlcklkOiBudW1iZXI7XG4gICAgZ2l2ZW5OYW1lOiBzdHJpbmc7XG4gICAgc3VybmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgRmxpZ2h0U2VnbWVudCB7XG4gICAgb3JpZ2luOiBzdHJpbmc7XG4gICAgZGVzdGluYXRpb246IHN0cmluZztcbiAgICBkZXBhcnR1cmVEYXRlOiBzdHJpbmc7XG4gICAgbWFya2V0aW5nQ2Fycmllcjogc3RyaW5nO1xuICAgIG1hcmtldGluZ0ZsaWdodE51bWJlcjogc3RyaW5nO1xuICAgIGZsaWdodE51bWJlcjogc3RyaW5nO1xuICAgIGJvb2tpbmdDbGFzczogc3RyaW5nO1xuICAgIGNhYmluPzogJ0Vjb25vbXknIHwgJ1ByZW1pdW1FY29ub215JyB8ICdCdXNpbmVzcycgfCAnRmlyc3QnOyAvLyA8lSA0PjEwMjg7OFxufVxuXG5leHBvcnQgY29uc3QgbG9hZFNlYXRNYXBGcm9tU2FicmUgPSBhc3luYyAoXG4gICAgZmxpZ2h0U2VnbWVudDogRmxpZ2h0U2VnbWVudCxcbiAgICBwYXNzZW5nZXJzOiBQYXNzZW5nZXJbXSxcbiAgICBvblN1Y2Nlc3M6IChyZXNwb25zZTogYW55KSA9PiB2b2lkLFxuICAgIG9uRXJyb3I/OiAoZXJyb3I6IGFueSkgPT4gdm9pZFxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc29hcEFwaVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElTb2FwQXBpU2VydmljZSk7XG5cbiAgICAgICAgY29uc3QgcGFzc2VuZ2VyQmxvY2tzID0gcGFzc2VuZ2Vycy5tYXAocGFzc2VuZ2VyID0+IGBcbiAgICAgICAgICAgIDxuczQ6RmFyZUF2YWlsUXVhbGlmaWVycyBwYXNzZW5nZXJUeXBlPVwiQURUXCI+XG4gICAgICAgICAgICAgICAgPG5zNDpUcmF2ZWxsZXJJRD4ke3Bhc3Nlbmdlci50cmF2ZWxsZXJJZH08L25zNDpUcmF2ZWxsZXJJRD5cbiAgICAgICAgICAgICAgICA8bnM0OkdpdmVuTmFtZT4ke3Bhc3Nlbmdlci5naXZlbk5hbWV9PC9uczQ6R2l2ZW5OYW1lPlxuICAgICAgICAgICAgICAgIDxuczQ6U3VybmFtZT4ke3Bhc3Nlbmdlci5zdXJuYW1lfTwvbnM0OlN1cm5hbWU+XG4gICAgICAgICAgICAgICAgPG5zNDpTU1I+VEtORTwvbnM0OlNTUj5cbiAgICAgICAgICAgIDwvbnM0OkZhcmVBdmFpbFF1YWxpZmllcnM+XG4gICAgICAgIGApLmpvaW4oJycpO1xuXG4gICAgICAgIGNvbnN0IGNhYmluRGVmaW5pdGlvbkJsb2NrID0gZmxpZ2h0U2VnbWVudC5ib29raW5nQ2xhc3MgPyBgXG4gICAgICAgIDxuczQ6Q2FiaW5EZWZpbml0aW9uPlxuICAgICAgICAgICAgPG5zNDpSQkQ+JHtmbGlnaHRTZWdtZW50LmJvb2tpbmdDbGFzc308L25zNDpSQkQ+XG4gICAgICAgIDwvbnM0OkNhYmluRGVmaW5pdGlvbj5cbiAgICAgICAgYCA6IGBcbiAgICAgICAgICAgIDxuczQ6Q2FiaW5EZWZpbml0aW9uPlxuICAgICAgICAgICAgICAgIDxuczQ6Q2FiaW4+JHtmbGlnaHRTZWdtZW50LmNhYmlufTwvbnM0OkNhYmluPlxuICAgICAgICAgICAgPC9uczQ6Q2FiaW5EZWZpbml0aW9uPlxuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IHNvYXBQYXlsb2FkID0gYFxuICAgICAgICAgICAgPG5zNDpFbmhhbmNlZFNlYXRNYXBSUSB4bWxuczpuczQ9XCJodHRwOi8vc3RsLnNhYnJlLmNvbS9NZXJjaGFuZGlzaW5nL3Y4XCI+XG4gICAgICAgICAgICAgICAgPG5zNDpTZWF0TWFwUXVlcnlFbmhhbmNlZD5cbiAgICAgICAgICAgICAgICAgICAgPG5zNDpSZXF1ZXN0VHlwZT5QYXlsb2FkPC9uczQ6UmVxdWVzdFR5cGU+XG5cbiAgICAgICAgICAgICAgICAgICAgPG5zNDpQT1MgY29tcGFueT1cIkRJOUxcIiBtdWx0aUhvc3Q9XCJESTlMXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bnM0OkFjdHVhbCBjaXR5PVwiTVVDXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5zNDpQQ0M+REk5TDwvbnM0OlBDQz5cbiAgICAgICAgICAgICAgICAgICAgPC9uczQ6UE9TPlxuXG4gICAgICAgICAgICAgICAgICAgIDxuczQ6RmxpZ2h0IGlkPVwiZjFcIiBkZXN0aW5hdGlvbj1cIiR7ZmxpZ2h0U2VnbWVudC5kZXN0aW5hdGlvbn1cIiBvcmlnaW49XCIke2ZsaWdodFNlZ21lbnQub3JpZ2lufVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5zNDpEZXBhcnR1cmVEYXRlPiR7ZmxpZ2h0U2VnbWVudC5kZXBhcnR1cmVEYXRlfTwvbnM0OkRlcGFydHVyZURhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bnM0Ok1hcmtldGluZyBjYXJyaWVyPVwiJHtmbGlnaHRTZWdtZW50Lm1hcmtldGluZ0NhcnJpZXJ9XCI+JHtmbGlnaHRTZWdtZW50Lm1hcmtldGluZ0ZsaWdodE51bWJlcn08L25zNDpNYXJrZXRpbmc+XG4gICAgICAgICAgICAgICAgICAgIDwvbnM0OkZsaWdodD5cblxuICAgICAgICAgICAgICAgICAgICAke2NhYmluRGVmaW5pdGlvbkJsb2NrfVxuXG4gICAgICAgICAgICAgICAgICAgIDxuczQ6Q3VycmVuY3k+VVNEPC9uczQ6Q3VycmVuY3k+XG5cbiAgICAgICAgICAgICAgICAgICAgJHtwYXNzZW5nZXJCbG9ja3N9XG4gICAgICAgICAgICAgICAgPC9uczQ6U2VhdE1hcFF1ZXJ5RW5oYW5jZWQ+XG4gICAgICAgICAgICAgICAgPG5zNDpDYWxjdWxhdGVEaXNjb3VudD50cnVlPC9uczQ6Q2FsY3VsYXRlRGlzY291bnQ+XG4gICAgICAgICAgICAgICAgPG5zNDpTaG93T2ZmZXJzPnRydWU8L25zNDpTaG93T2ZmZXJzPiBcbiAgICAgICAgICAgIDwvbnM0OkVuaGFuY2VkU2VhdE1hcFJRPlxuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCc95CBTZW5kaW5nIEVuaGFuY2VkU2VhdE1hcFJRIHBheWxvYWQ6Jywgc29hcFBheWxvYWQpO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc29hcEFwaVNlcnZpY2UuY2FsbFN3cyh7XG4gICAgICAgICAgICBhY3Rpb246ICdFbmhhbmNlZFNlYXRNYXBSUScsXG4gICAgICAgICAgICBwYXlsb2FkOiBzb2FwUGF5bG9hZCxcbiAgICAgICAgICAgIGF1dGhUb2tlblR5cGU6ICdTRVNTSU9OJ1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZygnBSBFbmhhbmNlZFNlYXRNYXBSUSBSZXNwb25zZTonLCByZXNwb25zZSk7XG5cbiAgICAgICAgb25TdWNjZXNzKHJlc3BvbnNlLmdldFBhcnNlZFZhbHVlKCkpO1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTCBFcnJvciBjYWxsaW5nIEVuaGFuY2VkU2VhdE1hcFJROicsIGVycm9yKTtcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufTsiLG51bGwsbnVsbCwiLy8gRDA5OyBjb2RlL2NvbXBvbmVudHMvcGFyc2VTZWF0TWFwUmVzcG9uc2UudHNcblxuLyoqXG4gKiAfMEBBOEIgPkIyNUIgPkIgRW5oYW5jZWRTZWF0TWFwUlMgOCAyPjcyQDBJMDVCIEFCQEM6QkNAQyA6MEBCSyBBMDs+PTAuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBQYXJzZWRTZWF0TWFwIHtcbiAgICBsYXlvdXQ6IGFueTtcbiAgICBhdmFpbGFiaWxpdHk6IGFueTtcbiAgICBwYXNzZW5nZXJzOiBhbnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNlYXRNYXBSZXNwb25zZSh4bWxEb2N1bWVudDogRG9jdW1lbnQpOiBQYXJzZWRTZWF0TWFwIHtcbiAgICBjb25zb2xlLmxvZygnPeUgHTBHOD0wNTwgQDA3MT5AID5CMjVCMCBFbmhhbmNlZFNlYXRNYXBSUycpO1xuXG4gICAgY29uc3QgbGF5b3V0ID0ge1xuICAgICAgICBkZWNrczogW10sXG4gICAgfTtcbiAgICBjb25zdCBhdmFpbGFiaWxpdHkgPSBbXTtcbiAgICBjb25zdCBwYXNzZW5nZXJzID0gW107XG5cbiAgICAvLyAxLiAdMEU+NDg8IDJBNSA6MDE4PUsgKENhYmluKVxuICAgIGNvbnN0IGNhYmluTm9kZXMgPSB4bWxEb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnQ2FiaW4nKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FiaW5Ob2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjYWJpbk5vZGUgPSBjYWJpbk5vZGVzW2ldO1xuICAgICAgICBjb25zdCByb3dzID0gW107XG5cbiAgICAgICAgY29uc3Qgcm93Tm9kZXMgPSBjYWJpbk5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1JvdycpO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93Tm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd05vZGUgPSByb3dOb2Rlc1tqXTtcbiAgICAgICAgICAgIGNvbnN0IHJvd0xhYmVsID0gcm93Tm9kZS5nZXRBdHRyaWJ1dGUoJ251bWJlcicpIHx8IChqICsgMSkudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgY29uc3Qgc2VhdE5vZGVzID0gcm93Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnU2VhdCcpO1xuICAgICAgICAgICAgY29uc3Qgc2VhdHMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzZWF0Tm9kZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWF0Tm9kZSA9IHNlYXROb2Rlc1trXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWF0TGFiZWwgPSBzZWF0Tm9kZS5nZXRBdHRyaWJ1dGUoJ251bWJlcicpIHx8ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSA1MCArIGsgKiA1MDsgLy8gH0A+QUI1OUg1NSA/Pjc4Rjg+PThAPjIwPTg1ID8+IFhcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gNTAgKyBqICogNTA7IC8vIB9APkFCNTlINTUgPz43OEY4Pj04QD4yMD04NSA/PiBZXG5cbiAgICAgICAgICAgICAgICBzZWF0cy5wdXNoKHsgbGFiZWw6IHNlYXRMYWJlbCwgeCwgeSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcm93cy5wdXNoKHsgbGFiZWw6IHJvd0xhYmVsLCBzZWF0cyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxheW91dC5kZWNrcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBgZGVjay0ke2l9YCxcbiAgICAgICAgICAgIG5hbWU6IGBEZWNrICR7aSArIDF9YCxcbiAgICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIHJvd3MsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIDIuIB0wRT40ODwgP0A1NDs+NjU9OE8gKE9mZmVycyCSIDw1QUIwLCA0PkFCQz89SzUgNDtPID8+OkM/OjgpXG4gICAgY29uc3Qgb2ZmZXJOb2RlcyA9IHhtbERvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdPZmZlcicpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvZmZlck5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG9mZmVyTm9kZSA9IG9mZmVyTm9kZXNbaV07XG5cbiAgICAgICAgY29uc3Qgc2VhdE51bWJlciA9IG9mZmVyTm9kZS5nZXRBdHRyaWJ1dGUoJ3NlYXROdW1iZXInKTtcbiAgICAgICAgY29uc3QgcHJpY2VOb2RlID0gb2ZmZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJ1ByaWNlID4gVG90YWxBbW91bnQnKTtcbiAgICAgICAgY29uc3QgcHJpY2UgPSBwcmljZU5vZGU/LnRleHRDb250ZW50IHx8ICcwJztcbiAgICAgICAgY29uc3QgY3VycmVuY3kgPSBwcmljZU5vZGU/LmdldEF0dHJpYnV0ZSgnY3VycmVuY3lDb2RlJykgfHwgJ1VTRCc7XG5cbiAgICAgICAgYXZhaWxhYmlsaXR5LnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6IHNlYXROdW1iZXIsXG4gICAgICAgICAgICBwcmljZTogcGFyc2VGbG9hdChwcmljZSksXG4gICAgICAgICAgICBjdXJyZW5jeSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gMy4gHzBBQTA2OEBLIChDP0A+SVE9PT4sIDw+Nj0+ID8+NzY1IDQ+QDAxPkIwQkwpXG4gICAgcGFzc2VuZ2Vycy5wdXNoKHsgaWQ6ICdQQVgxJywgbmFtZTogJ1Bhc3NlbmdlciAxJywgdHlwZTogJ0FEVCcgfSk7XG5cbiAgICBjb25zb2xlLmxvZygnBSAgMDc+MUAwPT1LNSA0MD09SzU6JywgeyBsYXlvdXQsIGF2YWlsYWJpbGl0eSwgcGFzc2VuZ2VycyB9KTtcblxuICAgIHJldHVybiB7IGxheW91dCwgYXZhaWxhYmlsaXR5LCBwYXNzZW5nZXJzIH07XG59IiwiaW1wb3J0IHsgRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LXhwL3NlcnZpY2VzL0V4dGVuc2lvblBvaW50U2VydmljZSc7XG5pbXBvcnQgeyBOb3ZpY2VCdXR0b25Db25maWcgfSBmcm9tICdzYWJyZS1uZ3YteHAvY29uZmlncy9Ob3ZpY2VCdXR0b25Db25maWcnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uL0NvbnRleHQnOyAvLyA1QTs4IEM2NSA/PjQ6O05HNT0+IDIgTWFpbi50c1xuaW1wb3J0IHsgU2VhdE1hcHNQb3BvdmVyIH0gZnJvbSAnLi9TZWF0TWFwc1BvcG92ZXInOyAvLyBNQj4gUmVhY3QtOj48Pz49NT1CIDQ7TyA/Pj8+MjVAMFxuXG4vLyAdFSAgEBEeIhAVIiEhISAaPT4/OjAgPTUgMjg0PTAhXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbW1hbmRIZWxwZXJCdXR0b24oKSB7XG4gICAgY29uc3Qgb25DbGljayA9IChpc09wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NlYXRNYXBzIEFCQyAzNjAgYnV0dG9uIGNsaWNrZWQuIFBvcG92ZXIgaXNPcGVuOicsIGlzT3Blbik7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTZWF0TWFwcyBBQkMgMzYwIHBvcG92ZXIgY2xvc2VkJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBOb3ZpY2VCdXR0b25Db25maWcoXG4gICAgICAgICdTZWF0TWFwcyBBQkMgMzYwJywgICAgICAgLy8gTGFiZWxcbiAgICAgICAgJ2ZhLXBsYW5lJywgICAgICAgICAgICAgICAvLyAYOj49OjAgRm9udEF3ZXNvbWVcbiAgICAgICAgJ3NlYXRtYXBzLWFiYzM2MCcsIC8vIENTUyA6OzBBQSA0O08gPz4/PjI1QDAgKDw+NjVITCA/NUA1Pj9ANTQ1OzhCTCBBQjg7OCA/PkI+PClcbiAgICAgICAgU2VhdE1hcHNQb3BvdmVyLCAgICAgICAgICAvLyAaPjw/Pj01PUIgPz4/PjI1QDBcbiAgICAgICAgLTEwMDAsICAgICAgICAgICAgICAgICAgICAvLyAfQDg+QDhCNUI6IDFDNDVCIEE7NTIwXG4gICAgICAgIG9uQ2xpY2ssICAgICAgICAgICAgICAgICAgLy8gH0A4IDo7ODo1XG4gICAgICAgIG9uQ2xvc2UgICAgICAgICAgICAgICAgICAgLy8gH0A4IDcwOkBLQjg4XG4gICAgKTtcblxuICAgIGdldFNlcnZpY2UoRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlKS5hZGRDb25maWcoJ25vdmljZS1idXR0b25zJywgY29uZmlnKTtcbn0iLCIvLyBEMDk7OiBjb2RlL2NvbXBvbmVudHMvU2VhdE1hcENvbXBvbmVudC50c3hcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbnRlcmZhY2UgU2VhdE1hcENvbXBvbmVudFByb3BzIHtcbiAgICBwYXNzZW5nZXJJZHM6IHN0cmluZ1tdO1xuICAgIHNlZ21lbnRJZDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgU2VhdE1hcENvbXBvbmVudFN0YXRlIHtcbiAgICBsYXlvdXQ6IGFueSB8IG51bGw7XG59XG5cbmV4cG9ydCBjbGFzcyBTZWF0TWFwQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFNlYXRNYXBDb21wb25lbnRQcm9wcywgU2VhdE1hcENvbXBvbmVudFN0YXRlPiB7XG4gICAgaWZyYW1lUmVmID0gUmVhY3QuY3JlYXRlUmVmPEhUTUxJRnJhbWVFbGVtZW50PigpO1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IFNlYXRNYXBDb21wb25lbnRQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBsYXlvdXQ6IG51bGxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVMb2FkU2VhdE1hcCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgLy8gPYAgEjw1QUI+IDcwP0A+QTAgLSBCNUFCPjJLOSBsYXlvdXRcbiAgICAgICAgY29uc3QgZHVtbXlMYXlvdXQgPSB7XG4gICAgICAgICAgICBkZWNrczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdtYWluLWRlY2snLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICcyJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiAxMDAgfV0gfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYXlvdXQ6IGR1bW15TGF5b3V0IH0sICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcFIER1bW15IGxheW91dCBzZXQuIFNlbmRpbmcgdG8gaWZyYW1lLi4uJyk7XG4gICAgICAgICAgICB0aGlzLnNlbmRTZWF0TWFwRGF0YSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VuZFNlYXRNYXBEYXRhID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmlmcmFtZVJlZi5jdXJyZW50O1xuICAgICAgICBpZiAoIWlmcmFtZT8uY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCegDyBpZnJhbWUgbm90IHJlYWR5Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWF0TWFwRGF0YSA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge30sXG4gICAgICAgICAgICBmbGlnaHQ6IHtcbiAgICAgICAgICAgICAgICBpZDogJ2YxJyxcbiAgICAgICAgICAgICAgICBhaXJsaW5lQ29kZTogJ0VLJyxcbiAgICAgICAgICAgICAgICBmbGlnaHRObzogJzUwJyxcbiAgICAgICAgICAgICAgICBkZXBhcnR1cmVEYXRlOiAnMjAyNS0wNS0zMCcsXG4gICAgICAgICAgICAgICAgZGVwYXJ0dXJlOiAnTVVDJyxcbiAgICAgICAgICAgICAgICBhcnJpdmFsOiAnRFhCJyxcbiAgICAgICAgICAgICAgICBjYWJpbkNsYXNzOiAnWSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYXlvdXQ6IHRoaXMuc3RhdGUubGF5b3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ3NlYXRNYXBzJyxcbiAgICAgICAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgICAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgICAgICAgICAgIGxheW91dDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEubGF5b3V0KVxuICAgICAgICB9LCAnKicpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCc95CBTZW50IHNlYXRNYXBEYXRhIHRvIGlmcmFtZTonLCBzZWF0TWFwRGF0YSk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHsgcGFzc2VuZ2VySWRzLCBzZWdtZW50SWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgbGF5b3V0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcyMHB4JywgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsIG1pbkhlaWdodDogJzQwMHB4JyB9fT5cbiAgICAgICAgICAgICAgICA8aDI+U2VhdCBNYXA8L2gyPlxuXG4gICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5GbGlnaHQgU2VnbWVudDo8L3N0cm9uZz4ge3NlZ21lbnRJZH08L3A+XG5cbiAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlNlbGVjdGVkIFBhc3NlbmdlcnM6PC9zdHJvbmc+PC9wPlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAge3Bhc3Nlbmdlcklkcy5tYXAoKHBhc3NlbmdlcklkLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PntwYXNzZW5nZXJJZH08L2xpPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuXG4gICAgICAgICAgICAgICAgPGhyIC8+XG5cbiAgICAgICAgICAgICAgICB7IWxheW91dCA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZWVmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGVtPlNlYXQgbWFwIHZpc3VhbGl6YXRpb24gY29taW5nIHNvb24rKys8L2VtPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTG9hZFNlYXRNYXB9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPYAgTG9hZCBEdW1teSBTZWF0IE1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxpZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5pZnJhbWVSZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL3F1aWNrZXQuaW8vcmVhY3QtcHJveHktYXBwL1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJywgbWFyZ2luVG9wOiAnMjBweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiU2VhdE1hcElmcmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkxvYWQ9e3RoaXMuc2VuZFNlYXRNYXBEYXRhfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiLy8gU2VhdE1hcENvbXBvbmVudEF2YWlsLnRzeFxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRGbGlnaHRGcm9tU2FicmVEYXRhIH0gZnJvbSAnLi4vY29tcG9uZW50cy9nZXRGbGlnaHRGcm9tU2FicmVEYXRhJztcblxuaW50ZXJmYWNlIFNlYXRNYXBQcm9wcyB7XG4gIGNvbmZpZzogYW55O1xuICBkYXRhOiBhbnk7XG59XG5cbmNvbnN0IFtzZWxlY3RlZENhYmluQ2xhc3MsIHNldFNlbGVjdGVkQ2FiaW5DbGFzc10gPSB1c2VTdGF0ZSgnRWNvbm9teScpO1xuXG5jb25zdCBjYWJpbkNsYXNzZXMgPSBbXG4gIHsgbGFiZWw6ICdFY29ub215JywgdmFsdWU6ICdFY29ub215JyB9LFxuICB7IGxhYmVsOiAnUHJlbWl1bSBFY29ub215JywgdmFsdWU6ICdQcmVtaXVtRWNvbm9teScgfSxcbiAgeyBsYWJlbDogJ0J1c2luZXNzJywgdmFsdWU6ICdCdXNpbmVzcycgfSxcbiAgeyBsYWJlbDogJ0ZpcnN0JywgdmFsdWU6ICdGaXJzdCcgfVxuXTtcblxuY29uc3QgU2VhdE1hcENvbXBvbmVudEF2YWlsOiBSZWFjdC5GQzxTZWF0TWFwUHJvcHM+ID0gKHsgY29uZmlnLCBkYXRhIH0pID0+IHtcbiAgY29uc3QgW3NlZ21lbnRJbmRleCwgc2V0U2VnbWVudEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4gIC8vID0NIBs+MzhAQzU8IDJFPjRPSTg1IDQwPT1LNVxuICBjb25zb2xlLmxvZygnPTkgW1NlYXRNYXBDb21wb25lbnRdIHJlY2VpdmVkIHByb3BzOicsIHsgY29uZmlnLCBkYXRhIH0pO1xuXG4gIGNvbnN0IGZsaWdodCA9IGdldEZsaWdodEZyb21TYWJyZURhdGEoZGF0YSwgc2VnbWVudEluZGV4KTsgLy8gTUI+IEE1Mzw1PUIgPz47NUIwIGMgNDBCPjlcbiAgY29uc3QgZmxpZ2h0U2VnbWVudHMgPSBkYXRhLmZsaWdodFNlZ21lbnRzIHx8IFtdO1xuXG4gIC8vID0NIBs+MzhAQzU8IEFEPkA8OEA+MjA9PUs5IGZsaWdodFxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRdIHBhcnNlZCBmbGlnaHQ6JywgZmxpZ2h0KTtcblxuICBjb25zdCBzZWF0TWFwRGF0YSA9IHtcbiAgICBjb25maWcsXG4gICAgZmxpZ2h0LFxuICAgIGxheW91dDoge1xuICAgICAgZGVja3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICcyJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiAxMDAgfV0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgYXZhaWxhYmlsaXR5OiBbXG4gICAgICB7IGxhYmVsOiAnMUEnLCBwcmljZTogNTAsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICdncmVlbicsIG9ubHlGb3JQYXNzZW5nZXJUeXBlOiBbJ0FEVCddIH0sXG4gICAgICB7IGxhYmVsOiAnMUInLCBwcmljZTogNDUsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICd5ZWxsb3cnLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzJBJywgcHJpY2U6IDMwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnbGlnaHRibHVlJyB9XG4gICAgXSxcbiAgICBwYXNzZW5nZXJzOiBbeyBpZDogJ1BBWDEnLCBuYW1lOiAnGDIwPT4yIBguGC4nLCB0eXBlOiAnQURUJyB9XVxuICB9O1xuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGNvbnN0IHNlbmRUb0lmcmFtZSA9ICgpID0+IHtcbiAgICBjb25zdCBpZnJhbWUgPSBpZnJhbWVSZWYuY3VycmVudDtcbiAgICBpZiAoIWlmcmFtZT8uY29udGVudFdpbmRvdykge1xuICAgICAgY29uc29sZS53YXJuKCegDyBpZnJhbWUgb3IgY29udGVudFdpbmRvdyBub3QgYXZhaWxhYmxlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICAvLyA9JSAeMT0+MjtPNTwgZmxpZ2h0LmNhYmluQ2xhc3MgPzVANTQgPkI/QDAyOj45XG4gICAgY29uc3QgdXBkYXRlZEZsaWdodCA9IHtcbiAgICAgIC4uLmdldEZsaWdodEZyb21TYWJyZURhdGEoZGF0YSwgc2VnbWVudEluZGV4KSxcbiAgICAgIGNhYmluQ2xhc3M6IHNlbGVjdGVkQ2FiaW5DbGFzc1xuICAgIH07XG4gIFxuICAgIGNvbnN0IHNlYXRNYXBEYXRhID0ge1xuICAgICAgY29uZmlnLFxuICAgICAgZmxpZ2h0OiB1cGRhdGVkRmxpZ2h0LFxuICAgICAgbGF5b3V0OiB7XG4gICAgICAgIGRlY2tzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICdtYWluLWRlY2snLFxuICAgICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgICAgeyBsYWJlbDogJzInLCBzZWF0czogW3sgbGFiZWw6ICdBJywgeDogNTAsIHk6IDEwMCB9XSB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgYXZhaWxhYmlsaXR5OiBbXG4gICAgICAgIHsgbGFiZWw6ICcxQScsIHByaWNlOiA1MCwgY3VycmVuY3k6ICdVU0QnLCBjb2xvcjogJ2dyZWVuJywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgICAgeyBsYWJlbDogJzFCJywgcHJpY2U6IDQ1LCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAneWVsbG93Jywgb25seUZvclBhc3NlbmdlclR5cGU6IFsnQURUJ10gfSxcbiAgICAgICAgeyBsYWJlbDogJzJBJywgcHJpY2U6IDMwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnbGlnaHRibHVlJyB9XG4gICAgICBdLFxuICAgICAgcGFzc2VuZ2VyczogW3sgaWQ6ICdQQVgxJywgbmFtZTogJxgyMD0+MiAYLhguJywgdHlwZTogJ0FEVCcgfV1cbiAgICB9O1xuICBcbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgdHlwZTogJ3NlYXRNYXBzJyxcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgICAgIGxheW91dDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEubGF5b3V0KSxcbiAgICAgIC8vIGF2YWlsYWJpbGl0eTogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuYXZhaWxhYmlsaXR5KSxcbiAgICAgIC8vIHBhc3NlbmdlcnM6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLnBhc3NlbmdlcnMpXG4gICAgfTtcbiAgXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50XSBzZW5kaW5nIHRvIGlmcmFtZSB3aXRoIGRhdGE6Jywge1xuICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5jb25maWcpLFxuICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShzZWF0TWFwRGF0YS5mbGlnaHQpLFxuICAgIH0pO1xuICBcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGNvbnNvbGUubG9nKCc+4CBTZWF0TWFwQ29tcG9uZW50IGlzIHJlbmRlcmluZyEnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc94A8gU2VhdE1hcENvbXBvbmVudCBtb3VudGVkJyk7XG4gICAgY29uc29sZS5sb2coYD0EIFNlZ21lbnQgaW5kZXggY2hhbmdlZDogJHtzZWdtZW50SW5kZXh9YCk7XG4gICAgc2VuZFRvSWZyYW1lKCk7IC8vID5CP0AwMjowID9AOCA4Nzw1PTU9ODggQTUzPDU9QjBcbiAgfSwgW3NlZ21lbnRJbmRleF0pO1xuXG4gIHJldHVybiAoXG5cbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIHsvKiA+Oj0+IEEgNDA9PUs8OCA+IEA1OUE1ICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShmbGlnaHQsIG51bGwsIDIpfTwvcHJlPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2VnbWVudFNlbGVjdFwiPhJLMTVAOEI1IEE1Mzw1PUI6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBpZD1cInNlZ21lbnRTZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXtzZWdtZW50SW5kZXh9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWdtZW50SW5kZXgoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9PlxuICAgICAgICAgIHtmbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9PlxuICAgICAgICAgICAgICB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICdYWCd9IHtzZWdtZW50LkZsaWdodE51bWJlciB8fCAnMDAwJ31cbiAgICAgICAgICAgICAgJm5ic3A7kiZuYnNwO1xuICAgICAgICAgICAgICB7c2VnbWVudC5PcmlnaW5Mb2NhdGlvbj8uRW5jb2RlRGVjb2RlRWxlbWVudD8uQ29kZSB8fCAnPz8/J30gE1xuICAgICAgICAgICAgICB7c2VnbWVudC5EZXN0aW5hdGlvbkxvY2F0aW9uPy5FbmNvZGVEZWNvZGVFbGVtZW50Py5Db2RlIHx8ICc/Pz8nfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwiY2FiaW5DbGFzc1NlbGVjdFwiPhJLMTVAOEI1IDo7MEFBICg6MDE4PUMpOiA8L2xhYmVsPlxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgaWQ9XCJjYWJpbkNsYXNzU2VsZWN0XCJcbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDYWJpbkNsYXNzfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRDYWJpbkNsYXNzKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtjYWJpbkNsYXNzZXMubWFwKChjYWJpbikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2NhYmluLnZhbHVlfSB2YWx1ZT17Y2FiaW4udmFsdWV9PlxuICAgICAgICAgICAgICB7Y2FiaW4ubGFiZWx9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXsoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBDb21wb25lbnRdIGlmcmFtZSBsb2FkZWQsIHNlbmRpbmcgZGF0YS4uLicpO1xuICAgICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWF0TWFwQ29tcG9uZW50QXZhaWw7IiwiLy8gRDA5OzogU2VhdE1hcENvbXBvbmVudFBuci50c3hcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5cbmludGVyZmFjZSBTZWF0TWFwQ29tcG9uZW50UG5yUHJvcHMge1xuICAgIGxheW91dDogYW55O1xuICAgIGNvbmZpZzogYW55O1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50UG5yOiBSZWFjdC5GQzxTZWF0TWFwQ29tcG9uZW50UG5yUHJvcHM+ID0gKHsgbGF5b3V0LCBjb25maWcgfSkgPT4ge1xuICAgIGNvbnN0IGlmcmFtZVJlZiA9IHVzZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4obnVsbCk7XG5cbiAgICBjb25zdCBmbGlnaHQgPSB7XG4gICAgICAgIGlkOiAnMDAxJywgLy8gPD42PT4gMUM0NUIgNzA8NT04QkwgPTAgQDUwO0w9SzkgPz5CPjxcbiAgICAgICAgYWlybGluZUNvZGU6ICdFSycsXG4gICAgICAgIGZsaWdodE5vOiAnNTAnLFxuICAgICAgICBkZXBhcnR1cmVEYXRlOiAnMjAyNS0wNS0zMCcsXG4gICAgICAgIGRlcGFydHVyZTogJ01VQycsXG4gICAgICAgIGFycml2YWw6ICdEWEInLFxuICAgICAgICBjYWJpbkNsYXNzOiAnWSdcbiAgICB9O1xuXG4gICAgY29uc3Qgc2VuZFRvSWZyYW1lID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpZnJhbWUgPSBpZnJhbWVSZWYuY3VycmVudDtcbiAgICAgICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIG9yIGNvbnRlbnRXaW5kb3cgbm90IGF2YWlsYWJsZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdzZWF0TWFwcycsXG4gICAgICAgICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KGNvbmZpZyksXG4gICAgICAgICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KGZsaWdodCksXG4gICAgICAgICAgICBsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KGxheW91dCksXG5cbiAgICAgICAgICAgIC8vIGF2YWlsYWJpbGl0eSA4IHBhc3NlbmdlcnMgPz46MCA9NSA/NUA1NDA1PFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCc95CBbU2VhdE1hcENvbXBvbmVudFBucl0gc2VuZGluZyB0byBpZnJhbWU6JywgbWVzc2FnZSk7XG4gICAgICAgIGlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsICcqJyk7XG4gICAgfTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc94A8gW1NlYXRNYXBDb21wb25lbnRQbnJdIG1vdW50ZWQsIHNlbmRpbmcgc2VhdCBtYXAgZGF0YSB0byBpZnJhbWUnKTtcbiAgICAgICAgc2VuZFRvSWZyYW1lKCk7XG4gICAgfSwgW2xheW91dF0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMXJlbScgfX0+XG4gICAgICAgICAgICA8aDI+PesgU2VhdCBNYXAgZnJvbSBQTlI8L2gyPlxuXG4gICAgICAgICAgICA8aWZyYW1lXG4gICAgICAgICAgICAgICAgcmVmPXtpZnJhbWVSZWZ9XG4gICAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgaGVpZ2h0PVwiODAwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIlNlYXRNYXBJZnJhbWVcIlxuICAgICAgICAgICAgICAgIG9uTG9hZD17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnBSBbU2VhdE1hcENvbXBvbmVudFBucl0gaWZyYW1lIGxvYWRlZCwgc2VuZGluZyBzZWF0IG1hcCBkYXRhLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudFBucjsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmludGVyZmFjZSBTZWF0TWFwQ29tcG9uZW50UHJpY2luZ1Byb3BzIHtcbiAgY29uZmlnOiBhbnk7XG4gIGZsaWdodFNlZ21lbnRzOiBhbnlbXTtcbiAgc2VsZWN0ZWRTZWdtZW50SW5kZXg6IG51bWJlcjtcbn1cblxuY29uc3QgU2VhdE1hcENvbXBvbmVudFByaWNpbmc6IFJlYWN0LkZDPFNlYXRNYXBDb21wb25lbnRQcmljaW5nUHJvcHM+ID0gKHtcbiAgY29uZmlnLFxuICBmbGlnaHRTZWdtZW50cyxcbiAgc2VsZWN0ZWRTZWdtZW50SW5kZXhcbn0pID0+IHtcbiAgY29uc3QgW3NlZ21lbnRJbmRleCwgc2V0U2VnbWVudEluZGV4XSA9IHVzZVN0YXRlKHNlbGVjdGVkU2VnbWVudEluZGV4KTtcbiAgY29uc3QgaWZyYW1lUmVmID0gdXNlUmVmPEhUTUxJRnJhbWVFbGVtZW50PihudWxsKTtcblxuICBjb25zdCBjdXJyZW50U2VnbWVudCA9IGZsaWdodFNlZ21lbnRzW3NlZ21lbnRJbmRleF0gfHwge307XG5cbiAgY29uc3Qgc2VhdE1hcERhdGEgPSB7XG4gICAgY29uZmlnLFxuICAgIGZsaWdodDoge1xuICAgICAgaWQ6ICcwMDEnLFxuICAgICAgYWlybGluZUNvZGU6IGN1cnJlbnRTZWdtZW50Lm1hcmtldGluZ0FpcmxpbmUgfHwgJ0xIJyxcbiAgICAgIGZsaWdodE5vOiBjdXJyZW50U2VnbWVudC5mbGlnaHROdW1iZXIgfHwgJzEyMycsXG4gICAgICBkZXBhcnR1cmVEYXRlOiBjdXJyZW50U2VnbWVudC5kZXBhcnR1cmVEYXRlVGltZSB8fCAnMjAyNS0wNC0yMicsXG4gICAgICBkZXBhcnR1cmU6IGN1cnJlbnRTZWdtZW50Lm9yaWdpbiB8fCAnTVVDJyxcbiAgICAgIGFycml2YWw6IGN1cnJlbnRTZWdtZW50LmRlc3RpbmF0aW9uIHx8ICdGUkEnLFxuICAgICAgY2FiaW5DbGFzczogY3VycmVudFNlZ21lbnQuY2FiaW5DbGFzcyB8fCAnQSdcbiAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgZGVja3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICcyJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiAxMDAgfV0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgYXZhaWxhYmlsaXR5OiBbXG4gICAgICB7IGxhYmVsOiAnMUEnLCBwcmljZTogNTAsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICdncmVlbicsIG9ubHlGb3JQYXNzZW5nZXJUeXBlOiBbJ0FEVCddIH0sXG4gICAgICB7IGxhYmVsOiAnMUInLCBwcmljZTogNDUsIGN1cnJlbmN5OiAnVVNEJywgY29sb3I6ICd5ZWxsb3cnLCBvbmx5Rm9yUGFzc2VuZ2VyVHlwZTogWydBRFQnXSB9LFxuICAgICAgeyBsYWJlbDogJzJBJywgcHJpY2U6IDMwLCBjdXJyZW5jeTogJ1VTRCcsIGNvbG9yOiAnbGlnaHRibHVlJyB9XG4gICAgXSxcbiAgICBwYXNzZW5nZXJzOiBbeyBpZDogJ1BBWDEnLCBuYW1lOiAnGDIwPT4yIBguGC4nLCB0eXBlOiAnQURUJyB9XVxuICB9O1xuXG4gIGNvbnN0IHNlbmRUb0lmcmFtZSA9ICgpID0+IHtcbiAgICBjb25zdCBpZnJhbWUgPSBpZnJhbWVSZWYuY3VycmVudDtcbiAgICBpZiAoIWlmcmFtZT8uY29udGVudFdpbmRvdykge1xuICAgICAgY29uc29sZS53YXJuKCegDyBpZnJhbWUgb3IgY29udGVudFdpbmRvdyBub3QgYXZhaWxhYmxlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIHR5cGU6ICdzZWF0TWFwcycsXG4gICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gICAgICBsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmxheW91dClcbiAgICAgIC8vIGF2YWlsYWJpbGl0eTogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuYXZhaWxhYmlsaXR5KSxcbiAgICAgIC8vIHBhc3NlbmdlcnM6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLnBhc3NlbmdlcnMpXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc95CBbU2VhdE1hcENvbXBvbmVudF0gc2VuZGluZyB0byBpZnJhbWU6JywgbWVzc2FnZSk7XG4gICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGA9BCBTZWdtZW50IGluZGV4IGNoYW5nZWQ6ICR7c2VnbWVudEluZGV4fWApO1xuICAgIHNlbmRUb0lmcmFtZSgpO1xuICB9LCBbc2VnbWVudEluZGV4XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxcmVtJyB9fT5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScgfX0+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2VnbWVudFNlbGVjdFwiPhJLMTVAOEI1IEE1Mzw1PUI6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBpZD1cInNlZ21lbnRTZWxlY3RcIlxuICAgICAgICAgIHZhbHVlPXtzZWdtZW50SW5kZXh9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWdtZW50SW5kZXgoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgID5cbiAgICAgICAgICB7ZmxpZ2h0U2VnbWVudHMubWFwKChzZWdtZW50LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9PlxuICAgICAgICAgICAgICB7c2VnbWVudC5tYXJrZXRpbmdBaXJsaW5lIHx8ICdYWCd9IHtzZWdtZW50LmZsaWdodE51bWJlciB8fCAnMDAwJ30gkiB7c2VnbWVudC5vcmlnaW4gfHwgJz8/Pyd9IBMge3NlZ21lbnQuZGVzdGluYXRpb24gfHwgJz8/Pyd9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJyMzMzMnIH19PlxuICAgICAgICA8c3Ryb25nPj3rIEZsaWdodCBpbmZvOjwvc3Ryb25nPlxuICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShjdXJyZW50U2VnbWVudCwgbnVsbCwgMil9PC9wcmU+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXsoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBDb21wb25lbnRdIGlmcmFtZSBsb2FkZWQsIHNlbmRpbmcgZGF0YS4uLicpO1xuICAgICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXRNYXBDb21wb25lbnRQcmljaW5nOyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIFNlYXRNYXBQcm9wcyB7XG4gIGNvbmZpZzogYW55O1xuICBkYXRhOiBhbnk7IC8vIBQwPT1LNSwgOj5CPkBLNSA/QDhFPjRPQiA4NyBTaG9wcGluZyBBRjU9MEA4T1xufVxuXG5jb25zdCBTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmc6IFJlYWN0LkZDPFNlYXRNYXBQcm9wcz4gPSAoeyBjb25maWcsIGRhdGEgfSkgPT4ge1xuICBjb25zdCBbc2VnbWVudEluZGV4LCBzZXRTZWdtZW50SW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGlmcmFtZVJlZiA9IHVzZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4obnVsbCk7XG5cbi8vIB8+O0NHMDU8IEI1OkNJODkgQTUzPDU9QlxuICBjb25zdCBmbGlnaHRTZWdtZW50cyA9IGRhdGEuZmxpZ2h0U2VnbWVudHMgfHwgW107XG4gIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gZmxpZ2h0U2VnbWVudHNbc2VnbWVudEluZGV4XSB8fCB7fTtcblxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRTaG9wcGluZ10gHz47Q0c1PT1LNSA0MD09SzU6JywgZGF0YSk7XG5cbiAgICAgICAgLy8gLy8gPSggH0A4PDVAIDQwPT1LRSA0O08gP0A+MjVAOjhcbiAgICAgICAgLy8gY29uc3QgZmxpZ2h0RGF0YSA9IHtcbiAgICAgICAgLy8gICAgIGFpcmxpbmVDb2RlOiAnTEgnLFxuICAgICAgICAvLyAgICAgZmxpZ2h0Tm86ICcxMjMnLFxuICAgICAgICAvLyAgICAgZGVwYXJ0dXJlRGF0ZTogJzIwMjUtMDQtMjInLFxuICAgICAgICAvLyAgICAgZGVwYXJ0dXJlOiAnTVVDJyxcbiAgICAgICAgLy8gICAgIGFycml2YWw6ICdGUkEnXG4gICAgICAgIC8vIH07XG5cbiAgY29uc3Qgc2VhdE1hcERhdGEgPSB7XG4gICAgY29uZmlnLFxuICAgIGZsaWdodDoge1xuXG4gICAgICAgIGlkOiAnMDAxJywgIC8vICMxNTQ4QUwsIEdCPiA/NUA1NDA1QkFPIGlkXG4gICAgICAgIGFpcmxpbmVDb2RlOiBjdXJyZW50U2VnbWVudC5tYXJrZXRpbmdBaXJsaW5lIHx8ICdMSCcsXG4gICAgICAgIGZsaWdodE5vOiBjdXJyZW50U2VnbWVudC5mbGlnaHROdW1iZXIgfHwgJzEyMycsXG4gICAgICAgIGRlcGFydHVyZURhdGU6IGN1cnJlbnRTZWdtZW50LmRlcGFydHVyZURhdGVUaW1lIHx8ICcyMDI1LTA0LTIyJyxcbiAgICAgICAgZGVwYXJ0dXJlOiBjdXJyZW50U2VnbWVudC5vcmlnaW4gfHwgJ01VQycsXG4gICAgICAgIGFycml2YWw6IGN1cnJlbnRTZWdtZW50LmRlc3RpbmF0aW9uIHx8ICdGUkEnLFxuICAgICAgICBjYWJpbkNsYXNzOiBjdXJyZW50U2VnbWVudC5jYWJpbkNsYXNzIHx8ICdBJ1xuXG4gICAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgZGVja3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICBuYW1lOiAnRGVjayAxJyxcbiAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgIHsgbGFiZWw6ICcxJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiA1MCB9LCB7IGxhYmVsOiAnQicsIHg6IDEwMCwgeTogNTAgfV0gfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICcyJywgc2VhdHM6IFt7IGxhYmVsOiAnQScsIHg6IDUwLCB5OiAxMDAgfV0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfTtcblxuICBjb25zb2xlLmxvZygnCA8gW1NlYXRNYXBDb21wb25lbnRTaG9wcGluZ10gIUQ+QDw4QD4yMD09SzUgNDA9PUs1IDQ7TyA+Qj9AMDI6ODonLCBzZWF0TWFwRGF0YSk7XG5cbiAgY29uc3Qgc2VuZFRvSWZyYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGlmcmFtZSA9IGlmcmFtZVJlZi5jdXJyZW50O1xuICAgIGlmICghaWZyYW1lPy5jb250ZW50V2luZG93KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ6APIGlmcmFtZSA4OzggY29udGVudFdpbmRvdyA9NSA0PkFCQz81PS4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgdHlwZTogJ3NlYXRNYXBzJyxcbiAgICAgIGNvbmZpZzogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuY29uZmlnKSxcbiAgICAgIGZsaWdodDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEuZmxpZ2h0KSxcbiAgICAgIGxheW91dDogSlNPTi5zdHJpbmdpZnkoc2VhdE1hcERhdGEubGF5b3V0KSxcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coJz3kIFtTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmddIB5CP0AwMjowIDQwPT1LRSAyIGlmcmFtZTonLCBtZXNzYWdlKTtcbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2VuZFRvSWZyYW1lKCk7XG4gIH0sIFtzZWdtZW50SW5kZXhdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzFyZW0nIH19PlxuICAgICAgey8qIEZsaWdodCBJbmZvIFNlY3Rpb24gKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nLCBmb250U2l6ZTogJzAuOXJlbScsIGNvbG9yOiAnIzMzMycgfX0+XG4gICAgICAgIDxzdHJvbmc+PesgRmxpZ2h0IGluZm86PC9zdHJvbmc+XG4gICAgICAgIDxwcmU+e0pTT04uc3RyaW5naWZ5KGN1cnJlbnRTZWdtZW50LCBudWxsLCAyKX08L3ByZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWdtZW50U2VsZWN0XCI+EksxNUA4QjUgQTUzPDU9QjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwic2VnbWVudFNlbGVjdFwiXG4gICAgICAgICAgdmFsdWU9e3NlZ21lbnRJbmRleH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlZ21lbnRJbmRleChOdW1iZXIoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtmbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9PlxuICAgICAgICAgICAgICB7c2VnbWVudC5tYXJrZXRpbmdBaXJsaW5lIHx8ICdYWCd9IHtzZWdtZW50LmZsaWdodE51bWJlciB8fCAnMDAwJ306IHtzZWdtZW50Lm9yaWdpbn0gkiB7c2VnbWVudC5kZXN0aW5hdGlvbn1cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGlmcmFtZVxuICAgICAgICByZWY9e2lmcmFtZVJlZn1cbiAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICBoZWlnaHQ9XCI4MDBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cbiAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgb25Mb2FkPXtzZW5kVG9JZnJhbWV9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nOyIsIi8vIEQwOTs6IGNvZGUvY29tcG9uZW50cy9TZWF0TWFwc1BvcG92ZXIudHN4XG5cbi8qKlxuICogU2VhdE1hcHNQb3BvdmVyIC0gOD1CNUBENTlBIDQ7TyA3MDNAQzc6OCA4ID5CPjFAMDY1PThPIDowQEJLIDw1QUIgQDU5QTAgPTAgPkE9PjI1IDQwPT1LRSBQTlIuXG4gKiBcbiAqIB8+NzI+O081QiAySzFAMEJMID8wQUEwNjhAPjIsIEE1Mzw1PUIsIDo7MEFBID4xQTtDNjgyMD04TyA4ID81QDUyPjdHODowLlxuICogHkI/QDAyO081QiA3MD9APkEgRW5oYW5jZWRTZWF0TWFwUlEgMiBTYWJyZSwgPkI+MUAwNjA1QiBANTdDO0xCMEIgMiA8PjQwO0w9PjwgPjo9NS5cbiAqIFxuICogGEE/PjtMN0M1QjpcbiAqIC0gbG9hZFBuckRldGFpbHNGcm9tU2FicmUoKSA0O08gPz47Q0c1PThPIDQwPT1LRSBQTlJcbiAqIC0gbG9hZFNlYXRNYXBGcm9tU2FicmUoKSA0O08gNzAzQEM3OjggOjBAQksgPDVBQlxuICovXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgU2ltcGxlRHJvcGRvd24gfSBmcm9tICdzYWJyZS1uZ3YtVUlDb21wb25lbnRzL2FkdmFuY2VkRHJvcGRvd24vY29tcG9uZW50cy9TaW1wbGVEcm9wZG93bic7XG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICdzYWJyZS1uZ3YtVUlDb21wb25lbnRzL2FkdmFuY2VkRHJvcGRvd24vaW50ZXJmYWNlcy9PcHRpb24nO1xuaW1wb3J0IHsgbG9hZFBuckRldGFpbHNGcm9tU2FicmUgfSBmcm9tICcuL2xvYWRQbnJEZXRhaWxzRnJvbVNhYnJlJztcbmltcG9ydCB7IGxvYWRTZWF0TWFwRnJvbVNhYnJlIH0gZnJvbSAnLi9sb2FkU2VhdE1hcEZyb21TYWJyZSc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBQdWJsaWNNb2RhbHNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHsgUGFzc2VuZ2VyT3B0aW9uLCBTZWdtZW50T3B0aW9uIH0gZnJvbSAnLi4vdXRpbHMvcGFyY2VQbnJEYXRhJztcbmltcG9ydCB7IFhtbFZpZXdlciB9IGZyb20gJy4uL3V0aWxzL1htbFZpZXdlcic7XG5cbmludGVyZmFjZSBTZWF0TWFwc1BvcG92ZXJTdGF0ZSB7XG4gICAgc2VsZWN0ZWRQYXNzZW5nZXJzOiBzdHJpbmdbXTtcbiAgICBzZWxlY3RlZFNlZ21lbnQ6IHN0cmluZztcbiAgICBzZWxlY3RlZFNlZ21lbnRGdWxsRGF0YTogU2VnbWVudE9wdGlvbiB8IG51bGw7XG4gICAgc2VsZWN0ZWRDYWJpbkNsYXNzOiBzdHJpbmc7XG4gICAgc2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyOiBzdHJpbmc7XG4gICAgY3VzdG9tTWFya2V0aW5nQ2Fycmllcjogc3RyaW5nO1xuICAgIHBhc3NlbmdlcnM6IFBhc3Nlbmdlck9wdGlvbltdO1xuICAgIHNlZ21lbnRzOiBTZWdtZW50T3B0aW9uW107XG4gICAgbGFzdFhtbFJlc3BvbnNlOiBzdHJpbmcgfCBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgU2VhdE1hcHNQb3BvdmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBTZWF0TWFwc1BvcG92ZXJTdGF0ZT4ge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZFBhc3NlbmdlcnM6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWRTZWdtZW50OiAnJyxcbiAgICAgICAgICAgIHNlbGVjdGVkU2VnbWVudEZ1bGxEYXRhOiBudWxsLCBcbiAgICAgICAgICAgIHNlbGVjdGVkQ2FiaW5DbGFzczogJ0Vjb25vbXknLFxuICAgICAgICAgICAgc2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyOiAnTEgnLFxuICAgICAgICAgICAgY3VzdG9tTWFya2V0aW5nQ2FycmllcjogJycsXG4gICAgICAgICAgICBwYXNzZW5nZXJzOiBbXSxcbiAgICAgICAgICAgIHNlZ21lbnRzOiBbXSxcbiAgICAgICAgICAgIGxhc3RYbWxSZXNwb25zZTogbnVsbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNhYmluQ2xhc3NlczogT3B0aW9uPHN0cmluZz5bXSA9IFtcbiAgICAgICAgeyBsYWJlbDogJ0Vjb25vbXkgKFkpJywgdmFsdWU6ICdFY29ub215JyB9LFxuICAgICAgICB7IGxhYmVsOiAnUHJlbWl1bSBFY29ub215IChXKScsIHZhbHVlOiAnUHJlbWl1bUVjb25vbXknIH0sXG4gICAgICAgIHsgbGFiZWw6ICdCdXNpbmVzcyAoSiknLCB2YWx1ZTogJ0J1c2luZXNzJyB9LFxuICAgICAgICB7IGxhYmVsOiAnRmlyc3QgKEYpJywgdmFsdWU6ICdGaXJzdCcgfVxuICAgIF07XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpOiB2b2lkIHtcbiAgICAgICAgbG9hZFBuckRldGFpbHNGcm9tU2FicmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFNlZ21lbnQgPSAnJztcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFNlZ21lbnRGdWxsRGF0YTogU2VnbWVudE9wdGlvbiB8IG51bGwgPSBudWxsO1xuICAgIFxuICAgICAgICAgICAgaWYgKGRhdGEuc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTZWdtZW50ID0gZGF0YS5zZWdtZW50c1swXS52YWx1ZTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNlZ21lbnRGdWxsRGF0YSA9IGRhdGEuc2VnbWVudHNbMF07XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyID0gJ0xIJztcbiAgICAgICAgICAgIGxldCBjdXN0b21NYXJrZXRpbmdDYXJyaWVyID0gJyc7XG4gICAgXG4gICAgICAgICAgICBpZiAoZGF0YS5zZWdtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFya2V0aW5nQ2FycmllciA9IGRhdGEuc2VnbWVudHNbMF0ubWFya2V0aW5nQ2Fycmllci50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobWFya2V0aW5nQ2FycmllciA9PT0gJ0xIJyB8fCBtYXJrZXRpbmdDYXJyaWVyID09PSAnRUsnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTWFya2V0aW5nQ2FycmllciA9IG1hcmtldGluZ0NhcnJpZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXJrZXRpbmdDYXJyaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTWFya2V0aW5nQ2FycmllciA9ICdPdGhlcic7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU1hcmtldGluZ0NhcnJpZXIgPSBtYXJrZXRpbmdDYXJyaWVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhc3NlbmdlcnM6IGRhdGEucGFzc2VuZ2Vycy5tYXAocCA9PiAoeyAuLi5wLCBjaGVja2VkOiB0cnVlIH0pKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFBhc3NlbmdlcnM6IGRhdGEucGFzc2VuZ2Vycy5tYXAocCA9PiBwLnZhbHVlKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50czogZGF0YS5zZWdtZW50cyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNlZ21lbnQsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTZWdtZW50RnVsbERhdGEsXG4gICAgICAgICAgICAgICAgbGFzdFhtbFJlc3BvbnNlOiBudWxsLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTWFya2V0aW5nQ2FycmllcixcbiAgICAgICAgICAgICAgICBjdXN0b21NYXJrZXRpbmdDYXJyaWVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUGFzc2VuZ2VyQ2hhbmdlID0gKHBhc3NlbmdlclZhbHVlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xuICAgICAgICAgICAgc2VsZWN0ZWRQYXNzZW5nZXJzOiBwcmV2U3RhdGUuc2VsZWN0ZWRQYXNzZW5nZXJzLmluY2x1ZGVzKHBhc3NlbmdlclZhbHVlKVxuICAgICAgICAgICAgICAgID8gcHJldlN0YXRlLnNlbGVjdGVkUGFzc2VuZ2Vycy5maWx0ZXIocCA9PiBwICE9PSBwYXNzZW5nZXJWYWx1ZSlcbiAgICAgICAgICAgICAgICA6IFsuLi5wcmV2U3RhdGUuc2VsZWN0ZWRQYXNzZW5nZXJzLCBwYXNzZW5nZXJWYWx1ZV1cbiAgICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBoYW5kbGVTZWdtZW50Q2hhbmdlID0gKG9wdGlvbnM6IE9wdGlvbltdKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gb3B0aW9ucy5maW5kKG9wdCA9PiBvcHQuY2hlY2tlZCk7XG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgZnVsbERhdGEgPSB0aGlzLnN0YXRlLnNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy52YWx1ZSA9PT0gc2VsZWN0ZWQudmFsdWUpIHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRTZWdtZW50OiBzZWxlY3RlZC52YWx1ZSwgc2VsZWN0ZWRTZWdtZW50RnVsbERhdGE6IGZ1bGxEYXRhIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2FiaW5DbGFzc0NoYW5nZSA9IChvcHRpb25zOiBPcHRpb25bXSk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG9wdGlvbnMuZmluZChvcHQgPT4gb3B0LmNoZWNrZWQpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQpIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZENhYmluQ2xhc3M6IHNlbGVjdGVkLnZhbHVlIH0pO1xuICAgIH07XG5cbiAgICBoYW5kbGVNYXJrZXRpbmdDYXJyaWVyQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MU2VsZWN0RWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZE1hcmtldGluZ0NhcnJpZXI6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgIGN1c3RvbU1hcmtldGluZ0NhcnJpZXI6IGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gJ090aGVyJyA/ICcnIDogJydcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGhhbmRsZUN1c3RvbU1hcmtldGluZ0NhcnJpZXJDaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXN0b21NYXJrZXRpbmdDYXJyaWVyOiBldmVudC50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKSB9KTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBsb2FkU2VhdE1hcCA9IGFzeW5jICh7IGF2YWlsYWJpbGl0eUluZm8sIHNpbGVudCA9IGZhbHNlIH06IHsgYXZhaWxhYmlsaXR5SW5mbzogYm9vbGVhbjsgc2lsZW50PzogYm9vbGVhbiB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWRQYXNzZW5nZXJzLCBzZWxlY3RlZFNlZ21lbnQsIHNlbGVjdGVkQ2FiaW5DbGFzcywgc2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyLCBjdXN0b21NYXJrZXRpbmdDYXJyaWVyLCBzZWdtZW50cywgcGFzc2VuZ2VycyB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTZWdtZW50RGF0YSA9IHNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy52YWx1ZSA9PT0gc2VsZWN0ZWRTZWdtZW50KTtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFNlZ21lbnREYXRhKSByZXR1cm4gY29uc29sZS5lcnJvcignTCBObyBzZWdtZW50IGRhdGEgZm91bmQuJyk7XG5cbiAgICAgICAgY29uc3QgbWFya2V0aW5nQ2FycmllckZpbmFsID0gc2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyID09PSAnT3RoZXInID8gY3VzdG9tTWFya2V0aW5nQ2FycmllciA6IHNlbGVjdGVkTWFya2V0aW5nQ2FycmllcjtcblxuICAgICAgICBjb25zdCBmbGlnaHRTZWdtZW50ID0ge1xuICAgICAgICAgICAgaWQ6IHNlbGVjdGVkU2VnbWVudCxcbiAgICAgICAgICAgIG9yaWdpbjogc2VsZWN0ZWRTZWdtZW50RGF0YS5vcmlnaW4sXG4gICAgICAgICAgICBkZXN0aW5hdGlvbjogc2VsZWN0ZWRTZWdtZW50RGF0YS5kZXN0aW5hdGlvbixcbiAgICAgICAgICAgIGRlcGFydHVyZURhdGU6IHNlbGVjdGVkU2VnbWVudERhdGEuZGVwYXJ0dXJlRGF0ZSxcbiAgICAgICAgICAgIG1hcmtldGluZ0NhcnJpZXI6IG1hcmtldGluZ0NhcnJpZXJGaW5hbCxcbiAgICAgICAgICAgIG1hcmtldGluZ0ZsaWdodE51bWJlcjogc2VsZWN0ZWRTZWdtZW50RGF0YS5tYXJrZXRpbmdGbGlnaHROdW1iZXIsXG4gICAgICAgICAgICBmbGlnaHROdW1iZXI6IHNlbGVjdGVkU2VnbWVudERhdGEubWFya2V0aW5nRmxpZ2h0TnVtYmVyLFxuICAgICAgICAgICAgYm9va2luZ0NsYXNzOiBzZWxlY3RlZFNlZ21lbnREYXRhLmJvb2tpbmdDbGFzcyxcbiAgICAgICAgICAgIGVxdWlwbWVudDogc2VsZWN0ZWRTZWdtZW50RGF0YS5lcXVpcG1lbnQsXG4gICAgICAgICAgICBjYWJpbjogc2VsZWN0ZWRDYWJpbkNsYXNzIGFzIGFueVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG1hcHBlZFBhc3NlbmdlcnMgPSBwYXNzZW5nZXJzLmZpbHRlcihwID0+IHNlbGVjdGVkUGFzc2VuZ2Vycy5pbmNsdWRlcyhwLnZhbHVlKSkubWFwKHAgPT4gKHtcbiAgICAgICAgICAgIGlkOiBwLnZhbHVlLFxuICAgICAgICAgICAgdHJhdmVsbGVySWQ6IE51bWJlcihwLnZhbHVlKSxcbiAgICAgICAgICAgIGdpdmVuTmFtZTogcC5naXZlbk5hbWUsXG4gICAgICAgICAgICBzdXJuYW1lOiBwLnN1cm5hbWVcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGF3YWl0IGxvYWRTZWF0TWFwRnJvbVNhYnJlKGZsaWdodFNlZ21lbnQsIG1hcHBlZFBhc3NlbmdlcnMsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJldHR5WG1sID0gbmV3IFhNTFNlcmlhbGl6ZXIoKS5zZXJpYWxpemVUb1N0cmluZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFhtbFJlc3BvbnNlOiBwcmV0dHlYbWwgfSk7XG5cbiAgICAgICAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKS5zaG93UmVhY3RNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogYXZhaWxhYmlsaXR5SW5mbyA/ICc96yBTZWF0IE1hcCAoT2NjdXBpZWQpJyA6ICc96yBTZWF0IE1hcCAoRW1wdHkpJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiA8WG1sVmlld2VyIHhtbD17cHJldHR5WG1sfSAvPiwgbW9kYWxDbGFzc05hbWU6ICdzZWF0bWFwLXhtbC1tb2RhbCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGhhbmRsZVNob3dSYXdYbWwgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5sYXN0WG1sUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZFNlYXRNYXAoeyBhdmFpbGFiaWxpdHlJbmZvOiBmYWxzZSwgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSkuc2hvd1JlYWN0TW9kYWwoe1xuICAgICAgICAgICAgaGVhZGVyOiAnPcQgTGFzdCBFbmhhbmNlZFNlYXRNYXBSUyBYTUwnLFxuICAgICAgICAgICAgY29tcG9uZW50OiA8WG1sVmlld2VyIHhtbD17dGhpcy5zdGF0ZS5sYXN0WG1sUmVzcG9uc2UgfHwgJyd9IC8+LFxuICAgICAgICAgICAgbW9kYWxDbGFzc05hbWU6ICdzZWF0bWFwLXhtbC1tb2RhbCdcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHsgcGFzc2VuZ2Vycywgc2VnbWVudHMsIHNlbGVjdGVkUGFzc2VuZ2Vycywgc2VsZWN0ZWRTZWdtZW50LCBzZWxlY3RlZENhYmluQ2xhc3MsIHNlbGVjdGVkTWFya2V0aW5nQ2FycmllciwgY3VzdG9tTWFya2V0aW5nQ2FycmllciB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXNCdXR0b25EaXNhYmxlZCA9IHNlbGVjdGVkUGFzc2VuZ2Vycy5sZW5ndGggPT09IDAgfHwgIXNlbGVjdGVkU2VnbWVudDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTZWdtZW50RGF0YSA9IHNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy52YWx1ZSA9PT0gc2VsZWN0ZWRTZWdtZW50KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCcsIG1pbldpZHRoOiAnNDAwcHgnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyB9fT5cbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPlNlbGVjdCBQYXNzZW5nZXJzICh7c2VsZWN0ZWRQYXNzZW5nZXJzLmxlbmd0aH0pPC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cGFzc2VuZ2Vycy5tYXAocGFzc2VuZ2VyID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cGFzc2VuZ2VyLnZhbHVlfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc1cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17c2VsZWN0ZWRQYXNzZW5nZXJzLmluY2x1ZGVzKHBhc3Nlbmdlci52YWx1ZSl9IG9uQ2hhbmdlPXsoKSA9PiB0aGlzLmhhbmRsZVBhc3NlbmdlckNoYW5nZShwYXNzZW5nZXIudmFsdWUpfSBzdHlsZT17eyBtYXJnaW5SaWdodDogJzhweCcgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3Bhc3Nlbmdlci5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zZWxlY3RlZFNlZ21lbnRGdWxsRGF0YSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMzMzJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIAgPIHt0aGlzLnN0YXRlLnNlbGVjdGVkU2VnbWVudEZ1bGxEYXRhLm9yaWdpbn0gkiB7dGhpcy5zdGF0ZS5zZWxlY3RlZFNlZ21lbnRGdWxsRGF0YS5kZXN0aW5hdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICh7dGhpcy5zdGF0ZS5zZWxlY3RlZFNlZ21lbnRGdWxsRGF0YS5tYXJrZXRpbmdDYXJyaWVyfXt0aGlzLnN0YXRlLnNlbGVjdGVkU2VnbWVudEZ1bGxEYXRhLm1hcmtldGluZ0ZsaWdodE51bWJlcn0pXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgID3FIERlcGFydHVyZToge3RoaXMuc3RhdGUuc2VsZWN0ZWRTZWdtZW50RnVsbERhdGEuZGVwYXJ0dXJlRGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+U2VsZWN0IEZsaWdodCBTZWdtZW50PC9Db250cm9sTGFiZWw+XG5cbiAgICAgICAgICAgICAgICAgICAgPFNpbXBsZURyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWdtZW50cy5tYXAoc2VnID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc2VnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHNlZy52YWx1ZSA9PT0gc2VsZWN0ZWRTZWdtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWdtZW50Q2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPlNlbGVjdCBDYWJpbiBDbGFzczwvQ29udHJvbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8U2ltcGxlRHJvcGRvd24gb3B0aW9ucz17dGhpcy5jYWJpbkNsYXNzZXMubWFwKG9wdCA9PiAoeyAuLi5vcHQsIGNoZWNrZWQ6IG9wdC52YWx1ZSA9PT0gc2VsZWN0ZWRDYWJpbkNsYXNzIH0pKX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2FiaW5DbGFzc0NoYW5nZX0gLz5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZENhYmluQ2xhc3MgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBtYXJnaW5Cb3R0b206ICcxMHB4Jyxmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzAwNjZjYycgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8nw8gU2VsZWN0ZWQgQ2FiaW46IHtzZWxlY3RlZENhYmluQ2xhc3N9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPlNlbGVjdCBNYXJrZXRpbmcgQ2FycmllcjwvQ29udHJvbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHZhbHVlPXtzZWxlY3RlZE1hcmtldGluZ0NhcnJpZXJ9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU1hcmtldGluZ0NhcnJpZXJDaGFuZ2V9IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkxIXCI+TEggKEx1ZnRoYW5zYSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJFS1wiPkVLIChFbWlyYXRlcyk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJPdGhlclwiPk90aGVyLi4uPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyID09PSAnT3RoZXInICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG1heExlbmd0aD17Mn0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJlLmcuLCBBQSwgQkEsIEFGXCIgdmFsdWU9e2N1c3RvbU1hcmtldGluZ0NhcnJpZXJ9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUN1c3RvbU1hcmtldGluZ0NhcnJpZXJDaGFuZ2V9IC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzEwcHgnLCBtYXJnaW5Ub3A6ICcyMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJidG4taW5mb1wiIGRpc2FibGVkPXtpc0J1dHRvbkRpc2FibGVkfSBvbkNsaWNrPXt0aGlzLmhhbmRsZVNob3dSYXdYbWx9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPcQgU2hvdyBSYXcgWE1MXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYnRuLXByaW1hcnlcIiBzdHlsZT17eyBmbGV4OiAxIH19IGRpc2FibGVkPXtpc0J1dHRvbkRpc2FibGVkfSBvbkNsaWNrPXsoKSA9PiB0aGlzLmxvYWRTZWF0TWFwKHsgYXZhaWxhYmlsaXR5SW5mbzogZmFsc2UgfSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIAgPIEVtcHR5IFNlYXQgTWFwXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYnRuLXN1Y2Nlc3NcIiBzdHlsZT17eyBmbGV4OiAxIH19IGRpc2FibGVkPXtpc0J1dHRvbkRpc2FibGVkfSBvbkNsaWNrPXsoKSA9PiB0aGlzLmxvYWRTZWF0TWFwKHsgYXZhaWxhYmlsaXR5SW5mbzogdHJ1ZSB9KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPWUgT2NjdXBpZWQgU2VhdCBNYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsbnVsbCxudWxsLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBQdWJsaWNNb2RhbHNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhY3RNb2RhbE9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudEF2YWlsIGZyb20gJy4vU2VhdE1hcENvbXBvbmVudEF2YWlsJztcbmltcG9ydCB7IHF1aWNrZXRDb25maWcgfSBmcm9tICcuLi91dGlscy9xdWlja2V0Q29uZmlnJzsgLy8gY29uZmlnIEEgPTBBQkA+OTowPDggMTgxOzg+QjU6OCA0O08gPkI+MUAwNjU9OE8gOjBAQksgQTA7Pj0wXG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcblxuLy8gZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSBcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwQXZhaWxNb2RhbChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogdm9pZCB7XG5cbiAgY29uc3QgbW9kYWxTZXJ2aWNlID0gZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKTsgLy8gOEE/PjtMN0M1PCBQdWJsaWNNb2RhbHNTZXJ2aWNlXG5cbiAgLy8gRD5APDhAQzU8IG9wdGlvbnMgNDtPID81QDU0MEc4IDIgPD40MDtMPT41ID46PT5cbiAgY29uc3Qgb3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgaGVhZGVyOiAnU2VhdE1hcHMgQUJDIDM2MCBWaWV3ZXInLFxuICAgIC8vIEE+NzQwNTwgUmVhY3QtOj48Pz49NT1CID0wID5BPT4yNSBTZWF0TWFwQ29tcG9uZW50XG4gICAgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXRNYXBDb21wb25lbnRBdmFpbCwge1xuICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgZGF0YSAvLyA/NUA1NDBRPCBkYXRhIC0gPjFKNTpCIEI4PzAgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSBGNTs4Oj48XG4gICAgfSksXG4gICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnW1NlYXRNYXAgTW9kYWxdIENsb3NlZCcpXG4gIH07XG5cbiAgbW9kYWxTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKG9wdGlvbnMpOyAvLyA/PjowN0syMDU8IDw+NDA7TD0+NSA+Oj0+IEEgNTM+IG9wdGlvbnNcbiAgXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuXG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudFByaWNpbmcgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50UHJpY2luZyc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi4vdXRpbHMvcXVpY2tldENvbmZpZyc7IC8vIGNvbmZpZyBBID0wQUJAPjk6MDw4IDE4MTs4PkI1OjggNDtPID5CPjFAMDY1PThPIDowQEJLIEEwOz49MFxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwoKTogdm9pZCB7XG4gIGNvbnN0IG1vZGFsU2VydmljZSA9IGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSk7XG5cbiAgLy8gPeEgHz47Q0cwNTwgQT5FQDA9UT09SzUgQTUzPDU9QksgODcgc2Vzc2lvblN0b3JhZ2VcbiAgY29uc3QgcmF3ID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2ZsaWdodFNlZ21lbnRzRm9yUHJpY2luZycpO1xuICBsZXQgc2VnbWVudHM6IGFueVtdID0gW107XG5cbiAgdHJ5IHtcbiAgICBzZWdtZW50cyA9IHJhdyA/IEpTT04ucGFyc2UocmF3KSA6IFtdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcignTCAeSDgxOjAgQDA3MT5AMCA0MD09S0UgZmxpZ2h0U2VnbWVudHNGb3JQcmljaW5nIDg3IHNlc3Npb25TdG9yYWdlOicsIGUpO1xuICB9XG5cbiAgaWYgKCFzZWdtZW50cy5sZW5ndGgpIHtcbiAgICBhbGVydCgnVyAdNUIgND5BQkM/PUtFIEE1Mzw1PUI+MiBANTlBMCA0O08gPkI+MUAwNjU9OE8gOjBAQksgPDVBQi4nKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICBoZWFkZXI6ICdTZWF0TWFwIFZpZXdlciAoUHJpY2luZyknLFxuICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50UHJpY2luZywge1xuICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgZmxpZ2h0U2VnbWVudHM6IHNlZ21lbnRzLCAgICAgICAgLy8gPQQgPzVANTQwUTwgQT5FQDA9UT09SzUgQTUzPDU9QktcbiAgICAgIHNlbGVjdGVkU2VnbWVudEluZGV4OiAwICAgICAgICAgIC8vIDw+Nj0+ID0wRzBCTCBBID81QDI+Mz5cbiAgICB9KSxcbiAgICBvbkhpZGU6ICgpID0+IGNvbnNvbGUubG9nKCdbU2VhdE1hcCBNb2RhbF0gQ2xvc2VkJylcbiAgfTtcblxuICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFJlYWN0TW9kYWxPcHRpb25zIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9jb21wb25lbnRzL1B1YmxpY1JlYWN0TW9kYWwvUmVhY3RNb2RhbE9wdGlvbnMnO1xuaW1wb3J0IFNlYXRNYXBDb21wb25lbnQgZnJvbSAnLi9TZWF0TWFwQ29tcG9uZW50QXZhaWwnO1xuaW1wb3J0IHsgcXVpY2tldENvbmZpZyB9IGZyb20gJy4uL3V0aWxzL3F1aWNrZXRDb25maWcnOyAvLyBjb25maWcgQSA9MEFCQD45OjA8OCAxODE7OD5CNTo4IDQ7TyA+Qj4xQDA2NT04TyA6MEBCSyBBMDs+PTBcblxuLy8gZGF0YTogU2VhdE1hcFNob3BwaW5nRGF0YVxuXG5pbnRlcmZhY2UgU2VhdE1hcFNob3BwaW5nRGF0YSB7XG4gICAgZmxpZ2h0U2VnbWVudHM6IGFueVtdOyBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTZWF0TWFwU2hvcHBpbmdNb2RhbChkYXRhOiBTZWF0TWFwU2hvcHBpbmdEYXRhKTogdm9pZCB7XG5cbiAgICBjb25zdCBtb2RhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpOyAvLyA4QT8+O0w3QzU8IFB1YmxpY01vZGFsc1NlcnZpY2VcblxuICAgIGlmICghbW9kYWxTZXJ2aWNlIHx8IHR5cGVvZiBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBQdWJsaWNNb2RhbHNTZXJ2aWNlIG5vdCBhdmFpbGFibGUgb3Igbm90IGNvbmZpZ3VyZWQgcHJvcGVybHkuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAgLy8gPcwgFzA6QEtCTCAyQTUgP0A1NEs0Q0k4NSA8PjQwO0w9SzUgPjo9MCA/NUA1NCA+QjpAS0I4NTwgPT4yPjM+XG4gICAgIHRyeSB7XG4gICAgICAgIG1vZGFsU2VydmljZS5jbG9zZVJlYWN0TW9kYWwoKTtcbiAgICAgICAgY29uc29sZS5sb2coJz3MIFtzaG93U2VhdE1hcFNob3BwaW5nTW9kYWxdIEFsbCBwcmV2aW91cyBtb2RhbHMgY2xvc2VkLicpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gRXJyb3IgaGlkaW5nIG1vZGFsczonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgLy8gRD5APDhAQzU8IG9wdGlvbnMgNDtPID81QDU0MEc4IDIgPD40MDtMPT41ID46PT5cbiAgICBjb25zdCBvcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyOiAnU2VhdE1hcHMgQUJDIDM2MCBWaWV3ZXInLFxuICAgICAgICAvLyBBPjc0MDU8IFJlYWN0LTo+PD8+PTU9QiA9MCA+QT0+MjUgU2VhdE1hcENvbXBvbmVudFxuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgICAgICAgY29uZmlnOiBxdWlja2V0Q29uZmlnLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KSxcbiAgICAgICAgb25IaWRlOiAoKSA9PiBjb25zb2xlLmxvZygnW1NlYXRNYXAgU2hvcHBpbmcgTW9kYWxdIENsb3NlZCcpXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCc9zCBbc2hvd1NlYXRNYXBTaG9wcGluZ01vZGFsXSBNb2RhbCBkYXRhOicsIGRhdGEpO1xuXG4gICAgLy8gH0A+MjVAOjAgPTAgND5BQkM/PT5BQkwgPDVCPjQwIGBzaG93UmVhY3RNb2RhbGBcbiAgICB0cnkge1xuICAgICAgICBtb2RhbFNlcnZpY2Uuc2hvd1JlYWN0TW9kYWwob3B0aW9ucyk7IC8vID8+OjA3SzIwNTwgPD40MDtMPT41ID46PT4gQSA1Mz4gb3B0aW9uc1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0wgW3Nob3dTZWF0TWFwU2hvcHBpbmdNb2RhbF0gRXJyb3Igc2hvd2luZyBtb2RhbDonLCBlcnJvcik7XG4gICAgfVxuXG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQWlyUHJpY2luZ0RhdGEgfSBmcm9tICdzYWJyZS1uZ3YtcHJpY2luZy9yZXNwb25zZS9pbnRlcmZhY2VzL0FpclByaWNpbmdEYXRhJztcbmltcG9ydCB7IHNob3dTZWF0TWFwUHJpY2luZ01vZGFsIH0gZnJvbSAnLi4vc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwnO1xuXG5leHBvcnQgY29uc3QgUHJpY2luZ1RpbGUgPSAoZGF0YTogQWlyUHJpY2luZ0RhdGEpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPRggGjs4OiA/PiA6PT4/OjUgU2VhdE1hcHMgQUJDIDM2MCAyIFByaWNpbmdUaWxlJyk7XG4gICAgc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwoKTsgLy8gEks3PjIgPD40MDtMPT4zPiA+Oj0wXG4gIH07XG5cbiAgLy8gPeYgJD5APDhAQzU8ID8+ND84QUwgQSBBNTM8NT1CMDw4IChvcmlnaW4tZGVzdGluYXRpb246YWlybGluZSBmbGlnaHRObyAuLi4pXG4gIGxldCBzZWdtZW50TGFiZWwgPSAnJztcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmxpZ2h0U2VnbWVudHNGb3JQcmljaW5nJyk7XG4gICAgY29uc3Qgc2VnbWVudHMgPSByYXcgPyBKU09OLnBhcnNlKHJhdykgOiBbXTtcblxuICAgIHNlZ21lbnRMYWJlbCA9IHNlZ21lbnRzLm1hcCgoc2VnbWVudDogYW55KSA9PiB7XG4gICAgICByZXR1cm4gYCR7c2VnbWVudC5vcmlnaW59LSR7c2VnbWVudC5kZXN0aW5hdGlvbn06JHtzZWdtZW50Lm1hcmtldGluZ0FpcmxpbmV9ICR7c2VnbWVudC5mbGlnaHROdW1iZXJ9YDtcbiAgICB9KS5qb2luKCcgJyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKCegDyAeSDgxOjAgP0A4IDg3Mjs1RzU9ODggZmxpZ2h0U2VnbWVudHNGb3JQcmljaW5nIDIgUHJpY2luZ1RpbGU6JywgZSk7XG4gICAgc2VnbWVudExhYmVsID0gJ0FCQyBTZWF0IE1hcCc7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT1cInNkay1wcmljaW5nLWN1c3RvbS10aWxlLWNvbnRlbnRcIlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4J1xuICAgICAgfX1cbiAgICA+XG4gICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIG1hcmdpbkJvdHRvbTogJzhweCcsIHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgIHtzZWdtZW50TGFiZWx9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzc05hbWU9XCJhYmMtc2VhdG1hcC1idXR0b25cIlxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgIHBhZGRpbmc6ICc0cHggMTJweCcsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzJmNzNiYycsXG4gICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICBmb250U2l6ZTogJzEycHgnXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIFNlYXRNYXBzIEFCQyAzNjBcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufTsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBaXJQcmljaW5nRGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1wcmljaW5nL3Jlc3BvbnNlL2ludGVyZmFjZXMvQWlyUHJpY2luZ0RhdGEnO1xuaW1wb3J0IHsgc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwgfSBmcm9tICcuLi9zaG93U2VhdE1hcFByaWNpbmdNb2RhbCc7XG5cbmV4cG9ydCBjb25zdCBQcmljaW5nVmlldyA9IChkYXRhOiBBaXJQcmljaW5nRGF0YSkgOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9gCBQcmljaW5nVmlldyBkYXRhOicsIGRhdGEpOyAvLyAbPjMgNDtPID5COzA0OjhcbiAgICAgICAgc2hvd1NlYXRNYXBQcmljaW5nTW9kYWwoKTsgLy8gEks3PjIgREM9OkY4OCA/PjowNzAgPD40MDtMPT4zPiA+Oj0wIGMgNDA9PUs8OCAoZGF0YSlcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3Nkay1wcmljaW5nLWN1c3RvbS10aWxlLWNvbnRlbnQnfT5cbiAgICAgICAgICAgIDxwPh5COkBLMjA1PCBTZWF0TWFwIFZpZXdlci4uLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcblxuZXhwb3J0IGNvbnN0IFNlYXRNYXBBdmFpbFRpbGUgPSAoZGF0YTogUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSk6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gICAgICAgIFxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4JyB9fT4gXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxvbD5cbiAgICAgICAgICAgICAgICB7ZGF0YS5mbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEZsaWdodCB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lLkZsaWdodE51bWJlcn1cbiAgICAgICAgICAgICAgICAgICAgPC9saT4gIFxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9vbD5cblxuICAgICAgICAgICAgey8qIBQ+MTAyOzU9MCA6PT4/OjAqL31cbiAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJjLXNlYXRtYXAtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTBweCcsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyZjczYmMnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICcyNXB4J1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgU2VhdE1hcHMgQUJDIDM2MFxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFxuXG4vLyBpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgeyBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhIH0gZnJvbSAnc2FicmUtbmd2LWFpckF2YWlsYWJpbGl0eS9zZXJ2aWNlcy9QdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhJztcbi8vIGltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9Db250ZXh0Jztcbi8vIGltcG9ydCB7SVNlYXRNYXBTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3Ytc2VhdG1hcC9zZXJ2aWNlcy9JU2VhdE1hcFNlcnZpY2UnO1xuXG4vLyBleHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVGlsZSA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbi8vICAgICBjb25zdCBoYW5kbGVPcGVuU2VhdE1hcCA9IGFzeW5jIChmbGlnaHRTZWdtZW50TnVtYmVyOiBudW1iZXIpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coYD3rIE9wZW5pbmcgU2VhdCBNYXAgZm9yIHNlZ21lbnQ6ICR7ZmxpZ2h0U2VnbWVudE51bWJlcn1gKTtcbiAgICBcbi8vICAgICAgICAgdHJ5IHtcbi8vICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0U2VydmljZShJU2VhdE1hcFNlcnZpY2UpLm9wZW5TZWF0TWFwRm9yRmxpZ2h0U2VnbWVudChmbGlnaHRTZWdtZW50TnVtYmVyKTtcbiAgICBcbi8vICAgICAgICAgICAgIGlmICghcmVzcG9uc2UubW9kYWxPcGVuZWRDb3JyZWN0bHkpIHtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGCgDyBFcnJvciBvcGVuaW5nIFNlYXQgTWFwOiAke3Jlc3BvbnNlLmVycm9yTWVzc2FnZX1gKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEwgRmFpbGVkIHRvIG9wZW4gU2VhdCBNYXA6YCwgZXJyb3IpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfTtcblxuLy8gICAgIHJldHVybiAoXG4vLyAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnc2RrLXNlYXRtYXAtY3VzdG9tLXRpbGUtY29udGVudCd9PlxuLy8gICAgICAgICAgICAgPHN0cm9uZz5BQkMgU2VhdCBNYXA8L3N0cm9uZz5cbi8vICAgICAgICAgICAgIDxvbD5cbi8vICAgICAgICAgICAgICAgICB7ZGF0YS5mbGlnaHRTZWdtZW50cy5tYXAoKHNlZ21lbnQsIGluZGV4KSA9PiAoXG4vLyAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fT5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIEZsaWdodCB7c2VnbWVudC5NYXJrZXRpbmdBaXJsaW5lLkZsaWdodE51bWJlcn1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlT3BlblNlYXRNYXAoaW5kZXggKyAxKX0+PpEgT3BlbiBTZWF0IE1hcDwvYnV0dG9uPlxuLy8gICAgICAgICAgICAgICAgICAgICA8L2xpPlxuLy8gICAgICAgICAgICAgICAgICkpfVxuLy8gICAgICAgICAgICAgPC9vbD5cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgKTtcbi8vIH07XG5cblxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSB9IGZyb20gJ3NhYnJlLW5ndi1haXJBdmFpbGFiaWxpdHkvc2VydmljZXMvUHVibGljQWlyQXZhaWxhYmlsaXR5RGF0YSc7XG5pbXBvcnQgeyBzaG93U2VhdE1hcEF2YWlsTW9kYWwgfSBmcm9tICcuLi9zaG93U2VhdE1hcEF2YWlsTW9kYWwnO1xuXG5leHBvcnQgY29uc3QgU2VhdE1hcEF2YWlsVmlldyA9IChkYXRhOiBQdWJsaWNBaXJBdmFpbGFiaWxpdHlEYXRhKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IHtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJz2AIFNlYXRNYXBBdmFpbFZpZXcgZGF0YTonLCBkYXRhKTsgLy8gOz4zIDIgPj1BPjtMXG4gICAgICBzaG93U2VhdE1hcEF2YWlsTW9kYWwoZGF0YSk7IC8vIDJLN0syMDU8IERDPTpGOE4gPz46MDcwIDw+NDA7TD0+Mz4gPjo9MCBjIDQwPT1LPDggKGRhdGEpXG4gICAgfSwgW10pO1xuICBcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eydzZGstc2VhdG1hcC1jdXN0b20tdGlsZS1jb250ZW50J30+XG4gICAgICAgIDxwPh5COkBLMjA1PCBTZWF0TWFwIFZpZXdlci4uLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07IiwiaW1wb3J0IHsgVGlsZSB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3dpZGdldHMvZHJhd2VyL3ZpZXdzL2VsZW1lbnRzL1RpbGUnO1xuaW1wb3J0IHsgVGlsZU9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC93aWRnZXRzL2RyYXdlci92aWV3cy9lbGVtZW50cy9UaWxlT3B0aW9ucyc7XG5pbXBvcnQgeyBGbGlnaHRTZWdtZW50IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvY29tbW9uL2RhdGEvZmxpZ2h0L0ZsaWdodFNlZ21lbnQnO1xuaW1wb3J0IHsgV2l0aG91dEZvY3VzT25DbGljayB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL2NvbW1vbi9taXhpbnMvV2l0aG91dEZvY3VzT25DbGljayc7XG5pbXBvcnQgeyBJbml0aWFsIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL0luaXRpYWwnO1xuaW1wb3J0IHsgTWl4aW4gfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9kZWNvcmF0b3JzL2NsYXNzZXMvTWl4aW4nO1xuaW1wb3J0IHsgQ3NzQ2xhc3MgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9kZWNvcmF0b3JzL2NsYXNzZXMvdmlldy9Dc3NDbGFzcyc7XG5pbXBvcnQgeyBleHRyYWN0U2VnbWVudERhdGEgfSBmcm9tICcuLi9leHRyYWN0U2VnbWVudERhdGEnO1xuXG5AQ3NzQ2xhc3MoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLXRpbGV3aWRnZXRzLXdlYi1tb2R1bGUnLCB7IG92ZXJ3cml0ZTogZmFsc2UgfSlcbkBJbml0aWFsPFRpbGVPcHRpb25zPih7XG4gICAgY2FwdGlvbjogJ1NlYXRNYXBzIEFCQyAzNjAnLFxuICAgIGNsYXNzTmFtZTogJ3dlYi1haXItc2hvcHBpbmctd2lkZ2V0LXNhbXBsZSdcbn0pXG5ATWl4aW4oV2l0aG91dEZvY3VzT25DbGljaylcbmV4cG9ydCBjbGFzcyBTZWF0TWFwU2hvcHBpbmdUaWxlIGV4dGVuZHMgVGlsZTxGbGlnaHRTZWdtZW50PiBpbXBsZW1lbnRzIFdpdGhvdXRGb2N1c09uQ2xpY2sge1xuICAgIGRlY2xhcmUgY29udGV4dDogYW55O1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50U2VnbWVudDogRmxpZ2h0U2VnbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgc2hhcmVkTW9kZWw6IGFueSA9IG51bGw7XG5cbiAgICBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChjcGE6IEZsaWdodFNlZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlZ21lbnQgPSBjcGE7XG4gICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gY3BhO1xuICAgICAgICAgICAgY29uc3Qgc2hhcmVkU2VnbWVudERhdGEgPSBleHRyYWN0U2VnbWVudERhdGEoc2VnbWVudCk7XG5cbiAgICAgICAgICAgIC8vICE+RUAwPU81PCA4OzggPz4yQj5APT4gOEE/PjtMN0M1PCBzaGFyZWRNb2RlbFxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dD8uc2hhcmVkQ29udGV4dE1vZGVsPy5zZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZE1vZGVsID0gdGhpcy5jb250ZXh0LnNoYXJlZENvbnRleHRNb2RlbDtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZE1vZGVsLnNldCgnc2VsZWN0ZWRTZWdtZW50Rm9yUHJpY2luZycsIHNoYXJlZFNlZ21lbnREYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnBSAhPkVAMD04OzggQTUzPDU9QiAyIFNoYXJlZENvbnRleHRNb2RlbDonLCBzaGFyZWRTZWdtZW50RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcmVkTW9kZWw/LnNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkTW9kZWwuc2V0KCdzZWxlY3RlZFNlZ21lbnRGb3JQcmljaW5nJywgc2hhcmVkU2VnbWVudERhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd7DyAfPjJCPkA9PiBBPkVAMD04OzggQTUzPDU9QiAyIFNoYXJlZENvbnRleHRNb2RlbDonLCBzaGFyZWRTZWdtZW50RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignoA8gU2hhcmVkQ29udGV4dE1vZGVsID01ND5BQkM/NT0gFCBBNTM8NT1CID01IEE+RUAwPVE9LicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IGNwYS5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpLmdldEZsaWdodFNlZ21lbnRzKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gc2VnbWVudHMubWFwKHNlZ21lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbiA9IHNlZ21lbnQuZ2V0T3JpZ2luSWF0YSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gc2VnbWVudC5nZXREZXN0aW5hdGlvbklhdGEoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJyaWVyID0gc2VnbWVudC5nZXRNYXJrZXRpbmdBaXJsaW5lKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZmxpZ2h0TnVtYmVyID0gc2VnbWVudC5nZXRGbGlnaHROdW1iZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7b3JpZ2lufS0ke2Rlc3RpbmF0aW9ufToke2NhcnJpZXJ9ICR7ZmxpZ2h0TnVtYmVyfWA7XG4gICAgICAgICAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbGVIdG1sID0gYFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBhbGlnbi1pdGVtczogY2VudGVyOyBmb250LXNpemU6IDEycHg7XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiA4cHg7XCI+JHtsYWJlbH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFiYy1zZWF0bWFwLWJ1dHRvblwiIHN0eWxlPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwcHggMTJweCAxMnB4IDEycHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmY3M2JjO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgU2VhdE1hcHMgQUJDIDM2MFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YUNvbnRlbnQodGlsZUh0bWwpO1xuXG4gICAgICAgICAgICAvLyAeMUAwMT5CRzg6IDo7ODowXG4gICAgICAgICAgICB0aGlzLiRlbC5vZmYoJ2NsaWNrJywgJy5hYmMtc2VhdG1hcC1idXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdjbGljaycsICcuYWJjLXNlYXRtYXAtYnV0dG9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc9ASAaOzg6ID8+IDo9Pj86NSAUID8+MkI+QD0+IDg9OEY4OEBDNTwgVmlldycpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignc2VsZkRyYXdlckNvbnRleHRNb2RlbFByb3BhZ2F0ZWQnLCB0aGlzLm1vZGVsKTsgLy8gBSA9MEI4Mj0+XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTCAeSDgxOjAgMiBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxmU2VsZWN0ZWRGYXJlQ2hhbmdlZChjcGE6IEZsaWdodFNlZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChjcGEpO1xuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgQWJzdHJhY3RWaWV3IH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvQWJzdHJhY3RWaWV3JztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWwgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9BYnN0cmFjdE1vZGVsJztcbmltcG9ydCB7IEZsaWdodFNlZ21lbnQgfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9jb21tb24vZGF0YS9mbGlnaHQvRmxpZ2h0U2VnbWVudCc7XG5pbXBvcnQgU2VhdE1hcENvbXBvbmVudFNob3BwaW5nIGZyb20gJy4uL1NlYXRNYXBDb21wb25lbnRTaG9wcGluZyc7XG5pbXBvcnQgeyBxdWlja2V0Q29uZmlnIH0gZnJvbSAnLi4vLi4vdXRpbHMvcXVpY2tldENvbmZpZyc7XG5pbXBvcnQgeyBDc3NDbGFzcyB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL2RlY29yYXRvcnMvY2xhc3Nlcy92aWV3L0Nzc0NsYXNzJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvZGVjb3JhdG9ycy9jbGFzc2VzL3ZpZXcvVGVtcGxhdGUnO1xuXG5AQ3NzQ2xhc3MoJ2NvbS1zYWJyZS1yZWRhcHAtZXhhbXBsZTMtd2ViLWN1c3RvbXdvcmtmbG93LXdlYi1tb2R1bGUnKVxuQFRlbXBsYXRlKCdjb20tc2FicmUtcmVkYXBwLWV4YW1wbGUzLXdlYi1jdXN0b213b3JrZmxvdy13ZWItbW9kdWxlOlNob3BwaW5nVGlsZVZpZXcnKVxuZXhwb3J0IGNsYXNzIFNlYXRNYXBTaG9wcGluZ1ZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXc8QWJzdHJhY3RNb2RlbD4ge1xuICAgIHByaXZhdGUgY3VycmVudFNlZ21lbnQ6IEZsaWdodFNlZ21lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGZsaWdodFNlZ21lbnRzOiBhbnlbXSA9IFtdO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRTZWdtZW50SW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZChjcGE6IEZsaWdodFNlZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJz3MIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSBzZWxmRHJhd2VyQ29udGV4dE1vZGVsUHJvcGFnYXRlZCBjYWxsZWQgd2l0aCBjcGE6JywgY3BhKTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRTZWdtZW50ID0gY3BhO1xuICAgICAgICB0aGlzLnVwZGF0ZUZsaWdodFNlZ21lbnRzRnJvbVNlZ21lbnQoY3BhKTtcbiAgICAgICAgdGhpcy50cnlSZW5kZXJSZWFjdENvbXBvbmVudCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRmxpZ2h0U2VnbWVudHNGcm9tU2VnbWVudChzZWdtZW50OiBGbGlnaHRTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gc2VnbWVudC5nZXRTaG9wcGluZ0l0aW5lcmFyeSgpLmdldEZsaWdodFNlZ21lbnRzKCk7XG4gICAgXG4gICAgICAgIGNvbnN0IGFpcmNyYWZ0VHlwZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICAgICAgICAnMzU5JzogJ0FpcmJ1cyBBMzUwLTkwMCcsXG4gICAgICAgICAgICAnMzg4JzogJ0FpcmJ1cyBBMzgwLTgwMCcsXG4gICAgICAgICAgICAnNzdXJzogJ0JvZWluZyA3NzctMzAwRVInLFxuICAgICAgICAgICAgJzMyMCc6ICdBaXJidXMgQTMyMCcsXG4gICAgICAgICAgICAnMzIxJzogJ0FpcmJ1cyBBMzIxJyxcbiAgICAgICAgICAgICc3MzgnOiAnQm9laW5nIDczNy04MDAnLFxuICAgICAgICAgICAgJzc4Nyc6ICdCb2VpbmcgNzg3IERyZWFtbGluZXInXG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuZmxpZ2h0U2VnbWVudHMgPSBzZWdtZW50cy5tYXAocyA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXBhcnR1cmVEYXRlVGltZSA9IHMuZ2V0RGVwYXJ0dXJlRGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgZXF1aXBtZW50Q29kZSA9IHMuZ2V0RXF1aXBtZW50Q29kZT8uKCkgfHwgJ1VOS05PV04nO1xuICAgICAgICAgICAgY29uc3QgZXF1aXBtZW50RGVzY3JpcHRpb24gPSBhaXJjcmFmdFR5cGVzW2VxdWlwbWVudENvZGVdIHx8ICdOb3QgQXZhaWxhYmxlJztcbiAgICBcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IHMuZ2V0U2VnbWVudElkKCksXG4gICAgICAgICAgICAgICAgc2VnbWVudElkOiBzLmdldFNlZ21lbnRJZCgpLFxuICAgICAgICAgICAgICAgIGZsaWdodE51bWJlcjogcy5nZXRGbGlnaHROdW1iZXIoKSxcbiAgICAgICAgICAgICAgICBvcmlnaW46IHMuZ2V0T3JpZ2luSWF0YSgpLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBzLmdldERlc3RpbmF0aW9uSWF0YSgpLFxuICAgICAgICAgICAgICAgIGFpck1pbGVzOiBzLmdldEFpck1pbGVzKCksXG4gICAgICAgICAgICAgICAgZGVwYXJ0dXJlRGF0ZVRpbWU6IGRlcGFydHVyZURhdGVUaW1lID8gZGVwYXJ0dXJlRGF0ZVRpbWUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdIDogJ1VOS05PV04nLFxuICAgICAgICAgICAgICAgIG1hcmtldGluZ0FpcmxpbmU6IHMuZ2V0TWFya2V0aW5nQWlybGluZSgpLFxuICAgICAgICAgICAgICAgIGNhYmluQ2xhc3M6ICdBJyxcbiAgICAgICAgICAgICAgICBhaXJjcmFmdDoge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBlcXVpcG1lbnRDb2RlLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZXF1aXBtZW50RGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0cnlSZW5kZXJSZWFjdENvbXBvbmVudChhdHRlbXB0cyA9IDApIHtcbiAgICAgICAgY29uc3QgTUFYX0FUVEVNUFRTID0gMTA7XG4gICAgICAgIGNvbnN0IElOVEVSVkFMID0gNTAwO1xuICAgICAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWF0bWFwLXJvb3QnKTtcblxuICAgICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcFIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAtOzU8NT1CIHNlYXRtYXAtcm9vdCA9MDk0NT0uIB0wRzg9MDU8IEA1PTQ1QDg9MyBSZWFjdCA6Pjw/Pj01PUIwLicpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZWFjdENvbXBvbmVudCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dGVtcHRzIDwgTUFYX0FUVEVNUFRTKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYKAPIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAtOzU8NT1CIHNlYXRtYXAtcm9vdCA9NSA9MDk0NT0uIB8+MkI+QD0wTyA/Pj9LQjowIEc1QDU3ICR7SU5URVJWQUx9IDxBLiAfPj9LQjowICR7YXR0ZW1wdHMgKyAxfS8ke01BWF9BVFRFTVBUU31gKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy50cnlSZW5kZXJSZWFjdENvbXBvbmVudChhdHRlbXB0cyArIDEpLCBJTlRFUlZBTCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSAdNSBDNDA7PkFMID0wOUI4IE07NTw1PUIgc2VhdG1hcC1yb290ID8+QTs1IDwwOkE4PDA7TD0+Mz4gRzhBOzAgPz4/S0I+Oi4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclJlYWN0Q29tcG9uZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFNlZ21lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignoA8gHTVCIEE+RUAwPVE9PT4zPiBBNTM8NT1CMC4gUmVhY3QgOj48Pz49NT1CID01IDFDNDVCID5CQDU9NDVANT0uJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKCF0aGlzLmZsaWdodFNlZ21lbnRzPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignoA8gZmxpZ2h0U2VnbWVudHMgP0NBQi4gHzVANTg9OEY4MDs4NzBGOE8gODcgQjU6Q0k1Mz4gQTUzPDU9QjAuJyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZsaWdodFNlZ21lbnRzRnJvbVNlZ21lbnQodGhpcy5jdXJyZW50U2VnbWVudCk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbGV0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXRtYXAtcm9vdCcpO1xuICAgIFxuICAgICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUocm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgcm9vdEVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcm9vdEVsZW1lbnQuaWQgPSAnc2VhdG1hcC1yb290JztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocm9vdEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBmbGlnaHRTZWdtZW50czogdGhpcy5mbGlnaHRTZWdtZW50cyxcbiAgICAgICAgICAgIHNlbGVjdGVkU2VnbWVudEluZGV4OiB0aGlzLnNlbGVjdGVkU2VnbWVudEluZGV4XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIC8vID2+ICE+RUAwPU81PCBmbGlnaHRTZWdtZW50cyAyIHNlc3Npb25TdG9yYWdlIDQ7TyA4QT8+O0w3PjIwPThPIDIgUHJpY2luZ1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2ZsaWdodFNlZ21lbnRzRm9yUHJpY2luZycsIEpTT04uc3RyaW5naWZ5KHRoaXMuZmxpZ2h0U2VnbWVudHMpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCc9viBbU2VhdE1hcFNob3BwaW5nVmlld10gITUzPDU9QksgPDBASEBDQjAgQT5FQDA9NT1LIDIgc2Vzc2lvblN0b3JhZ2U6JywgdGhpcy5mbGlnaHRTZWdtZW50cyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMIB5IODE6MCA/QDggQT5FQDA9NT04OCA0MD09S0UgMiBzZXNzaW9uU3RvcmFnZTonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwQ29tcG9uZW50U2hvcHBpbmcsIHsgY29uZmlnOiBxdWlja2V0Q29uZmlnLCBkYXRhIH0pLFxuICAgICAgICAgICAgcm9vdEVsZW1lbnRcbiAgICAgICAgKTtcbiAgICBcbiAgICAgICAgY29uc29sZS5sb2coJz3MIFtTZWF0TWFwU2hvcHBpbmdWaWV3XSBSZWFjdCBDb21wb25lbnQgQ0E/NUg9PiA+QkA1PTQ1QDU9IDIgI3NlYXRtYXAtcm9vdC4nKTtcbiAgICB9XG59XG4iLG51bGwsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge0lNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge0kxOG5TZXJ2aWNlLCBTY29wZWRUcmFuc2xhdG9yfSBmcm9tIFwic2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JMThuU2VydmljZVwiO1xuXG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNvbnRleHQ6IElNb2R1bGVDb250ZXh0ID0gbmV3IE1vZHVsZUNvbnRleHQoXCJjb20tc2FicmUtcmVkYXBwLWZ1bmRhbWVudGFscy13ZWItbW9kdWxlXCIpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjZjogSU1vZHVsZUNvbnRleHRbJ2NmJ10gPSBjb250ZXh0LmNmLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU2VydmljZTogSU1vZHVsZUNvbnRleHRbJ3JlZ2lzdGVyU2VydmljZSddID0gY29udGV4dC5yZWdpc3RlclNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgZ2V0U2VydmljZTogSU1vZHVsZUNvbnRleHRbJ2dldFNlcnZpY2UnXSA9IGNvbnRleHQuZ2V0U2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCB0OiBTY29wZWRUcmFuc2xhdG9yID0gZ2V0U2VydmljZShJMThuU2VydmljZSkuZ2V0U2NvcGVkVHJhbnNsYXRvcignY29tLXNhYnJlLXJlZGFwcC1mdW5kYW1lbnRhbHMtd2ViLW1vZHVsZS90cmFuc2xhdGlvbnMnKTtcbiIsbnVsbCwiXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qIEF1dG8tZ2VuZXJhdGVkIGZpbGUuICAgICAgICAgICAgICAqL1xuLyogRG8gbm90IG1vZGlmeSBpdC4gICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHJlbW92ZSBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgY29tbWl0IGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBwdXNoIGl0LiAgICAgICAgICAgICAgICAgICovXG4vKiBSZW1vdmUgaXQgaWYgbW9kdWxlIG5hbWUgY2hhbmdlZC4gKi9cbi8qIGVzbGludDpkaXNhYmxlICAgICAgICAgICAgICAgICAgICAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7TWFpbn0gZnJvbSAnLi9NYWluJztcbmltcG9ydCB7SU1vZHVsZU1hbmlmZXN0fSBmcm9tICdzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL0lNb2R1bGVNYW5pZmVzdCc7XG5pbXBvcnQge2NvbnRleHR9IGZyb20gJy4vQ29udGV4dCc7XG5cbi8qKlxuICogIEF1dG9nZW5lcmF0ZWQgY2xhc3MgcmVwcmVzZW50aW5nIG1vZHVsZSBpbiBydW50aW1lLlxuICoqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlX2NvbV9zYWJyZV9yZWRhcHBfZnVuZGFtZW50YWxzX3dlYl9tb2R1bGUgZXh0ZW5kcyBNYWluIHtcbiAgICBjb25zdHJ1Y3RvcihtYW5pZmVzdDogSU1vZHVsZU1hbmlmZXN0KSB7XG4gICAgICAgIHN1cGVyKG1hbmlmZXN0KTtcbiAgICAgICAgY29udGV4dC5zZXRNb2R1bGUodGhpcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGUnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4vQ29udGV4dCc7XG5pbXBvcnQgeyBFeHRlbnNpb25Qb2ludFNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YteHAvc2VydmljZXMvRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlJztcbmltcG9ydCB7IFJlZEFwcFNpZGVQYW5lbENvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi14cC9jb25maWdzL1JlZEFwcFNpZGVQYW5lbENvbmZpZyc7XG5pbXBvcnQgeyBSZWRBcHBTaWRlUGFuZWxCdXR0b24gfSBmcm9tICdzYWJyZS1uZ3YtcmVkQXBwU2lkZVBhbmVsL21vZGVscy9SZWRBcHBTaWRlUGFuZWxCdXR0b24nO1xuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvc2VydmljZXMvTGF5ZXJTZXJ2aWNlJztcbmltcG9ydCB7IFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtYWlyQXZhaWxhYmlsaXR5L3NlcnZpY2VzL1B1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhY3RNb2RhbE9wdGlvbnMgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL2NvbXBvbmVudHMvUHVibGljUmVhY3RNb2RhbC9SZWFjdE1vZGFsT3B0aW9ucyc7XG5pbXBvcnQgeyBQdWJsaWNNb2RhbHNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LW1vZGFscy9zZXJ2aWNlcy9QdWJsaWNNb2RhbFNlcnZpY2UnO1xuXG5pbXBvcnQgeyBDcmVhdGVQTlIgfSBmcm9tICcuL2NvbXBvbmVudHMvY3JlYXRlUG5yL0NyZWF0ZVBOUic7XG5pbXBvcnQgeyBjcmVhdGVQbnJGb3JUd29QYXNzZW5nZXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZVBuci9jcmVhdGVQbnJGb3JUd29QYXNzZW5nZXJzJztcbmltcG9ydCB7IFNlYXRNYXBzUG9wb3ZlciB9IGZyb20gJy4vY29tcG9uZW50cy9TZWF0TWFwc1BvcG92ZXInO1xuaW1wb3J0IHsgU2VhdE1hcEF2YWlsVGlsZSB9IGZyb20gJy4vY29tcG9uZW50cy93aWRnZXRzL1NlYXRNYXBBdmFpbFRpbGUnO1xuaW1wb3J0IHsgU2VhdE1hcEF2YWlsVmlldyB9IGZyb20gJy4vY29tcG9uZW50cy93aWRnZXRzL1NlYXRNYXBBdmFpbFZpZXcnO1xuXG5leHBvcnQgY2xhc3MgTWFpbiBleHRlbmRzIE1vZHVsZSB7XG4gICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgICAvLyA/PjQ6O05HMDU8IDI4NDY1QiA0O08gQXZhaWxhYmlsaXR5XG4gICAgICAgIHRoaXMucmVnaXN0ZXJTZWF0TWFwQXZhaWxUaWxlKCk7XG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IHhwID0gZ2V0U2VydmljZShFeHRlbnNpb25Qb2ludFNlcnZpY2UpO1xuICAgICAgICBjb25zdCBzaWRlcGFuZWxNZW51ID0gbmV3IFJlZEFwcFNpZGVQYW5lbENvbmZpZyhbXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKFxuICAgICAgICAgICAgICAgIFwiQ3JlYXRlIFBOUlwiLFxuICAgICAgICAgICAgICAgIFwiYnRuLXNlY29uZGFyeSBzaWRlLXBhbmVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICgpID0+IHsgdGhpcy5zaG93Rm9ybSgpOyB9LFxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbihcbiAgICAgICAgICAgICAgICBcIlNlYXRNYXBzIEFCQyAzNjBcIixcbiAgICAgICAgICAgICAgICBcImJ0bi1zZWNvbmRhcnkgc2lkZS1wYW5lbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHRoaXMub3BlblNlYXRNYXBzKCk7IH0sXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKFxuICAgICAgICAgICAgICAgIFwiQ3JlYXRlIFBOUiAyXCIsXG4gICAgICAgICAgICAgICAgXCJidG4tc2Vjb25kYXJ5IHNpZGUtcGFuZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgKCkgPT4geyBjcmVhdGVQbnJGb3JUd29QYXNzZW5nZXJzKCk7IH0sXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgXSk7XG4gICAgICAgIHhwLmFkZENvbmZpZyhcInJlZEFwcFNpZGVQYW5lbFwiLCBzaWRlcGFuZWxNZW51KTtcbiAgICB9XG5cbiAgICBzaG93Rm9ybSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbHMgPSBnZXRTZXJ2aWNlKExheWVyU2VydmljZSk7XG4gICAgICAgIGxzLnNob3dPbkxheWVyKENyZWF0ZVBOUiwgeyBkaXNwbGF5OiBcImFyZWFWaWV3XCIsIHBvc2l0aW9uOiA0MiB9KTtcbiAgICB9XG5cbiAgICBvcGVuU2VhdE1hcHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHB1YmxpY01vZGFsc1NlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpO1xuICAgICAgICBwdWJsaWNNb2RhbHNTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKHtcbiAgICAgICAgICAgIGhlYWRlcjogJ1NlbGVjdCBQYXNzZW5nZXJzIGFuZCBTZWdtZW50JyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwc1BvcG92ZXIpLFxuICAgICAgICAgICAgbW9kYWxDbGFzc05hbWU6ICdzZWF0bWFwLW1vZGFsLWNsYXNzJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBdmFpbGFiaWxpdHlUaWxlXG4gICAgcHJpdmF0ZSByZWdpc3RlclNlYXRNYXBBdmFpbFRpbGUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFpckF2YWlsYWJpbGl0eVNlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY0FpckF2YWlsYWJpbGl0eVNlcnZpY2UpOyAvLyAyPUNCQDU9PTg5IEE1QDI4QSA0O08gP0A1ND5BQjAyOzU9OE8gNDA9PUtFIDIgQDA8OjBFIEF2YWlsYWJpbGl0eVxuXG4gICAgICAgIGNvbnN0IHNob3dTZWF0TWFwQXZhaWxhYmlsaXR5TW9kYWwgPSAoZGF0YTogYW55KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCc95SBbQXZhaWxhYmlsaXR5XSBSZWNlaXZlZCBEYXRhOicsIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKTtcblxuICAgICAgICAgICAgY29uc3QgbW9kYWxPcHRpb25zOiBSZWFjdE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdTZWF0TWFwcyBBQkMgMzYwJyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcEF2YWlsVmlldywgZGF0YSksXG4gICAgICAgICAgICAgICAgbW9kYWxDbGFzc05hbWU6ICdyZWFjdC10aWxlLW1vZGFsLWNsYXNzJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKS5zaG93UmVhY3RNb2RhbChtb2RhbE9wdGlvbnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGFpckF2YWlsYWJpbGl0eVNlcnZpY2UuY3JlYXRlQWlyQXZhaWxhYmlsaXR5U2VhcmNoVGlsZShcbiAgICAgICAgICAgIFNlYXRNYXBBdmFpbFRpbGUsXG4gICAgICAgICAgICBzaG93U2VhdE1hcEF2YWlsYWJpbGl0eU1vZGFsLFxuICAgICAgICAgICAgJ1NlYXRNYXBzIEFCQyAzNjAnXG4gICAgICAgICk7XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoID0gKHRpdGxlOiBzdHJpbmcsIG1zZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUEFSQUdSQVBIJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtc2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Nsb3NlJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xufSIsImltcG9ydCB7IE9wdGlvbiB9IGZyb20gJ3NhYnJlLW5ndi1VSUNvbXBvbmVudHMvYWR2YW5jZWREcm9wZG93bi9pbnRlcmZhY2VzL09wdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFzc2VuZ2VyT3B0aW9uIGV4dGVuZHMgT3B0aW9uPHN0cmluZz4ge1xuICAgIGdpdmVuTmFtZTogc3RyaW5nO1xuICAgIHN1cm5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWdtZW50T3B0aW9uIGV4dGVuZHMgT3B0aW9uPHN0cmluZz4ge1xuICAgIG9yaWdpbjogc3RyaW5nO1xuICAgIGRlc3RpbmF0aW9uOiBzdHJpbmc7XG4gICAgZGVwYXJ0dXJlRGF0ZTogc3RyaW5nO1xuICAgIG1hcmtldGluZ0NhcnJpZXI6IHN0cmluZztcbiAgICBtYXJrZXRpbmdGbGlnaHROdW1iZXI6IHN0cmluZztcbiAgICBib29raW5nQ2xhc3M6IHN0cmluZztcbiAgICBlcXVpcG1lbnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbnJEYXRhIHtcbiAgICBwYXNzZW5nZXJzOiBQYXNzZW5nZXJPcHRpb25bXTtcbiAgICBzZWdtZW50czogU2VnbWVudE9wdGlvbltdO1xufVxuXG5leHBvcnQgY29uc3QgcGFyc2VQbnJEYXRhID0gKHhtbERvYzogWE1MRG9jdW1lbnQpOiBQbnJEYXRhID0+IHtcbiAgICBjb25zdCBwYXNzZW5nZXJzOiBQYXNzZW5nZXJPcHRpb25bXSA9IFtdO1xuICAgIGNvbnN0IHNlZ21lbnRzOiBTZWdtZW50T3B0aW9uW10gPSBbXTtcblxuICAgIC8vIC0tLSAfMEFBMDY4QEsgLS0tXG4gICAgY29uc3QgcGFzc2VuZ2VyTm9kZXMgPSB4bWxEb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5OlBhc3NlbmdlcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFzc2VuZ2VyTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGFzc2VuZ2VyID0gcGFzc2VuZ2VyTm9kZXNbaV07XG4gICAgICAgIGNvbnN0IGlkID0gcGFzc2VuZ2VyLmdldEF0dHJpYnV0ZSgnaWQnKSB8fCAnJztcbiAgICAgICAgY29uc3QgbGFzdE5hbWUgPSBwYXNzZW5nZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5Okxhc3ROYW1lJylbMF0/LnRleHRDb250ZW50IHx8ICcnO1xuICAgICAgICBjb25zdCBmaXJzdE5hbWUgPSBwYXNzZW5nZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5OkZpcnN0TmFtZScpWzBdPy50ZXh0Q29udGVudCB8fCAnJztcblxuICAgICAgICBwYXNzZW5nZXJzLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6IGAke2xhc3ROYW1lfS8ke2ZpcnN0TmFtZX1gLFxuICAgICAgICAgICAgdmFsdWU6IGlkLFxuICAgICAgICAgICAgZ2l2ZW5OYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICBzdXJuYW1lOiBsYXN0TmFtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAtLS0gITUzPDU9QksgLS0tXG4gICAgY29uc3QgYWlyU2VnbWVudE5vZGVzID0geG1sRG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdGwxOTpBaXInKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFpclNlZ21lbnROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzZWdtZW50ID0gYWlyU2VnbWVudE5vZGVzW2ldO1xuXG4gICAgICAgIGNvbnN0IGlkID0gc2VnbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgJyc7XG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IHNlZ21lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5OkRlcGFydHVyZUFpcnBvcnQnKVswXT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gc2VnbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3RsMTk6QXJyaXZhbEFpcnBvcnQnKVswXT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgIGNvbnN0IGRlcGFydHVyZURhdGVUaW1lID0gc2VnbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3RsMTk6RGVwYXJ0dXJlRGF0ZVRpbWUnKVswXT8udGV4dENvbnRlbnQgfHwgJyc7XG5cbiAgICAgICAgY29uc3QgbWFya2V0aW5nQ2Fycmllck5vZGUgPSBzZWdtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdGwxOTpNYXJrZXRpbmdBaXJsaW5lJylbMF07XG4gICAgICAgIGNvbnN0IG9wZXJhdGluZ0NhcnJpZXJOb2RlID0gc2VnbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3RsMTk6T3BlcmF0aW5nQWlybGluZScpWzBdO1xuXG4gICAgICAgIGNvbnN0IG1hcmtldGluZ0NhcnJpZXIgPSBtYXJrZXRpbmdDYXJyaWVyTm9kZT8udGV4dENvbnRlbnQ/LnRyaW0oKVxuICAgICAgICAgICAgfHwgb3BlcmF0aW5nQ2Fycmllck5vZGU/LnRleHRDb250ZW50Py50cmltKClcbiAgICAgICAgICAgIHx8ICdVTktOT1dOJztcblxuICAgICAgICBjb25zdCBtYXJrZXRpbmdGbGlnaHROdW1iZXIgPSBzZWdtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdGwxOTpNYXJrZXRpbmdGbGlnaHROdW1iZXInKVswXT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgIGNvbnN0IGJvb2tpbmdDbGFzcyA9IHNlZ21lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5OlJlc0Jvb2tEZXNpZ0NvZGUnKVswXT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgIGNvbnN0IGVxdWlwbWVudCA9IHNlZ21lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5OkVxdWlwbWVudCcpWzBdPy50ZXh0Q29udGVudCB8fCAnJztcblxuICAgICAgICAvLyAYNzI7NTowNTwgQj47TDo+IDQwQkMgODcgRGVwYXJ0dXJlRGF0ZVRpbWVcbiAgICAgICAgbGV0IGRlcGFydHVyZURhdGUgPSAnJztcbiAgICAgICAgaWYgKGRlcGFydHVyZURhdGVUaW1lLmluY2x1ZGVzKCdUJykpIHtcbiAgICAgICAgICAgIGRlcGFydHVyZURhdGUgPSBkZXBhcnR1cmVEYXRlVGltZS5zcGxpdCgnVCcpWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VnbWVudHMucHVzaCh7XG4gICAgICAgICAgICBsYWJlbDogYCR7b3JpZ2lufSCSICR7ZGVzdGluYXRpb259ICgke21hcmtldGluZ0NhcnJpZXJ9JHttYXJrZXRpbmdGbGlnaHROdW1iZXJ9KWAsXG4gICAgICAgICAgICB2YWx1ZTogaWQsXG4gICAgICAgICAgICBvcmlnaW4sXG4gICAgICAgICAgICBkZXN0aW5hdGlvbixcbiAgICAgICAgICAgIGRlcGFydHVyZURhdGUsXG4gICAgICAgICAgICBtYXJrZXRpbmdDYXJyaWVyLFxuICAgICAgICAgICAgbWFya2V0aW5nRmxpZ2h0TnVtYmVyLFxuICAgICAgICAgICAgYm9va2luZ0NsYXNzLFxuICAgICAgICAgICAgZXF1aXBtZW50XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7IHBhc3NlbmdlcnMsIHNlZ21lbnRzIH07XG59OyIsIi8vIGNvbmZpZyA0O08gMTgxOzg+QjU6OCBxdWlja2V0LmlvXG5cbmV4cG9ydCBjb25zdCBxdWlja2V0Q29uZmlnID0ge1xuICAgIHdpZHRoOiA0MDAsXG4gICAgbGFuZzogJ0VOJyxcbiAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICByaWdodFRvTGVmdDogZmFsc2UsXG4gICAgdmlzaWJsZUZ1c2VsYWdlOiB0cnVlLFxuICAgIHZpc2libGVXaW5nczogdHJ1ZSxcbiAgICBidWlsdEluRGVja1NlbGVjdG9yOiB0cnVlLFxuICAgIHNpbmdsZURlY2tNb2RlOiB0cnVlLFxuICAgIGJ1aWx0SW5Ub29sdGlwOiB0cnVlLFxuICAgIGV4dGVybmFsUGFzc2VuZ2VyTWFuYWdlbWVudDogZmFsc2UsXG4gICAgdG9vbHRpcE9uSG92ZXI6IGZhbHNlLFxuICAgIGNvbG9yVGhlbWU6IHtcbiAgICAgICAgc2VhdExhYmVsQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIHNlYXRTdHJva2VDb2xvcjogJ2dyYXknXG4gICAgfVxufTtcbiIsIi8vIEQwOTs6IFhtbFZpZXdlci50c3hcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBmb3JtYXRYbWwgPSAoeG1sOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IFBBRERJTkcgPSAnICAnO1xuICAgIGNvbnN0IHJlZyA9IC8oPikoPCkoXFwvKikvZztcbiAgICBsZXQgZm9ybWF0dGVkID0gJyc7XG4gICAgbGV0IHBhZCA9IDA7XG5cbiAgICB4bWwgPSB4bWwucmVwbGFjZShyZWcsICckMVxcclxcbiQyJDMnKTtcbiAgICB4bWwuc3BsaXQoJ1xcclxcbicpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgbGV0IGluZGVudCA9IDA7XG4gICAgICAgIGlmIChub2RlLm1hdGNoKC8uKzxcXC9cXHdbXj5dKj4kLykpIHtcbiAgICAgICAgICAgIGluZGVudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5tYXRjaCgvXjxcXC9cXHcvKSkge1xuICAgICAgICAgICAgaWYgKHBhZCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHBhZCAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubWF0Y2goL148XFx3KFtePl0qW14vXSk/Pi4qJC8pKSB7XG4gICAgICAgICAgICBpbmRlbnQgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZW50ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSBQQURESU5HLnJlcGVhdChwYWQpO1xuICAgICAgICBmb3JtYXR0ZWQgKz0gcGFkZGluZyArIG5vZGUgKyAnXFxyXFxuJztcbiAgICAgICAgcGFkICs9IGluZGVudDtcbiAgICB9KTtcblxuICAgIHJldHVybiBmb3JtYXR0ZWQudHJpbSgpO1xufTtcblxuaW50ZXJmYWNlIFhtbFZpZXdlclByb3BzIHtcbiAgICB4bWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IFhtbFZpZXdlcjogUmVhY3QuRkM8WG1sVmlld2VyUHJvcHM+ID0gKHsgeG1sIH0pID0+IHtcbiAgICBjb25zdCBmb3JtYXR0ZWRYbWwgPSBmb3JtYXRYbWwoeG1sKTtcblxuICAgIGNvbnN0IGRvd25sb2FkWG1sID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2Zvcm1hdHRlZFhtbF0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL3htbCcgfSk7XG4gICAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICAgICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgYS5ocmVmID0gdXJsO1xuICAgICAgICBhLmRvd25sb2FkID0gJ0VuaGFuY2VkU2VhdE1hcFJTLnhtbCc7XG4gICAgICAgIGEuY2xpY2soKTtcblxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHgnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJywgbWF4SGVpZ2h0OiAnODB2aCcsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgPGgzPj3rIEVuaGFuY2VkU2VhdE1hcFJTPC9oMz5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAncmlnaHQnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2Rvd25sb2FkWG1sfSBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgPeUgRG93bmxvYWQgWE1MXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwcmUgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLFxuICAgICAgICAgICAgICAgIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmNWY1ZjUnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNXB4JyxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMC44NXJlbScsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dYOiAnYXV0bydcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIHtmb3JtYXR0ZWRYbWx9XG4gICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07Il19 