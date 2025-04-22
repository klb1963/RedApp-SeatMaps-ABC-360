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
