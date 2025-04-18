"use strict";
// файл: createPnrMucDxbForm.ts
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
exports.createPnrMucDxbForm = void 0;
var ICustomFormsService_1 = require("sabre-ngv-custom-forms/services/ICustomFormsService");
var DatesService_1 = require("sabre-ngv-app/app/services/impl/DatesService");
var ICommandMessageService_1 = require("sabre-ngv-commsg/services/ICommandMessageService");
var InterstitialService_1 = require("sabre-ngv-app/app/services/impl/InterstitialService");
var Context_1 = require("../Context");
var openCustomFormParagraph_1 = require("../utils/openCustomFormParagraph");
var createPnrMucDxbForm = function () { return __awaiter(void 0, void 0, void 0, function () {
    var form, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                form = {
                    title: 'Create PNR MUC-DXB',
                    fields: [
                        { id: 'name', value: '-KLEIMANN/LEONID' },
                        { id: 'daysAhead', value: '20' },
                        { id: 'ticket', value: '01Y2' },
                        { id: 'agent', value: '6AGENT' },
                        { id: 'phone', value: '91234567' },
                        { id: 'timeLimit', value: '7TAW/' }
                    ],
                    actions: [
                        { id: 'cancel', label: 'Cancel' },
                        { id: 'ok', label: 'Submit' }
                    ]
                };
                return [4 /*yield*/, (0, Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(form)];
            case 1:
                result = _a.sent();
                if (result.action === 'ok') {
                    selfSubmitPnrMucDxbAction(result);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.createPnrMucDxbForm = createPnrMucDxbForm;
var selfSubmitPnrMucDxbAction = function (form) { return __awaiter(void 0, void 0, void 0, function () {
    var interstitialService, nameRq, daysAheadStr, daysAhead, flightDate, flightRq, ticketRq, agentInfoRq, phoneRq, tawRq, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                interstitialService = (0, Context_1.getService)(InterstitialService_1.InterstitialService);
                nameRq = form.fields.find(function (f) { return f.id === 'name'; }).value;
                daysAheadStr = ((_a = form.fields.find(function (f) { return f.id === 'daysAhead'; })) === null || _a === void 0 ? void 0 : _a.value) || '20';
                daysAhead = parseInt(daysAheadStr, 10) || 20;
                flightDate = (0, Context_1.getService)(DatesService_1.DatesService).getNow().add(daysAhead, 'days').format('DDMMM').toUpperCase();
                flightRq = "0EK" + flightDate + "MUCDXB50Y";
                ticketRq = form.fields.find(function (f) { return f.id === 'ticket'; }).value;
                agentInfoRq = form.fields.find(function (f) { return f.id === 'agent'; }).value;
                phoneRq = form.fields.find(function (f) { return f.id === 'phone'; }).value;
                tawRq = form.fields.find(function (f) { return f.id === 'timeLimit'; }).value;
                interstitialService.showInterstitial(15000);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, 11, 12]);
                return [4 /*yield*/, sendCommand(nameRq, 'Name')];
            case 2:
                _b.sent();
                return [4 /*yield*/, sendCommand(flightRq, 'Flight segment')];
            case 3:
                _b.sent();
                return [4 /*yield*/, sendCommand(ticketRq, 'Ticket')];
            case 4:
                _b.sent();
                return [4 /*yield*/, sendCommand(agentInfoRq, 'Agent info')];
            case 5:
                _b.sent();
                return [4 /*yield*/, sendCommand(phoneRq, 'Phone')];
            case 6:
                _b.sent();
                return [4 /*yield*/, sendCommand(tawRq, 'Time limit')];
            case 7:
                _b.sent();
                return [4 /*yield*/, sendCommand('WP', 'WP')];
            case 8:
                _b.sent();
                return [4 /*yield*/, sendCommand('PQ', 'PQ')];
            case 9:
                _b.sent();
                (0, openCustomFormParagraph_1.openCustomFormParagraph)('Create PNR MUC-DXB', 'PNR created');
                return [3 /*break*/, 12];
            case 10:
                error_1 = _b.sent();
                console.error('Error during PNR creation:', error_1);
                return [3 /*break*/, 12];
            case 11:
                interstitialService.hideInterstitial();
                return [7 /*endfinally*/];
            case 12: return [2 /*return*/];
        }
    });
}); };
var sendCommand = function (command, context) { return __awaiter(void 0, void 0, void 0, function () {
    var commandService, response;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                commandService = (0, Context_1.getService)(ICommandMessageService_1.ICommandMessageService);
                return [4 /*yield*/, commandService.send(command)];
            case 1:
                response = _c.sent();
                if (!response.Status.Success) {
                    throw new Error(context + " creation failed: " + ((_b = (_a = response.Status.Messages) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.Text));
                }
                return [2 /*return*/];
        }
    });
}); };
