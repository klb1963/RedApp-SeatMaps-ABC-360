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
