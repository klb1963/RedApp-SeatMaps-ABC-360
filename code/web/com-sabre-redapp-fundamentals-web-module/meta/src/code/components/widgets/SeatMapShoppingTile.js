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
