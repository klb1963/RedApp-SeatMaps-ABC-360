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
