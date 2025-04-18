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
var React = require("react");
var SeatMapComponent = /** @class */ (function (_super) {
    __extends(SeatMapComponent, _super);
    function SeatMapComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeatMapComponent.prototype.render = function () {
        var _a = this.props, passengerIds = _a.passengerIds, segmentId = _a.segmentId;
        return (React.createElement("div", { style: {
                padding: '20px',
                backgroundColor: '#fff',
                minHeight: '400px'
            } },
            React.createElement("h2", null, "Seat Map"),
            React.createElement("p", null,
                React.createElement("strong", null, "Flight Segment:"),
                " ",
                segmentId),
            React.createElement("p", null,
                React.createElement("strong", null, "Selected Passengers:")),
            React.createElement("ul", null, passengerIds.map(function (passengerId, index) { return (React.createElement("li", { key: index }, passengerId)); })),
            React.createElement("hr", null),
            React.createElement("div", { style: {
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#eef',
                    borderRadius: '8px',
                    textAlign: 'center'
                } },
                React.createElement("p", null,
                    React.createElement("em", null, "Seat map visualization coming soon...")))));
    };
    return SeatMapComponent;
}(React.Component));
exports.SeatMapComponent = SeatMapComponent;
