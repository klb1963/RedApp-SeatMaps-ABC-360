"use strict";
// файл: code/components/loadPnrDetailsFromSabre.ts
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
exports.loadPnrDetailsFromSabre = void 0;
/**
 * Загружает полные данные о текущем бронировании (PNR) из Sabre.
 *
 * Использует SOAP API запрос GetReservationRQ.
 * Извлекает активный Record Locator, отправляет запрос и парсит ответ в структуру PnrData.
 *
 * @param onDataLoaded Колбэк, вызываемый после успешной загрузки и парсинга данных PNR.
 */
var Context_1 = require("../Context");
var ISoapApiService_1 = require("sabre-ngv-communication/interfaces/ISoapApiService");
var PnrPublicService_1 = require("sabre-ngv-app/app/services/impl/PnrPublicService");
var parcePnrData_1 = require("../utils/parcePnrData");
var loadPnrDetailsFromSabre = function (onDataLoaded) { return __awaiter(void 0, void 0, void 0, function () {
    var pnrService, soapApiService, recordLocator, soapPayload, response, parsedData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pnrService = (0, Context_1.getService)(PnrPublicService_1.PnrPublicService);
                soapApiService = (0, Context_1.getService)(ISoapApiService_1.ISoapApiService);
                recordLocator = pnrService.getRecordLocator();
                if (!recordLocator) {
                    console.warn('No active PNR. Please create or retrieve a PNR first.');
                    return [2 /*return*/];
                }
                console.log('Record Locator:', recordLocator);
                soapPayload = "\n            <ns6:GetReservationRQ xmlns:ns6=\"http://webservices.sabre.com/pnrbuilder/v1_19\" Version=\"1.19.22\">\n                <ns6:RequestType>Stateful</ns6:RequestType>\n                <ns6:ReturnOptions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:type=\"ns6:ReturnOptions\" UnmaskCreditCard=\"false\" ShowTicketStatus=\"true\">\n                    <ns6:ViewName>Full</ns6:ViewName>\n                    <ns6:ResponseFormat>STL</ns6:ResponseFormat>\n                </ns6:ReturnOptions>\n            </ns6:GetReservationRQ>\n        ";
                return [4 /*yield*/, soapApiService.callSws({
                        action: 'GetReservationRQ',
                        payload: soapPayload,
                        authTokenType: 'SESSION'
                    })];
            case 1:
                response = _a.sent();
                console.log('GetReservationRQ Response:', response);
                parsedData = (0, parcePnrData_1.parsePnrData)(response.getParsedValue());
                console.log('🧩 Parsed PNR Data:', JSON.stringify(parsedData, null, 2));
                console.log('Segments:', parsedData.segments);
                // Вот здесь вызываем колбэк, передавая данные!
                onDataLoaded(parsedData);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error calling GetReservationRQ via ISoapApiService:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loadPnrDetailsFromSabre = loadPnrDetailsFromSabre;
