System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnrMucDxbForm", ["sabre-ngv-custom-forms/services/ICustomFormsService","sabre-ngv-app/app/services/impl/DatesService","sabre-ngv-commsg/services/ICommandMessageService","sabre-ngv-app/app/services/impl/InterstitialService","com-sabre-redapp-fundamentals-web-module/Context","com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph"], false, function (require, exports, module) {
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


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnrMucDxbForm.js", ["com-sabre-redapp-fundamentals-web-module/components/createPnrMucDxbForm"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/createPnrMucDxbForm"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre", ["com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-communication/interfaces/ISoapApiService","sabre-ngv-app/app/services/impl/PnrPublicService","com-sabre-redapp-fundamentals-web-module/components/parcePnrData"], false, function (require, exports, module) {
"use strict";
// файл: loadPnrDetailsFromSabre.ts
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
var Context_1 = require("../Context");
var ISoapApiService_1 = require("sabre-ngv-communication/interfaces/ISoapApiService");
var PnrPublicService_1 = require("sabre-ngv-app/app/services/impl/PnrPublicService");
var parcePnrData_1 = require("./parcePnrData");
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
                console.log('Passengers:', parsedData.passengers);
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


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre.js", ["com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ", ["com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-communication/interfaces/ISoapApiService"], false, function (require, exports, module) {
"use strict";var __awaiter=this&&this.__awaiter||function(e,r,n,t){return new(n||(n=Promise))(function(a,i){function fulfilled(e){try{step(t.next(e))}catch(r){i(r)}}function rejected(e){try{step(t.throw(e))}catch(r){i(r)}}function step(e){e.done?a(e.value):function adopt(e){return e instanceof n?e:new n(function(r){r(e)})}(e.value).then(fulfilled,rejected)}step((t=t.apply(e,r||[])).next())})},__generator=this&&this.__generator||function(e,r){var n,t,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function verb(i){return function(s){return function step(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,t&&(a=2&i[0]?t.return:i[0]?t.throw||((a=t.return)&&a.call(t),0):t.next)&&!(a=a.call(t,i[1])).done)return a;switch(t=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,t=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=r.call(e,o)}catch(s){i=[6,s],t=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.loadPnrUsingTravelItineraryReadRQ=void 0;var Context_1=require("../Context"),ISoapApiService_1=require("sabre-ngv-communication/interfaces/ISoapApiService");function loadPnrUsingTravelItineraryReadRQ(){return __awaiter(this,void 0,void 0,function(){var e,r;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,(0,Context_1.getService)(ISoapApiService_1.ISoapApiService).callSws({action:"TravelItineraryReadRQ",payload:'\n            <TravelItineraryReadRQ Version="3.9.0" xmlns="http://webservices.sabre.com/sabreXML/2011/10">\n                <MessagingDetails>\n                    <Transaction Code="PNR"/>\n                </MessagingDetails>\n            </TravelItineraryReadRQ>\n        ',authTokenType:"SESSION"})];case 1:return e=n.sent(),console.log("TravelItineraryReadRQ Response:",e),[3,3];case 2:return r=n.sent(),console.error("Error loading PNR using TravelItineraryReadRQ:",r),[3,3];case 3:return[2]}})})}exports.loadPnrUsingTravelItineraryReadRQ=loadPnrUsingTravelItineraryReadRQ;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ.js", ["com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/parcePnrData", [], false, function (require, exports, module) {
"use strict";
// файл: parsePnrData.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePnrData = void 0;
// Принимаем XMLDocument
var parsePnrData = function (xmlDoc) {
    var _a, _b, _c, _d, _e;
    var passengers = [];
    var segments = [];
    var passengerNodes = xmlDoc.getElementsByTagName('stl19:Passenger');
    for (var i = 0; i < passengerNodes.length; i++) {
        var passenger = passengerNodes[i];
        var id = passenger.getAttribute('id') || '';
        var lastName = ((_a = passenger.getElementsByTagName('stl19:LastName')[0]) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        var firstName = ((_b = passenger.getElementsByTagName('stl19:FirstName')[0]) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        passengers.push({
            label: lastName + "/" + firstName,
            value: id
        });
    }
    var segmentNodes = xmlDoc.getElementsByTagName('stl19:Air');
    for (var i = 0; i < segmentNodes.length; i++) {
        var segment = segmentNodes[i];
        var departure = ((_c = segment.getElementsByTagName('stl19:DepartureAirport')[0]) === null || _c === void 0 ? void 0 : _c.textContent) || '';
        var arrival = ((_d = segment.getElementsByTagName('stl19:ArrivalAirport')[0]) === null || _d === void 0 ? void 0 : _d.textContent) || '';
        var marketingFlightNumber = ((_e = segment.getElementsByTagName('stl19:MarketingFlightNumber')[0]) === null || _e === void 0 ? void 0 : _e.textContent) || '';
        segments.push({
            label: departure + " \u2192 " + arrival + " (" + marketingFlightNumber + ")",
            value: departure + "-" + arrival + "-" + marketingFlightNumber
        });
    }
    return { passengers: passengers, segments: segments };
};
exports.parsePnrData = parsePnrData;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/parcePnrData.js", ["com-sabre-redapp-fundamentals-web-module/components/parcePnrData"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/parcePnrData"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/registerCommandHelperButton", ["sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-xp/configs/NoviceButtonConfig","com-sabre-redapp-fundamentals-web-module/Context","com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"], false, function (require, exports, module) {
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


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/registerCommandHelperButton.js", ["com-sabre-redapp-fundamentals-web-module/components/registerCommandHelperButton"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/registerCommandHelperButton"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent", ["react"], false, function (require, exports, module) {
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


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover", ["react","react-bootstrap","sabre-ngv-UIComponents/advancedDropdown/components/SimpleDropdown","com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent"], false, function (require, exports, module) {
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapsPopover = void 0;
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var SimpleDropdown_1 = require("sabre-ngv-UIComponents/advancedDropdown/components/SimpleDropdown");
var loadPnrDetailsFromSabre_1 = require("./loadPnrDetailsFromSabre");
var Context_1 = require("../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var SeatMapComponent_1 = require("./SeatMapComponent");
var SeatMapsPopover = /** @class */ (function (_super) {
    __extends(SeatMapsPopover, _super);
    function SeatMapsPopover(props) {
        var _this = _super.call(this, props) || this;
        _this.handlePassengerChange = function (passengerValue) {
            var selectedPassengers = _this.state.selectedPassengers;
            var isSelected = selectedPassengers.includes(passengerValue);
            var updatedPassengers = isSelected
                ? selectedPassengers.filter(function (p) { return p !== passengerValue; })
                : __spreadArray(__spreadArray([], selectedPassengers, true), [passengerValue], false);
            _this.setState({ selectedPassengers: updatedPassengers });
        };
        _this.handleSegmentChange = function (options) {
            var selected = options.find(function (opt) { return opt.checked; });
            if (selected) {
                _this.setState({ selectedSegment: selected.value });
            }
        };
        _this.handleOpenSeatMap = function () {
            var _a;
            var publicModalsService = (0, Context_1.getService)(PublicModalService_1.PublicModalsService);
            var modalOptions = {
                header: 'Seat Map',
                component: React.createElement(SeatMapComponent_1.SeatMapComponent, {
                    passengerIds: _this.state.selectedPassengers,
                    segmentId: _this.state.selectedSegment
                }),
                modalClassName: 'seatmap-modal-class'
            };
            publicModalsService.showReactModal(modalOptions);
            (_a = _this.props['__layerInstance']) === null || _a === void 0 ? void 0 : _a.close(); // Без ошибок
        };
        _this.state = {
            selectedPassengers: [],
            selectedSegment: '',
            passengers: [],
            segments: []
        };
        return _this;
    }
    SeatMapsPopover.prototype.componentDidMount = function () {
        var _this = this;
        (0, loadPnrDetailsFromSabre_1.loadPnrDetailsFromSabre)(function (data) {
            _this.setState({
                passengers: data.passengers.map(function (p) { return (__assign(__assign({}, p), { checked: true })); }),
                selectedPassengers: data.passengers.map(function (p) { return p.value; }),
                segments: data.segments
            });
        });
    };
    SeatMapsPopover.prototype.render = function () {
        var _this = this;
        var _a = this.state, passengers = _a.passengers, segments = _a.segments, selectedPassengers = _a.selectedPassengers, selectedSegment = _a.selectedSegment;
        var isButtonDisabled = selectedPassengers.length === 0 || !selectedSegment;
        return (React.createElement("div", { style: {
                padding: '20px',
                width: '400px',
                minHeight: '350px',
                overflowY: 'auto',
                backgroundColor: '#fff',
                borderRadius: '8px'
            } },
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null,
                    "Select Passengers (",
                    selectedPassengers.length,
                    ")"),
                React.createElement("div", { style: { marginTop: '10px' } }, passengers.map(function (passenger) { return (React.createElement("div", { key: passenger.value, style: { display: 'flex', alignItems: 'center', marginBottom: '5px' } },
                    React.createElement("input", { type: "checkbox", checked: selectedPassengers.includes(passenger.value), onChange: function () { return _this.handlePassengerChange(passenger.value); }, style: { marginRight: '8px' } }),
                    React.createElement("span", null, passenger.label))); }))),
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null, "Select Flight Segment"),
                React.createElement(SimpleDropdown_1.SimpleDropdown, { options: segments, onChange: this.handleSegmentChange })),
            React.createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '20px' } },
                React.createElement(react_bootstrap_1.Button, { className: "btn-primary", onClick: this.handleOpenSeatMap, disabled: isButtonDisabled }, "Open Seat Map"))));
    };
    return SeatMapsPopover;
}(React.Component));
exports.SeatMapsPopover = SeatMapsPopover;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/Context", ["sabre-ngv-core/modules/ModuleContext","sabre-ngv-app/app/services/impl/I18nService"], false, function (require, exports, module) {
"use strict";
/*************************************/
/* Auto-generated file.              */
/* Do not modify it.                 */
/* You may remove it.                */
/* You may commit it.                */
/* You may push it.                  */
/* Remove it if module name changed. */
/* eslint:disable                    */
/*************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.getService = exports.registerService = exports.cf = exports.context = void 0;
var ModuleContext_1 = require("sabre-ngv-core/modules/ModuleContext");
var I18nService_1 = require("sabre-ngv-app/app/services/impl/I18nService");
/** @internal **/
exports.context = new ModuleContext_1.ModuleContext("com-sabre-redapp-fundamentals-web-module");
/** @internal **/
exports.cf = exports.context.cf.bind(exports.context);
/** @internal **/
exports.registerService = exports.context.registerService.bind(exports.context);
/** @internal **/
exports.getService = exports.context.getService.bind(exports.context);
/** @internal **/
exports.t = (0, exports.getService)(I18nService_1.I18nService).getScopedTranslator('com-sabre-redapp-fundamentals-web-module/translations');


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/Context.js", ["com-sabre-redapp-fundamentals-web-module/Context"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/Context"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/CreatePNR", ["react","react-bootstrap","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-core/services/LayerService","sabre-ngv-communication/interfaces/ISoapApiService","sabre-ngv-app/app/services/impl/PnrPublicService"], false, function (require, exports, module) {
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
exports.CreatePNR = void 0;
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var Context_1 = require("./Context");
var LayerService_1 = require("sabre-ngv-core/services/LayerService");
var ISoapApiService_1 = require("sabre-ngv-communication/interfaces/ISoapApiService");
var PnrPublicService_1 = require("sabre-ngv-app/app/services/impl/PnrPublicService");
/*
CreatePNR Component, multi-stage data entry form based on react-bootstrap component library
*/
var CreatePNR = /** @class */ (function (_super) {
    __extends(CreatePNR, _super);
    function CreatePNR(e) {
        var _this = _super.call(this, e) || this;
        //bind event handlers to the component instance
        _this.handleChange = _this.handleChange.bind(_this);
        _this.executeService = _this.executeService.bind(_this);
        _this.closeAndRefresh = _this.closeAndRefresh.bind(_this);
        _this.goBack = _this.goBack.bind(_this);
        _this.goNext = _this.goNext.bind(_this);
        //fill default state values during component initialization
        _this.state = {
            stage: 1,
            traveler: {
                name: "",
                surname: "",
                typeCode: "ADT"
            },
            validation: {
                txtName: { isValid: false, status: null, helpMsg: null },
                txtSurname: { isValid: false, status: null, helpMsg: null },
                txtEmail: { isValid: false, status: null, helpMsg: null }
            }
        };
        return _this;
    }
    /*
    Method to handle field changes, perform validation and update state
    */
    CreatePNR.prototype.handleChange = function (e) {
        var ctlId = e.target.id;
        var fldValue = e.target.value;
        var validationState = this.state.validation;
        var tmpTraveler = this.state.traveler;
        var tmpTravelType = this.state.travelType;
        console.log("handleChange", ctlId, fldValue);
        if (ctlId === "txtName" || ctlId === "txtSurname") {
            var tmpValidation = validationState[ctlId];
            var length_1 = fldValue.length;
            if (ctlId === "txtName")
                tmpTraveler.name = fldValue;
            if (ctlId === "txtSurname")
                tmpTraveler.surname = fldValue;
            if (length_1 <= 0) {
                tmpValidation.isValid = false;
                tmpValidation.status = 'error';
                tmpValidation.helpMsg = "required field";
            }
            else if (length_1 <= 1) {
                tmpValidation.isValid = false;
                tmpValidation.status = 'warning';
                tmpValidation.helpMsg = "must be more than one character long";
            }
            else if (length_1 > 1) {
                tmpValidation.isValid = true;
                tmpValidation.status = 'success';
                tmpValidation.helpMsg = null;
            }
        }
        if (ctlId === "selAgeCode") {
            tmpTraveler.typeCode = fldValue;
        }
        if (ctlId === "selTravelType") {
            tmpTravelType = fldValue;
        }
        this.setState({
            traveler: tmpTraveler,
            travelType: tmpTravelType,
            validation: validationState
        });
    };
    //moves to the next stage
    CreatePNR.prototype.goNext = function (evt) {
        var currStage = this.state.stage;
        this.setState({ stage: currStage + 1 });
    };
    //rewind stage
    CreatePNR.prototype.goBack = function (evt) {
        this.setState({ stage: 1 });
    };
    /*
    Creates a UpdateReservationRQ request payload merging state data, then utilizes
    SOAP API service handler to send the request and parse results
    */
    CreatePNR.prototype.executeService = function () {
        var _this = this;
        var soapApiService = (0, Context_1.getService)(ISoapApiService_1.ISoapApiService);
        var pl1 = "\n        <UpdateReservationRQ Version=\"1.19.8\" xmlns=\"http://webservices.sabre.com/pnrbuilder/v1_19\">\n        <RequestType commitTransaction=\"false\" initialIgnore=\"true\">Stateful</RequestType>\n        <ReturnOptions IncludeUpdateDetails=\"true\" RetrievePNR=\"false\"/>\n            <ReservationUpdateList>\n                <ReservationUpdateItem>\n                    <PassengerNameUpdate op=\"C\">\n                        <TravelerName type=\"" + this.state.traveler.typeCode + "\">\n                            <Given>" + this.state.traveler.name + "</Given>\n                            <Surname>" + this.state.traveler.surname + "</Surname>\n                        </TravelerName>\n                    </PassengerNameUpdate>\n                </ReservationUpdateItem>\n                <ReservationUpdateItem>\n                    <RemarkUpdate op=\"C\">\n                        <RemarkText>THIS IS " + this.state.travelType + " TRAVEL TYPE REMARK</RemarkText>\n                    </RemarkUpdate>\n                </ReservationUpdateItem>\n            </ReservationUpdateList>\n        </UpdateReservationRQ>\n        ";
        soapApiService.callSws({ action: "UpdateReservationRQ", payload: pl1, authTokenType: "SESSION" })
            .then(function (res) {
            //validate API response
            console.log("Soap API call result", JSON.stringify(res));
            if (res.errorCode || (res.value && res.value.indexOf("<stl19:Error") >= 0)) {
                _this.setState({ stage: 4 });
            }
            else {
                _this.setState({ stage: 3 });
            }
        })
            .catch(function (err) {
            //exception calling soap API
            console.log("Soap API call error", err);
            _this.setState({ stage: 4 });
        });
    };
    CreatePNR.prototype.handleModalClose = function () {
        (0, Context_1.getService)(LayerService_1.LayerService).clearLayer(42);
    };
    /*
    Refreshes the Trip Summary panel after sucessfull UpdateReservationRQ response,
    this makes the changes written on the PNR to appear on the UI
    */
    CreatePNR.prototype.closeAndRefresh = function () {
        (0, Context_1.getService)(PnrPublicService_1.PnrPublicService).refreshData();
        this.handleModalClose();
    };
    /*
    Render parts of multi-stage form using react-bootstrap components
    The data entry form is wrapped by a Modal Dialog component
    */
    CreatePNR.prototype.render = function () {
        var _this = this;
        switch (this.state.stage) {
            case 1:
                var validateName = this.state.validation["txtName"];
                var validateSurname = this.state.validation["txtSurname"];
                return (React.createElement(react_bootstrap_1.Modal.Dialog, { className: "react-modal" },
                    React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true, onHide: function () { _this.handleModalClose(); } },
                        React.createElement(react_bootstrap_1.Modal.Title, null, "Data Entry Form (1 of 2)")),
                    React.createElement(react_bootstrap_1.Modal.Body, null,
                        React.createElement(react_bootstrap_1.Form, { autoComplete: "off" },
                            React.createElement(react_bootstrap_1.Panel, null,
                                React.createElement(react_bootstrap_1.Panel.Heading, null,
                                    React.createElement(react_bootstrap_1.Panel.Title, null, "About Traveler")),
                                React.createElement(react_bootstrap_1.Panel.Body, null,
                                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "txtName", validationState: validateName.status },
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Name"),
                                        React.createElement(react_bootstrap_1.FormControl, { type: "text", placeholder: "Enter traveler Name", value: this.state.traveler.name, onChange: this.handleChange }),
                                        validateName.helpMsg && React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                        (validateName.helpMsg) && React.createElement(react_bootstrap_1.HelpBlock, null, validateName.helpMsg)),
                                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "txtSurname", validationState: validateSurname.status },
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Surname"),
                                        React.createElement(react_bootstrap_1.FormControl, { type: "text", placeholder: "Enter traveler Surame", value: this.state.traveler.surname, onChange: this.handleChange }),
                                        validateSurname.isValid && React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                        (validateSurname.isValid && validateSurname.helpMsg) && React.createElement(react_bootstrap_1.HelpBlock, null, validateName.helpMsg)),
                                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "selAgeCode" },
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Passenger Type (Code)"),
                                        React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.traveler.typeCode, onChange: this.handleChange },
                                            React.createElement("option", { value: "select" }, "select"),
                                            React.createElement("option", { value: "ADT" }, "Adult"),
                                            React.createElement("option", { value: "CNN" }, "Child"),
                                            React.createElement("option", { value: "INF" }, "Infant"))))))),
                    React.createElement(react_bootstrap_1.Modal.Footer, null,
                        React.createElement(react_bootstrap_1.Button, { onClick: this.handleModalClose, className: "btn btn-secondary" }, "Cancel"),
                        React.createElement(react_bootstrap_1.Button, { className: "btn btn-primary", onClick: this.goNext }, "Next"))));
            case 2:
                return (React.createElement(react_bootstrap_1.Modal.Dialog, { className: "react-modal" },
                    React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true, onHide: function () { _this.handleModalClose(); } },
                        React.createElement(react_bootstrap_1.Modal.Title, null, "Data Entry Form (2 of 2)")),
                    React.createElement(react_bootstrap_1.Modal.Body, null,
                        React.createElement(react_bootstrap_1.Form, null,
                            React.createElement(react_bootstrap_1.Panel, null,
                                React.createElement(react_bootstrap_1.Panel.Heading, null,
                                    React.createElement(react_bootstrap_1.Panel.Title, null, "About Travel")),
                                React.createElement(react_bootstrap_1.Panel.Body, null,
                                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "selTravelType" },
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Travel Type"),
                                        React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", onChange: this.handleChange, value: this.state.travelType },
                                            React.createElement("option", { value: "select" }, "select"),
                                            React.createElement("option", { value: "business" }, "business"),
                                            React.createElement("option", { value: "leisure" }, "leisure"))),
                                    this.state.travelType === "business" &&
                                        React.createElement(react_bootstrap_1.FormGroup, null,
                                            React.createElement(react_bootstrap_1.ControlLabel, null, "Add Corporate ID ?"),
                                            React.createElement(react_bootstrap_1.InputGroup, null,
                                                React.createElement(react_bootstrap_1.InputGroup.Addon, null,
                                                    React.createElement("input", { type: "checkbox", "aria-label": "..." })),
                                                React.createElement(react_bootstrap_1.FormControl, { type: "text" }))),
                                    this.state.travelType === "leisure" &&
                                        React.createElement(react_bootstrap_1.FormGroup, null,
                                            React.createElement(react_bootstrap_1.ControlLabel, null, "Add Special Service Request ?"),
                                            React.createElement(react_bootstrap_1.InputGroup, null,
                                                React.createElement(react_bootstrap_1.InputGroup.Addon, null,
                                                    React.createElement("input", { type: "checkbox", "aria-label": "..." })),
                                                React.createElement(react_bootstrap_1.FormControl, { type: "text" }))))))),
                    React.createElement(react_bootstrap_1.Modal.Footer, null,
                        React.createElement(react_bootstrap_1.Button, { onClick: this.handleModalClose, className: "btn btn-secondary" }, "Cancel"),
                        React.createElement(react_bootstrap_1.Button, { className: "btn btn-primary", onClick: this.goBack }, "Back"),
                        React.createElement(react_bootstrap_1.Button, { className: "btn btn-primary btn-success", onClick: this.executeService }, "Create PNR"))));
            case 3:
                return (React.createElement(react_bootstrap_1.Alert, { bsStyle: "success", onDismiss: this.closeAndRefresh },
                    React.createElement("h4", null, "Success"),
                    React.createElement("hr", null),
                    React.createElement("p", null, "Operation completed sucessfully, data was written to the PNR, session status will be refreshed..."),
                    React.createElement("hr", null),
                    React.createElement("p", null,
                        React.createElement(react_bootstrap_1.Button, { bsStyle: "success", onClick: this.closeAndRefresh }, "Close"))));
            case 4:
                return (React.createElement(react_bootstrap_1.Alert, { bsStyle: "danger", onDismiss: this.handleModalClose },
                    React.createElement("h4", null, "Error"),
                    React.createElement("hr", null),
                    React.createElement("p", null, "The operation could not be completed, validate records and try again..."),
                    React.createElement("hr", null),
                    React.createElement("p", null,
                        React.createElement(react_bootstrap_1.Button, { bsStyle: "danger", onClick: this.goBack }, "Retry"),
                        React.createElement(react_bootstrap_1.Button, { onClick: this.handleModalClose }, "Cancel"))));
        }
    };
    return CreatePNR;
}(React.Component));
exports.CreatePNR = CreatePNR;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/CreatePNR.js", ["com-sabre-redapp-fundamentals-web-module/CreatePNR"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/CreatePNR"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/index", ["com-sabre-redapp-fundamentals-web-module/Main","com-sabre-redapp-fundamentals-web-module/Context"], false, function (require, exports, module) {
"use strict";
/*************************************/
/* Auto-generated file.              */
/* Do not modify it.                 */
/* You may remove it.                */
/* You may commit it.                */
/* You may push it.                  */
/* Remove it if module name changed. */
/* eslint:disable                    */
/*************************************/
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
var Main_1 = require("./Main");
var Context_1 = require("./Context");
/**
 *  Autogenerated class representing module in runtime.
 **/
