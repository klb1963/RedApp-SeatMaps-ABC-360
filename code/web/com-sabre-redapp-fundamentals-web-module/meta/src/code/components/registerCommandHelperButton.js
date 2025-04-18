"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommandHelperButton = void 0;
var ExtensionPointService_1 = require("sabre-ngv-xp/services/ExtensionPointService");
var NoviceButtonConfig_1 = require("sabre-ngv-xp/configs/NoviceButtonConfig");
var Context_1 = require("../Context"); // если уже подключено в Main.ts
var SeatMapsPopover_1 = require("./SeatMapsPopover"); // это React-компонент для поповера
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
