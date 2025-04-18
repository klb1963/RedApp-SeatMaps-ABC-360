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
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var SimpleDropdown_1 = require("sabre-ngv-UIComponents/advancedDropdown/components/SimpleDropdown");
var loadPnrDetailsFromSabre_1 = require("./loadPnrDetailsFromSabre");
var Context_1 = require("../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponent_1 = require("./SeatMapComponent");
var SeatMapsPopover = /** @class */ (function (_super) {
    __extends(SeatMapsPopover, _super);
    function SeatMapsPopover(props) {
        var _this = _super.call(this, props) || this;
        _this.handlePassengerChange = function (passengerValue) {
            var selectedPassengers = _this.state.selectedPassengers;
            var isSelected = selectedPassengers.includes(passengerValue);
            var updatedPassengers = isSelected
                ? selectedPassengers.filter(function (p) { return p !== passengerValue; })
                : __spreadArray(__spreadArray([], selectedPassengers, true), [passengerValue], false);
            _this.setState({ selectedPassengers: updatedPassengers });
        };
        _this.handleSegmentChange = function (options) {
            var selected = options.find(function (opt) { return opt.checked; });
            if (selected) {
                _this.setState({ selectedSegment: selected.value });
            }
        };
        _this.handleOpenSeatMap = function () {
            var _a;
            var publicModalsService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService);
            var modalOptions = {
                header: 'Seat Map',
                component: React.createElement(SeatMapComponent_1.SeatMapComponent, {
                    passengerIds: _this.state.selectedPassengers,
                    segmentId: _this.state.selectedSegment
                }),
                modalClassName: 'seatmap-modal-class'
            };
            publicModalsService.showReactModal(modalOptions);
            (_a = _this.props['__layerInstance']) === null || _a === void 0 ? void 0 : _a.close(); // Без ошибок
        };
        _this.state = {
            selectedPassengers: [],
            selectedSegment: '',
            passengers: [],
            segments: []
        };
        return _this;
    }
    SeatMapsPopover.prototype.componentDidMount = function () {
        var _this = this;
        (0, loadPnrDetailsFromSabre_1.loadPnrDetailsFromSabre)(function (data) {
            _this.setState({
                passengers: data.passengers.map(function (p) { return (__assign(__assign({}, p), { checked: true })); }),
                selectedPassengers: data.passengers.map(function (p) { return p.value; }),
                segments: data.segments
            });
        });
    };
    SeatMapsPopover.prototype.render = function () {
        var _this = this;
        var _a = this.state, passengers = _a.passengers, segments = _a.segments, selectedPassengers = _a.selectedPassengers, selectedSegment = _a.selectedSegment;
        var isButtonDisabled = selectedPassengers.length === 0 || !selectedSegment;
        return (React.createElement("div", { style: {
                padding: '20px',
                width: '400px',
                minHeight: '350px',
                overflowY: 'auto',
                backgroundColor: '#fff',
                borderRadius: '8px'
            } },
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null,
                    "Select Passengers (",
                    selectedPassengers.length,
                    ")"),
                React.createElement("div", { style: { marginTop: '10px' } }, passengers.map(function (passenger) { return (React.createElement("div", { key: passenger.value, style: { display: 'flex', alignItems: 'center', marginBottom: '5px' } },
                    React.createElement("input", { type: "checkbox", checked: selectedPassengers.includes(passenger.value), onChange: function () { return _this.handlePassengerChange(passenger.value); }, style: { marginRight: '8px' } }),
                    React.createElement("span", null, passenger.label))); }))),
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null, "Select Flight Segment"),
                React.createElement(SimpleDropdown_1.SimpleDropdown, { options: segments, onChange: this.handleSegmentChange })),
            React.createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '20px' } },
                React.createElement(react_bootstrap_1.Button, { className: "btn-primary", onClick: this.handleOpenSeatMap, disabled: isButtonDisabled }, "Open Seat Map"))));
    };
    return SeatMapsPopover;
}(React.Component));
exports.SeatMapsPopover = SeatMapsPopover;