var Module_com_sabre_redapp_fundamentals_web_module = /** @class */ (function (_super) {
    __extends(Module_com_sabre_redapp_fundamentals_web_module, _super);
    function Module_com_sabre_redapp_fundamentals_web_module(manifest) {
        var _this = _super.call(this, manifest) || this;
        Context_1.context.setModule(_this);
        return _this;
    }
    return Module_com_sabre_redapp_fundamentals_web_module;
}(Main_1.Main));
exports.default = Module_com_sabre_redapp_fundamentals_web_module;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/index.js", ["com-sabre-redapp-fundamentals-web-module/index"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/index"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/Main", ["sabre-ngv-core/modules/Module","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-xp/configs/RedAppSidePanelConfig","sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton","sabre-ngv-core/services/LayerService","com-sabre-redapp-fundamentals-web-module/CreatePNR","com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover","com-sabre-redapp-fundamentals-web-module/components/createPnrMucDxbForm"], false, function (require, exports, module) {
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
var Module_1 = require("sabre-ngv-core/modules/Module");
var Context_1 = require("./Context");
var ExtensionPointService_1 = require("sabre-ngv-xp/services/ExtensionPointService");
var RedAppSidePanelConfig_1 = require("sabre-ngv-xp/configs/RedAppSidePanelConfig");
var RedAppSidePanelButton_1 = require("sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton");
var LayerService_1 = require("sabre-ngv-core/services/LayerService");
var CreatePNR_1 = require("./CreatePNR");
var SeatMapsPopover_1 = require("./components/SeatMapsPopover");
var createPnrMucDxbForm_1 = require("./components/createPnrMucDxbForm");
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
            new RedAppSidePanelButton_1.RedAppSidePanelButton("Create PNR MUC-DXB", // новая кнопка
            "btn-secondary side-panel-button", function () { (0, createPnrMucDxbForm_1.createPnrMucDxbForm)(); }, // вызываем createPnrMucDxbForm()
            false)
        ]);
        xp.addConfig("redAppSidePanel", sidepanelMenu);
    };
    Main.prototype.showForm = function () {
        var ls = (0, Context_1.getService)(LayerService_1.LayerService);
        ls.showOnLayer(CreatePNR_1.CreatePNR, { display: "areaView", position: 42 });
    };
    Main.prototype.openSeatMaps = function () {
        var ls = (0, Context_1.getService)(LayerService_1.LayerService);
        ls.showOnLayer(SeatMapsPopover_1.SeatMapsPopover, { display: "areaView", position: 43 });
    };
    return Main;
}(Module_1.Module));
exports.Main = Main;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/Main.js", ["com-sabre-redapp-fundamentals-web-module/Main"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/Main"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph", ["sabre-ngv-custom-forms/services/ICustomFormsService","com-sabre-redapp-fundamentals-web-module/Context"], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openCustomFormParagraph = void 0;
var ICustomFormsService_1 = require("sabre-ngv-custom-forms/services/ICustomFormsService");
var Context_1 = require("../Context");
var openCustomFormParagraph = function (title, msg) {
    var form = {
        title: title,
        fields: [
            {
                id: 'flight',
                type: 'PARAGRAPH',
                text: msg
            }
        ],
        actions: [
            {
                id: 'cancel',
                label: 'Close'
            }
        ]
    };
    (0, Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(form);
};
exports.openCustomFormParagraph = openCustomFormParagraph;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph.js", ["com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module", ["com-sabre-redapp-fundamentals-web-module/index"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/index"))});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlUG5yTXVjRHhiRm9ybS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvbG9hZFBuckRldGFpbHNGcm9tU2FicmUudHMiLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvUmVkQXBwLVNlYXRNYXBzIEFCQyAzNjAvY29kZS93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZnVuZGFtZW50YWxzLXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvbG9hZFBuclVzaW5nVHJhdmVsSXRpbmVyYXJ5UmVhZFJRLmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9wYXJjZVBuckRhdGEudHMiLCJzcmMvY29kZS9jb21wb25lbnRzL3JlZ2lzdGVyQ29tbWFuZEhlbHBlckJ1dHRvbi50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvU2VhdE1hcENvbXBvbmVudC50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL1NlYXRNYXBzUG9wb3Zlci50c3giLCJzcmMvY29kZS9Db250ZXh0LnRzIiwic3JjL2NvZGUvQ3JlYXRlUE5SLnRzeCIsInNyYy9jb2RlL2luZGV4LnRzIiwic3JjL2NvZGUvTWFpbi50cyIsInNyYy9jb2RlL3V0aWxzL29wZW5DdXN0b21Gb3JtUGFyYWdyYXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQStCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHL0IsMkZBQTBGO0FBRzFGLDZFQUE0RTtBQUU1RSwyRkFBMEY7QUFDMUYsMkZBQTBGO0FBRTFGLHNDQUF3QztBQUN4Qyw0RUFBMkU7QUFFcEUsSUFBTSxtQkFBbUIsR0FBRzs7Ozs7Z0JBQ3pCLElBQUksR0FBZTtvQkFDckIsS0FBSyxFQUFFLG9CQUFvQjtvQkFDM0IsTUFBTSxFQUFFO3dCQUNKLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7d0JBQ3pD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Q0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFsQlksUUFBQSx1QkFBdUIsMkJBa0JuQyIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEMDk7OiBjcmVhdGVQbnJNdWNEeGJGb3JtLnRzXG5cbmltcG9ydCB7IEN1c3RvbUZvcm0gfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcbmltcG9ydCB7IElDdXN0b21Gb3Jtc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRm9ybVJzIH0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9pbnRlcmZhY2VzL2Zvcm0vQ3VzdG9tRm9ybVJzJztcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9UZXh0RmllbGQnO1xuaW1wb3J0IHsgRGF0ZXNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9EYXRlc1NlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbWFuZE1lc3NhZ2VCYXNpY1JzIH0gZnJvbSAnc2FicmUtbmd2LXBvcy1jZG0vY29tbXNnJztcbmltcG9ydCB7IElDb21tYW5kTWVzc2FnZVNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtY29tbXNnL3NlcnZpY2VzL0lDb21tYW5kTWVzc2FnZVNlcnZpY2UnO1xuaW1wb3J0IHsgSW50ZXJzdGl0aWFsU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvSW50ZXJzdGl0aWFsU2VydmljZSc7XG5cbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7IG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoIH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUG5yTXVjRHhiRm9ybSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBmb3JtOiBDdXN0b21Gb3JtID0ge1xuICAgICAgICB0aXRsZTogJ0NyZWF0ZSBQTlIgTVVDLURYQicsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBpZDogJ25hbWUnLCB2YWx1ZTogJy1LTEVJTUFOTi9MRU9OSUQnIH0sXG4gICAgICAgICAgICB7IGlkOiAnZGF5c0FoZWFkJywgdmFsdWU6ICcyMCcgfSwgLy8gPz4gQzw+O0cwPThOIDIwIDQ9NTlcbiAgICAgICAgICAgIHsgaWQ6ICd0aWNrZXQnLCB2YWx1ZTogJzAxWTInIH0sXG4gICAgICAgICAgICB7IGlkOiAnYWdlbnQnLCB2YWx1ZTogJzZBR0VOVCcgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdwaG9uZScsIHZhbHVlOiAnOTEyMzQ1NjcnIH0sXG4gICAgICAgICAgICB7IGlkOiAndGltZUxpbWl0JywgdmFsdWU6ICc3VEFXLycgfVxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7IGlkOiAnY2FuY2VsJywgbGFiZWw6ICdDYW5jZWwnIH0sXG4gICAgICAgICAgICB7IGlkOiAnb2snLCBsYWJlbDogJ1N1Ym1pdCcgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogQ3VzdG9tRm9ybVJzID0gYXdhaXQgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbiAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ29rJykge1xuICAgICAgICBzZWxmU3VibWl0UG5yTXVjRHhiQWN0aW9uKHJlc3VsdCk7XG4gICAgfVxufTtcblxuY29uc3Qgc2VsZlN1Ym1pdFBuck11Y0R4YkFjdGlvbiA9IGFzeW5jIChmb3JtOiBDdXN0b21Gb3JtKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgaW50ZXJzdGl0aWFsU2VydmljZSA9IGdldFNlcnZpY2UoSW50ZXJzdGl0aWFsU2VydmljZSk7XG5cbiAgICBjb25zdCBuYW1lUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGYgPT4gZi5pZCA9PT0gJ25hbWUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IGRheXNBaGVhZFN0cjogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZiA9PiBmLmlkID09PSAnZGF5c0FoZWFkJykgYXMgVGV4dEZpZWxkKT8udmFsdWUgfHwgJzIwJztcbiAgICBjb25zdCBkYXlzQWhlYWQ6IG51bWJlciA9IHBhcnNlSW50KGRheXNBaGVhZFN0ciwgMTApIHx8IDIwO1xuXG4gICAgY29uc3QgZmxpZ2h0RGF0ZSA9IGdldFNlcnZpY2UoRGF0ZXNTZXJ2aWNlKS5nZXROb3coKS5hZGQoZGF5c0FoZWFkLCAnZGF5cycpLmZvcm1hdCgnRERNTU0nKS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IGZsaWdodFJxID0gYDBFSyR7ZmxpZ2h0RGF0ZX1NVUNEWEI1MFlgOyAvLyA/QDAyODtMPTBPIDo+PDA9NDAgPTAgQDU5QSBFSzUwIVxuXG4gICAgY29uc3QgdGlja2V0UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGYgPT4gZi5pZCA9PT0gJ3RpY2tldCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgYWdlbnRJbmZvUnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGYgPT4gZi5pZCA9PT0gJ2FnZW50JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBwaG9uZVJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmID0+IGYuaWQgPT09ICdwaG9uZScpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGF3UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGYgPT4gZi5pZCA9PT0gJ3RpbWVMaW1pdCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG5cbiAgICBpbnRlcnN0aXRpYWxTZXJ2aWNlLnNob3dJbnRlcnN0aXRpYWwoMTUwMDApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgc2VuZENvbW1hbmQobmFtZVJxLCAnTmFtZScpO1xuICAgICAgICBhd2FpdCBzZW5kQ29tbWFuZChmbGlnaHRScSwgJ0ZsaWdodCBzZWdtZW50Jyk7XG4gICAgICAgIGF3YWl0IHNlbmRDb21tYW5kKHRpY2tldFJxLCAnVGlja2V0Jyk7XG4gICAgICAgIGF3YWl0IHNlbmRDb21tYW5kKGFnZW50SW5mb1JxLCAnQWdlbnQgaW5mbycpO1xuICAgICAgICBhd2FpdCBzZW5kQ29tbWFuZChwaG9uZVJxLCAnUGhvbmUnKTtcbiAgICAgICAgYXdhaXQgc2VuZENvbW1hbmQodGF3UnEsICdUaW1lIGxpbWl0Jyk7XG4gICAgICAgIGF3YWl0IHNlbmRDb21tYW5kKCdXUCcsICdXUCcpO1xuICAgICAgICBhd2FpdCBzZW5kQ29tbWFuZCgnUFEnLCAnUFEnKTtcblxuICAgICAgICBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnQ3JlYXRlIFBOUiBNVUMtRFhCJywgJ1BOUiBjcmVhdGVkJyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIFBOUiBjcmVhdGlvbjonLCBlcnJvcik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG4gICAgfVxufTtcblxuY29uc3Qgc2VuZENvbW1hbmQgPSBhc3luYyAoY29tbWFuZDogc3RyaW5nLCBjb250ZXh0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBjb21tYW5kU2VydmljZSA9IGdldFNlcnZpY2UoSUNvbW1hbmRNZXNzYWdlU2VydmljZSk7XG4gICAgY29uc3QgcmVzcG9uc2U6IENvbW1hbmRNZXNzYWdlQmFzaWNScyA9IGF3YWl0IGNvbW1hbmRTZXJ2aWNlLnNlbmQoY29tbWFuZCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLlN0YXR1cy5TdWNjZXNzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fSBjcmVhdGlvbiBmYWlsZWQ6ICR7cmVzcG9uc2UuU3RhdHVzLk1lc3NhZ2VzPy5bMF0/LlRleHR9YCk7XG4gICAgfVxufTsiLCIvLyBEMDk7OiBsb2FkUG5yRGV0YWlsc0Zyb21TYWJyZS50c1xuXG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBJU29hcEFwaVNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtY29tbXVuaWNhdGlvbi9pbnRlcmZhY2VzL0lTb2FwQXBpU2VydmljZSc7XG5pbXBvcnQgeyBQbnJQdWJsaWNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9QbnJQdWJsaWNTZXJ2aWNlJztcbmltcG9ydCB7IHBhcnNlUG5yRGF0YSwgUG5yRGF0YSB9IGZyb20gJy4vcGFyY2VQbnJEYXRhJztcblxuZXhwb3J0IGNvbnN0IGxvYWRQbnJEZXRhaWxzRnJvbVNhYnJlID0gYXN5bmMgKG9uRGF0YUxvYWRlZDogKGRhdGE6IFBuckRhdGEpID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwbnJTZXJ2aWNlID0gZ2V0U2VydmljZShQbnJQdWJsaWNTZXJ2aWNlKTtcbiAgICAgICAgY29uc3Qgc29hcEFwaVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElTb2FwQXBpU2VydmljZSk7XG5cbiAgICAgICAgY29uc3QgcmVjb3JkTG9jYXRvciA9IHBuclNlcnZpY2UuZ2V0UmVjb3JkTG9jYXRvcigpO1xuXG4gICAgICAgIGlmICghcmVjb3JkTG9jYXRvcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdObyBhY3RpdmUgUE5SLiBQbGVhc2UgY3JlYXRlIG9yIHJldHJpZXZlIGEgUE5SIGZpcnN0LicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ1JlY29yZCBMb2NhdG9yOicsIHJlY29yZExvY2F0b3IpO1xuXG4gICAgICAgIGNvbnN0IHNvYXBQYXlsb2FkID0gYFxuICAgICAgICAgICAgPG5zNjpHZXRSZXNlcnZhdGlvblJRIHhtbG5zOm5zNj1cImh0dHA6Ly93ZWJzZXJ2aWNlcy5zYWJyZS5jb20vcG5yYnVpbGRlci92MV8xOVwiIFZlcnNpb249XCIxLjE5LjIyXCI+XG4gICAgICAgICAgICAgICAgPG5zNjpSZXF1ZXN0VHlwZT5TdGF0ZWZ1bDwvbnM2OlJlcXVlc3RUeXBlPlxuICAgICAgICAgICAgICAgIDxuczY6UmV0dXJuT3B0aW9ucyB4bWxuczp4c2k9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZVwiIHhzaTp0eXBlPVwibnM2OlJldHVybk9wdGlvbnNcIiBVbm1hc2tDcmVkaXRDYXJkPVwiZmFsc2VcIiBTaG93VGlja2V0U3RhdHVzPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bnM2OlZpZXdOYW1lPkZ1bGw8L25zNjpWaWV3TmFtZT5cbiAgICAgICAgICAgICAgICAgICAgPG5zNjpSZXNwb25zZUZvcm1hdD5TVEw8L25zNjpSZXNwb25zZUZvcm1hdD5cbiAgICAgICAgICAgICAgICA8L25zNjpSZXR1cm5PcHRpb25zPlxuICAgICAgICAgICAgPC9uczY6R2V0UmVzZXJ2YXRpb25SUT5cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNvYXBBcGlTZXJ2aWNlLmNhbGxTd3Moe1xuICAgICAgICAgICAgYWN0aW9uOiAnR2V0UmVzZXJ2YXRpb25SUScsXG4gICAgICAgICAgICBwYXlsb2FkOiBzb2FwUGF5bG9hZCxcbiAgICAgICAgICAgIGF1dGhUb2tlblR5cGU6ICdTRVNTSU9OJ1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZygnR2V0UmVzZXJ2YXRpb25SUSBSZXNwb25zZTonLCByZXNwb25zZSk7XG5cbiAgICAgICAgY29uc3QgcGFyc2VkRGF0YSA9IHBhcnNlUG5yRGF0YShyZXNwb25zZS5nZXRQYXJzZWRWYWx1ZSgpKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnUGFzc2VuZ2VyczonLCBwYXJzZWREYXRhLnBhc3NlbmdlcnMpO1xuICAgICAgICBjb25zb2xlLmxvZygnU2VnbWVudHM6JywgcGFyc2VkRGF0YS5zZWdtZW50cyk7XG5cbiAgICAgICAgLy8gEj5CIDc0NUFMIDJLN0syMDU8IDo+OzFNOiwgPzVANTQwMjBPIDQwPT1LNSFcbiAgICAgICAgb25EYXRhTG9hZGVkKHBhcnNlZERhdGEpO1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2FsbGluZyBHZXRSZXNlcnZhdGlvblJRIHZpYSBJU29hcEFwaVNlcnZpY2U6JywgZXJyb3IpO1xuICAgIH1cbn07IixudWxsLCIvLyBEMDk7OiBwYXJzZVBuckRhdGEudHNcblxuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnc2FicmUtbmd2LVVJQ29tcG9uZW50cy9hZHZhbmNlZERyb3Bkb3duL2ludGVyZmFjZXMvT3B0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBQbnJEYXRhIHtcbiAgICBwYXNzZW5nZXJzOiBPcHRpb25bXTtcbiAgICBzZWdtZW50czogT3B0aW9uW107XG59XG5cbi8vIB9AOD04PDA1PCBYTUxEb2N1bWVudFxuZXhwb3J0IGNvbnN0IHBhcnNlUG5yRGF0YSA9ICh4bWxEb2M6IFhNTERvY3VtZW50KTogUG5yRGF0YSA9PiB7XG4gICAgY29uc3QgcGFzc2VuZ2VyczogT3B0aW9uW10gPSBbXTtcbiAgICBjb25zdCBzZWdtZW50czogT3B0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0IHBhc3Nlbmdlck5vZGVzID0geG1sRG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdGwxOTpQYXNzZW5nZXInKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhc3Nlbmdlck5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBhc3NlbmdlciA9IHBhc3Nlbmdlck5vZGVzW2ldO1xuICAgICAgICBjb25zdCBpZCA9IHBhc3Nlbmdlci5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgJyc7XG4gICAgICAgIGNvbnN0IGxhc3ROYW1lID0gcGFzc2VuZ2VyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdGwxOTpMYXN0TmFtZScpWzBdPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gcGFzc2VuZ2VyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdGwxOTpGaXJzdE5hbWUnKVswXT8udGV4dENvbnRlbnQgfHwgJyc7XG5cbiAgICAgICAgcGFzc2VuZ2Vycy5wdXNoKHtcbiAgICAgICAgICAgIGxhYmVsOiBgJHtsYXN0TmFtZX0vJHtmaXJzdE5hbWV9YCxcbiAgICAgICAgICAgIHZhbHVlOiBpZFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWdtZW50Tm9kZXMgPSB4bWxEb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5OkFpcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSBzZWdtZW50Tm9kZXNbaV07XG4gICAgICAgIGNvbnN0IGRlcGFydHVyZSA9IHNlZ21lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5OkRlcGFydHVyZUFpcnBvcnQnKVswXT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgIGNvbnN0IGFycml2YWwgPSBzZWdtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdGwxOTpBcnJpdmFsQWlycG9ydCcpWzBdPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgY29uc3QgbWFya2V0aW5nRmxpZ2h0TnVtYmVyID0gc2VnbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3RsMTk6TWFya2V0aW5nRmxpZ2h0TnVtYmVyJylbMF0/LnRleHRDb250ZW50IHx8ICcnO1xuXG4gICAgICAgIHNlZ21lbnRzLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6IGAke2RlcGFydHVyZX0gkiAke2Fycml2YWx9ICgke21hcmtldGluZ0ZsaWdodE51bWJlcn0pYCxcbiAgICAgICAgICAgIHZhbHVlOiBgJHtkZXBhcnR1cmV9LSR7YXJyaXZhbH0tJHttYXJrZXRpbmdGbGlnaHROdW1iZXJ9YFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBwYXNzZW5nZXJzLCBzZWdtZW50cyB9O1xufTsiLCJpbXBvcnQgeyBFeHRlbnNpb25Qb2ludFNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YteHAvc2VydmljZXMvRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlJztcbmltcG9ydCB7IE5vdmljZUJ1dHRvbkNvbmZpZyB9IGZyb20gJ3NhYnJlLW5ndi14cC9jb25maWdzL05vdmljZUJ1dHRvbkNvbmZpZyc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vQ29udGV4dCc7IC8vIDVBOzggQzY1ID8+NDo7Tkc1PT4gMiBNYWluLnRzXG5pbXBvcnQgeyBTZWF0TWFwc1BvcG92ZXIgfSBmcm9tICcuL1NlYXRNYXBzUG9wb3Zlcic7IC8vIE1CPiBSZWFjdC06Pjw/Pj01PUIgNDtPID8+Pz4yNUAwXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbW1hbmRIZWxwZXJCdXR0b24oKSB7XG4gICAgY29uc3Qgb25DbGljayA9IChpc09wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NlYXRNYXBzIEFCQyAzNjAgYnV0dG9uIGNsaWNrZWQuIFBvcG92ZXIgaXNPcGVuOicsIGlzT3Blbik7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTZWF0TWFwcyBBQkMgMzYwIHBvcG92ZXIgY2xvc2VkJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBOb3ZpY2VCdXR0b25Db25maWcoXG4gICAgICAgICdTZWF0TWFwcyBBQkMgMzYwJywgICAgICAgLy8gTGFiZWxcbiAgICAgICAgJ2ZhLXBsYW5lJywgICAgICAgICAgICAgICAvLyAYOj49OjAgRm9udEF3ZXNvbWVcbiAgICAgICAgJ3NlYXRtYXBzLWFiYzM2MCcsIC8vIENTUyA6OzBBQSA0O08gPz4/PjI1QDAgKDw+NjVITCA/NUA1Pj9ANTQ1OzhCTCBBQjg7OCA/PkI+PClcbiAgICAgICAgU2VhdE1hcHNQb3BvdmVyLCAgICAgICAgICAvLyAaPjw/Pj01PUIgPz4/PjI1QDBcbiAgICAgICAgLTEwMDAsICAgICAgICAgICAgICAgICAgICAvLyAfQDg+QDhCNUI6IDFDNDVCIEE7NTIwXG4gICAgICAgIG9uQ2xpY2ssICAgICAgICAgICAgICAgICAgLy8gH0A4IDo7ODo1XG4gICAgICAgIG9uQ2xvc2UgICAgICAgICAgICAgICAgICAgLy8gH0A4IDcwOkBLQjg4XG4gICAgKTtcblxuICAgIGdldFNlcnZpY2UoRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlKS5hZGRDb25maWcoJ25vdmljZS1idXR0b25zJywgY29uZmlnKTtcbn0iLCIvLyBEMDk7OiBTZWF0TWFwQ29tcG9uZW50LnRzeFxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmludGVyZmFjZSBTZWF0TWFwQ29tcG9uZW50UHJvcHMge1xuICAgIHBhc3Nlbmdlcklkczogc3RyaW5nW107ICAvLyA8MEFBODIgMksxQDA9PUtFID8wQUEwNjhAPjJcbiAgICBzZWdtZW50SWQ6IHN0cmluZzsgICAgICAgLy8gMksxQDA9PUs5IEE1Mzw1PUJcbn1cblxuZXhwb3J0IGNsYXNzIFNlYXRNYXBDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8U2VhdE1hcENvbXBvbmVudFByb3BzPiB7XG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgY29uc3QgeyBwYXNzZW5nZXJJZHMsIHNlZ21lbnRJZCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICc0MDBweCdcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxoMj5TZWF0IE1hcDwvaDI+XG5cbiAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkZsaWdodCBTZWdtZW50Ojwvc3Ryb25nPiB7c2VnbWVudElkfTwvcD5cblxuICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+U2VsZWN0ZWQgUGFzc2VuZ2Vyczo8L3N0cm9uZz48L3A+XG5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIHtwYXNzZW5nZXJJZHMubWFwKChwYXNzZW5nZXJJZCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fT57cGFzc2VuZ2VySWR9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgICAgIDxociAvPlxuXG4gICAgICAgICAgICAgICAgey8qIBc0NUFMID8+Qj48IDFDNDVCIDowQEIwIDw1QUIgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZWVmJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICA8cD48ZW0+U2VhdCBtYXAgdmlzdWFsaXphdGlvbiBjb21pbmcgc29vbi4uLjwvZW0+PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgU2ltcGxlRHJvcGRvd24gfSBmcm9tICdzYWJyZS1uZ3YtVUlDb21wb25lbnRzL2FkdmFuY2VkRHJvcGRvd24vY29tcG9uZW50cy9TaW1wbGVEcm9wZG93bic7XG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICdzYWJyZS1uZ3YtVUlDb21wb25lbnRzL2FkdmFuY2VkRHJvcGRvd24vaW50ZXJmYWNlcy9PcHRpb24nO1xuaW1wb3J0IHsgbG9hZFBuckRldGFpbHNGcm9tU2FicmUgfSBmcm9tICcuL2xvYWRQbnJEZXRhaWxzRnJvbVNhYnJlJztcbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7IFB1YmxpY01vZGFsc1NlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtbW9kYWxzL3NlcnZpY2VzL1B1YmxpY01vZGFsU2VydmljZSc7XG5pbXBvcnQgeyBSZWFjdE1vZGFsT3B0aW9ucyB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvY29tcG9uZW50cy9QdWJsaWNSZWFjdE1vZGFsL1JlYWN0TW9kYWxPcHRpb25zJztcbmltcG9ydCB7IFNlYXRNYXBDb21wb25lbnQgfSBmcm9tICcuL1NlYXRNYXBDb21wb25lbnQnO1xuXG5pbnRlcmZhY2UgU2VhdE1hcHNQb3BvdmVyU3RhdGUge1xuICAgIHNlbGVjdGVkUGFzc2VuZ2Vyczogc3RyaW5nW107XG4gICAgc2VsZWN0ZWRTZWdtZW50OiBzdHJpbmc7XG4gICAgcGFzc2VuZ2VyczogT3B0aW9uW107XG4gICAgc2VnbWVudHM6IE9wdGlvbltdO1xufVxuXG5leHBvcnQgY2xhc3MgU2VhdE1hcHNQb3BvdmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBTZWF0TWFwc1BvcG92ZXJTdGF0ZT4ge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkUGFzc2VuZ2VyczogW10sXG4gICAgICAgICAgICBzZWxlY3RlZFNlZ21lbnQ6ICcnLFxuICAgICAgICAgICAgcGFzc2VuZ2VyczogW10sXG4gICAgICAgICAgICBzZWdtZW50czogW11cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpOiB2b2lkIHtcbiAgICAgICAgbG9hZFBuckRldGFpbHNGcm9tU2FicmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhc3NlbmdlcnM6IGRhdGEucGFzc2VuZ2Vycy5tYXAocCA9PiAoeyAuLi5wLCBjaGVja2VkOiB0cnVlIH0pKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFBhc3NlbmdlcnM6IGRhdGEucGFzc2VuZ2Vycy5tYXAocCA9PiBwLnZhbHVlKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50czogZGF0YS5zZWdtZW50c1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVBhc3NlbmdlckNoYW5nZSA9IChwYXNzZW5nZXJWYWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWRQYXNzZW5nZXJzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRQYXNzZW5nZXJzLmluY2x1ZGVzKHBhc3NlbmdlclZhbHVlKTtcblxuICAgICAgICBjb25zdCB1cGRhdGVkUGFzc2VuZ2VycyA9IGlzU2VsZWN0ZWRcbiAgICAgICAgICAgID8gc2VsZWN0ZWRQYXNzZW5nZXJzLmZpbHRlcihwID0+IHAgIT09IHBhc3NlbmdlclZhbHVlKVxuICAgICAgICAgICAgOiBbLi4uc2VsZWN0ZWRQYXNzZW5nZXJzLCBwYXNzZW5nZXJWYWx1ZV07XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkUGFzc2VuZ2VyczogdXBkYXRlZFBhc3NlbmdlcnMgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlU2VnbWVudENoYW5nZSA9IChvcHRpb25zOiBPcHRpb25bXSk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG9wdGlvbnMuZmluZChvcHQgPT4gb3B0LmNoZWNrZWQpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZFNlZ21lbnQ6IHNlbGVjdGVkLnZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3BlblNlYXRNYXAgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHB1YmxpY01vZGFsc1NlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpO1xuXG4gICAgICAgIGNvbnN0IG1vZGFsT3B0aW9uczogUmVhY3RNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoZWFkZXI6ICdTZWF0IE1hcCcsXG4gICAgICAgICAgICBjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhdE1hcENvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIHBhc3NlbmdlcklkczogdGhpcy5zdGF0ZS5zZWxlY3RlZFBhc3NlbmdlcnMsXG4gICAgICAgICAgICAgICAgc2VnbWVudElkOiB0aGlzLnN0YXRlLnNlbGVjdGVkU2VnbWVudFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtb2RhbENsYXNzTmFtZTogJ3NlYXRtYXAtbW9kYWwtY2xhc3MnXG4gICAgICAgIH07XG5cbiAgICAgICAgcHVibGljTW9kYWxzU2VydmljZS5zaG93UmVhY3RNb2RhbChtb2RhbE9wdGlvbnMpO1xuXG4gICAgICAgICh0aGlzLnByb3BzWydfX2xheWVySW5zdGFuY2UnXSBhcyBhbnkpPy5jbG9zZSgpOyAvLyARNTcgPkg4MT46XG4gICAgfVxuXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgY29uc3QgeyBwYXNzZW5nZXJzLCBzZWdtZW50cywgc2VsZWN0ZWRQYXNzZW5nZXJzLCBzZWxlY3RlZFNlZ21lbnQgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzQnV0dG9uRGlzYWJsZWQgPSBzZWxlY3RlZFBhc3NlbmdlcnMubGVuZ3RoID09PSAwIHx8ICFzZWxlY3RlZFNlZ21lbnQ7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICc0MDBweCcsXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAnMzUwcHgnLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCdcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+U2VsZWN0IFBhc3NlbmdlcnMgKHtzZWxlY3RlZFBhc3NlbmdlcnMubGVuZ3RofSk8L0NvbnRyb2xMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwYXNzZW5nZXJzLm1hcChwYXNzZW5nZXIgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtwYXNzZW5nZXIudmFsdWV9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzVweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkUGFzc2VuZ2Vycy5pbmNsdWRlcyhwYXNzZW5nZXIudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHRoaXMuaGFuZGxlUGFzc2VuZ2VyQ2hhbmdlKHBhc3Nlbmdlci52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5SaWdodDogJzhweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3Bhc3Nlbmdlci5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPlNlbGVjdCBGbGlnaHQgU2VnbWVudDwvQ29udHJvbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8U2ltcGxlRHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NlZ21lbnRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VnbWVudENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJywgbWFyZ2luVG9wOiAnMjBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYnRuLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW5TZWF0TWFwfSBkaXNhYmxlZD17aXNCdXR0b25EaXNhYmxlZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICBPcGVuIFNlYXQgTWFwXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSIsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge0lNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlQ29udGV4dFwiO1xuaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tIFwic2FicmUtbmd2LWNvcmUvbW9kdWxlcy9Nb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge0kxOG5TZXJ2aWNlLCBTY29wZWRUcmFuc2xhdG9yfSBmcm9tIFwic2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9JMThuU2VydmljZVwiO1xuXG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNvbnRleHQ6IElNb2R1bGVDb250ZXh0ID0gbmV3IE1vZHVsZUNvbnRleHQoXCJjb20tc2FicmUtcmVkYXBwLWZ1bmRhbWVudGFscy13ZWItbW9kdWxlXCIpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBjZjogSU1vZHVsZUNvbnRleHRbJ2NmJ10gPSBjb250ZXh0LmNmLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU2VydmljZTogSU1vZHVsZUNvbnRleHRbJ3JlZ2lzdGVyU2VydmljZSddID0gY29udGV4dC5yZWdpc3RlclNlcnZpY2UuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgZ2V0U2VydmljZTogSU1vZHVsZUNvbnRleHRbJ2dldFNlcnZpY2UnXSA9IGNvbnRleHQuZ2V0U2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCB0OiBTY29wZWRUcmFuc2xhdG9yID0gZ2V0U2VydmljZShJMThuU2VydmljZSkuZ2V0U2NvcGVkVHJhbnNsYXRvcignY29tLXNhYnJlLXJlZGFwcC1mdW5kYW1lbnRhbHMtd2ViLW1vZHVsZS90cmFuc2xhdGlvbnMnKTtcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtCdXR0b24sIEZvcm0sIEZvcm1Hcm91cCwgTW9kYWwsIElucHV0R3JvdXAsIENvbnRyb2xMYWJlbCwgRm9ybUNvbnRyb2wsIEhlbHBCbG9jaywgUGFuZWwsIEFsZXJ0fSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlLCB0IH0gZnJvbSBcIi4vQ29udGV4dFwiO1xuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSBcInNhYnJlLW5ndi1jb3JlL3NlcnZpY2VzL0xheWVyU2VydmljZVwiO1xuaW1wb3J0IHtJU29hcEFwaVNlcnZpY2V9IGZyb20gXCJzYWJyZS1uZ3YtY29tbXVuaWNhdGlvbi9pbnRlcmZhY2VzL0lTb2FwQXBpU2VydmljZVwiO1xuaW1wb3J0IHsgUG5yUHVibGljU2VydmljZSB9IGZyb20gXCJzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL1BuclB1YmxpY1NlcnZpY2VcIjtcblxuLypcbkRlZmluZSBpbnRlcmZhY2UgZm9yIGhhbmRsaW5nIFRyYXZlbGVyIGRldGFpbHMgb24gdGhlIFJlYWN0IGNvbXBvbmVudCBzdGF0ZVxuKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhdmVsZXIge1xuICAgIG5hbWU6c3RyaW5nLFxuICAgIHN1cm5hbWU6c3RyaW5nLFxuICAgIGVtYWlsPzpzdHJpbmcsXG4gICAgdHlwZUNvZGU/OidBRFQnIHwgJ0lORicgfCAnQ05OJywgICAgXG59XG5cbi8qXG5EZWZpbmUgaW50ZXJmYWNlIGZvciBoYW5kbGluZyBmaWVsZCB2YWxpZGF0aW9uIG9uIHRoZSBSZWFjdCBjb21wb25lbnQgc3RhdGVcbiovXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkVmFsaWRhdGlvbiB7XG4gICAgW2ZpZWxkSWQ6c3RyaW5nXTp7XG4gICAgICAgIGlzVmFsaWQ6Ym9vbGVhbixcbiAgICAgICAgc3RhdHVzOlwiZXJyb3JcInxcIndhcm5pbmdcInxcInN1Y2Nlc3NcInxudWxsLFxuICAgICAgICBoZWxwTXNnPzpzdHJpbmcgIFxuICAgIH1cbn1cblxuLypcblJlYWN0IGNvbXBvbmVudCBzdGF0ZSBpbnRlcmZhY2UsIGhvbGRzIGFsbCBkYXRhIGhhbmRsZWQgYnkgdGhlIEZvcm1cbiovXG5leHBvcnQgaW50ZXJmYWNlIG15U3RhdGUge1xuICAgIHN0YWdlOm51bWJlcixcbiAgICB0cmF2ZWxlcj86VHJhdmVsZXIsXG4gICAgdHJhdmVsVHlwZT86c3RyaW5nLFxuICAgIHRyYXZlbEluZm8/OkFycmF5PHN0cmluZz4sXG4gICAgdmFsaWRhdGlvbj86RmllbGRWYWxpZGF0aW9uXG59XG5cbi8qXG5DcmVhdGVQTlIgQ29tcG9uZW50LCBtdWx0aS1zdGFnZSBkYXRhIGVudHJ5IGZvcm0gYmFzZWQgb24gcmVhY3QtYm9vdHN0cmFwIGNvbXBvbmVudCBsaWJyYXJ5XG4qL1xuZXhwb3J0IGNsYXNzIENyZWF0ZVBOUiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSxteVN0YXRlPntcblxuICAgIGNvbnN0cnVjdG9yKGUpe1xuICAgICAgICBzdXBlcihlKTtcblxuICAgICAgICAvL2JpbmQgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZXhlY3V0ZVNlcnZpY2UgPSB0aGlzLmV4ZWN1dGVTZXJ2aWNlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2xvc2VBbmRSZWZyZXNoID0gdGhpcy5jbG9zZUFuZFJlZnJlc2guYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5nb0JhY2sgPSB0aGlzLmdvQmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmdvTmV4dCA9IHRoaXMuZ29OZXh0LmJpbmQodGhpcyk7XG5cbiAgICAgICAgLy9maWxsIGRlZmF1bHQgc3RhdGUgdmFsdWVzIGR1cmluZyBjb21wb25lbnQgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0YWdlOjEsXG4gICAgICAgICAgICB0cmF2ZWxlcjp7XG4gICAgICAgICAgICAgICAgbmFtZTpcIlwiLFxuICAgICAgICAgICAgICAgIHN1cm5hbWU6XCJcIixcbiAgICAgICAgICAgICAgICB0eXBlQ29kZTpcIkFEVFwiXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsaWRhdGlvbjp7XG4gICAgICAgICAgICAgICAgdHh0TmFtZTp7aXNWYWxpZDpmYWxzZSxzdGF0dXM6bnVsbCxoZWxwTXNnOm51bGx9LFxuICAgICAgICAgICAgICAgIHR4dFN1cm5hbWU6e2lzVmFsaWQ6ZmFsc2Usc3RhdHVzOm51bGwsaGVscE1zZzpudWxsfSxcbiAgICAgICAgICAgICAgICB0eHRFbWFpbDp7aXNWYWxpZDpmYWxzZSxzdGF0dXM6bnVsbCxoZWxwTXNnOm51bGx9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgIE1ldGhvZCB0byBoYW5kbGUgZmllbGQgY2hhbmdlcywgcGVyZm9ybSB2YWxpZGF0aW9uIGFuZCB1cGRhdGUgc3RhdGVcbiAgICAqL1xuICAgIGhhbmRsZUNoYW5nZShlKXtcblxuICAgICAgICBjb25zdCBjdGxJZCA9IGUudGFyZ2V0LmlkO1xuICAgICAgICBjb25zdCBmbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uU3RhdGUgPSB0aGlzLnN0YXRlLnZhbGlkYXRpb247XG5cbiAgICAgICAgY29uc3QgdG1wVHJhdmVsZXIgPSB0aGlzLnN0YXRlLnRyYXZlbGVyO1xuICAgICAgICBsZXQgdG1wVHJhdmVsVHlwZSA9IHRoaXMuc3RhdGUudHJhdmVsVHlwZTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZUNoYW5nZVwiLGN0bElkLGZsZFZhbHVlKTtcblxuICAgICAgICBpZihjdGxJZD09PVwidHh0TmFtZVwiIHx8IGN0bElkPT09XCJ0eHRTdXJuYW1lXCIpe1xuICAgICAgICAgICAgY29uc3QgdG1wVmFsaWRhdGlvbiA9IHZhbGlkYXRpb25TdGF0ZVtjdGxJZF1cblxuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gZmxkVmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgaWYoY3RsSWQ9PT1cInR4dE5hbWVcIilcbiAgICAgICAgICAgICAgICB0bXBUcmF2ZWxlci5uYW1lID0gZmxkVmFsdWU7XG4gICAgICAgICAgICBpZihjdGxJZD09PVwidHh0U3VybmFtZVwiKVxuICAgICAgICAgICAgICAgIHRtcFRyYXZlbGVyLnN1cm5hbWUgPSBmbGRWYWx1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYobGVuZ3RoPD0wKXtcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLmlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLnN0YXR1cyA9ICdlcnJvcic7XG4gICAgICAgICAgICAgICAgdG1wVmFsaWRhdGlvbi5oZWxwTXNnID0gXCJyZXF1aXJlZCBmaWVsZFwiO1xuICAgICAgICAgICAgfWVsc2UgaWYobGVuZ3RoPD0xKXtcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLmlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLnN0YXR1cyA9ICd3YXJuaW5nJztcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLmhlbHBNc2cgPSBcIm11c3QgYmUgbW9yZSB0aGFuIG9uZSBjaGFyYWN0ZXIgbG9uZ1wiO1xuICAgICAgICAgICAgfWVsc2UgaWYobGVuZ3RoPjEpe1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uaXNWYWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdG1wVmFsaWRhdGlvbi5zdGF0dXMgPSAnc3VjY2Vzcyc7XG4gICAgICAgICAgICAgICAgdG1wVmFsaWRhdGlvbi5oZWxwTXNnID0gbnVsbDtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoY3RsSWQ9PT1cInNlbEFnZUNvZGVcIil7XG4gICAgICAgICAgICB0bXBUcmF2ZWxlci50eXBlQ29kZSA9IGZsZFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY3RsSWQ9PT1cInNlbFRyYXZlbFR5cGVcIil7XG4gICAgICAgICAgICB0bXBUcmF2ZWxUeXBlID0gZmxkVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYXZlbGVyOnRtcFRyYXZlbGVyLFxuICAgICAgICAgICAgICAgIHRyYXZlbFR5cGU6dG1wVHJhdmVsVHlwZSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOnZhbGlkYXRpb25TdGF0ZVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vbW92ZXMgdG8gdGhlIG5leHQgc3RhZ2VcbiAgICBnb05leHQoZXZ0KXtcbiAgICAgICAgY29uc3QgY3VyclN0YWdlID0gdGhpcy5zdGF0ZS5zdGFnZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhZ2U6Y3VyclN0YWdlKzF9KVxuICAgIH1cblxuICAgIC8vcmV3aW5kIHN0YWdlXG4gICAgZ29CYWNrKGV2dCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YWdlOjF9KVxuICAgIH1cblxuICAgIC8qXG4gICAgQ3JlYXRlcyBhIFVwZGF0ZVJlc2VydmF0aW9uUlEgcmVxdWVzdCBwYXlsb2FkIG1lcmdpbmcgc3RhdGUgZGF0YSwgdGhlbiB1dGlsaXplcyBcbiAgICBTT0FQIEFQSSBzZXJ2aWNlIGhhbmRsZXIgdG8gc2VuZCB0aGUgcmVxdWVzdCBhbmQgcGFyc2UgcmVzdWx0c1xuICAgICovXG4gICAgZXhlY3V0ZVNlcnZpY2UoKXtcbiAgICAgICAgY29uc3Qgc29hcEFwaVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElTb2FwQXBpU2VydmljZSk7XG4gICAgICAgIGNvbnN0IHBsMSA9IGBcbiAgICAgICAgPFVwZGF0ZVJlc2VydmF0aW9uUlEgVmVyc2lvbj1cIjEuMTkuOFwiIHhtbG5zPVwiaHR0cDovL3dlYnNlcnZpY2VzLnNhYnJlLmNvbS9wbnJidWlsZGVyL3YxXzE5XCI+XG4gICAgICAgIDxSZXF1ZXN0VHlwZSBjb21taXRUcmFuc2FjdGlvbj1cImZhbHNlXCIgaW5pdGlhbElnbm9yZT1cInRydWVcIj5TdGF0ZWZ1bDwvUmVxdWVzdFR5cGU+XG4gICAgICAgIDxSZXR1cm5PcHRpb25zIEluY2x1ZGVVcGRhdGVEZXRhaWxzPVwidHJ1ZVwiIFJldHJpZXZlUE5SPVwiZmFsc2VcIi8+XG4gICAgICAgICAgICA8UmVzZXJ2YXRpb25VcGRhdGVMaXN0PlxuICAgICAgICAgICAgICAgIDxSZXNlcnZhdGlvblVwZGF0ZUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXNzZW5nZXJOYW1lVXBkYXRlIG9wPVwiQ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRyYXZlbGVyTmFtZSB0eXBlPVwiJHt0aGlzLnN0YXRlLnRyYXZlbGVyLnR5cGVDb2RlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxHaXZlbj4ke3RoaXMuc3RhdGUudHJhdmVsZXIubmFtZX08L0dpdmVuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdXJuYW1lPiR7dGhpcy5zdGF0ZS50cmF2ZWxlci5zdXJuYW1lfTwvU3VybmFtZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVHJhdmVsZXJOYW1lPlxuICAgICAgICAgICAgICAgICAgICA8L1Bhc3Nlbmdlck5hbWVVcGRhdGU+XG4gICAgICAgICAgICAgICAgPC9SZXNlcnZhdGlvblVwZGF0ZUl0ZW0+XG4gICAgICAgICAgICAgICAgPFJlc2VydmF0aW9uVXBkYXRlSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPFJlbWFya1VwZGF0ZSBvcD1cIkNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSZW1hcmtUZXh0PlRISVMgSVMgJHt0aGlzLnN0YXRlLnRyYXZlbFR5cGV9IFRSQVZFTCBUWVBFIFJFTUFSSzwvUmVtYXJrVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgPC9SZW1hcmtVcGRhdGU+XG4gICAgICAgICAgICAgICAgPC9SZXNlcnZhdGlvblVwZGF0ZUl0ZW0+XG4gICAgICAgICAgICA8L1Jlc2VydmF0aW9uVXBkYXRlTGlzdD5cbiAgICAgICAgPC9VcGRhdGVSZXNlcnZhdGlvblJRPlxuICAgICAgICBgO1xuXG4gICAgICAgIHNvYXBBcGlTZXJ2aWNlLmNhbGxTd3Moe2FjdGlvbjpcIlVwZGF0ZVJlc2VydmF0aW9uUlFcIixwYXlsb2FkOnBsMSxhdXRoVG9rZW5UeXBlOlwiU0VTU0lPTlwifSlcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgIC8vdmFsaWRhdGUgQVBJIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTb2FwIEFQSSBjYWxsIHJlc3VsdFwiLEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICAgICAgICAgIGlmKHJlcy5lcnJvckNvZGUgfHwgKHJlcy52YWx1ZSAmJiByZXMudmFsdWUuaW5kZXhPZihcIjxzdGwxOTpFcnJvclwiKT49MCkgKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhZ2U6NH0pXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YWdlOjN9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goXG4gICAgICAgICAgICAoZXJyKT0+e1xuICAgICAgICAgICAgICAgIC8vZXhjZXB0aW9uIGNhbGxpbmcgc29hcCBBUElcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNvYXAgQVBJIGNhbGwgZXJyb3JcIixlcnIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YWdlOjR9KVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBoYW5kbGVNb2RhbENsb3NlKCk6IHZvaWQge1xuICAgICAgICBnZXRTZXJ2aWNlKExheWVyU2VydmljZSkuY2xlYXJMYXllcig0Mik7XG4gICAgfVxuICAgIC8qXG4gICAgUmVmcmVzaGVzIHRoZSBUcmlwIFN1bW1hcnkgcGFuZWwgYWZ0ZXIgc3VjZXNzZnVsbCBVcGRhdGVSZXNlcnZhdGlvblJRIHJlc3BvbnNlLCBcbiAgICB0aGlzIG1ha2VzIHRoZSBjaGFuZ2VzIHdyaXR0ZW4gb24gdGhlIFBOUiB0byBhcHBlYXIgb24gdGhlIFVJXG4gICAgKi9cbiAgICBjbG9zZUFuZFJlZnJlc2goKXtcbiAgICAgICAgZ2V0U2VydmljZShQbnJQdWJsaWNTZXJ2aWNlKS5yZWZyZXNoRGF0YSgpO1xuICAgICAgICB0aGlzLmhhbmRsZU1vZGFsQ2xvc2UoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIFJlbmRlciBwYXJ0cyBvZiBtdWx0aS1zdGFnZSBmb3JtIHVzaW5nIHJlYWN0LWJvb3RzdHJhcCBjb21wb25lbnRzXG4gICAgVGhlIGRhdGEgZW50cnkgZm9ybSBpcyB3cmFwcGVkIGJ5IGEgTW9kYWwgRGlhbG9nIGNvbXBvbmVudFxuICAgICovXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcblxuICAgICAgICBzd2l0Y2godGhpcy5zdGF0ZS5zdGFnZSl7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlTmFtZSA9IHRoaXMuc3RhdGUudmFsaWRhdGlvbltcInR4dE5hbWVcIl07XG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0ZVN1cm5hbWUgPSB0aGlzLnN0YXRlLnZhbGlkYXRpb25bXCJ0eHRTdXJuYW1lXCJdO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxNb2RhbC5EaWFsb2cgY2xhc3NOYW1lPVwicmVhY3QtbW9kYWxcIj5cbiAgICAgICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24gb25IaWRlPXsoKT0+e3RoaXMuaGFuZGxlTW9kYWxDbG9zZSgpO319PlxuICAgICAgICAgICAgICAgIDxNb2RhbC5UaXRsZT5EYXRhIEVudHJ5IEZvcm0gKDEgb2YgMik8L01vZGFsLlRpdGxlPlxuICAgICAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICAgIDxGb3JtIGF1dG9Db21wbGV0ZT1cIm9mZlwiPlxuICAgICAgICAgICAgICAgIDxQYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgPFBhbmVsLkhlYWRpbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGFuZWwuVGl0bGU+QWJvdXQgVHJhdmVsZXI8L1BhbmVsLlRpdGxlPlxuICAgICAgICAgICAgICAgICAgICA8L1BhbmVsLkhlYWRpbmc+XG4gICAgICAgICAgICAgICAgICAgIDxQYW5lbC5Cb2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJ0eHROYW1lXCIgdmFsaWRhdGlvblN0YXRlPXt2YWxpZGF0ZU5hbWUuc3RhdHVzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPk5hbWU8L0NvbnRyb2xMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdHJhdmVsZXIgTmFtZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS50cmF2ZWxlci5uYW1lfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2YWxpZGF0ZU5hbWUuaGVscE1zZyAmJiA8Rm9ybUNvbnRyb2wuRmVlZGJhY2sgLz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyh2YWxpZGF0ZU5hbWUuaGVscE1zZykgJiYgPEhlbHBCbG9jaz57dmFsaWRhdGVOYW1lLmhlbHBNc2d9PC9IZWxwQmxvY2s+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPVwidHh0U3VybmFtZVwiIHZhbGlkYXRpb25TdGF0ZT17dmFsaWRhdGVTdXJuYW1lLnN0YXR1c30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD5TdXJuYW1lPC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHRyYXZlbGVyIFN1cmFtZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS50cmF2ZWxlci5zdXJuYW1lfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2YWxpZGF0ZVN1cm5hbWUuaXNWYWxpZCAmJiA8Rm9ybUNvbnRyb2wuRmVlZGJhY2sgLz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyh2YWxpZGF0ZVN1cm5hbWUuaXNWYWxpZCAmJiB2YWxpZGF0ZVN1cm5hbWUuaGVscE1zZykgJiYgPEhlbHBCbG9jaz57dmFsaWRhdGVOYW1lLmhlbHBNc2d9PC9IZWxwQmxvY2s+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPVwic2VsQWdlQ29kZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+UGFzc2VuZ2VyIFR5cGUgKENvZGUpPC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIGNvbXBvbmVudENsYXNzPVwic2VsZWN0XCIgcGxhY2Vob2xkZXI9XCJzZWxlY3RcIiB2YWx1ZT17dGhpcy5zdGF0ZS50cmF2ZWxlci50eXBlQ29kZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNlbGVjdFwiPnNlbGVjdDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQURUXCI+QWR1bHQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkNOTlwiPkNoaWxkPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJJTkZcIj5JbmZhbnQ8L29wdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgPC9QYW5lbC5Cb2R5PlxuICAgICAgICAgICAgICAgIDwvUGFuZWw+XG4gICAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVNb2RhbENsb3NlfSBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiPkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5nb05leHR9Pk5leHQ8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgPC9Nb2RhbC5EaWFsb2c+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1vZGFsLkRpYWxvZyBjbGFzc05hbWU9XCJyZWFjdC1tb2RhbFwiPlxuICAgICAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbiBvbkhpZGU9eygpPT57dGhpcy5oYW5kbGVNb2RhbENsb3NlKCk7fX0+XG4gICAgICAgICAgICAgICAgPE1vZGFsLlRpdGxlPkRhdGEgRW50cnkgRm9ybSAoMiBvZiAyKTwvTW9kYWwuVGl0bGU+XG4gICAgICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgICAgPEZvcm0+XG4gICAgICAgICAgICAgICAgPFBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8UGFuZWwuSGVhZGluZz48UGFuZWwuVGl0bGU+QWJvdXQgVHJhdmVsPC9QYW5lbC5UaXRsZT48L1BhbmVsLkhlYWRpbmc+XG4gICAgICAgICAgICAgICAgICAgIDxQYW5lbC5Cb2R5PlxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPVwic2VsVHJhdmVsVHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPlRyYXZlbCBUeXBlPC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBjb21wb25lbnRDbGFzcz1cInNlbGVjdFwiIHBsYWNlaG9sZGVyPVwic2VsZWN0XCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSB2YWx1ZT17dGhpcy5zdGF0ZS50cmF2ZWxUeXBlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzZWxlY3RcIj5zZWxlY3Q8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJidXNpbmVzc1wiPmJ1c2luZXNzPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibGVpc3VyZVwiPmxlaXN1cmU8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudHJhdmVsVHlwZT09PVwiYnVzaW5lc3NcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPkFkZCBDb3Jwb3JhdGUgSUQgPzwvQ29udHJvbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLkFkZG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgYXJpYS1sYWJlbD1cIi4uLlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwLkFkZG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudHJhdmVsVHlwZT09PVwibGVpc3VyZVwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+QWRkIFNwZWNpYWwgU2VydmljZSBSZXF1ZXN0ID88L0NvbnRyb2xMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cC5BZGRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGFyaWEtbGFiZWw9XCIuLi5cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRHcm91cC5BZGRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRHcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L1BhbmVsLkJvZHk+XG4gICAgICAgICAgICAgICAgPC9QYW5lbD5cblxuICAgICAgICAgICAgPC9Gb3JtPlxuICAgICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgICAgPE1vZGFsLkZvb3Rlcj5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTW9kYWxDbG9zZX0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj5DYW5jZWw8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuZ29CYWNrfT5CYWNrPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLXN1Y2Nlc3NcIiBvbkNsaWNrPXt0aGlzLmV4ZWN1dGVTZXJ2aWNlfT5DcmVhdGUgUE5SPC9CdXR0b24+XG5cbiAgICAgICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgPC9Nb2RhbC5EaWFsb2c+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxBbGVydCBic1N0eWxlPVwic3VjY2Vzc1wiIG9uRGlzbWlzcz17dGhpcy5jbG9zZUFuZFJlZnJlc2h9PlxuICAgICAgICAgICAgICAgIDxoND5TdWNjZXNzPC9oND5cbiAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgIDxwPk9wZXJhdGlvbiBjb21wbGV0ZWQgc3VjZXNzZnVsbHksIGRhdGEgd2FzIHdyaXR0ZW4gdG8gdGhlIFBOUiwgc2Vzc2lvbiBzdGF0dXMgd2lsbCBiZSByZWZyZXNoZWQuLi48L3A+XG4gICAgICAgICAgICAgICAgPGhyLz5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwic3VjY2Vzc1wiIG9uQ2xpY2s9e3RoaXMuY2xvc2VBbmRSZWZyZXNofT5DbG9zZTwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxBbGVydCBic1N0eWxlPVwiZGFuZ2VyXCIgb25EaXNtaXNzPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9PlxuICAgICAgICAgICAgICAgIDxoND5FcnJvcjwvaDQ+XG4gICAgICAgICAgICAgICAgPGhyLz5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgVGhlIG9wZXJhdGlvbiBjb3VsZCBub3QgYmUgY29tcGxldGVkLCB2YWxpZGF0ZSByZWNvcmRzIGFuZCB0cnkgYWdhaW4uLi5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPGhyLz5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwiZGFuZ2VyXCIgb25DbGljaz17dGhpcy5nb0JhY2t9PlJldHJ5PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVNb2RhbENsb3NlfT5DYW5jZWw8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn0iLCJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyogQXV0by1nZW5lcmF0ZWQgZmlsZS4gICAgICAgICAgICAgICovXG4vKiBEbyBub3QgbW9kaWZ5IGl0LiAgICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcmVtb3ZlIGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBjb21taXQgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHB1c2ggaXQuICAgICAgICAgICAgICAgICAgKi9cbi8qIFJlbW92ZSBpdCBpZiBtb2R1bGUgbmFtZSBjaGFuZ2VkLiAqL1xuLyogZXNsaW50OmRpc2FibGUgICAgICAgICAgICAgICAgICAgICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHtNYWlufSBmcm9tICcuL01haW4nO1xuaW1wb3J0IHtJTW9kdWxlTWFuaWZlc3R9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL21vZHVsZXMvSU1vZHVsZU1hbmlmZXN0JztcbmltcG9ydCB7Y29udGV4dH0gZnJvbSAnLi9Db250ZXh0JztcblxuLyoqXG4gKiAgQXV0b2dlbmVyYXRlZCBjbGFzcyByZXByZXNlbnRpbmcgbW9kdWxlIGluIHJ1bnRpbWUuXG4gKiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2R1bGVfY29tX3NhYnJlX3JlZGFwcF9mdW5kYW1lbnRhbHNfd2ViX21vZHVsZSBleHRlbmRzIE1haW4ge1xuICAgIGNvbnN0cnVjdG9yKG1hbmlmZXN0OiBJTW9kdWxlTWFuaWZlc3QpIHtcbiAgICAgICAgc3VwZXIobWFuaWZlc3QpO1xuICAgICAgICBjb250ZXh0LnNldE1vZHVsZSh0aGlzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL01vZHVsZSc7XG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi9Db250ZXh0JztcbmltcG9ydCB7IEV4dGVuc2lvblBvaW50U2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi14cC9zZXJ2aWNlcy9FeHRlbnNpb25Qb2ludFNlcnZpY2UnO1xuaW1wb3J0IHsgUmVkQXBwU2lkZVBhbmVsQ29uZmlnIH0gZnJvbSAnc2FicmUtbmd2LXhwL2NvbmZpZ3MvUmVkQXBwU2lkZVBhbmVsQ29uZmlnJztcbmltcG9ydCB7IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbiB9IGZyb20gJ3NhYnJlLW5ndi1yZWRBcHBTaWRlUGFuZWwvbW9kZWxzL1JlZEFwcFNpZGVQYW5lbEJ1dHRvbic7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtY29yZS9zZXJ2aWNlcy9MYXllclNlcnZpY2UnO1xuaW1wb3J0IHsgQ3JlYXRlUE5SIH0gZnJvbSAnLi9DcmVhdGVQTlInO1xuaW1wb3J0IHsgU2VhdE1hcHNQb3BvdmVyIH0gZnJvbSAnLi9jb21wb25lbnRzL1NlYXRNYXBzUG9wb3Zlcic7XG5pbXBvcnQgeyBjcmVhdGVQbnJNdWNEeGJGb3JtIH0gZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZVBuck11Y0R4YkZvcm0nO1xuXG5leHBvcnQgY2xhc3MgTWFpbiBleHRlbmRzIE1vZHVsZSB7XG4gICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuXG4gICAgICAgIGNvbnN0IHhwID0gZ2V0U2VydmljZShFeHRlbnNpb25Qb2ludFNlcnZpY2UpO1xuICAgICAgICBjb25zdCBzaWRlcGFuZWxNZW51ID0gbmV3IFJlZEFwcFNpZGVQYW5lbENvbmZpZyhbXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKFxuICAgICAgICAgICAgICAgIFwiQ3JlYXRlIFBOUlwiLFxuICAgICAgICAgICAgICAgIFwiYnRuLXNlY29uZGFyeSBzaWRlLXBhbmVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICgpID0+IHsgdGhpcy5zaG93Rm9ybSgpOyB9LFxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbihcbiAgICAgICAgICAgICAgICBcIlNlYXRNYXBzIEFCQyAzNjBcIixcbiAgICAgICAgICAgICAgICBcImJ0bi1zZWNvbmRhcnkgc2lkZS1wYW5lbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHRoaXMub3BlblNlYXRNYXBzKCk7IH0sXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKFxuICAgICAgICAgICAgICAgIFwiQ3JlYXRlIFBOUiBNVUMtRFhCXCIsICAgICAgICAgICAgICAgICAgLy8gPT4yME8gOj0+PzowXG4gICAgICAgICAgICAgICAgXCJidG4tc2Vjb25kYXJ5IHNpZGUtcGFuZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgKCkgPT4geyBjcmVhdGVQbnJNdWNEeGJGb3JtKCk7IH0sICAgICAgIC8vIDJLN0syMDU8IGNyZWF0ZVBuck11Y0R4YkZvcm0oKVxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgIF0pO1xuICAgICAgICB4cC5hZGRDb25maWcoXCJyZWRBcHBTaWRlUGFuZWxcIiwgc2lkZXBhbmVsTWVudSk7XG4gICAgfVxuXG4gICAgc2hvd0Zvcm0oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxzID0gZ2V0U2VydmljZShMYXllclNlcnZpY2UpO1xuICAgICAgICBscy5zaG93T25MYXllcihDcmVhdGVQTlIsIHsgZGlzcGxheTogXCJhcmVhVmlld1wiLCBwb3NpdGlvbjogNDIgfSk7XG4gICAgfVxuXG4gICAgb3BlblNlYXRNYXBzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBscyA9IGdldFNlcnZpY2UoTGF5ZXJTZXJ2aWNlKTtcbiAgICAgICAgbHMuc2hvd09uTGF5ZXIoU2VhdE1hcHNQb3BvdmVyLCB7IGRpc3BsYXk6IFwiYXJlYVZpZXdcIiwgcG9zaXRpb246IDQzIH0pO1xuICAgIH1cblxuXG59IiwiaW1wb3J0IHtDdXN0b21Gb3JtfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcbmltcG9ydCB7SUN1c3RvbUZvcm1zU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9zZXJ2aWNlcy9JQ3VzdG9tRm9ybXNTZXJ2aWNlJztcbmltcG9ydCB7Z2V0U2VydmljZX0gZnJvbSAnLi4vQ29udGV4dCc7XG5cbmV4cG9ydCBjb25zdCBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCA9ICh0aXRsZTogc3RyaW5nLCBtc2c6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZvcm06IEN1c3RvbUZvcm0gPSB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2ZsaWdodCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BBUkFHUkFQSCcsXG4gICAgICAgICAgICAgICAgdGV4dDogbXNnXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDbG9zZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgZ2V0U2VydmljZShJQ3VzdG9tRm9ybXNTZXJ2aWNlKS5vcGVuRm9ybShmb3JtKTtcbn0iXX0= 