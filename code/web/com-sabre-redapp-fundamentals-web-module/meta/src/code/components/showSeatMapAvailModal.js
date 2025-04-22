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
