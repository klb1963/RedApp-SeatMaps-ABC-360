"use strict";
// файл: code/components/loadSeatMapFromSabre.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSeatMapFromSabre = void 0;
/**
 * Загружает SeatMap для заданного сегмента рейса и списка пассажиров.
 *
 * Использует Sabre EnhancedSeatMapRQ через SOAP API.
 * Формирует и отправляет запрос с данными о рейсе, пассажирах и классе обслуживания.
 *
 * @param flightSegment Данные сегмента рейса (город отправления, прибытия, дата, перевозчик и т.д.).
 * @param passengers Список пассажиров для запроса.
 * @param onSuccess Колбэк, вызываемый при успешном получении карты мест.
 * @param onError (опционально) Колбэк для обработки ошибок при вызове API.
 */
var Context_1 = require("../Context");
var ISoapApiService_1 = require("sabre-ngv-communication/interfaces/ISoapApiService");
var loadSeatMapFromSabre = function (flightSegment, passengers, onSuccess, onError) { return __awaiter(void 0, void 0, void 0, function () {
    var soapApiService, passengerBlocks, cabinDefinitionBlock, soapPayload, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                soapApiService = (0, Context_1.getService)(ISoapApiService_1.ISoapApiService);
                passengerBlocks = passengers.map(function (passenger) { return "\n            <ns4:FareAvailQualifiers passengerType=\"ADT\">\n                <ns4:TravellerID>" + passenger.travellerId + "</ns4:TravellerID>\n                <ns4:GivenName>" + passenger.givenName + "</ns4:GivenName>\n                <ns4:Surname>" + passenger.surname + "</ns4:Surname>\n                <ns4:SSR>TKNE</ns4:SSR>\n            </ns4:FareAvailQualifiers>\n        "; }).join('');
                cabinDefinitionBlock = flightSegment.bookingClass ? "\n        <ns4:CabinDefinition>\n            <ns4:RBD>" + flightSegment.bookingClass + "</ns4:RBD>\n        </ns4:CabinDefinition>\n        " : "\n            <ns4:CabinDefinition>\n                <ns4:Cabin>" + flightSegment.cabin + "</ns4:Cabin>\n            </ns4:CabinDefinition>\n        ";
                soapPayload = "\n            <ns4:EnhancedSeatMapRQ xmlns:ns4=\"http://stl.sabre.com/Merchandising/v8\">\n                <ns4:SeatMapQueryEnhanced>\n                    <ns4:RequestType>Payload</ns4:RequestType>\n\n                    <ns4:POS company=\"DI9L\" multiHost=\"DI9L\">\n                        <ns4:Actual city=\"MUC\"/>\n                        <ns4:PCC>DI9L</ns4:PCC>\n                    </ns4:POS>\n\n                    <ns4:Flight id=\"f1\" destination=\"" + flightSegment.destination + "\" origin=\"" + flightSegment.origin + "\">\n                        <ns4:DepartureDate>" + flightSegment.departureDate + "</ns4:DepartureDate>\n                        <ns4:Marketing carrier=\"" + flightSegment.marketingCarrier + "\">" + flightSegment.marketingFlightNumber + "</ns4:Marketing>\n                    </ns4:Flight>\n\n                    " + cabinDefinitionBlock + "\n\n                    <ns4:Currency>USD</ns4:Currency>\n\n                    " + passengerBlocks + "\n                </ns4:SeatMapQueryEnhanced>\n                <ns4:CalculateDiscount>true</ns4:CalculateDiscount>\n                <ns4:ShowOffers>true</ns4:ShowOffers> \n            </ns4:EnhancedSeatMapRQ>\n        ";
                console.log('📤 Sending EnhancedSeatMapRQ payload:', soapPayload);
                return [4 /*yield*/, soapApiService.callSws({
                        action: 'EnhancedSeatMapRQ',
                        payload: soapPayload,
                        authTokenType: 'SESSION'
                    })];
            case 1:
                response = _a.sent();
                console.log('✅ EnhancedSeatMapRQ Response:', response);
                onSuccess(response.getParsedValue());
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('❌ Error calling EnhancedSeatMapRQ:', error_1);
                if (onError) {
                    onError(error_1);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loadSeatMapFromSabre = loadSeatMapFromSabre;
