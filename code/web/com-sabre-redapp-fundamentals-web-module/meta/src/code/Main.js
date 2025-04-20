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
var CreatePNR_1 = require("./CreatePNR");
var createPnrForTwoPassengers_1 = require("./components/createPnrForTwoPassengers");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapsPopover_1 = require("./components/SeatMapsPopover");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
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
    return Main;
}(Module_1.Module));
exports.Main = Main;
