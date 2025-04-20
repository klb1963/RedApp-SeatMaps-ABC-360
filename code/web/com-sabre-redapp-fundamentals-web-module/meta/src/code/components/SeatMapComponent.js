"use strict";
// файл: SeatMapComponent.tsx
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
// файл: SeatMapComponent.tsx
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
