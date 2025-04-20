System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnrForTwoPassengers", ["sabre-ngv-custom-forms/services/ICustomFormsService","sabre-ngv-app/app/services/impl/DatesService","sabre-ngv-commsg/services/ICommandMessageService","sabre-ngv-app/app/services/impl/InterstitialService","com-sabre-redapp-fundamentals-web-module/Context","com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph"], false, function (require, exports, module) {
"use strict";
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
exports.createPnrForTwoPassengers = void 0;
var ICustomFormsService_1 = require("sabre-ngv-custom-forms/services/ICustomFormsService");
var DatesService_1 = require("sabre-ngv-app/app/services/impl/DatesService");
var ICommandMessageService_1 = require("sabre-ngv-commsg/services/ICommandMessageService");
var InterstitialService_1 = require("sabre-ngv-app/app/services/impl/InterstitialService");
var Context_1 = require("../Context");
var openCustomFormParagraph_1 = require("../utils/openCustomFormParagraph");
var createPnrForTwoPassengers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var twentyDaysAhead, flightCommand, form, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                twentyDaysAhead = (0, Context_1.getService)(DatesService_1.DatesService).getNow().add(20, 'days').format('DDMMM').toUpperCase();
                flightCommand = "1EK50Y" + twentyDaysAhead + "MUCDXB/SS2";
                form = {
                    title: 'Create PNR',
                    fields: [
                        {
                            id: 'name',
                            value: '-KLEIMANN/LEONIDMR\n-KLEIMANN/GALINAMRS'
                        },
                        {
                            id: 'flight',
                            value: flightCommand
                        },
                        {
                            id: 'ticket',
                            value: '01Y2'
                        },
                        {
                            id: 'agent',
                            label: 'Agent Info',
                            value: '6AGENT'
                        },
                        {
                            id: 'phone',
                            value: '912345678900'
                        },
                        {
                            id: 'timeLimit',
                            label: 'Ticketing time limit',
                            value: '7TAW/'
                        }
                    ],
                    actions: [
                        {
                            id: 'cancel',
                            label: 'Cancel'
                        },
                        {
                            id: 'ok',
                            label: 'Submit'
                        }
                    ]
                };
                return [4 /*yield*/, (0, Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(form)];
            case 1:
                result = _a.sent();
                if (result.action === 'ok') {
                    selfSubmitPnrAction(result);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.createPnrForTwoPassengers = createPnrForTwoPassengers;
var selfSubmitPnrAction = function (form) { return __awaiter(void 0, void 0, void 0, function () {
    var interstitialService, nameRq, flightRq, ticketRq, agentInfoRq, phoneRq, tawRq, nameRsStatus, flightsStatus, _a, ticketRsStatus, _b, agentInfoRsStatus, _c, phoneRsStatus, _d, tawRsStatus, _e, receivedFromStatus, _f, wpRsStatus, _g, pqRsStatus, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                interstitialService = (0, Context_1.getService)(InterstitialService_1.InterstitialService);
                nameRq = form.fields.find(function (field) { return field.id === 'name'; }).value;
                flightRq = form.fields.find(function (field) { return field.id === 'flight'; }).value;
                ticketRq = form.fields.find(function (field) { return field.id === 'ticket'; }).value;
                agentInfoRq = form.fields.find(function (field) { return field.id === 'agent'; }).value;
                phoneRq = form.fields.find(function (field) { return field.id === 'phone'; }).value;
                tawRq = form.fields.find(function (field) { return field.id === 'timeLimit'; }).value;
                interstitialService.showInterstitial(15000);
                return [4 /*yield*/, sendCommand(nameRq, 'Name')];
            case 1:
                nameRsStatus = _j.sent();
                _a = nameRsStatus;
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, sendCommand(flightRq, 'Flight list')];
            case 2:
                _a = (_j.sent());
                _j.label = 3;
            case 3:
                flightsStatus = _a;
                _b = flightsStatus;
                if (!_b) return [3 /*break*/, 5];
                return [4 /*yield*/, sendCommand(ticketRq, 'Ticket')];
            case 4:
                _b = (_j.sent());
                _j.label = 5;
            case 5:
                ticketRsStatus = _b;
                _c = ticketRsStatus;
                if (!_c) return [3 /*break*/, 7];
                return [4 /*yield*/, sendCommand(agentInfoRq, 'Agent Info')];
            case 6:
                _c = (_j.sent());
                _j.label = 7;
            case 7:
                agentInfoRsStatus = _c;
                _d = agentInfoRsStatus;
                if (!_d) return [3 /*break*/, 9];
                return [4 /*yield*/, sendCommand(phoneRq, 'Phone')];
            case 8:
                _d = (_j.sent());
                _j.label = 9;
            case 9:
                phoneRsStatus = _d;
                _e = phoneRsStatus;
                if (!_e) return [3 /*break*/, 11];
                return [4 /*yield*/, sendCommand(tawRq, 'TAW')];
            case 10:
                _e = (_j.sent());
                _j.label = 11;
            case 11:
                tawRsStatus = _e;
                _f = tawRsStatus;
                if (!_f) return [3 /*break*/, 13];
                return [4 /*yield*/, sendCommand('6LEONID', 'Received From')];
            case 12:
                _f = (_j.sent());
                _j.label = 13;
            case 13:
                receivedFromStatus = _f;
                _g = receivedFromStatus;
                if (!_g) return [3 /*break*/, 15];
                return [4 /*yield*/, sendCommand('WP', 'WP')];
            case 14:
                _g = (_j.sent());
                _j.label = 15;
            case 15:
                wpRsStatus = _g;
                _h = wpRsStatus;
                if (!_h) return [3 /*break*/, 17];
                return [4 /*yield*/, sendCommand('PQ', 'PQ')];
            case 16:
                _h = (_j.sent());
                _j.label = 17;
            case 17:
                pqRsStatus = _h;
                interstitialService.hideInterstitial();
                pqRsStatus && (0, openCustomFormParagraph_1.openCustomFormParagraph)('Create PNR', 'PNR created');
                return [2 /*return*/];
        }
    });
}); };
var sendCommand = function (command, failureSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var rsStatus, isSuccess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Context_1.getService)(ICommandMessageService_1.ICommandMessageService).send(command)];
            case 1:
                rsStatus = _a.sent();
                isSuccess = rsStatus.Status.Success;
                if (isSuccess && rsStatus.Status.Messages[0] && rsStatus.Status.Messages[0].Text.includes('SIGN IN')) {
                    isSuccess = false;
                    handleFailure('Command failed, not signed in.');
                }
                else if (!isSuccess) {
                    handleFailure(failureSegment);
                }
                return [2 /*return*/, isSuccess];
        }
    });
}); };
var handleFailure = function (segment) {
    (0, openCustomFormParagraph_1.openCustomFormParagraph)('Create PNR', segment + " creation failed");
};


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnrForTwoPassengers.js", ["com-sabre-redapp-fundamentals-web-module/components/createPnrForTwoPassengers"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/createPnrForTwoPassengers"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/createPnrMucDxbForm", ["sabre-ngv-custom-forms/services/ICustomFormsService","sabre-ngv-app/app/services/impl/DatesService","sabre-ngv-commsg/services/ICommandMessageService","sabre-ngv-app/app/services/impl/InterstitialService","com-sabre-redapp-fundamentals-web-module/Context","com-sabre-redapp-fundamentals-web-module/utils/openCustomFormParagraph"], false, function (require, exports, module) {
"use strict";var __awaiter=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,a){function fulfilled(e){try{step(n.next(e))}catch(t){a(t)}}function rejected(e){try{step(n.throw(e))}catch(t){a(t)}}function step(e){e.done?i(e.value):function adopt(e){return e instanceof r?e:new r(function(t){t(e)})}(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var r,n,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function verb(a){return function(s){return function step(a){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,n=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(s){a=[6,s],n=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createPnrMucDxbForm=void 0;var ICustomFormsService_1=require("sabre-ngv-custom-forms/services/ICustomFormsService"),DatesService_1=require("sabre-ngv-app/app/services/impl/DatesService"),ICommandMessageService_1=require("sabre-ngv-commsg/services/ICommandMessageService"),InterstitialService_1=require("sabre-ngv-app/app/services/impl/InterstitialService"),Context_1=require("../Context"),openCustomFormParagraph_1=require("../utils/openCustomFormParagraph"),createPnrMucDxbForm=function(){return __awaiter(void 0,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return e={title:"Create PNR MUC-DXB",fields:[{id:"name",value:"-KLEIMANN/LEONID"},{id:"daysAhead",value:"20"},{id:"ticket",value:"01Y2"},{id:"agent",value:"6AGENT"},{id:"phone",value:"91234567"},{id:"timeLimit",value:"7TAW/"}],actions:[{id:"cancel",label:"Cancel"},{id:"ok",label:"Submit"}]},[4,(0,Context_1.getService)(ICustomFormsService_1.ICustomFormsService).openForm(e)];case 1:return"ok"===(t=r.sent()).action&&selfSubmitPnrMucDxbAction(t),[2]}})})};exports.createPnrMucDxbForm=createPnrMucDxbForm;var selfSubmitPnrMucDxbAction=function(e){return __awaiter(void 0,void 0,void 0,function(){var t,r,n,i,a,o,s,u,c,l,d,v;return __generator(this,function(m){switch(m.label){case 0:t=(0,Context_1.getService)(InterstitialService_1.InterstitialService),r=e.fields.find(function(e){return"name"===e.id}).value,n=(null===(v=e.fields.find(function(e){return"daysAhead"===e.id}))||void 0===v?void 0:v.value)||"20",i=parseInt(n,10)||20,a=(0,Context_1.getService)(DatesService_1.DatesService).getNow().add(i,"days").format("DDMMM").toUpperCase(),o="0EK"+a+"MUCDXB50Y",s=e.fields.find(function(e){return"ticket"===e.id}).value,u=e.fields.find(function(e){return"agent"===e.id}).value,c=e.fields.find(function(e){return"phone"===e.id}).value,l=e.fields.find(function(e){return"timeLimit"===e.id}).value,t.showInterstitial(15e3),m.label=1;case 1:return m.trys.push([1,10,11,12]),[4,sendCommand(r,"Name")];case 2:return m.sent(),[4,sendCommand(o,"Flight segment")];case 3:return m.sent(),[4,sendCommand(s,"Ticket")];case 4:return m.sent(),[4,sendCommand(u,"Agent info")];case 5:return m.sent(),[4,sendCommand(c,"Phone")];case 6:return m.sent(),[4,sendCommand(l,"Time limit")];case 7:return m.sent(),[4,sendCommand("WP","WP")];case 8:return m.sent(),[4,sendCommand("PQ","PQ")];case 9:return m.sent(),(0,openCustomFormParagraph_1.openCustomFormParagraph)("Create PNR MUC-DXB","PNR created"),[3,12];case 10:return d=m.sent(),console.error("Error during PNR creation:",d),[3,12];case 11:return t.hideInterstitial(),[7];case 12:return[2]}})})},sendCommand=function(e,t){return __awaiter(void 0,void 0,void 0,function(){var r,n,i;return __generator(this,function(a){switch(a.label){case 0:return[4,(0,Context_1.getService)(ICommandMessageService_1.ICommandMessageService).send(e)];case 1:if(!(r=a.sent()).Status.Success)throw new Error(t+" creation failed: "+(null===(i=null===(n=r.Status.Messages)||void 0===n?void 0:n[0])||void 0===i?void 0:i.Text));return[2]}})})};


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


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre.js", ["com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ", ["com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-communication/interfaces/ISoapApiService"], false, function (require, exports, module) {
"use strict";var __awaiter=this&&this.__awaiter||function(e,r,n,t){return new(n||(n=Promise))(function(a,i){function fulfilled(e){try{step(t.next(e))}catch(r){i(r)}}function rejected(e){try{step(t.throw(e))}catch(r){i(r)}}function step(e){e.done?a(e.value):function adopt(e){return e instanceof n?e:new n(function(r){r(e)})}(e.value).then(fulfilled,rejected)}step((t=t.apply(e,r||[])).next())})},__generator=this&&this.__generator||function(e,r){var n,t,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function verb(i){return function(s){return function step(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,t&&(a=2&i[0]?t.return:i[0]?t.throw||((a=t.return)&&a.call(t),0):t.next)&&!(a=a.call(t,i[1])).done)return a;switch(t=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,t=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=r.call(e,o)}catch(s){i=[6,s],t=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.loadPnrUsingTravelItineraryReadRQ=void 0;var Context_1=require("../Context"),ISoapApiService_1=require("sabre-ngv-communication/interfaces/ISoapApiService");function loadPnrUsingTravelItineraryReadRQ(){return __awaiter(this,void 0,void 0,function(){var e,r;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,(0,Context_1.getService)(ISoapApiService_1.ISoapApiService).callSws({action:"TravelItineraryReadRQ",payload:'\n            <TravelItineraryReadRQ Version="3.9.0" xmlns="http://webservices.sabre.com/sabreXML/2011/10">\n                <MessagingDetails>\n                    <Transaction Code="PNR"/>\n                </MessagingDetails>\n            </TravelItineraryReadRQ>\n        ',authTokenType:"SESSION"})];case 1:return e=n.sent(),console.log("TravelItineraryReadRQ Response:",e),[3,3];case 2:return r=n.sent(),console.error("Error loading PNR using TravelItineraryReadRQ:",r),[3,3];case 3:return[2]}})})}exports.loadPnrUsingTravelItineraryReadRQ=loadPnrUsingTravelItineraryReadRQ;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ.js", ["com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/loadPnrUsingTravelItineraryReadRQ"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadSeatMapFromSabre", ["com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-communication/interfaces/ISoapApiService"], false, function (require, exports, module) {
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


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/loadSeatMapFromSabre.js", ["com-sabre-redapp-fundamentals-web-module/components/loadSeatMapFromSabre"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/loadSeatMapFromSabre"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/openSeatMapsPopoverModal", ["react","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopoverModalWrapper"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.openSeatMapsPopoverModal=void 0;var React=require("react"),Context_1=require("../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapsPopoverModalWrapper_1=require("./SeatMapsPopoverModalWrapper"),openSeatMapsPopoverModal=function(){(0,Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal({component:React.createElement(SeatMapsPopoverModalWrapper_1.SeatMapsPopoverModalWrapper,{}),modalClassName:"seatmap-modal-class"})};exports.openSeatMapsPopoverModal=openSeatMapsPopoverModal;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/openSeatMapsPopoverModal.js", ["com-sabre-redapp-fundamentals-web-module/components/openSeatMapsPopoverModal"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/openSeatMapsPopoverModal"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/parcePnrData", [], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePnrData = void 0;
var parsePnrData = function (xmlDoc) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var passengers = [];
    var segments = [];
    // --- Пассажиры ---
    var passengerNodes = xmlDoc.getElementsByTagName('stl19:Passenger');
    for (var i = 0; i < passengerNodes.length; i++) {
        var passenger = passengerNodes[i];
        var id = passenger.getAttribute('id') || '';
        var lastName = ((_a = passenger.getElementsByTagName('stl19:LastName')[0]) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        var firstName = ((_b = passenger.getElementsByTagName('stl19:FirstName')[0]) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        passengers.push({
            label: lastName + "/" + firstName,
            value: id,
            givenName: firstName,
            surname: lastName
        });
    }
    // --- Сегменты ---
    var airSegmentNodes = xmlDoc.getElementsByTagName('stl19:Air');
    for (var i = 0; i < airSegmentNodes.length; i++) {
        var segment = airSegmentNodes[i];
        var id = segment.getAttribute('id') || '';
        var origin_1 = ((_c = segment.getElementsByTagName('stl19:DepartureAirport')[0]) === null || _c === void 0 ? void 0 : _c.textContent) || '';
        var destination = ((_d = segment.getElementsByTagName('stl19:ArrivalAirport')[0]) === null || _d === void 0 ? void 0 : _d.textContent) || '';
        var departureDateTime = ((_e = segment.getElementsByTagName('stl19:DepartureDateTime')[0]) === null || _e === void 0 ? void 0 : _e.textContent) || '';
        var marketingCarrierNode = segment.getElementsByTagName('stl19:MarketingAirline')[0];
        var operatingCarrierNode = segment.getElementsByTagName('stl19:OperatingAirline')[0];
        var marketingCarrier = ((_f = marketingCarrierNode === null || marketingCarrierNode === void 0 ? void 0 : marketingCarrierNode.textContent) === null || _f === void 0 ? void 0 : _f.trim())
            || ((_g = operatingCarrierNode === null || operatingCarrierNode === void 0 ? void 0 : operatingCarrierNode.textContent) === null || _g === void 0 ? void 0 : _g.trim())
            || 'UNKNOWN';
        var marketingFlightNumber = ((_h = segment.getElementsByTagName('stl19:MarketingFlightNumber')[0]) === null || _h === void 0 ? void 0 : _h.textContent) || '';
        var bookingClass = ((_j = segment.getElementsByTagName('stl19:ResBookDesigCode')[0]) === null || _j === void 0 ? void 0 : _j.textContent) || '';
        var equipment = ((_k = segment.getElementsByTagName('stl19:Equipment')[0]) === null || _k === void 0 ? void 0 : _k.textContent) || '';
        // Извлекаем только дату из DepartureDateTime
        var departureDate = '';
        if (departureDateTime.includes('T')) {
            departureDate = departureDateTime.split('T')[0];
        }
        segments.push({
            label: origin_1 + " \u2192 " + destination + " (" + marketingCarrier + marketingFlightNumber + ")",
            value: id,
            origin: origin_1,
            destination: destination,
            departureDate: departureDate,
            marketingCarrier: marketingCarrier,
            marketingFlightNumber: marketingFlightNumber,
            bookingClass: bookingClass,
            equipment: equipment
        });
    }
    return { passengers: passengers, segments: segments };
};
exports.parsePnrData = parsePnrData;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/parcePnrData.js", ["com-sabre-redapp-fundamentals-web-module/components/parcePnrData"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/parcePnrData"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/parseSeatMapResponse", [], false, function (require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSeatMapResponse = void 0;
/**
 * Парсит ответ от EnhancedSeatMapRS и возвращает структуру карты салона.
 */
function parseSeatMapResponse(xmlDocument) {
    console.log('📥 Начинаем разбор ответа EnhancedSeatMapRS');
    var layout = {
        decks: [],
    };
    var availability = [];
    var passengers = [];
    // 1. Находим все кабины (Cabin)
    var cabinNodes = xmlDocument.getElementsByTagName('Cabin');
    for (var i = 0; i < cabinNodes.length; i++) {
        var cabinNode = cabinNodes[i];
        var rows = [];
        var rowNodes = cabinNode.getElementsByTagName('Row');
        for (var j = 0; j < rowNodes.length; j++) {
            var rowNode = rowNodes[j];
            var rowLabel = rowNode.getAttribute('number') || (j + 1).toString();
            var seatNodes = rowNode.getElementsByTagName('Seat');
            var seats = [];
            for (var k = 0; k < seatNodes.length; k++) {
                var seatNode = seatNodes[k];
                var seatLabel = seatNode.getAttribute('number') || '';
                var x = 50 + k * 50; // Простейшее позиционирование по X
                var y = 50 + j * 50; // Простейшее позиционирование по Y
                seats.push({ label: seatLabel, x: x, y: y });
            }
            rows.push({ label: rowLabel, seats: seats });
        }
        layout.decks.push({
            id: "deck-" + i,
            name: "Deck " + (i + 1),
            width: 600,
            height: 800,
            rows: rows,
        });
    }
    // 2. Находим предложения (Offers → места, доступные для покупки)
    var offerNodes = xmlDocument.getElementsByTagName('Offer');
    for (var i = 0; i < offerNodes.length; i++) {
        var offerNode = offerNodes[i];
        var seatNumber = offerNode.getAttribute('seatNumber');
        var priceNode = offerNode.querySelector('Price > TotalAmount');
        var price = (priceNode === null || priceNode === void 0 ? void 0 : priceNode.textContent) || '0';
        var currency = (priceNode === null || priceNode === void 0 ? void 0 : priceNode.getAttribute('currencyCode')) || 'USD';
        availability.push({
            label: seatNumber,
            price: parseFloat(price),
            currency: currency,
        });
    }
    // 3. Пассажиры (упрощённо, можно позже доработать)
    passengers.push({ id: 'PAX1', name: 'Passenger 1', type: 'ADT' });
    console.log('✅ Разобранные данные:', { layout: layout, availability: availability, passengers: passengers });
    return { layout: layout, availability: availability, passengers: passengers };
}
exports.parseSeatMapResponse = parseSeatMapResponse;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/parseSeatMapResponse.js", ["com-sabre-redapp-fundamentals-web-module/components/parseSeatMapResponse"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/parseSeatMapResponse"))});
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
// файл: SeatMapComponent.tsx
var React = require("react");
var SeatMapComponent = /** @class */ (function (_super) {
    __extends(SeatMapComponent, _super);
    function SeatMapComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.iframeRef = React.createRef();
        _this.handleLoadSeatMap = function () {
            // 🚀 Вместо запроса - тестовый layout
            var dummyLayout = {
                decks: [
                    {
                        id: 'main-deck',
                        name: 'Deck 1',
                        width: 600,
                        height: 400,
                        rows: [
                            { label: '1', seats: [{ label: 'A', x: 50, y: 50 }, { label: 'B', x: 100, y: 50 }] },
                            { label: '2', seats: [{ label: 'A', x: 50, y: 100 }] }
                        ]
                    }
                ]
            };
            _this.setState({ layout: dummyLayout }, function () {
                console.log('✅ Dummy layout set. Sending to iframe...');
                _this.sendSeatMapData();
            });
        };
        _this.sendSeatMapData = function () {
            var iframe = _this.iframeRef.current;
            if (!(iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow)) {
                console.warn('⚠️ iframe not ready');
                return;
            }
            var seatMapData = {
                config: {},
                flight: {
                    id: 'f1',
                    airlineCode: 'EK',
                    flightNo: '50',
                    departureDate: '2025-05-30',
                    departure: 'MUC',
                    arrival: 'DXB',
                    cabinClass: 'Y'
                },
                layout: _this.state.layout
            };
            iframe.contentWindow.postMessage({
                type: 'seatMaps',
                config: JSON.stringify(seatMapData.config),
                flight: JSON.stringify(seatMapData.flight),
                layout: JSON.stringify(seatMapData.layout)
            }, '*');
            console.log('📤 Sent seatMapData to iframe:', seatMapData);
        };
        _this.state = {
            layout: null
        };
        return _this;
    }
    SeatMapComponent.prototype.render = function () {
        var _a = this.props, passengerIds = _a.passengerIds, segmentId = _a.segmentId;
        var layout = this.state.layout;
        return (React.createElement("div", { style: { padding: '20px', backgroundColor: '#fff', minHeight: '400px' } },
            React.createElement("h2", null, "Seat Map"),
            React.createElement("p", null,
                React.createElement("strong", null, "Flight Segment:"),
                " ",
                segmentId),
            React.createElement("p", null,
                React.createElement("strong", null, "Selected Passengers:")),
            React.createElement("ul", null, passengerIds.map(function (passengerId, index) { return (React.createElement("li", { key: index }, passengerId)); })),
            React.createElement("hr", null),
            !layout ? (React.createElement("div", { style: {
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#eef',
                    borderRadius: '8px',
                    textAlign: 'center'
                } },
                React.createElement("p", null,
                    React.createElement("em", null, "Seat map visualization coming soon+++")),
                React.createElement("button", { className: "btn btn-primary", onClick: this.handleLoadSeatMap }, "\uD83D\uDE80 Load Dummy Seat Map"))) : (React.createElement("iframe", { ref: this.iframeRef, src: "https://quicket.io/react-proxy-app/", width: "100%", height: "800", style: { border: '1px solid #ccc', marginTop: '20px' }, title: "SeatMapIframe", onLoad: this.sendSeatMapData }))));
    };
    return SeatMapComponent;
}(React.Component));
exports.SeatMapComponent = SeatMapComponent;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponent"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPnr", ["react","react"], false, function (require, exports, module) {
"use strict";
// файл: SeatMapComponentPnr.tsx
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var SeatMapComponentPnr = function (_a) {
    var layout = _a.layout, config = _a.config;
    var iframeRef = (0, react_1.useRef)(null);
    var flight = {
        id: '001',
        airlineCode: 'EK',
        flightNo: '50',
        departureDate: '2025-05-30',
        departure: 'MUC',
        arrival: 'DXB',
        cabinClass: 'Y'
    };
    var sendToIframe = function () {
        var iframe = iframeRef.current;
        if (!(iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow)) {
            console.warn('⚠️ iframe or contentWindow not available');
            return;
        }
        var message = {
            type: 'seatMaps',
            config: JSON.stringify(config),
            flight: JSON.stringify(flight),
            layout: JSON.stringify(layout),
            // availability и passengers пока не передаем
        };
        console.log('📤 [SeatMapComponentPnr] sending to iframe:', message);
        iframe.contentWindow.postMessage(message, '*');
    };
    (0, react_1.useEffect)(function () {
        console.log('🛠️ [SeatMapComponentPnr] mounted, sending seat map data to iframe');
        sendToIframe();
    }, [layout]);
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("h2", null, "\uD83D\uDEEB Seat Map from PNR"),
        React.createElement("iframe", { ref: iframeRef, src: "https://quicket.io/react-proxy-app/", width: "100%", height: "800", style: { border: '1px solid #ccc' }, title: "SeatMapIframe", onLoad: function () {
                console.log('✅ [SeatMapComponentPnr] iframe loaded, sending seat map data...');
                sendToIframe();
            } })));
};
exports.default = SeatMapComponentPnr;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPnr.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPnr"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapComponentPnr"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover", ["react","react-bootstrap","sabre-ngv-UIComponents/advancedDropdown/components/SimpleDropdown","com-sabre-redapp-fundamentals-web-module/components/loadPnrDetailsFromSabre","com-sabre-redapp-fundamentals-web-module/components/loadSeatMapFromSabre","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/utils/XmlViewer"], false, function (require, exports, module) {
"use strict";
// файл: SeatMapsPopover.tsx
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
var loadSeatMapFromSabre_1 = require("./loadSeatMapFromSabre");
var Context_1 = require("../Context");
var PublicModalService_1 = require("sabre-ngv-modals/services/PublicModalService");
var XmlViewer_1 = require("../utils/XmlViewer");
var SeatMapsPopover = /** @class */ (function (_super) {
    __extends(SeatMapsPopover, _super);
    function SeatMapsPopover(props) {
        var _this = _super.call(this, props) || this;
        _this.cabinClasses = [
            { label: 'Economy (Y)', value: 'Economy' },
            { label: 'Premium Economy (W)', value: 'PremiumEconomy' },
            { label: 'Business (J)', value: 'Business' },
            { label: 'First (F)', value: 'First' }
        ];
        _this.handlePassengerChange = function (passengerValue) {
            _this.setState(function (prevState) { return ({
                selectedPassengers: prevState.selectedPassengers.includes(passengerValue)
                    ? prevState.selectedPassengers.filter(function (p) { return p !== passengerValue; })
                    : __spreadArray(__spreadArray([], prevState.selectedPassengers, true), [passengerValue], false)
            }); });
        };
        _this.handleSegmentChange = function (options) {
            var selected = options.find(function (opt) { return opt.checked; });
            if (selected) {
                var fullData = _this.state.segments.find(function (seg) { return seg.value === selected.value; }) || null;
                _this.setState({ selectedSegment: selected.value, selectedSegmentFullData: fullData });
            }
        };
        _this.handleCabinClassChange = function (options) {
            var selected = options.find(function (opt) { return opt.checked; });
            if (selected)
                _this.setState({ selectedCabinClass: selected.value });
        };
        _this.handleMarketingCarrierChange = function (event) {
            _this.setState({
                selectedMarketingCarrier: event.target.value,
                customMarketingCarrier: event.target.value === 'Other' ? '' : ''
            });
        };
        _this.handleCustomMarketingCarrierChange = function (event) {
            _this.setState({ customMarketingCarrier: event.target.value.toUpperCase() });
        };
        _this.loadSeatMap = function (_a) {
            var availabilityInfo = _a.availabilityInfo, _b = _a.silent, silent = _b === void 0 ? false : _b;
            return __awaiter(_this, void 0, void 0, function () {
                var _c, selectedPassengers, selectedSegment, selectedCabinClass, selectedMarketingCarrier, customMarketingCarrier, segments, passengers, selectedSegmentData, marketingCarrierFinal, flightSegment, mappedPassengers;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _c = this.state, selectedPassengers = _c.selectedPassengers, selectedSegment = _c.selectedSegment, selectedCabinClass = _c.selectedCabinClass, selectedMarketingCarrier = _c.selectedMarketingCarrier, customMarketingCarrier = _c.customMarketingCarrier, segments = _c.segments, passengers = _c.passengers;
                            selectedSegmentData = segments.find(function (seg) { return seg.value === selectedSegment; });
                            if (!selectedSegmentData)
                                return [2 /*return*/, console.error('❌ No segment data found.')];
                            marketingCarrierFinal = selectedMarketingCarrier === 'Other' ? customMarketingCarrier : selectedMarketingCarrier;
                            flightSegment = {
                                id: selectedSegment,
                                origin: selectedSegmentData.origin,
                                destination: selectedSegmentData.destination,
                                departureDate: selectedSegmentData.departureDate,
                                marketingCarrier: marketingCarrierFinal,
                                marketingFlightNumber: selectedSegmentData.marketingFlightNumber,
                                flightNumber: selectedSegmentData.marketingFlightNumber,
                                bookingClass: selectedSegmentData.bookingClass,
                                equipment: selectedSegmentData.equipment,
                                cabin: selectedCabinClass
                            };
                            mappedPassengers = passengers.filter(function (p) { return selectedPassengers.includes(p.value); }).map(function (p) { return ({
                                id: p.value,
                                travellerId: Number(p.value),
                                givenName: p.givenName,
                                surname: p.surname
                            }); });
                            return [4 /*yield*/, (0, loadSeatMapFromSabre_1.loadSeatMapFromSabre)(flightSegment, mappedPassengers, function (response) {
                                    var prettyXml = new XMLSerializer().serializeToString(response);
                                    _this.setState({ lastXmlResponse: prettyXml });
                                    if (!silent) {
                                        (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal({
                                            header: availabilityInfo ? '🛫 Seat Map (Occupied)' : '🛫 Seat Map (Empty)',
                                            component: React.createElement(XmlViewer_1.XmlViewer, { xml: prettyXml }), modalClassName: 'seatmap-xml-modal'
                                        });
                                    }
                                })];
                        case 1:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.handleShowRawXml = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.state.lastXmlResponse) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadSeatMap({ availabilityInfo: false, silent: true })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        (0, Context_1.getService)(PublicModalService_1.PublicModalsService).showReactModal({
                            header: '📄 Last EnhancedSeatMapRS XML',
                            component: React.createElement(XmlViewer_1.XmlViewer, { xml: this.state.lastXmlResponse || '' }),
                            modalClassName: 'seatmap-xml-modal'
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            selectedPassengers: [],
            selectedSegment: '',
            selectedSegmentFullData: null,
            selectedCabinClass: 'Economy',
            selectedMarketingCarrier: 'LH',
            customMarketingCarrier: '',
            passengers: [],
            segments: [],
            lastXmlResponse: null
        };
        return _this;
    }
    SeatMapsPopover.prototype.componentDidMount = function () {
        var _this = this;
        (0, loadPnrDetailsFromSabre_1.loadPnrDetailsFromSabre)(function (data) {
            var selectedSegment = '';
            var selectedSegmentFullData = null;
            if (data.segments.length === 1) {
                selectedSegment = data.segments[0].value;
                selectedSegmentFullData = data.segments[0];
            }
            var selectedMarketingCarrier = 'LH';
            var customMarketingCarrier = '';
            if (data.segments.length > 0) {
                var marketingCarrier = data.segments[0].marketingCarrier.trim().toUpperCase();
                if (marketingCarrier === 'LH' || marketingCarrier === 'EK') {
                    selectedMarketingCarrier = marketingCarrier;
                }
                else if (marketingCarrier) {
                    selectedMarketingCarrier = 'Other';
                    customMarketingCarrier = marketingCarrier;
                }
            }
            _this.setState({
                passengers: data.passengers.map(function (p) { return (__assign(__assign({}, p), { checked: true })); }),
                selectedPassengers: data.passengers.map(function (p) { return p.value; }),
                segments: data.segments,
                selectedSegment: selectedSegment,
                selectedSegmentFullData: selectedSegmentFullData,
                lastXmlResponse: null,
                selectedMarketingCarrier: selectedMarketingCarrier,
                customMarketingCarrier: customMarketingCarrier
            });
        });
    };
    SeatMapsPopover.prototype.render = function () {
        var _this = this;
        var _a = this.state, passengers = _a.passengers, segments = _a.segments, selectedPassengers = _a.selectedPassengers, selectedSegment = _a.selectedSegment, selectedCabinClass = _a.selectedCabinClass, selectedMarketingCarrier = _a.selectedMarketingCarrier, customMarketingCarrier = _a.customMarketingCarrier;
        var isButtonDisabled = selectedPassengers.length === 0 || !selectedSegment;
        var selectedSegmentData = segments.find(function (seg) { return seg.value === selectedSegment; });
        return (React.createElement("div", { style: { padding: '20px', minWidth: '400px', backgroundColor: '#fff' } },
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null,
                    "Select Passengers (",
                    selectedPassengers.length,
                    ")"),
                React.createElement("div", { style: { marginTop: '10px' } }, passengers.map(function (passenger) { return (React.createElement("div", { key: passenger.value, style: { display: 'flex', alignItems: 'center', marginBottom: '5px' } },
                    React.createElement("input", { type: "checkbox", checked: selectedPassengers.includes(passenger.value), onChange: function () { return _this.handlePassengerChange(passenger.value); }, style: { marginRight: '8px' } }),
                    React.createElement("span", null, passenger.label))); }))),
            this.state.selectedSegmentFullData && (React.createElement("div", { style: { marginBottom: '10px', fontWeight: 'bold', color: '#333' } },
                "\u2708\uFE0F ",
                this.state.selectedSegmentFullData.origin,
                " \u2192 ",
                this.state.selectedSegmentFullData.destination,
                "(",
                this.state.selectedSegmentFullData.marketingCarrier,
                this.state.selectedSegmentFullData.marketingFlightNumber,
                ")",
                React.createElement("br", null),
                "\uD83D\uDCC5 Departure: ",
                this.state.selectedSegmentFullData.departureDate)),
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null, "Select Flight Segment"),
                React.createElement(SimpleDropdown_1.SimpleDropdown, { options: segments.map(function (seg) { return (__assign(__assign({}, seg), { checked: seg.value === selectedSegment })); }), onChange: this.handleSegmentChange })),
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null, "Select Cabin Class"),
                React.createElement(SimpleDropdown_1.SimpleDropdown, { options: this.cabinClasses.map(function (opt) { return (__assign(__assign({}, opt), { checked: opt.value === selectedCabinClass })); }), onChange: this.handleCabinClassChange })),
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.ControlLabel, null, "Select Marketing Carrier"),
                React.createElement("select", { value: selectedMarketingCarrier, onChange: this.handleMarketingCarrierChange, className: "form-control" },
                    React.createElement("option", { value: "LH" }, "LH (Lufthansa)"),
                    React.createElement("option", { value: "EK" }, "EK (Emirates)"),
                    React.createElement("option", { value: "Other" }, "Other...")),
                selectedMarketingCarrier === 'Other' && (React.createElement("input", { type: "text", maxLength: 2, className: "form-control", placeholder: "e.g., AA, BA, AF", value: customMarketingCarrier, onChange: this.handleCustomMarketingCarrierChange }))),
            React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' } },
                React.createElement(react_bootstrap_1.Button, { className: "btn-info", disabled: isButtonDisabled, onClick: this.handleShowRawXml }, "\uD83D\uDCC4 Show Raw XML"),
                React.createElement("div", { style: { display: 'flex', gap: '10px' } },
                    React.createElement(react_bootstrap_1.Button, { className: "btn-primary", style: { flex: 1 }, disabled: isButtonDisabled, onClick: function () { return _this.loadSeatMap({ availabilityInfo: false }); } }, "\u2708\uFE0F Empty Seat Map"),
                    React.createElement(react_bootstrap_1.Button, { className: "btn-success", style: { flex: 1 }, disabled: isButtonDisabled, onClick: function () { return _this.loadSeatMap({ availabilityInfo: true }); } }, "\uD83D\uDC65 Occupied Seat Map")))));
    };
    return SeatMapsPopover;
}(React.Component));
exports.SeatMapsPopover = SeatMapsPopover;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopoverModalWrapper", ["react","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"], false, function (require, exports, module) {
"use strict";var __extends=this&&this.__extends||function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(t,o)};return function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function __(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(__.prototype=o.prototype,new __)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.SeatMapsPopoverModalWrapper=void 0;var React=require("react"),Context_1=require("../Context"),PublicModalService_1=require("sabre-ngv-modals/services/PublicModalService"),SeatMapsPopover_1=require("./SeatMapsPopover"),SeatMapsPopoverModalWrapper=function(e){function SeatMapsPopoverModalWrapper(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleClose=function(){(0,Context_1.getService)(PublicModalService_1.PublicModalsService).closeReactModal()},t}return __extends(SeatMapsPopoverModalWrapper,e),SeatMapsPopoverModalWrapper.prototype.render=function(){return React.createElement("div",{style:{backgroundColor:"#fff",borderRadius:"8px",minWidth:"400px",minHeight:"350px",display:"flex",flexDirection:"column",overflow:"hidden"}},React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px",borderBottom:"1px solid #ddd",backgroundColor:"#f5f5f5",fontSize:"18px",fontWeight:"bold"}},React.createElement("span",null,"Select Passengers and Segment"),React.createElement("button",{style:{background:"none",border:"none",fontSize:"18px",cursor:"pointer"},onClick:this.handleClose},"✖")),React.createElement("div",{style:{flex:1,padding:"20px",overflowY:"auto"}},React.createElement(SeatMapsPopover_1.SeatMapsPopover,null)),React.createElement("div",{style:{padding:"10px 20px",borderTop:"1px solid #ddd",display:"flex",justifyContent:"flex-end",backgroundColor:"#f5f5f5"}},React.createElement("button",{className:"btn btn-default",onClick:this.handleClose},"Close")))},SeatMapsPopoverModalWrapper}(React.Component);exports.SeatMapsPopoverModalWrapper=SeatMapsPopoverModalWrapper;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopoverModalWrapper.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopoverModalWrapper"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopoverModalWrapper"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsXMLViewer", ["react"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SeatMapXmlViewer=void 0;var React=require("react"),SeatMapXmlViewer=function(e){var t=e.xml,a=e.onClose,r=function(e){var t="",a=0;return(e=e.replace(/(>)(<)(\/*)/g,"$1\r\n$2$3")).split("\r\n").forEach(function(e){var r=0;e.match(/.+<\/\w[^>]*>$/)?r=0:e.match(/^<\/\w/)?0!==a&&(a-=1):r=e.match(/^<\w([^>]*[^/])?>.*$/)?1:0,t+="  ".repeat(a)+e+"\r\n",a+=r}),t.trim()};return React.createElement("div",{style:{backgroundColor:"#fff",padding:"20px",borderRadius:"8px",width:"80%",maxHeight:"80vh",overflowY:"auto",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.15)"}},React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},React.createElement("h2",null,"🛫 EnhancedSeatMapRS XML"),React.createElement("button",{onClick:function(){var e=new Blob([r(t)],{type:"application/xml"}),a=URL.createObjectURL(e),o=document.createElement("a");o.href=a,o.download="EnhancedSeatMapRS.xml",document.body.appendChild(o),o.click(),document.body.removeChild(o)},style:{padding:"8px 16px",borderRadius:"4px",backgroundColor:"#007bff",color:"#fff",border:"none"}},"📥 Download XML")),React.createElement("pre",{style:{backgroundColor:"#f5f5f5",padding:"15px",borderRadius:"8px",fontSize:"0.85rem",overflowX:"auto",whiteSpace:"pre-wrap",wordBreak:"break-word",marginTop:"20px"}},r(t)),React.createElement("div",{style:{textAlign:"right",marginTop:"20px"}},React.createElement("button",{className:"btn btn-secondary",onClick:a},"Close")))};exports.SeatMapXmlViewer=SeatMapXmlViewer;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/SeatMapsXMLViewer.js", ["com-sabre-redapp-fundamentals-web-module/components/SeatMapsXMLViewer"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/SeatMapsXMLViewer"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/XmlViewer", ["react"], false, function (require, exports, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.XmlViewer=void 0;var React=require("react"),formatXml=function(e){var t="",r=0;return(e=e.replace(/(>)(<)(\/*)/g,"$1\r\n$2$3")).split("\r\n").forEach(function(e){var a=0;e.match(/.+<\/\w[^>]*>$/)?a=0:e.match(/^<\/\w/)?0!==r&&(r-=1):a=e.match(/^<\w([^>]*[^/])?>.*$/)?1:0;var n="  ".repeat(r);t+=n+e+"\r\n",r+=a}),t.trim()},XmlViewer=function(e){var t=e.xml,r=formatXml(t);return React.createElement("div",{style:{padding:"20px",backgroundColor:"#fff",maxHeight:"80vh",overflowY:"auto"}},React.createElement("h3",null,"🛫 EnhancedSeatMapRS"),React.createElement("div",{style:{textAlign:"right",marginBottom:"10px"}},React.createElement("button",{onClick:function(){var e=new Blob([r],{type:"application/xml"}),t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download="EnhancedSeatMapRS.xml",a.click(),URL.revokeObjectURL(t)},className:"btn btn-primary"},"📥 Download XML")),React.createElement("pre",{style:{whiteSpace:"pre-wrap",wordBreak:"break-word",backgroundColor:"#f5f5f5",padding:"15px",borderRadius:"8px",fontSize:"0.85rem",overflowX:"auto"}},r))};exports.XmlViewer=XmlViewer;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/components/XmlViewer.js", ["com-sabre-redapp-fundamentals-web-module/components/XmlViewer"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/components/XmlViewer"))});
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
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/Main", ["react","sabre-ngv-core/modules/Module","com-sabre-redapp-fundamentals-web-module/Context","sabre-ngv-xp/services/ExtensionPointService","sabre-ngv-xp/configs/RedAppSidePanelConfig","sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton","sabre-ngv-core/services/LayerService","com-sabre-redapp-fundamentals-web-module/CreatePNR","com-sabre-redapp-fundamentals-web-module/components/createPnrForTwoPassengers","sabre-ngv-modals/services/PublicModalService","com-sabre-redapp-fundamentals-web-module/components/SeatMapsPopover"], false, function (require, exports, module) {
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
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/XmlViewer", ["react"], false, function (require, exports, module) {
"use strict";
// файл: XmlViewer.tsx
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlViewer = void 0;
var React = require("react");
var formatXml = function (xml) {
    var PADDING = '  ';
    var reg = /(>)(<)(\/*)/g;
    var formatted = '';
    var pad = 0;
    xml = xml.replace(reg, '$1\r\n$2$3');
    xml.split('\r\n').forEach(function (node) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        }
        else if (node.match(/^<\/\w/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        }
        else if (node.match(/^<\w([^>]*[^/])?>.*$/)) {
            indent = 1;
        }
        else {
            indent = 0;
        }
        var padding = PADDING.repeat(pad);
        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted.trim();
};
var XmlViewer = function (_a) {
    var xml = _a.xml;
    var formattedXml = formatXml(xml);
    var downloadXml = function () {
        var blob = new Blob([formattedXml], { type: 'application/xml' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'EnhancedSeatMapRS.xml';
        a.click();
        URL.revokeObjectURL(url);
    };
    return (React.createElement("div", { style: { padding: '20px', backgroundColor: '#fff', maxHeight: '80vh', overflowY: 'auto' } },
        React.createElement("h3", null, "\uD83D\uDEEB EnhancedSeatMapRS"),
        React.createElement("div", { style: { textAlign: 'right', marginBottom: '10px' } },
            React.createElement("button", { onClick: downloadXml, className: "btn btn-primary" }, "\uD83D\uDCE5 Download XML")),
        React.createElement("pre", { style: {
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                overflowX: 'auto'
            } }, formattedXml)));
};
exports.XmlViewer = XmlViewer;


});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module/utils/XmlViewer.js", ["com-sabre-redapp-fundamentals-web-module/utils/XmlViewer"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/utils/XmlViewer"))});
System.registerDynamic("com-sabre-redapp-fundamentals-web-module", ["com-sabre-redapp-fundamentals-web-module/index"], false, function (require, exports) {Object.assign(exports, require("com-sabre-redapp-fundamentals-web-module/index"))});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb2RlL2NvbXBvbmVudHMvY3JlYXRlUG5yRm9yVHdvUGFzc2VuZ2Vycy50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9SZWRBcHAtU2VhdE1hcHMgQUJDIDM2MC9jb2RlL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1mdW5kYW1lbnRhbHMtd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9jcmVhdGVQbnJNdWNEeGJGb3JtLmpzIiwic3JjL2NvZGUvY29tcG9uZW50cy9sb2FkUG5yRGV0YWlsc0Zyb21TYWJyZS50cyIsIi9Vc2Vycy9sZW9uaWRrL0RldmVsb3Blci9SZWRBcHAtU2VhdE1hcHMgQUJDIDM2MC9jb2RlL3dlYi1zcmMvY29tLXNhYnJlLXJlZGFwcC1mdW5kYW1lbnRhbHMtd2ViLW1vZHVsZS9idWlsZC9wcm9kL21ldGEvc3JjL2NvZGUvY29tcG9uZW50cy9sb2FkUG5yVXNpbmdUcmF2ZWxJdGluZXJhcnlSZWFkUlEuanMiLCJzcmMvY29kZS9jb21wb25lbnRzL2xvYWRTZWF0TWFwRnJvbVNhYnJlLnRzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1JlZEFwcC1TZWF0TWFwcyBBQkMgMzYwL2NvZGUvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWZ1bmRhbWVudGFscy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL29wZW5TZWF0TWFwc1BvcG92ZXJNb2RhbC5qcyIsInNyYy9jb2RlL2NvbXBvbmVudHMvcGFyY2VQbnJEYXRhLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9wYXJzZVNlYXRNYXBSZXNwb25zZS50cyIsInNyYy9jb2RlL2NvbXBvbmVudHMvcmVnaXN0ZXJDb21tYW5kSGVscGVyQnV0dG9uLnRzIiwic3JjL2NvZGUvY29tcG9uZW50cy9TZWF0TWFwQ29tcG9uZW50LnRzeCIsInNyYy9jb2RlL2NvbXBvbmVudHMvU2VhdE1hcENvbXBvbmVudFBuci50c3giLCJzcmMvY29kZS9jb21wb25lbnRzL1NlYXRNYXBzUG9wb3Zlci50c3giLCIvVXNlcnMvbGVvbmlkay9EZXZlbG9wZXIvUmVkQXBwLVNlYXRNYXBzIEFCQyAzNjAvY29kZS93ZWItc3JjL2NvbS1zYWJyZS1yZWRhcHAtZnVuZGFtZW50YWxzLXdlYi1tb2R1bGUvYnVpbGQvcHJvZC9tZXRhL3NyYy9jb2RlL2NvbXBvbmVudHMvU2VhdE1hcHNQb3BvdmVyTW9kYWxXcmFwcGVyLmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1JlZEFwcC1TZWF0TWFwcyBBQkMgMzYwL2NvZGUvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWZ1bmRhbWVudGFscy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL1NlYXRNYXBzWE1MVmlld2VyLmpzIiwiL1VzZXJzL2xlb25pZGsvRGV2ZWxvcGVyL1JlZEFwcC1TZWF0TWFwcyBBQkMgMzYwL2NvZGUvd2ViLXNyYy9jb20tc2FicmUtcmVkYXBwLWZ1bmRhbWVudGFscy13ZWItbW9kdWxlL2J1aWxkL3Byb2QvbWV0YS9zcmMvY29kZS9jb21wb25lbnRzL1htbFZpZXdlci5qcyIsInNyYy9jb2RlL0NvbnRleHQudHMiLCJzcmMvY29kZS9DcmVhdGVQTlIudHN4Iiwic3JjL2NvZGUvaW5kZXgudHMiLCJzcmMvY29kZS9NYWluLnRzIiwic3JjL2NvZGUvdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgudHMiLCJzcmMvY29kZS91dGlscy9YbWxWaWV3ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyRkFBd0Y7QUFHeEYsNkVBQTBFO0FBRTFFLDJGQUF3RjtBQUN4RiwyRkFBd0Y7QUFFeEYsc0NBQXNDO0FBQ3RDLDRFQUF5RTtBQUVsRSxJQUFNLHlCQUF5QixHQUFHOzs7OztnQkFDL0IsZUFBZSxHQUFHLElBQUEsb0JBQVUsRUFBQywy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QUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FBQyxRQUFRLEdBQUcsdUJBQXVCLENBQUM7UUFDckMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRVYsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRixPQUFPLENBQ0gsNkJBQUssS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtRQUMxRixpRUFBNkI7UUFDN0IsNkJBQUssS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFO1lBQ3BELGdDQUFRLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLGlCQUFpQixnQ0FFaEQsQ0FDUDtRQUNOLDZCQUFLLEtBQUssRUFBRTtnQkFDUixVQUFVLEVBQUUsVUFBVTtnQkFDdEIsU0FBUyxFQUFFLFlBQVk7Z0JBQ3ZCLGVBQWUsRUFBRSxTQUFTO2dCQUMxQixPQUFPLEVBQUUsTUFBTTtnQkFDZixZQUFZLEVBQUUsS0FBSztnQkFDbkIsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFNBQVMsRUFBRSxNQUFNO2FBQ3BCLElBQ0ksWUFBWSxDQUNYLENBQ0osQ0FDVCxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBcENXLFFBQUEsU0FBUyxhQW9DcEIiLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDdXN0b21Gb3JtfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtJztcbmltcG9ydCB7SUN1c3RvbUZvcm1zU2VydmljZX0gZnJvbSAnc2FicmUtbmd2LWN1c3RvbS1mb3Jtcy9zZXJ2aWNlcy9JQ3VzdG9tRm9ybXNTZXJ2aWNlJztcbmltcG9ydCB7Q3VzdG9tRm9ybVJzfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL2ludGVyZmFjZXMvZm9ybS9DdXN0b21Gb3JtUnMnO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL2ZpZWxkcy9UZXh0RmllbGQnO1xuaW1wb3J0IHtEYXRlc1NlcnZpY2V9IGZyb20gJ3NhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvRGF0ZXNTZXJ2aWNlJztcbmltcG9ydCB7Q29tbWFuZE1lc3NhZ2VCYXNpY1JzfSBmcm9tICdzYWJyZS1uZ3YtcG9zLWNkbS9jb21tc2cnO1xuaW1wb3J0IHtJQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY29tbXNnL3NlcnZpY2VzL0lDb21tYW5kTWVzc2FnZVNlcnZpY2UnO1xuaW1wb3J0IHtJbnRlcnN0aXRpYWxTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0ludGVyc3RpdGlhbFNlcnZpY2UnO1xuXG5pbXBvcnQge2dldFNlcnZpY2V9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHtvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaH0gZnJvbSAnLi4vdXRpbHMvb3BlbkN1c3RvbUZvcm1QYXJhZ3JhcGgnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUG5yRm9yVHdvUGFzc2VuZ2VycyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB0d2VudHlEYXlzQWhlYWQgPSBnZXRTZXJ2aWNlKERhdGVzU2VydmljZSkuZ2V0Tm93KCkuYWRkKDIwLCAnZGF5cycpLmZvcm1hdCgnRERNTU0nKS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IGZsaWdodENvbW1hbmQgPSBgMUVLNTBZJHt0d2VudHlEYXlzQWhlYWR9TVVDRFhCL1NTMmA7IC8vIDhBP0AwMjs1PT46IE1VQywgPTUgRlJBXG5cbiAgICBjb25zdCBmb3JtOiBDdXN0b21Gb3JtID0ge1xuICAgICAgICB0aXRsZTogJ0NyZWF0ZSBQTlInLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ25hbWUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnLUtMRUlNQU5OL0xFT05JRE1SXFxuLUtMRUlNQU5OL0dBTElOQU1SUydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmbGlnaHQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmbGlnaHRDb21tYW5kXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAndGlja2V0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzAxWTInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnYWdlbnQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQWdlbnQgSW5mbycsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc2QUdFTlQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAncGhvbmUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnOTEyMzQ1Njc4OTAwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3RpbWVMaW1pdCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdUaWNrZXRpbmcgdGltZSBsaW1pdCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc3VEFXLydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NhbmNlbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdvaycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTdWJtaXQnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0OiBDdXN0b21Gb3JtUnMgPSBhd2FpdCBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xuICAgIGlmIChyZXN1bHQuYWN0aW9uID09PSAnb2snKSB7XG4gICAgICAgIHNlbGZTdWJtaXRQbnJBY3Rpb24ocmVzdWx0KTtcbiAgICB9XG59XG5cbmNvbnN0IHNlbGZTdWJtaXRQbnJBY3Rpb24gPSBhc3luYyAoZm9ybTogQ3VzdG9tRm9ybSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGludGVyc3RpdGlhbFNlcnZpY2UgPSBnZXRTZXJ2aWNlKEludGVyc3RpdGlhbFNlcnZpY2UpO1xuXG4gICAgY29uc3QgbmFtZVJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ25hbWUnKSBhcyBUZXh0RmllbGQpLnZhbHVlO1xuICAgIGNvbnN0IGZsaWdodFJxOiBzdHJpbmcgPSAoZm9ybS5maWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2ZsaWdodCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGlja2V0UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGlja2V0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcbiAgICBjb25zdCBhZ2VudEluZm9ScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdhZ2VudCcpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgcGhvbmVScTogc3RyaW5nID0gKGZvcm0uZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaWQgPT09ICdwaG9uZScpIGFzIFRleHRGaWVsZCkudmFsdWU7XG4gICAgY29uc3QgdGF3UnE6IHN0cmluZyA9IChmb3JtLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAndGltZUxpbWl0JykgYXMgVGV4dEZpZWxkKS52YWx1ZTtcblxuICAgIGludGVyc3RpdGlhbFNlcnZpY2Uuc2hvd0ludGVyc3RpdGlhbCgxNTAwMCk7XG5cbiAgICBjb25zdCBuYW1lUnNTdGF0dXMgPSBhd2FpdCBzZW5kQ29tbWFuZChuYW1lUnEsICdOYW1lJyk7XG4gICAgY29uc3QgZmxpZ2h0c1N0YXR1cyA9IG5hbWVSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChmbGlnaHRScSwgJ0ZsaWdodCBsaXN0Jyk7XG4gICAgY29uc3QgdGlja2V0UnNTdGF0dXMgPSBmbGlnaHRzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRpY2tldFJxLCAnVGlja2V0Jyk7XG4gICAgY29uc3QgYWdlbnRJbmZvUnNTdGF0dXMgPSB0aWNrZXRSc1N0YXR1cyAmJiBhd2FpdCBzZW5kQ29tbWFuZChhZ2VudEluZm9ScSwgJ0FnZW50IEluZm8nKTtcbiAgICBjb25zdCBwaG9uZVJzU3RhdHVzID0gYWdlbnRJbmZvUnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQocGhvbmVScSwgJ1Bob25lJyk7XG4gICAgY29uc3QgdGF3UnNTdGF0dXMgPSBwaG9uZVJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKHRhd1JxLCAnVEFXJyk7XG4gICAgY29uc3QgcmVjZWl2ZWRGcm9tU3RhdHVzID0gdGF3UnNTdGF0dXMgJiYgYXdhaXQgc2VuZENvbW1hbmQoJzZMRU9OSUQnLCAnUmVjZWl2ZWQgRnJvbScpOyAvLyA0PjEwMjg7IEFONDBcbiAgICBjb25zdCB3cFJzU3RhdHVzID0gcmVjZWl2ZWRGcm9tU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKCdXUCcsICdXUCcpO1xuICAgIGNvbnN0IHBxUnNTdGF0dXMgPSB3cFJzU3RhdHVzICYmIGF3YWl0IHNlbmRDb21tYW5kKCdQUScsICdQUScpO1xuXG4gICAgaW50ZXJzdGl0aWFsU2VydmljZS5oaWRlSW50ZXJzdGl0aWFsKCk7XG4gICAgcHFSc1N0YXR1cyAmJiBvcGVuQ3VzdG9tRm9ybVBhcmFncmFwaCgnQ3JlYXRlIFBOUicsICdQTlIgY3JlYXRlZCcpO1xufVxuXG5jb25zdCBzZW5kQ29tbWFuZCA9IGFzeW5jIChjb21tYW5kOiBzdHJpbmcsIGZhaWx1cmVTZWdtZW50OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICBjb25zdCByc1N0YXR1czogQ29tbWFuZE1lc3NhZ2VCYXNpY1JzID0gYXdhaXQgZ2V0U2VydmljZShJQ29tbWFuZE1lc3NhZ2VTZXJ2aWNlKS5zZW5kKGNvbW1hbmQpO1xuICAgIGxldCBpc1N1Y2Nlc3M6IGJvb2xlYW4gPSByc1N0YXR1cy5TdGF0dXMuU3VjY2VzcztcblxuICAgIGlmIChpc1N1Y2Nlc3MgJiYgcnNTdGF0dXMuU3RhdHVzLk1lc3NhZ2VzWzBdICYmIHJzU3RhdHVzLlN0YXR1cy5NZXNzYWdlc1swXS5UZXh0LmluY2x1ZGVzKCdTSUdOIElOJykpIHtcbiAgICAgICAgaXNTdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIGhhbmRsZUZhaWx1cmUoJ0NvbW1hbmQgZmFpbGVkLCBub3Qgc2lnbmVkIGluLicpO1xuICAgIH0gZWxzZSBpZiAoIWlzU3VjY2Vzcykge1xuICAgICAgICBoYW5kbGVGYWlsdXJlKGZhaWx1cmVTZWdtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNTdWNjZXNzO1xufVxuXG5jb25zdCBoYW5kbGVGYWlsdXJlID0gKHNlZ21lbnQ6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoKCdDcmVhdGUgUE5SJywgYCR7c2VnbWVudH0gY3JlYXRpb24gZmFpbGVkYCk7XG59IixudWxsLCIvLyBEMDk7OiBsb2FkUG5yRGV0YWlsc0Zyb21TYWJyZS50c1xuXG5pbXBvcnQgeyBnZXRTZXJ2aWNlIH0gZnJvbSAnLi4vQ29udGV4dCc7XG5pbXBvcnQgeyBJU29hcEFwaVNlcnZpY2UgfSBmcm9tICdzYWJyZS1uZ3YtY29tbXVuaWNhdGlvbi9pbnRlcmZhY2VzL0lTb2FwQXBpU2VydmljZSc7XG5pbXBvcnQgeyBQbnJQdWJsaWNTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LWFwcC9hcHAvc2VydmljZXMvaW1wbC9QbnJQdWJsaWNTZXJ2aWNlJztcbmltcG9ydCB7IHBhcnNlUG5yRGF0YSwgUG5yRGF0YSB9IGZyb20gJy4vcGFyY2VQbnJEYXRhJztcblxuZXhwb3J0IGNvbnN0IGxvYWRQbnJEZXRhaWxzRnJvbVNhYnJlID0gYXN5bmMgKG9uRGF0YUxvYWRlZDogKGRhdGE6IFBuckRhdGEpID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwbnJTZXJ2aWNlID0gZ2V0U2VydmljZShQbnJQdWJsaWNTZXJ2aWNlKTtcbiAgICAgICAgY29uc3Qgc29hcEFwaVNlcnZpY2UgPSBnZXRTZXJ2aWNlKElTb2FwQXBpU2VydmljZSk7XG5cbiAgICAgICAgY29uc3QgcmVjb3JkTG9jYXRvciA9IHBuclNlcnZpY2UuZ2V0UmVjb3JkTG9jYXRvcigpO1xuXG4gICAgICAgIGlmICghcmVjb3JkTG9jYXRvcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdObyBhY3RpdmUgUE5SLiBQbGVhc2UgY3JlYXRlIG9yIHJldHJpZXZlIGEgUE5SIGZpcnN0LicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ1JlY29yZCBMb2NhdG9yOicsIHJlY29yZExvY2F0b3IpO1xuXG4gICAgICAgIGNvbnN0IHNvYXBQYXlsb2FkID0gYFxuICAgICAgICAgICAgPG5zNjpHZXRSZXNlcnZhdGlvblJRIHhtbG5zOm5zNj1cImh0dHA6Ly93ZWJzZXJ2aWNlcy5zYWJyZS5jb20vcG5yYnVpbGRlci92MV8xOVwiIFZlcnNpb249XCIxLjE5LjIyXCI+XG4gICAgICAgICAgICAgICAgPG5zNjpSZXF1ZXN0VHlwZT5TdGF0ZWZ1bDwvbnM2OlJlcXVlc3RUeXBlPlxuICAgICAgICAgICAgICAgIDxuczY6UmV0dXJuT3B0aW9ucyB4bWxuczp4c2k9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZVwiIHhzaTp0eXBlPVwibnM2OlJldHVybk9wdGlvbnNcIiBVbm1hc2tDcmVkaXRDYXJkPVwiZmFsc2VcIiBTaG93VGlja2V0U3RhdHVzPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bnM2OlZpZXdOYW1lPkZ1bGw8L25zNjpWaWV3TmFtZT5cbiAgICAgICAgICAgICAgICAgICAgPG5zNjpSZXNwb25zZUZvcm1hdD5TVEw8L25zNjpSZXNwb25zZUZvcm1hdD5cbiAgICAgICAgICAgICAgICA8L25zNjpSZXR1cm5PcHRpb25zPlxuICAgICAgICAgICAgPC9uczY6R2V0UmVzZXJ2YXRpb25SUT5cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNvYXBBcGlTZXJ2aWNlLmNhbGxTd3Moe1xuICAgICAgICAgICAgYWN0aW9uOiAnR2V0UmVzZXJ2YXRpb25SUScsXG4gICAgICAgICAgICBwYXlsb2FkOiBzb2FwUGF5bG9hZCxcbiAgICAgICAgICAgIGF1dGhUb2tlblR5cGU6ICdTRVNTSU9OJ1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZygnR2V0UmVzZXJ2YXRpb25SUSBSZXNwb25zZTonLCByZXNwb25zZSk7XG5cbiAgICAgICAgY29uc3QgcGFyc2VkRGF0YSA9IHBhcnNlUG5yRGF0YShyZXNwb25zZS5nZXRQYXJzZWRWYWx1ZSgpKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnPukgUGFyc2VkIFBOUiBEYXRhOicsIEpTT04uc3RyaW5naWZ5KHBhcnNlZERhdGEsIG51bGwsIDIpKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1NlZ21lbnRzOicsIHBhcnNlZERhdGEuc2VnbWVudHMpO1xuXG4gICAgICAgIC8vIBI+QiA3NDVBTCAySzdLMjA1PCA6PjsxTTosID81QDU0MDIwTyA0MD09SzUhXG4gICAgICAgIG9uRGF0YUxvYWRlZChwYXJzZWREYXRhKTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNhbGxpbmcgR2V0UmVzZXJ2YXRpb25SUSB2aWEgSVNvYXBBcGlTZXJ2aWNlOicsIGVycm9yKTtcbiAgICB9XG59OyIsbnVsbCwiLy8gRDA5OzogY29kZS9jb21wb25lbnRzL2xvYWRTZWF0TWFwRnJvbVNhYnJlLnRzXG5cbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi9Db250ZXh0JztcbmltcG9ydCB7IElTb2FwQXBpU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1jb21tdW5pY2F0aW9uL2ludGVyZmFjZXMvSVNvYXBBcGlTZXJ2aWNlJztcblxuaW50ZXJmYWNlIFBhc3NlbmdlciB7XG4gICAgdHJhdmVsbGVySWQ6IG51bWJlcjtcbiAgICBnaXZlbk5hbWU6IHN0cmluZztcbiAgICBzdXJuYW1lOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBGbGlnaHRTZWdtZW50IHtcbiAgICBvcmlnaW46IHN0cmluZztcbiAgICBkZXN0aW5hdGlvbjogc3RyaW5nO1xuICAgIGRlcGFydHVyZURhdGU6IHN0cmluZztcbiAgICBtYXJrZXRpbmdDYXJyaWVyOiBzdHJpbmc7XG4gICAgbWFya2V0aW5nRmxpZ2h0TnVtYmVyOiBzdHJpbmc7XG4gICAgZmxpZ2h0TnVtYmVyOiBzdHJpbmc7XG4gICAgYm9va2luZ0NsYXNzOiBzdHJpbmc7XG4gICAgY2FiaW4/OiAnRWNvbm9teScgfCAnUHJlbWl1bUVjb25vbXknIHwgJ0J1c2luZXNzJyB8ICdGaXJzdCc7IC8vIDyVIDQ+MTAyODs4XG59XG5cbmV4cG9ydCBjb25zdCBsb2FkU2VhdE1hcEZyb21TYWJyZSA9IGFzeW5jIChcbiAgICBmbGlnaHRTZWdtZW50OiBGbGlnaHRTZWdtZW50LFxuICAgIHBhc3NlbmdlcnM6IFBhc3NlbmdlcltdLFxuICAgIG9uU3VjY2VzczogKHJlc3BvbnNlOiBhbnkpID0+IHZvaWQsXG4gICAgb25FcnJvcj86IChlcnJvcjogYW55KSA9PiB2b2lkXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzb2FwQXBpU2VydmljZSA9IGdldFNlcnZpY2UoSVNvYXBBcGlTZXJ2aWNlKTtcblxuICAgICAgICBjb25zdCBwYXNzZW5nZXJCbG9ja3MgPSBwYXNzZW5nZXJzLm1hcChwYXNzZW5nZXIgPT4gYFxuICAgICAgICAgICAgPG5zNDpGYXJlQXZhaWxRdWFsaWZpZXJzIHBhc3NlbmdlclR5cGU9XCJBRFRcIj5cbiAgICAgICAgICAgICAgICA8bnM0OlRyYXZlbGxlcklEPiR7cGFzc2VuZ2VyLnRyYXZlbGxlcklkfTwvbnM0OlRyYXZlbGxlcklEPlxuICAgICAgICAgICAgICAgIDxuczQ6R2l2ZW5OYW1lPiR7cGFzc2VuZ2VyLmdpdmVuTmFtZX08L25zNDpHaXZlbk5hbWU+XG4gICAgICAgICAgICAgICAgPG5zNDpTdXJuYW1lPiR7cGFzc2VuZ2VyLnN1cm5hbWV9PC9uczQ6U3VybmFtZT5cbiAgICAgICAgICAgICAgICA8bnM0OlNTUj5US05FPC9uczQ6U1NSPlxuICAgICAgICAgICAgPC9uczQ6RmFyZUF2YWlsUXVhbGlmaWVycz5cbiAgICAgICAgYCkuam9pbignJyk7XG5cbiAgICAgICAgY29uc3QgY2FiaW5EZWZpbml0aW9uQmxvY2sgPSBmbGlnaHRTZWdtZW50LmJvb2tpbmdDbGFzcyA/IGBcbiAgICAgICAgPG5zNDpDYWJpbkRlZmluaXRpb24+XG4gICAgICAgICAgICA8bnM0OlJCRD4ke2ZsaWdodFNlZ21lbnQuYm9va2luZ0NsYXNzfTwvbnM0OlJCRD5cbiAgICAgICAgPC9uczQ6Q2FiaW5EZWZpbml0aW9uPlxuICAgICAgICBgIDogYFxuICAgICAgICAgICAgPG5zNDpDYWJpbkRlZmluaXRpb24+XG4gICAgICAgICAgICAgICAgPG5zNDpDYWJpbj4ke2ZsaWdodFNlZ21lbnQuY2FiaW59PC9uczQ6Q2FiaW4+XG4gICAgICAgICAgICA8L25zNDpDYWJpbkRlZmluaXRpb24+XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3Qgc29hcFBheWxvYWQgPSBgXG4gICAgICAgICAgICA8bnM0OkVuaGFuY2VkU2VhdE1hcFJRIHhtbG5zOm5zND1cImh0dHA6Ly9zdGwuc2FicmUuY29tL01lcmNoYW5kaXNpbmcvdjhcIj5cbiAgICAgICAgICAgICAgICA8bnM0OlNlYXRNYXBRdWVyeUVuaGFuY2VkPlxuICAgICAgICAgICAgICAgICAgICA8bnM0OlJlcXVlc3RUeXBlPlBheWxvYWQ8L25zNDpSZXF1ZXN0VHlwZT5cblxuICAgICAgICAgICAgICAgICAgICA8bnM0OlBPUyBjb21wYW55PVwiREk5TFwiIG11bHRpSG9zdD1cIkRJOUxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuczQ6QWN0dWFsIGNpdHk9XCJNVUNcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bnM0OlBDQz5ESTlMPC9uczQ6UENDPlxuICAgICAgICAgICAgICAgICAgICA8L25zNDpQT1M+XG5cbiAgICAgICAgICAgICAgICAgICAgPG5zNDpGbGlnaHQgaWQ9XCJmMVwiIGRlc3RpbmF0aW9uPVwiJHtmbGlnaHRTZWdtZW50LmRlc3RpbmF0aW9ufVwiIG9yaWdpbj1cIiR7ZmxpZ2h0U2VnbWVudC5vcmlnaW59XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bnM0OkRlcGFydHVyZURhdGU+JHtmbGlnaHRTZWdtZW50LmRlcGFydHVyZURhdGV9PC9uczQ6RGVwYXJ0dXJlRGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuczQ6TWFya2V0aW5nIGNhcnJpZXI9XCIke2ZsaWdodFNlZ21lbnQubWFya2V0aW5nQ2Fycmllcn1cIj4ke2ZsaWdodFNlZ21lbnQubWFya2V0aW5nRmxpZ2h0TnVtYmVyfTwvbnM0Ok1hcmtldGluZz5cbiAgICAgICAgICAgICAgICAgICAgPC9uczQ6RmxpZ2h0PlxuXG4gICAgICAgICAgICAgICAgICAgICR7Y2FiaW5EZWZpbml0aW9uQmxvY2t9XG5cbiAgICAgICAgICAgICAgICAgICAgPG5zNDpDdXJyZW5jeT5VU0Q8L25zNDpDdXJyZW5jeT5cblxuICAgICAgICAgICAgICAgICAgICAke3Bhc3NlbmdlckJsb2Nrc31cbiAgICAgICAgICAgICAgICA8L25zNDpTZWF0TWFwUXVlcnlFbmhhbmNlZD5cbiAgICAgICAgICAgICAgICA8bnM0OkNhbGN1bGF0ZURpc2NvdW50PnRydWU8L25zNDpDYWxjdWxhdGVEaXNjb3VudD5cbiAgICAgICAgICAgICAgICA8bnM0OlNob3dPZmZlcnM+dHJ1ZTwvbnM0OlNob3dPZmZlcnM+IFxuICAgICAgICAgICAgPC9uczQ6RW5oYW5jZWRTZWF0TWFwUlE+XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc29sZS5sb2coJz3kIFNlbmRpbmcgRW5oYW5jZWRTZWF0TWFwUlEgcGF5bG9hZDonLCBzb2FwUGF5bG9hZCk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzb2FwQXBpU2VydmljZS5jYWxsU3dzKHtcbiAgICAgICAgICAgIGFjdGlvbjogJ0VuaGFuY2VkU2VhdE1hcFJRJyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHNvYXBQYXlsb2FkLFxuICAgICAgICAgICAgYXV0aFRva2VuVHlwZTogJ1NFU1NJT04nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCcFIEVuaGFuY2VkU2VhdE1hcFJRIFJlc3BvbnNlOicsIHJlc3BvbnNlKTtcblxuICAgICAgICBvblN1Y2Nlc3MocmVzcG9uc2UuZ2V0UGFyc2VkVmFsdWUoKSk7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdMIEVycm9yIGNhbGxpbmcgRW5oYW5jZWRTZWF0TWFwUlE6JywgZXJyb3IpO1xuICAgICAgICBpZiAob25FcnJvcikge1xuICAgICAgICAgICAgb25FcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG59OyIsbnVsbCwiaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnc2FicmUtbmd2LVVJQ29tcG9uZW50cy9hZHZhbmNlZERyb3Bkb3duL2ludGVyZmFjZXMvT3B0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBQYXNzZW5nZXJPcHRpb24gZXh0ZW5kcyBPcHRpb248c3RyaW5nPiB7XG4gICAgZ2l2ZW5OYW1lOiBzdHJpbmc7XG4gICAgc3VybmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlZ21lbnRPcHRpb24gZXh0ZW5kcyBPcHRpb248c3RyaW5nPiB7XG4gICAgb3JpZ2luOiBzdHJpbmc7XG4gICAgZGVzdGluYXRpb246IHN0cmluZztcbiAgICBkZXBhcnR1cmVEYXRlOiBzdHJpbmc7XG4gICAgbWFya2V0aW5nQ2Fycmllcjogc3RyaW5nO1xuICAgIG1hcmtldGluZ0ZsaWdodE51bWJlcjogc3RyaW5nO1xuICAgIGJvb2tpbmdDbGFzczogc3RyaW5nO1xuICAgIGVxdWlwbWVudDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBuckRhdGEge1xuICAgIHBhc3NlbmdlcnM6IFBhc3Nlbmdlck9wdGlvbltdO1xuICAgIHNlZ21lbnRzOiBTZWdtZW50T3B0aW9uW107XG59XG5cbmV4cG9ydCBjb25zdCBwYXJzZVBuckRhdGEgPSAoeG1sRG9jOiBYTUxEb2N1bWVudCk6IFBuckRhdGEgPT4ge1xuICAgIGNvbnN0IHBhc3NlbmdlcnM6IFBhc3Nlbmdlck9wdGlvbltdID0gW107XG4gICAgY29uc3Qgc2VnbWVudHM6IFNlZ21lbnRPcHRpb25bXSA9IFtdO1xuXG4gICAgLy8gLS0tIB8wQUEwNjhASyAtLS1cbiAgICBjb25zdCBwYXNzZW5nZXJOb2RlcyA9IHhtbERvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3RsMTk6UGFzc2VuZ2VyJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXNzZW5nZXJOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwYXNzZW5nZXIgPSBwYXNzZW5nZXJOb2Rlc1tpXTtcbiAgICAgICAgY29uc3QgaWQgPSBwYXNzZW5nZXIuZ2V0QXR0cmlidXRlKCdpZCcpIHx8ICcnO1xuICAgICAgICBjb25zdCBsYXN0TmFtZSA9IHBhc3Nlbmdlci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3RsMTk6TGFzdE5hbWUnKVswXT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IHBhc3Nlbmdlci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3RsMTk6Rmlyc3ROYW1lJylbMF0/LnRleHRDb250ZW50IHx8ICcnO1xuXG4gICAgICAgIHBhc3NlbmdlcnMucHVzaCh7XG4gICAgICAgICAgICBsYWJlbDogYCR7bGFzdE5hbWV9LyR7Zmlyc3ROYW1lfWAsXG4gICAgICAgICAgICB2YWx1ZTogaWQsXG4gICAgICAgICAgICBnaXZlbk5hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICAgIHN1cm5hbWU6IGxhc3ROYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIC0tLSAhNTM8NT1CSyAtLS1cbiAgICBjb25zdCBhaXJTZWdtZW50Tm9kZXMgPSB4bWxEb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5OkFpcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWlyU2VnbWVudE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSBhaXJTZWdtZW50Tm9kZXNbaV07XG5cbiAgICAgICAgY29uc3QgaWQgPSBzZWdtZW50LmdldEF0dHJpYnV0ZSgnaWQnKSB8fCAnJztcbiAgICAgICAgY29uc3Qgb3JpZ2luID0gc2VnbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3RsMTk6RGVwYXJ0dXJlQWlycG9ydCcpWzBdPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBzZWdtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdGwxOTpBcnJpdmFsQWlycG9ydCcpWzBdPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgY29uc3QgZGVwYXJ0dXJlRGF0ZVRpbWUgPSBzZWdtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdGwxOTpEZXBhcnR1cmVEYXRlVGltZScpWzBdPy50ZXh0Q29udGVudCB8fCAnJztcblxuICAgICAgICBjb25zdCBtYXJrZXRpbmdDYXJyaWVyTm9kZSA9IHNlZ21lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5Ok1hcmtldGluZ0FpcmxpbmUnKVswXTtcbiAgICAgICAgY29uc3Qgb3BlcmF0aW5nQ2Fycmllck5vZGUgPSBzZWdtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdGwxOTpPcGVyYXRpbmdBaXJsaW5lJylbMF07XG5cbiAgICAgICAgY29uc3QgbWFya2V0aW5nQ2FycmllciA9IG1hcmtldGluZ0NhcnJpZXJOb2RlPy50ZXh0Q29udGVudD8udHJpbSgpXG4gICAgICAgICAgICB8fCBvcGVyYXRpbmdDYXJyaWVyTm9kZT8udGV4dENvbnRlbnQ/LnRyaW0oKVxuICAgICAgICAgICAgfHwgJ1VOS05PV04nO1xuXG4gICAgICAgIGNvbnN0IG1hcmtldGluZ0ZsaWdodE51bWJlciA9IHNlZ21lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0bDE5Ok1hcmtldGluZ0ZsaWdodE51bWJlcicpWzBdPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgY29uc3QgYm9va2luZ0NsYXNzID0gc2VnbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3RsMTk6UmVzQm9va0Rlc2lnQ29kZScpWzBdPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgY29uc3QgZXF1aXBtZW50ID0gc2VnbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3RsMTk6RXF1aXBtZW50JylbMF0/LnRleHRDb250ZW50IHx8ICcnO1xuXG4gICAgICAgIC8vIBg3Mjs1OjA1PCBCPjtMOj4gNDBCQyA4NyBEZXBhcnR1cmVEYXRlVGltZVxuICAgICAgICBsZXQgZGVwYXJ0dXJlRGF0ZSA9ICcnO1xuICAgICAgICBpZiAoZGVwYXJ0dXJlRGF0ZVRpbWUuaW5jbHVkZXMoJ1QnKSkge1xuICAgICAgICAgICAgZGVwYXJ0dXJlRGF0ZSA9IGRlcGFydHVyZURhdGVUaW1lLnNwbGl0KCdUJylbMF07XG4gICAgICAgIH1cblxuICAgICAgICBzZWdtZW50cy5wdXNoKHtcbiAgICAgICAgICAgIGxhYmVsOiBgJHtvcmlnaW59IJIgJHtkZXN0aW5hdGlvbn0gKCR7bWFya2V0aW5nQ2Fycmllcn0ke21hcmtldGluZ0ZsaWdodE51bWJlcn0pYCxcbiAgICAgICAgICAgIHZhbHVlOiBpZCxcbiAgICAgICAgICAgIG9yaWdpbixcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLFxuICAgICAgICAgICAgZGVwYXJ0dXJlRGF0ZSxcbiAgICAgICAgICAgIG1hcmtldGluZ0NhcnJpZXIsXG4gICAgICAgICAgICBtYXJrZXRpbmdGbGlnaHROdW1iZXIsXG4gICAgICAgICAgICBib29raW5nQ2xhc3MsXG4gICAgICAgICAgICBlcXVpcG1lbnRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgcGFzc2VuZ2Vycywgc2VnbWVudHMgfTtcbn07IiwiZXhwb3J0IGludGVyZmFjZSBQYXJzZWRTZWF0TWFwIHtcbiAgICBsYXlvdXQ6IGFueTtcbiAgICBhdmFpbGFiaWxpdHk6IGFueTtcbiAgICBwYXNzZW5nZXJzOiBhbnk7XG59XG5cbi8qKlxuICogHzBAQThCID5CMjVCID5CIEVuaGFuY2VkU2VhdE1hcFJTIDggMj43MkAwSTA1QiBBQkBDOkJDQEMgOjBAQksgQTA7Pj0wLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTZWF0TWFwUmVzcG9uc2UoeG1sRG9jdW1lbnQ6IERvY3VtZW50KTogUGFyc2VkU2VhdE1hcCB7XG4gICAgY29uc29sZS5sb2coJz3lIB0wRzg9MDU8IEAwNzE+QCA+QjI1QjAgRW5oYW5jZWRTZWF0TWFwUlMnKTtcblxuICAgIGNvbnN0IGxheW91dCA9IHtcbiAgICAgICAgZGVja3M6IFtdLFxuICAgIH07XG4gICAgY29uc3QgYXZhaWxhYmlsaXR5ID0gW107XG4gICAgY29uc3QgcGFzc2VuZ2VycyA9IFtdO1xuXG4gICAgLy8gMS4gHTBFPjQ4PCAyQTUgOjAxOD1LIChDYWJpbilcbiAgICBjb25zdCBjYWJpbk5vZGVzID0geG1sRG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0NhYmluJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhYmluTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2FiaW5Ob2RlID0gY2FiaW5Ob2Rlc1tpXTtcbiAgICAgICAgY29uc3Qgcm93cyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHJvd05vZGVzID0gY2FiaW5Ob2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdSb3cnKTtcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvd05vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCByb3dOb2RlID0gcm93Tm9kZXNbal07XG4gICAgICAgICAgICBjb25zdCByb3dMYWJlbCA9IHJvd05vZGUuZ2V0QXR0cmlidXRlKCdudW1iZXInKSB8fCAoaiArIDEpLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNlYXROb2RlcyA9IHJvd05vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1NlYXQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXRzID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc2VhdE5vZGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhdE5vZGUgPSBzZWF0Tm9kZXNba107XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhdExhYmVsID0gc2VhdE5vZGUuZ2V0QXR0cmlidXRlKCdudW1iZXInKSB8fCAnJztcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gNTAgKyBrICogNTA7IC8vIB9APkFCNTlINTUgPz43OEY4Pj04QD4yMD04NSA/PiBYXG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IDUwICsgaiAqIDUwOyAvLyAfQD5BQjU5SDU1ID8+NzhGOD49OEA+MjA9ODUgPz4gWVxuXG4gICAgICAgICAgICAgICAgc2VhdHMucHVzaCh7IGxhYmVsOiBzZWF0TGFiZWwsIHgsIHkgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJvd3MucHVzaCh7IGxhYmVsOiByb3dMYWJlbCwgc2VhdHMgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsYXlvdXQuZGVja3MucHVzaCh7XG4gICAgICAgICAgICBpZDogYGRlY2stJHtpfWAsXG4gICAgICAgICAgICBuYW1lOiBgRGVjayAke2kgKyAxfWAsXG4gICAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICAgICAgICByb3dzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAyLiAdMEU+NDg8ID9ANTQ7PjY1PThPIChPZmZlcnMgkiA8NUFCMCwgND5BQkM/PUs1IDQ7TyA/PjpDPzo4KVxuICAgIGNvbnN0IG9mZmVyTm9kZXMgPSB4bWxEb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnT2ZmZXInKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2ZmZXJOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBvZmZlck5vZGUgPSBvZmZlck5vZGVzW2ldO1xuXG4gICAgICAgIGNvbnN0IHNlYXROdW1iZXIgPSBvZmZlck5vZGUuZ2V0QXR0cmlidXRlKCdzZWF0TnVtYmVyJyk7XG4gICAgICAgIGNvbnN0IHByaWNlTm9kZSA9IG9mZmVyTm9kZS5xdWVyeVNlbGVjdG9yKCdQcmljZSA+IFRvdGFsQW1vdW50Jyk7XG4gICAgICAgIGNvbnN0IHByaWNlID0gcHJpY2VOb2RlPy50ZXh0Q29udGVudCB8fCAnMCc7XG4gICAgICAgIGNvbnN0IGN1cnJlbmN5ID0gcHJpY2VOb2RlPy5nZXRBdHRyaWJ1dGUoJ2N1cnJlbmN5Q29kZScpIHx8ICdVU0QnO1xuXG4gICAgICAgIGF2YWlsYWJpbGl0eS5wdXNoKHtcbiAgICAgICAgICAgIGxhYmVsOiBzZWF0TnVtYmVyLFxuICAgICAgICAgICAgcHJpY2U6IHBhcnNlRmxvYXQocHJpY2UpLFxuICAgICAgICAgICAgY3VycmVuY3ksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIDMuIB8wQUEwNjhASyAoQz9APklRPT0+LCA8PjY9PiA/Pjc2NSA0PkAwMT5CMEJMKVxuICAgIHBhc3NlbmdlcnMucHVzaCh7IGlkOiAnUEFYMScsIG5hbWU6ICdQYXNzZW5nZXIgMScsIHR5cGU6ICdBRFQnIH0pO1xuXG4gICAgY29uc29sZS5sb2coJwUgIDA3PjFAMD09SzUgNDA9PUs1OicsIHsgbGF5b3V0LCBhdmFpbGFiaWxpdHksIHBhc3NlbmdlcnMgfSk7XG5cbiAgICByZXR1cm4geyBsYXlvdXQsIGF2YWlsYWJpbGl0eSwgcGFzc2VuZ2VycyB9O1xufSIsImltcG9ydCB7IEV4dGVuc2lvblBvaW50U2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi14cC9zZXJ2aWNlcy9FeHRlbnNpb25Qb2ludFNlcnZpY2UnO1xuaW1wb3J0IHsgTm92aWNlQnV0dG9uQ29uZmlnIH0gZnJvbSAnc2FicmUtbmd2LXhwL2NvbmZpZ3MvTm92aWNlQnV0dG9uQ29uZmlnJztcbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuLi9Db250ZXh0JzsgLy8gNUE7OCBDNjUgPz40OjtORzU9PiAyIE1haW4udHNcbmltcG9ydCB7IFNlYXRNYXBzUG9wb3ZlciB9IGZyb20gJy4vU2VhdE1hcHNQb3BvdmVyJzsgLy8gTUI+IFJlYWN0LTo+PD8+PTU9QiA0O08gPz4/PjI1QDBcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tbWFuZEhlbHBlckJ1dHRvbigpIHtcbiAgICBjb25zdCBvbkNsaWNrID0gKGlzT3BlbjogYm9vbGVhbikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnU2VhdE1hcHMgQUJDIDM2MCBidXR0b24gY2xpY2tlZC4gUG9wb3ZlciBpc09wZW46JywgaXNPcGVuKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NlYXRNYXBzIEFCQyAzNjAgcG9wb3ZlciBjbG9zZWQnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29uZmlnID0gbmV3IE5vdmljZUJ1dHRvbkNvbmZpZyhcbiAgICAgICAgJ1NlYXRNYXBzIEFCQyAzNjAnLCAgICAgICAvLyBMYWJlbFxuICAgICAgICAnZmEtcGxhbmUnLCAgICAgICAgICAgICAgIC8vIBg6Pj06MCBGb250QXdlc29tZVxuICAgICAgICAnc2VhdG1hcHMtYWJjMzYwJywgLy8gQ1NTIDo7MEFBIDQ7TyA/Pj8+MjVAMCAoPD42NUhMID81QDU+P0A1NDU7OEJMIEFCODs4ID8+Qj48KVxuICAgICAgICBTZWF0TWFwc1BvcG92ZXIsICAgICAgICAgIC8vIBo+PD8+PTU9QiA/Pj8+MjVAMFxuICAgICAgICAtMTAwMCwgICAgICAgICAgICAgICAgICAgIC8vIB9AOD5AOEI1QjogMUM0NUIgQTs1MjBcbiAgICAgICAgb25DbGljaywgICAgICAgICAgICAgICAgICAvLyAfQDggOjs4OjVcbiAgICAgICAgb25DbG9zZSAgICAgICAgICAgICAgICAgICAvLyAfQDggNzA6QEtCODhcbiAgICApO1xuXG4gICAgZ2V0U2VydmljZShFeHRlbnNpb25Qb2ludFNlcnZpY2UpLmFkZENvbmZpZygnbm92aWNlLWJ1dHRvbnMnLCBjb25maWcpO1xufSIsIi8vIEQwOTs6IFNlYXRNYXBDb21wb25lbnQudHN4XG5cbi8vIEQwOTs6IFNlYXRNYXBDb21wb25lbnQudHN4XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIFNlYXRNYXBDb21wb25lbnRQcm9wcyB7XG4gICAgcGFzc2VuZ2VySWRzOiBzdHJpbmdbXTtcbiAgICBzZWdtZW50SWQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFNlYXRNYXBDb21wb25lbnRTdGF0ZSB7XG4gICAgbGF5b3V0OiBhbnkgfCBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgU2VhdE1hcENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxTZWF0TWFwQ29tcG9uZW50UHJvcHMsIFNlYXRNYXBDb21wb25lbnRTdGF0ZT4ge1xuICAgIGlmcmFtZVJlZiA9IFJlYWN0LmNyZWF0ZVJlZjxIVE1MSUZyYW1lRWxlbWVudD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBTZWF0TWFwQ29tcG9uZW50UHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbGF5b3V0OiBudWxsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlTG9hZFNlYXRNYXAgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIC8vID2AIBI8NUFCPiA3MD9APkEwIC0gQjVBQj4ySzkgbGF5b3V0XG4gICAgICAgIGNvbnN0IGR1bW15TGF5b3V0ID0ge1xuICAgICAgICAgICAgZGVja3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbWFpbi1kZWNrJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0RlY2sgMScsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGxhYmVsOiAnMScsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogNTAgfSwgeyBsYWJlbDogJ0InLCB4OiAxMDAsIHk6IDUwIH1dIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGxhYmVsOiAnMicsIHNlYXRzOiBbeyBsYWJlbDogJ0EnLCB4OiA1MCwgeTogMTAwIH1dIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbGF5b3V0OiBkdW1teUxheW91dCB9LCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnBSBEdW1teSBsYXlvdXQgc2V0LiBTZW5kaW5nIHRvIGlmcmFtZS4uLicpO1xuICAgICAgICAgICAgdGhpcy5zZW5kU2VhdE1hcERhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbmRTZWF0TWFwRGF0YSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgaWZyYW1lID0gdGhpcy5pZnJhbWVSZWYuY3VycmVudDtcbiAgICAgICAgaWYgKCFpZnJhbWU/LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignoA8gaWZyYW1lIG5vdCByZWFkeScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhdE1hcERhdGEgPSB7XG4gICAgICAgICAgICBjb25maWc6IHt9LFxuICAgICAgICAgICAgZmxpZ2h0OiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdmMScsXG4gICAgICAgICAgICAgICAgYWlybGluZUNvZGU6ICdFSycsXG4gICAgICAgICAgICAgICAgZmxpZ2h0Tm86ICc1MCcsXG4gICAgICAgICAgICAgICAgZGVwYXJ0dXJlRGF0ZTogJzIwMjUtMDUtMzAnLFxuICAgICAgICAgICAgICAgIGRlcGFydHVyZTogJ01VQycsXG4gICAgICAgICAgICAgICAgYXJyaXZhbDogJ0RYQicsXG4gICAgICAgICAgICAgICAgY2FiaW5DbGFzczogJ1knXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGF5b3V0OiB0aGlzLnN0YXRlLmxheW91dFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdzZWF0TWFwcycsXG4gICAgICAgICAgICBjb25maWc6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmNvbmZpZyksXG4gICAgICAgICAgICBmbGlnaHQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmZsaWdodCksXG4gICAgICAgICAgICBsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KHNlYXRNYXBEYXRhLmxheW91dClcbiAgICAgICAgfSwgJyonKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnPeQgU2VudCBzZWF0TWFwRGF0YSB0byBpZnJhbWU6Jywgc2VhdE1hcERhdGEpO1xuICAgIH07XG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCB7IHBhc3Nlbmdlcklkcywgc2VnbWVudElkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IGxheW91dCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCcsIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLCBtaW5IZWlnaHQ6ICc0MDBweCcgfX0+XG4gICAgICAgICAgICAgICAgPGgyPlNlYXQgTWFwPC9oMj5cblxuICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+RmxpZ2h0IFNlZ21lbnQ6PC9zdHJvbmc+IHtzZWdtZW50SWR9PC9wPlxuXG4gICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5TZWxlY3RlZCBQYXNzZW5nZXJzOjwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIHtwYXNzZW5nZXJJZHMubWFwKChwYXNzZW5nZXJJZCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fT57cGFzc2VuZ2VySWR9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgICAgIDxociAvPlxuXG4gICAgICAgICAgICAgICAgeyFsYXlvdXQgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2VlZicsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxlbT5TZWF0IG1hcCB2aXN1YWxpemF0aW9uIGNvbWluZyBzb29uKysrPC9lbT48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUxvYWRTZWF0TWFwfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID2AIExvYWQgRHVtbXkgU2VhdCBNYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8aWZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaWZyYW1lUmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9xdWlja2V0LmlvL3JlYWN0LXByb3h5LWFwcC9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjgwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2NjYycsIG1hcmdpblRvcDogJzIwcHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlNlYXRNYXBJZnJhbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25Mb2FkPXt0aGlzLnNlbmRTZWF0TWFwRGF0YX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSIsIi8vIEQwOTs6IFNlYXRNYXBDb21wb25lbnRQbnIudHN4XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuXG5pbnRlcmZhY2UgU2VhdE1hcENvbXBvbmVudFBuclByb3BzIHtcbiAgICBsYXlvdXQ6IGFueTtcbiAgICBjb25maWc6IGFueTtcbn1cblxuY29uc3QgU2VhdE1hcENvbXBvbmVudFBucjogUmVhY3QuRkM8U2VhdE1hcENvbXBvbmVudFBuclByb3BzPiA9ICh7IGxheW91dCwgY29uZmlnIH0pID0+IHtcbiAgICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4gICAgY29uc3QgZmxpZ2h0ID0ge1xuICAgICAgICBpZDogJzAwMScsIC8vIDw+Nj0+IDFDNDVCIDcwPDU9OEJMID0wIEA1MDtMPUs5ID8+Qj48XG4gICAgICAgIGFpcmxpbmVDb2RlOiAnRUsnLFxuICAgICAgICBmbGlnaHRObzogJzUwJyxcbiAgICAgICAgZGVwYXJ0dXJlRGF0ZTogJzIwMjUtMDUtMzAnLFxuICAgICAgICBkZXBhcnR1cmU6ICdNVUMnLFxuICAgICAgICBhcnJpdmFsOiAnRFhCJyxcbiAgICAgICAgY2FiaW5DbGFzczogJ1knXG4gICAgfTtcblxuICAgIGNvbnN0IHNlbmRUb0lmcmFtZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaWZyYW1lID0gaWZyYW1lUmVmLmN1cnJlbnQ7XG4gICAgICAgIGlmICghaWZyYW1lPy5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ6APIGlmcmFtZSBvciBjb250ZW50V2luZG93IG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB0eXBlOiAnc2VhdE1hcHMnLFxuICAgICAgICAgICAgY29uZmlnOiBKU09OLnN0cmluZ2lmeShjb25maWcpLFxuICAgICAgICAgICAgZmxpZ2h0OiBKU09OLnN0cmluZ2lmeShmbGlnaHQpLFxuICAgICAgICAgICAgbGF5b3V0OiBKU09OLnN0cmluZ2lmeShsYXlvdXQpLFxuXG4gICAgICAgICAgICAvLyBhdmFpbGFiaWxpdHkgOCBwYXNzZW5nZXJzID8+OjAgPTUgPzVANTQwNTxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zb2xlLmxvZygnPeQgW1NlYXRNYXBDb21wb25lbnRQbnJdIHNlbmRpbmcgdG8gaWZyYW1lOicsIG1lc3NhZ2UpO1xuICAgICAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xuICAgIH07XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnPeAPIFtTZWF0TWFwQ29tcG9uZW50UG5yXSBtb3VudGVkLCBzZW5kaW5nIHNlYXQgbWFwIGRhdGEgdG8gaWZyYW1lJyk7XG4gICAgICAgIHNlbmRUb0lmcmFtZSgpO1xuICAgIH0sIFtsYXlvdXRdKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzFyZW0nIH19PlxuICAgICAgICAgICAgPGgyPj3rIFNlYXQgTWFwIGZyb20gUE5SPC9oMj5cblxuICAgICAgICAgICAgPGlmcmFtZVxuICAgICAgICAgICAgICAgIHJlZj17aWZyYW1lUmVmfVxuICAgICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vcXVpY2tldC5pby9yZWFjdC1wcm94eS1hcHAvXCJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgICAgIGhlaWdodD1cIjgwMFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnIH19XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJTZWF0TWFwSWZyYW1lXCJcbiAgICAgICAgICAgICAgICBvbkxvYWQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJwUgW1NlYXRNYXBDb21wb25lbnRQbnJdIGlmcmFtZSBsb2FkZWQsIHNlbmRpbmcgc2VhdCBtYXAgZGF0YS4uLicpO1xuICAgICAgICAgICAgICAgICAgICBzZW5kVG9JZnJhbWUoKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXRNYXBDb21wb25lbnRQbnI7IiwiLy8gRDA5OzogU2VhdE1hcHNQb3BvdmVyLnRzeFxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24sIEZvcm1Hcm91cCwgQ29udHJvbExhYmVsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IFNpbXBsZURyb3Bkb3duIH0gZnJvbSAnc2FicmUtbmd2LVVJQ29tcG9uZW50cy9hZHZhbmNlZERyb3Bkb3duL2NvbXBvbmVudHMvU2ltcGxlRHJvcGRvd24nO1xuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnc2FicmUtbmd2LVVJQ29tcG9uZW50cy9hZHZhbmNlZERyb3Bkb3duL2ludGVyZmFjZXMvT3B0aW9uJztcbmltcG9ydCB7IGxvYWRQbnJEZXRhaWxzRnJvbVNhYnJlIH0gZnJvbSAnLi9sb2FkUG5yRGV0YWlsc0Zyb21TYWJyZSc7XG5pbXBvcnQgeyBsb2FkU2VhdE1hcEZyb21TYWJyZSB9IGZyb20gJy4vbG9hZFNlYXRNYXBGcm9tU2FicmUnO1xuaW1wb3J0IHsgZ2V0U2VydmljZSB9IGZyb20gJy4uL0NvbnRleHQnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFBhc3Nlbmdlck9wdGlvbiwgU2VnbWVudE9wdGlvbiB9IGZyb20gJy4vcGFyY2VQbnJEYXRhJztcbmltcG9ydCB7IFhtbFZpZXdlciB9IGZyb20gJy4uL3V0aWxzL1htbFZpZXdlcic7XG5cbmludGVyZmFjZSBTZWF0TWFwc1BvcG92ZXJTdGF0ZSB7XG4gICAgc2VsZWN0ZWRQYXNzZW5nZXJzOiBzdHJpbmdbXTtcbiAgICBzZWxlY3RlZFNlZ21lbnQ6IHN0cmluZztcbiAgICBzZWxlY3RlZFNlZ21lbnRGdWxsRGF0YTogU2VnbWVudE9wdGlvbiB8IG51bGw7IC8vIDyVIEFONDAgNzA/Pjw9ODwgMjVBTCBBNTM8NT1CXG4gICAgc2VsZWN0ZWRDYWJpbkNsYXNzOiBzdHJpbmc7XG4gICAgc2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyOiBzdHJpbmc7XG4gICAgY3VzdG9tTWFya2V0aW5nQ2Fycmllcjogc3RyaW5nO1xuICAgIHBhc3NlbmdlcnM6IFBhc3Nlbmdlck9wdGlvbltdO1xuICAgIHNlZ21lbnRzOiBTZWdtZW50T3B0aW9uW107XG4gICAgbGFzdFhtbFJlc3BvbnNlOiBzdHJpbmcgfCBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgU2VhdE1hcHNQb3BvdmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBTZWF0TWFwc1BvcG92ZXJTdGF0ZT4ge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZFBhc3NlbmdlcnM6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWRTZWdtZW50OiAnJyxcbiAgICAgICAgICAgIHNlbGVjdGVkU2VnbWVudEZ1bGxEYXRhOiBudWxsLCBcbiAgICAgICAgICAgIHNlbGVjdGVkQ2FiaW5DbGFzczogJ0Vjb25vbXknLFxuICAgICAgICAgICAgc2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyOiAnTEgnLFxuICAgICAgICAgICAgY3VzdG9tTWFya2V0aW5nQ2FycmllcjogJycsXG4gICAgICAgICAgICBwYXNzZW5nZXJzOiBbXSxcbiAgICAgICAgICAgIHNlZ21lbnRzOiBbXSxcbiAgICAgICAgICAgIGxhc3RYbWxSZXNwb25zZTogbnVsbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNhYmluQ2xhc3NlczogT3B0aW9uPHN0cmluZz5bXSA9IFtcbiAgICAgICAgeyBsYWJlbDogJ0Vjb25vbXkgKFkpJywgdmFsdWU6ICdFY29ub215JyB9LFxuICAgICAgICB7IGxhYmVsOiAnUHJlbWl1bSBFY29ub215IChXKScsIHZhbHVlOiAnUHJlbWl1bUVjb25vbXknIH0sXG4gICAgICAgIHsgbGFiZWw6ICdCdXNpbmVzcyAoSiknLCB2YWx1ZTogJ0J1c2luZXNzJyB9LFxuICAgICAgICB7IGxhYmVsOiAnRmlyc3QgKEYpJywgdmFsdWU6ICdGaXJzdCcgfVxuICAgIF07XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpOiB2b2lkIHtcbiAgICAgICAgbG9hZFBuckRldGFpbHNGcm9tU2FicmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFNlZ21lbnQgPSAnJztcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFNlZ21lbnRGdWxsRGF0YTogU2VnbWVudE9wdGlvbiB8IG51bGwgPSBudWxsO1xuICAgIFxuICAgICAgICAgICAgaWYgKGRhdGEuc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTZWdtZW50ID0gZGF0YS5zZWdtZW50c1swXS52YWx1ZTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNlZ21lbnRGdWxsRGF0YSA9IGRhdGEuc2VnbWVudHNbMF07XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyID0gJ0xIJztcbiAgICAgICAgICAgIGxldCBjdXN0b21NYXJrZXRpbmdDYXJyaWVyID0gJyc7XG4gICAgXG4gICAgICAgICAgICBpZiAoZGF0YS5zZWdtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFya2V0aW5nQ2FycmllciA9IGRhdGEuc2VnbWVudHNbMF0ubWFya2V0aW5nQ2Fycmllci50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobWFya2V0aW5nQ2FycmllciA9PT0gJ0xIJyB8fCBtYXJrZXRpbmdDYXJyaWVyID09PSAnRUsnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTWFya2V0aW5nQ2FycmllciA9IG1hcmtldGluZ0NhcnJpZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXJrZXRpbmdDYXJyaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTWFya2V0aW5nQ2FycmllciA9ICdPdGhlcic7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU1hcmtldGluZ0NhcnJpZXIgPSBtYXJrZXRpbmdDYXJyaWVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhc3NlbmdlcnM6IGRhdGEucGFzc2VuZ2Vycy5tYXAocCA9PiAoeyAuLi5wLCBjaGVja2VkOiB0cnVlIH0pKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFBhc3NlbmdlcnM6IGRhdGEucGFzc2VuZ2Vycy5tYXAocCA9PiBwLnZhbHVlKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50czogZGF0YS5zZWdtZW50cyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNlZ21lbnQsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTZWdtZW50RnVsbERhdGEsXG4gICAgICAgICAgICAgICAgbGFzdFhtbFJlc3BvbnNlOiBudWxsLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTWFya2V0aW5nQ2FycmllcixcbiAgICAgICAgICAgICAgICBjdXN0b21NYXJrZXRpbmdDYXJyaWVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUGFzc2VuZ2VyQ2hhbmdlID0gKHBhc3NlbmdlclZhbHVlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xuICAgICAgICAgICAgc2VsZWN0ZWRQYXNzZW5nZXJzOiBwcmV2U3RhdGUuc2VsZWN0ZWRQYXNzZW5nZXJzLmluY2x1ZGVzKHBhc3NlbmdlclZhbHVlKVxuICAgICAgICAgICAgICAgID8gcHJldlN0YXRlLnNlbGVjdGVkUGFzc2VuZ2Vycy5maWx0ZXIocCA9PiBwICE9PSBwYXNzZW5nZXJWYWx1ZSlcbiAgICAgICAgICAgICAgICA6IFsuLi5wcmV2U3RhdGUuc2VsZWN0ZWRQYXNzZW5nZXJzLCBwYXNzZW5nZXJWYWx1ZV1cbiAgICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBoYW5kbGVTZWdtZW50Q2hhbmdlID0gKG9wdGlvbnM6IE9wdGlvbltdKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gb3B0aW9ucy5maW5kKG9wdCA9PiBvcHQuY2hlY2tlZCk7XG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgZnVsbERhdGEgPSB0aGlzLnN0YXRlLnNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy52YWx1ZSA9PT0gc2VsZWN0ZWQudmFsdWUpIHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRTZWdtZW50OiBzZWxlY3RlZC52YWx1ZSwgc2VsZWN0ZWRTZWdtZW50RnVsbERhdGE6IGZ1bGxEYXRhIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2FiaW5DbGFzc0NoYW5nZSA9IChvcHRpb25zOiBPcHRpb25bXSk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG9wdGlvbnMuZmluZChvcHQgPT4gb3B0LmNoZWNrZWQpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQpIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZENhYmluQ2xhc3M6IHNlbGVjdGVkLnZhbHVlIH0pO1xuICAgIH07XG5cbiAgICBoYW5kbGVNYXJrZXRpbmdDYXJyaWVyQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MU2VsZWN0RWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZE1hcmtldGluZ0NhcnJpZXI6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgIGN1c3RvbU1hcmtldGluZ0NhcnJpZXI6IGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gJ090aGVyJyA/ICcnIDogJydcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGhhbmRsZUN1c3RvbU1hcmtldGluZ0NhcnJpZXJDaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXN0b21NYXJrZXRpbmdDYXJyaWVyOiBldmVudC50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKSB9KTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBsb2FkU2VhdE1hcCA9IGFzeW5jICh7IGF2YWlsYWJpbGl0eUluZm8sIHNpbGVudCA9IGZhbHNlIH06IHsgYXZhaWxhYmlsaXR5SW5mbzogYm9vbGVhbjsgc2lsZW50PzogYm9vbGVhbiB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWRQYXNzZW5nZXJzLCBzZWxlY3RlZFNlZ21lbnQsIHNlbGVjdGVkQ2FiaW5DbGFzcywgc2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyLCBjdXN0b21NYXJrZXRpbmdDYXJyaWVyLCBzZWdtZW50cywgcGFzc2VuZ2VycyB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTZWdtZW50RGF0YSA9IHNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy52YWx1ZSA9PT0gc2VsZWN0ZWRTZWdtZW50KTtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFNlZ21lbnREYXRhKSByZXR1cm4gY29uc29sZS5lcnJvcignTCBObyBzZWdtZW50IGRhdGEgZm91bmQuJyk7XG5cbiAgICAgICAgY29uc3QgbWFya2V0aW5nQ2FycmllckZpbmFsID0gc2VsZWN0ZWRNYXJrZXRpbmdDYXJyaWVyID09PSAnT3RoZXInID8gY3VzdG9tTWFya2V0aW5nQ2FycmllciA6IHNlbGVjdGVkTWFya2V0aW5nQ2FycmllcjtcblxuICAgICAgICBjb25zdCBmbGlnaHRTZWdtZW50ID0ge1xuICAgICAgICAgICAgaWQ6IHNlbGVjdGVkU2VnbWVudCxcbiAgICAgICAgICAgIG9yaWdpbjogc2VsZWN0ZWRTZWdtZW50RGF0YS5vcmlnaW4sXG4gICAgICAgICAgICBkZXN0aW5hdGlvbjogc2VsZWN0ZWRTZWdtZW50RGF0YS5kZXN0aW5hdGlvbixcbiAgICAgICAgICAgIGRlcGFydHVyZURhdGU6IHNlbGVjdGVkU2VnbWVudERhdGEuZGVwYXJ0dXJlRGF0ZSxcbiAgICAgICAgICAgIG1hcmtldGluZ0NhcnJpZXI6IG1hcmtldGluZ0NhcnJpZXJGaW5hbCxcbiAgICAgICAgICAgIG1hcmtldGluZ0ZsaWdodE51bWJlcjogc2VsZWN0ZWRTZWdtZW50RGF0YS5tYXJrZXRpbmdGbGlnaHROdW1iZXIsXG4gICAgICAgICAgICBmbGlnaHROdW1iZXI6IHNlbGVjdGVkU2VnbWVudERhdGEubWFya2V0aW5nRmxpZ2h0TnVtYmVyLFxuICAgICAgICAgICAgYm9va2luZ0NsYXNzOiBzZWxlY3RlZFNlZ21lbnREYXRhLmJvb2tpbmdDbGFzcyxcbiAgICAgICAgICAgIGVxdWlwbWVudDogc2VsZWN0ZWRTZWdtZW50RGF0YS5lcXVpcG1lbnQsXG4gICAgICAgICAgICBjYWJpbjogc2VsZWN0ZWRDYWJpbkNsYXNzIGFzIGFueVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG1hcHBlZFBhc3NlbmdlcnMgPSBwYXNzZW5nZXJzLmZpbHRlcihwID0+IHNlbGVjdGVkUGFzc2VuZ2Vycy5pbmNsdWRlcyhwLnZhbHVlKSkubWFwKHAgPT4gKHtcbiAgICAgICAgICAgIGlkOiBwLnZhbHVlLFxuICAgICAgICAgICAgdHJhdmVsbGVySWQ6IE51bWJlcihwLnZhbHVlKSxcbiAgICAgICAgICAgIGdpdmVuTmFtZTogcC5naXZlbk5hbWUsXG4gICAgICAgICAgICBzdXJuYW1lOiBwLnN1cm5hbWVcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGF3YWl0IGxvYWRTZWF0TWFwRnJvbVNhYnJlKGZsaWdodFNlZ21lbnQsIG1hcHBlZFBhc3NlbmdlcnMsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJldHR5WG1sID0gbmV3IFhNTFNlcmlhbGl6ZXIoKS5zZXJpYWxpemVUb1N0cmluZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFhtbFJlc3BvbnNlOiBwcmV0dHlYbWwgfSk7XG5cbiAgICAgICAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgZ2V0U2VydmljZShQdWJsaWNNb2RhbHNTZXJ2aWNlKS5zaG93UmVhY3RNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogYXZhaWxhYmlsaXR5SW5mbyA/ICc96yBTZWF0IE1hcCAoT2NjdXBpZWQpJyA6ICc96yBTZWF0IE1hcCAoRW1wdHkpJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiA8WG1sVmlld2VyIHhtbD17cHJldHR5WG1sfSAvPiwgbW9kYWxDbGFzc05hbWU6ICdzZWF0bWFwLXhtbC1tb2RhbCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGhhbmRsZVNob3dSYXdYbWwgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5sYXN0WG1sUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZFNlYXRNYXAoeyBhdmFpbGFiaWxpdHlJbmZvOiBmYWxzZSwgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdldFNlcnZpY2UoUHVibGljTW9kYWxzU2VydmljZSkuc2hvd1JlYWN0TW9kYWwoe1xuICAgICAgICAgICAgaGVhZGVyOiAnPcQgTGFzdCBFbmhhbmNlZFNlYXRNYXBSUyBYTUwnLFxuICAgICAgICAgICAgY29tcG9uZW50OiA8WG1sVmlld2VyIHhtbD17dGhpcy5zdGF0ZS5sYXN0WG1sUmVzcG9uc2UgfHwgJyd9IC8+LFxuICAgICAgICAgICAgbW9kYWxDbGFzc05hbWU6ICdzZWF0bWFwLXhtbC1tb2RhbCdcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHsgcGFzc2VuZ2Vycywgc2VnbWVudHMsIHNlbGVjdGVkUGFzc2VuZ2Vycywgc2VsZWN0ZWRTZWdtZW50LCBzZWxlY3RlZENhYmluQ2xhc3MsIHNlbGVjdGVkTWFya2V0aW5nQ2FycmllciwgY3VzdG9tTWFya2V0aW5nQ2FycmllciB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXNCdXR0b25EaXNhYmxlZCA9IHNlbGVjdGVkUGFzc2VuZ2Vycy5sZW5ndGggPT09IDAgfHwgIXNlbGVjdGVkU2VnbWVudDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTZWdtZW50RGF0YSA9IHNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy52YWx1ZSA9PT0gc2VsZWN0ZWRTZWdtZW50KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCcsIG1pbldpZHRoOiAnNDAwcHgnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyB9fT5cbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPlNlbGVjdCBQYXNzZW5nZXJzICh7c2VsZWN0ZWRQYXNzZW5nZXJzLmxlbmd0aH0pPC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cGFzc2VuZ2Vycy5tYXAocGFzc2VuZ2VyID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cGFzc2VuZ2VyLnZhbHVlfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc1cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17c2VsZWN0ZWRQYXNzZW5nZXJzLmluY2x1ZGVzKHBhc3Nlbmdlci52YWx1ZSl9IG9uQ2hhbmdlPXsoKSA9PiB0aGlzLmhhbmRsZVBhc3NlbmdlckNoYW5nZShwYXNzZW5nZXIudmFsdWUpfSBzdHlsZT17eyBtYXJnaW5SaWdodDogJzhweCcgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3Bhc3Nlbmdlci5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zZWxlY3RlZFNlZ21lbnRGdWxsRGF0YSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMzMzJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIAgPIHt0aGlzLnN0YXRlLnNlbGVjdGVkU2VnbWVudEZ1bGxEYXRhLm9yaWdpbn0gkiB7dGhpcy5zdGF0ZS5zZWxlY3RlZFNlZ21lbnRGdWxsRGF0YS5kZXN0aW5hdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICh7dGhpcy5zdGF0ZS5zZWxlY3RlZFNlZ21lbnRGdWxsRGF0YS5tYXJrZXRpbmdDYXJyaWVyfXt0aGlzLnN0YXRlLnNlbGVjdGVkU2VnbWVudEZ1bGxEYXRhLm1hcmtldGluZ0ZsaWdodE51bWJlcn0pXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgID3FIERlcGFydHVyZToge3RoaXMuc3RhdGUuc2VsZWN0ZWRTZWdtZW50RnVsbERhdGEuZGVwYXJ0dXJlRGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+U2VsZWN0IEZsaWdodCBTZWdtZW50PC9Db250cm9sTGFiZWw+XG5cbiAgICAgICAgICAgICAgICAgICAgPFNpbXBsZURyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWdtZW50cy5tYXAoc2VnID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc2VnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHNlZy52YWx1ZSA9PT0gc2VsZWN0ZWRTZWdtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWdtZW50Q2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPlNlbGVjdCBDYWJpbiBDbGFzczwvQ29udHJvbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8U2ltcGxlRHJvcGRvd24gb3B0aW9ucz17dGhpcy5jYWJpbkNsYXNzZXMubWFwKG9wdCA9PiAoeyAuLi5vcHQsIGNoZWNrZWQ6IG9wdC52YWx1ZSA9PT0gc2VsZWN0ZWRDYWJpbkNsYXNzIH0pKX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2FiaW5DbGFzc0NoYW5nZX0gLz5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+U2VsZWN0IE1hcmtldGluZyBDYXJyaWVyPC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3NlbGVjdGVkTWFya2V0aW5nQ2Fycmllcn0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlTWFya2V0aW5nQ2FycmllckNoYW5nZX0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTEhcIj5MSCAoTHVmdGhhbnNhKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkVLXCI+RUsgKEVtaXJhdGVzKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk90aGVyXCI+T3RoZXIuLi48L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZE1hcmtldGluZ0NhcnJpZXIgPT09ICdPdGhlcicgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF4TGVuZ3RoPXsyfSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cImUuZy4sIEFBLCBCQSwgQUZcIiB2YWx1ZT17Y3VzdG9tTWFya2V0aW5nQ2Fycmllcn0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ3VzdG9tTWFya2V0aW5nQ2FycmllckNoYW5nZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMTBweCcsIG1hcmdpblRvcDogJzIwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1pbmZvXCIgZGlzYWJsZWQ9e2lzQnV0dG9uRGlzYWJsZWR9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2hvd1Jhd1htbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA9xCBTaG93IFJhdyBYTUxcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJidG4tcHJpbWFyeVwiIHN0eWxlPXt7IGZsZXg6IDEgfX0gZGlzYWJsZWQ9e2lzQnV0dG9uRGlzYWJsZWR9IG9uQ2xpY2s9eygpID0+IHRoaXMubG9hZFNlYXRNYXAoeyBhdmFpbGFiaWxpdHlJbmZvOiBmYWxzZSB9KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgCA8gRW1wdHkgU2VhdCBNYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJidG4tc3VjY2Vzc1wiIHN0eWxlPXt7IGZsZXg6IDEgfX0gZGlzYWJsZWQ9e2lzQnV0dG9uRGlzYWJsZWR9IG9uQ2xpY2s9eygpID0+IHRoaXMubG9hZFNlYXRNYXAoeyBhdmFpbGFiaWxpdHlJbmZvOiB0cnVlIH0pfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9ZSBPY2N1cGllZCBTZWF0IE1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIixudWxsLG51bGwsbnVsbCwiXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qIEF1dG8tZ2VuZXJhdGVkIGZpbGUuICAgICAgICAgICAgICAqL1xuLyogRG8gbm90IG1vZGlmeSBpdC4gICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IHJlbW92ZSBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgY29tbWl0IGl0LiAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSBwdXNoIGl0LiAgICAgICAgICAgICAgICAgICovXG4vKiBSZW1vdmUgaXQgaWYgbW9kdWxlIG5hbWUgY2hhbmdlZC4gKi9cbi8qIGVzbGludDpkaXNhYmxlICAgICAgICAgICAgICAgICAgICAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7SU1vZHVsZUNvbnRleHR9IGZyb20gXCJzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL0lNb2R1bGVDb250ZXh0XCI7XG5pbXBvcnQge01vZHVsZUNvbnRleHR9IGZyb20gXCJzYWJyZS1uZ3YtY29yZS9tb2R1bGVzL01vZHVsZUNvbnRleHRcIjtcbmltcG9ydCB7STE4blNlcnZpY2UsIFNjb3BlZFRyYW5zbGF0b3J9IGZyb20gXCJzYWJyZS1uZ3YtYXBwL2FwcC9zZXJ2aWNlcy9pbXBsL0kxOG5TZXJ2aWNlXCI7XG5cbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgY29udGV4dDogSU1vZHVsZUNvbnRleHQgPSBuZXcgTW9kdWxlQ29udGV4dChcImNvbS1zYWJyZS1yZWRhcHAtZnVuZGFtZW50YWxzLXdlYi1tb2R1bGVcIik7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IGNmOiBJTW9kdWxlQ29udGV4dFsnY2YnXSA9IGNvbnRleHQuY2YuYmluZChjb250ZXh0KTtcbi8qKiBAaW50ZXJuYWwgKiovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJTZXJ2aWNlOiBJTW9kdWxlQ29udGV4dFsncmVnaXN0ZXJTZXJ2aWNlJ10gPSBjb250ZXh0LnJlZ2lzdGVyU2VydmljZS5iaW5kKGNvbnRleHQpO1xuLyoqIEBpbnRlcm5hbCAqKi9cbmV4cG9ydCBjb25zdCBnZXRTZXJ2aWNlOiBJTW9kdWxlQ29udGV4dFsnZ2V0U2VydmljZSddID0gY29udGV4dC5nZXRTZXJ2aWNlLmJpbmQoY29udGV4dCk7XG4vKiogQGludGVybmFsICoqL1xuZXhwb3J0IGNvbnN0IHQ6IFNjb3BlZFRyYW5zbGF0b3IgPSBnZXRTZXJ2aWNlKEkxOG5TZXJ2aWNlKS5nZXRTY29wZWRUcmFuc2xhdG9yKCdjb20tc2FicmUtcmVkYXBwLWZ1bmRhbWVudGFscy13ZWItbW9kdWxlL3RyYW5zbGF0aW9ucycpO1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0J1dHRvbiwgRm9ybSwgRm9ybUdyb3VwLCBNb2RhbCwgSW5wdXRHcm91cCwgQ29udHJvbExhYmVsLCBGb3JtQ29udHJvbCwgSGVscEJsb2NrLCBQYW5lbCwgQWxlcnR9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcbmltcG9ydCB7IGdldFNlcnZpY2UsIHQgfSBmcm9tIFwiLi9Db250ZXh0XCI7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tIFwic2FicmUtbmd2LWNvcmUvc2VydmljZXMvTGF5ZXJTZXJ2aWNlXCI7XG5pbXBvcnQge0lTb2FwQXBpU2VydmljZX0gZnJvbSBcInNhYnJlLW5ndi1jb21tdW5pY2F0aW9uL2ludGVyZmFjZXMvSVNvYXBBcGlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBQbnJQdWJsaWNTZXJ2aWNlIH0gZnJvbSBcInNhYnJlLW5ndi1hcHAvYXBwL3NlcnZpY2VzL2ltcGwvUG5yUHVibGljU2VydmljZVwiO1xuXG4vKlxuRGVmaW5lIGludGVyZmFjZSBmb3IgaGFuZGxpbmcgVHJhdmVsZXIgZGV0YWlscyBvbiB0aGUgUmVhY3QgY29tcG9uZW50IHN0YXRlXG4qL1xuZXhwb3J0IGludGVyZmFjZSBUcmF2ZWxlciB7XG4gICAgbmFtZTpzdHJpbmcsXG4gICAgc3VybmFtZTpzdHJpbmcsXG4gICAgZW1haWw/OnN0cmluZyxcbiAgICB0eXBlQ29kZT86J0FEVCcgfCAnSU5GJyB8ICdDTk4nLCAgICBcbn1cblxuLypcbkRlZmluZSBpbnRlcmZhY2UgZm9yIGhhbmRsaW5nIGZpZWxkIHZhbGlkYXRpb24gb24gdGhlIFJlYWN0IGNvbXBvbmVudCBzdGF0ZVxuKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRWYWxpZGF0aW9uIHtcbiAgICBbZmllbGRJZDpzdHJpbmddOntcbiAgICAgICAgaXNWYWxpZDpib29sZWFuLFxuICAgICAgICBzdGF0dXM6XCJlcnJvclwifFwid2FybmluZ1wifFwic3VjY2Vzc1wifG51bGwsXG4gICAgICAgIGhlbHBNc2c/OnN0cmluZyAgXG4gICAgfVxufVxuXG4vKlxuUmVhY3QgY29tcG9uZW50IHN0YXRlIGludGVyZmFjZSwgaG9sZHMgYWxsIGRhdGEgaGFuZGxlZCBieSB0aGUgRm9ybVxuKi9cbmV4cG9ydCBpbnRlcmZhY2UgbXlTdGF0ZSB7XG4gICAgc3RhZ2U6bnVtYmVyLFxuICAgIHRyYXZlbGVyPzpUcmF2ZWxlcixcbiAgICB0cmF2ZWxUeXBlPzpzdHJpbmcsXG4gICAgdHJhdmVsSW5mbz86QXJyYXk8c3RyaW5nPixcbiAgICB2YWxpZGF0aW9uPzpGaWVsZFZhbGlkYXRpb25cbn1cblxuLypcbkNyZWF0ZVBOUiBDb21wb25lbnQsIG11bHRpLXN0YWdlIGRhdGEgZW50cnkgZm9ybSBiYXNlZCBvbiByZWFjdC1ib290c3RyYXAgY29tcG9uZW50IGxpYnJhcnlcbiovXG5leHBvcnQgY2xhc3MgQ3JlYXRlUE5SIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LG15U3RhdGU+e1xuXG4gICAgY29uc3RydWN0b3IoZSl7XG4gICAgICAgIHN1cGVyKGUpO1xuXG4gICAgICAgIC8vYmluZCBldmVudCBoYW5kbGVycyB0byB0aGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5leGVjdXRlU2VydmljZSA9IHRoaXMuZXhlY3V0ZVNlcnZpY2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jbG9zZUFuZFJlZnJlc2ggPSB0aGlzLmNsb3NlQW5kUmVmcmVzaC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmdvQmFjayA9IHRoaXMuZ29CYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZ29OZXh0ID0gdGhpcy5nb05leHQuYmluZCh0aGlzKTtcblxuICAgICAgICAvL2ZpbGwgZGVmYXVsdCBzdGF0ZSB2YWx1ZXMgZHVyaW5nIGNvbXBvbmVudCBpbml0aWFsaXphdGlvblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhZ2U6MSxcbiAgICAgICAgICAgIHRyYXZlbGVyOntcbiAgICAgICAgICAgICAgICBuYW1lOlwiXCIsXG4gICAgICAgICAgICAgICAgc3VybmFtZTpcIlwiLFxuICAgICAgICAgICAgICAgIHR5cGVDb2RlOlwiQURUXCJcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWxpZGF0aW9uOntcbiAgICAgICAgICAgICAgICB0eHROYW1lOntpc1ZhbGlkOmZhbHNlLHN0YXR1czpudWxsLGhlbHBNc2c6bnVsbH0sXG4gICAgICAgICAgICAgICAgdHh0U3VybmFtZTp7aXNWYWxpZDpmYWxzZSxzdGF0dXM6bnVsbCxoZWxwTXNnOm51bGx9LFxuICAgICAgICAgICAgICAgIHR4dEVtYWlsOntpc1ZhbGlkOmZhbHNlLHN0YXR1czpudWxsLGhlbHBNc2c6bnVsbH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgTWV0aG9kIHRvIGhhbmRsZSBmaWVsZCBjaGFuZ2VzLCBwZXJmb3JtIHZhbGlkYXRpb24gYW5kIHVwZGF0ZSBzdGF0ZVxuICAgICovXG4gICAgaGFuZGxlQ2hhbmdlKGUpe1xuXG4gICAgICAgIGNvbnN0IGN0bElkID0gZS50YXJnZXQuaWQ7XG4gICAgICAgIGNvbnN0IGZsZFZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25TdGF0ZSA9IHRoaXMuc3RhdGUudmFsaWRhdGlvbjtcblxuICAgICAgICBjb25zdCB0bXBUcmF2ZWxlciA9IHRoaXMuc3RhdGUudHJhdmVsZXI7XG4gICAgICAgIGxldCB0bXBUcmF2ZWxUeXBlID0gdGhpcy5zdGF0ZS50cmF2ZWxUeXBlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlQ2hhbmdlXCIsY3RsSWQsZmxkVmFsdWUpO1xuXG4gICAgICAgIGlmKGN0bElkPT09XCJ0eHROYW1lXCIgfHwgY3RsSWQ9PT1cInR4dFN1cm5hbWVcIil7XG4gICAgICAgICAgICBjb25zdCB0bXBWYWxpZGF0aW9uID0gdmFsaWRhdGlvblN0YXRlW2N0bElkXVxuXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBmbGRWYWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICBpZihjdGxJZD09PVwidHh0TmFtZVwiKVxuICAgICAgICAgICAgICAgIHRtcFRyYXZlbGVyLm5hbWUgPSBmbGRWYWx1ZTtcbiAgICAgICAgICAgIGlmKGN0bElkPT09XCJ0eHRTdXJuYW1lXCIpXG4gICAgICAgICAgICAgICAgdG1wVHJhdmVsZXIuc3VybmFtZSA9IGZsZFZhbHVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihsZW5ndGg8PTApe1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLmhlbHBNc2cgPSBcInJlcXVpcmVkIGZpZWxkXCI7XG4gICAgICAgICAgICB9ZWxzZSBpZihsZW5ndGg8PTEpe1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uc3RhdHVzID0gJ3dhcm5pbmcnO1xuICAgICAgICAgICAgICAgIHRtcFZhbGlkYXRpb24uaGVscE1zZyA9IFwibXVzdCBiZSBtb3JlIHRoYW4gb25lIGNoYXJhY3RlciBsb25nXCI7XG4gICAgICAgICAgICB9ZWxzZSBpZihsZW5ndGg+MSl7XG4gICAgICAgICAgICAgICAgdG1wVmFsaWRhdGlvbi5pc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLnN0YXR1cyA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgICAgICB0bXBWYWxpZGF0aW9uLmhlbHBNc2cgPSBudWxsO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihjdGxJZD09PVwic2VsQWdlQ29kZVwiKXtcbiAgICAgICAgICAgIHRtcFRyYXZlbGVyLnR5cGVDb2RlID0gZmxkVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjdGxJZD09PVwic2VsVHJhdmVsVHlwZVwiKXtcbiAgICAgICAgICAgIHRtcFRyYXZlbFR5cGUgPSBmbGRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHJhdmVsZXI6dG1wVHJhdmVsZXIsXG4gICAgICAgICAgICAgICAgdHJhdmVsVHlwZTp0bXBUcmF2ZWxUeXBlLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246dmFsaWRhdGlvblN0YXRlXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy9tb3ZlcyB0byB0aGUgbmV4dCBzdGFnZVxuICAgIGdvTmV4dChldnQpe1xuICAgICAgICBjb25zdCBjdXJyU3RhZ2UgPSB0aGlzLnN0YXRlLnN0YWdlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGFnZTpjdXJyU3RhZ2UrMX0pXG4gICAgfVxuXG4gICAgLy9yZXdpbmQgc3RhZ2VcbiAgICBnb0JhY2soZXZ0KXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhZ2U6MX0pXG4gICAgfVxuXG4gICAgLypcbiAgICBDcmVhdGVzIGEgVXBkYXRlUmVzZXJ2YXRpb25SUSByZXF1ZXN0IHBheWxvYWQgbWVyZ2luZyBzdGF0ZSBkYXRhLCB0aGVuIHV0aWxpemVzIFxuICAgIFNPQVAgQVBJIHNlcnZpY2UgaGFuZGxlciB0byBzZW5kIHRoZSByZXF1ZXN0IGFuZCBwYXJzZSByZXN1bHRzXG4gICAgKi9cbiAgICBleGVjdXRlU2VydmljZSgpe1xuICAgICAgICBjb25zdCBzb2FwQXBpU2VydmljZSA9IGdldFNlcnZpY2UoSVNvYXBBcGlTZXJ2aWNlKTtcbiAgICAgICAgY29uc3QgcGwxID0gYFxuICAgICAgICA8VXBkYXRlUmVzZXJ2YXRpb25SUSBWZXJzaW9uPVwiMS4xOS44XCIgeG1sbnM9XCJodHRwOi8vd2Vic2VydmljZXMuc2FicmUuY29tL3BucmJ1aWxkZXIvdjFfMTlcIj5cbiAgICAgICAgPFJlcXVlc3RUeXBlIGNvbW1pdFRyYW5zYWN0aW9uPVwiZmFsc2VcIiBpbml0aWFsSWdub3JlPVwidHJ1ZVwiPlN0YXRlZnVsPC9SZXF1ZXN0VHlwZT5cbiAgICAgICAgPFJldHVybk9wdGlvbnMgSW5jbHVkZVVwZGF0ZURldGFpbHM9XCJ0cnVlXCIgUmV0cmlldmVQTlI9XCJmYWxzZVwiLz5cbiAgICAgICAgICAgIDxSZXNlcnZhdGlvblVwZGF0ZUxpc3Q+XG4gICAgICAgICAgICAgICAgPFJlc2VydmF0aW9uVXBkYXRlSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPFBhc3Nlbmdlck5hbWVVcGRhdGUgb3A9XCJDXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VHJhdmVsZXJOYW1lIHR5cGU9XCIke3RoaXMuc3RhdGUudHJhdmVsZXIudHlwZUNvZGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdpdmVuPiR7dGhpcy5zdGF0ZS50cmF2ZWxlci5uYW1lfTwvR2l2ZW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN1cm5hbWU+JHt0aGlzLnN0YXRlLnRyYXZlbGVyLnN1cm5hbWV9PC9TdXJuYW1lPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9UcmF2ZWxlck5hbWU+XG4gICAgICAgICAgICAgICAgICAgIDwvUGFzc2VuZ2VyTmFtZVVwZGF0ZT5cbiAgICAgICAgICAgICAgICA8L1Jlc2VydmF0aW9uVXBkYXRlSXRlbT5cbiAgICAgICAgICAgICAgICA8UmVzZXJ2YXRpb25VcGRhdGVJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8UmVtYXJrVXBkYXRlIG9wPVwiQ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJlbWFya1RleHQ+VEhJUyBJUyAke3RoaXMuc3RhdGUudHJhdmVsVHlwZX0gVFJBVkVMIFRZUEUgUkVNQVJLPC9SZW1hcmtUZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L1JlbWFya1VwZGF0ZT5cbiAgICAgICAgICAgICAgICA8L1Jlc2VydmF0aW9uVXBkYXRlSXRlbT5cbiAgICAgICAgICAgIDwvUmVzZXJ2YXRpb25VcGRhdGVMaXN0PlxuICAgICAgICA8L1VwZGF0ZVJlc2VydmF0aW9uUlE+XG4gICAgICAgIGA7XG5cbiAgICAgICAgc29hcEFwaVNlcnZpY2UuY2FsbFN3cyh7YWN0aW9uOlwiVXBkYXRlUmVzZXJ2YXRpb25SUVwiLHBheWxvYWQ6cGwxLGF1dGhUb2tlblR5cGU6XCJTRVNTSU9OXCJ9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgLy92YWxpZGF0ZSBBUEkgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNvYXAgQVBJIGNhbGwgcmVzdWx0XCIsSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gICAgICAgICAgICAgICAgaWYocmVzLmVycm9yQ29kZSB8fCAocmVzLnZhbHVlICYmIHJlcy52YWx1ZS5pbmRleE9mKFwiPHN0bDE5OkVycm9yXCIpPj0wKSApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGFnZTo0fSlcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhZ2U6M30pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaChcbiAgICAgICAgICAgIChlcnIpPT57XG4gICAgICAgICAgICAgICAgLy9leGNlcHRpb24gY2FsbGluZyBzb2FwIEFQSVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU29hcCBBUEkgY2FsbCBlcnJvclwiLGVycik7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhZ2U6NH0pXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGhhbmRsZU1vZGFsQ2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGdldFNlcnZpY2UoTGF5ZXJTZXJ2aWNlKS5jbGVhckxheWVyKDQyKTtcbiAgICB9XG4gICAgLypcbiAgICBSZWZyZXNoZXMgdGhlIFRyaXAgU3VtbWFyeSBwYW5lbCBhZnRlciBzdWNlc3NmdWxsIFVwZGF0ZVJlc2VydmF0aW9uUlEgcmVzcG9uc2UsIFxuICAgIHRoaXMgbWFrZXMgdGhlIGNoYW5nZXMgd3JpdHRlbiBvbiB0aGUgUE5SIHRvIGFwcGVhciBvbiB0aGUgVUlcbiAgICAqL1xuICAgIGNsb3NlQW5kUmVmcmVzaCgpe1xuICAgICAgICBnZXRTZXJ2aWNlKFBuclB1YmxpY1NlcnZpY2UpLnJlZnJlc2hEYXRhKCk7XG4gICAgICAgIHRoaXMuaGFuZGxlTW9kYWxDbG9zZSgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgUmVuZGVyIHBhcnRzIG9mIG11bHRpLXN0YWdlIGZvcm0gdXNpbmcgcmVhY3QtYm9vdHN0cmFwIGNvbXBvbmVudHNcbiAgICBUaGUgZGF0YSBlbnRyeSBmb3JtIGlzIHdyYXBwZWQgYnkgYSBNb2RhbCBEaWFsb2cgY29tcG9uZW50XG4gICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuXG4gICAgICAgIHN3aXRjaCh0aGlzLnN0YXRlLnN0YWdlKXtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVOYW1lID0gdGhpcy5zdGF0ZS52YWxpZGF0aW9uW1widHh0TmFtZVwiXTtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlU3VybmFtZSA9IHRoaXMuc3RhdGUudmFsaWRhdGlvbltcInR4dFN1cm5hbWVcIl07XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1vZGFsLkRpYWxvZyBjbGFzc05hbWU9XCJyZWFjdC1tb2RhbFwiPlxuICAgICAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbiBvbkhpZGU9eygpPT57dGhpcy5oYW5kbGVNb2RhbENsb3NlKCk7fX0+XG4gICAgICAgICAgICAgICAgPE1vZGFsLlRpdGxlPkRhdGEgRW50cnkgRm9ybSAoMSBvZiAyKTwvTW9kYWwuVGl0bGU+XG4gICAgICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgICAgPEZvcm0gYXV0b0NvbXBsZXRlPVwib2ZmXCI+XG4gICAgICAgICAgICAgICAgPFBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8UGFuZWwuSGVhZGluZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQYW5lbC5UaXRsZT5BYm91dCBUcmF2ZWxlcjwvUGFuZWwuVGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDwvUGFuZWwuSGVhZGluZz5cbiAgICAgICAgICAgICAgICAgICAgPFBhbmVsLkJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cInR4dE5hbWVcIiB2YWxpZGF0aW9uU3RhdGU9e3ZhbGlkYXRlTmFtZS5zdGF0dXN9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+TmFtZTwvQ29udHJvbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0cmF2ZWxlciBOYW1lXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnRyYXZlbGVyLm5hbWV9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbGlkYXRlTmFtZS5oZWxwTXNnICYmIDxGb3JtQ29udHJvbC5GZWVkYmFjayAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KHZhbGlkYXRlTmFtZS5oZWxwTXNnKSAmJiA8SGVscEJsb2NrPnt2YWxpZGF0ZU5hbWUuaGVscE1zZ308L0hlbHBCbG9jaz59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJ0eHRTdXJuYW1lXCIgdmFsaWRhdGlvblN0YXRlPXt2YWxpZGF0ZVN1cm5hbWUuc3RhdHVzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPlN1cm5hbWU8L0NvbnRyb2xMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdHJhdmVsZXIgU3VyYW1lXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnRyYXZlbGVyLnN1cm5hbWV9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbGlkYXRlU3VybmFtZS5pc1ZhbGlkICYmIDxGb3JtQ29udHJvbC5GZWVkYmFjayAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KHZhbGlkYXRlU3VybmFtZS5pc1ZhbGlkICYmIHZhbGlkYXRlU3VybmFtZS5oZWxwTXNnKSAmJiA8SGVscEJsb2NrPnt2YWxpZGF0ZU5hbWUuaGVscE1zZ308L0hlbHBCbG9jaz59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJzZWxBZ2VDb2RlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD5QYXNzZW5nZXIgVHlwZSAoQ29kZSk8L0NvbnRyb2xMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgY29tcG9uZW50Q2xhc3M9XCJzZWxlY3RcIiBwbGFjZWhvbGRlcj1cInNlbGVjdFwiIHZhbHVlPXt0aGlzLnN0YXRlLnRyYXZlbGVyLnR5cGVDb2RlfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2VsZWN0XCI+c2VsZWN0PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBRFRcIj5BZHVsdDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQ05OXCI+Q2hpbGQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIklORlwiPkluZmFudDwvb3B0aW9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8L1BhbmVsLkJvZHk+XG4gICAgICAgICAgICAgICAgPC9QYW5lbD5cbiAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9IGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCI+Q2FuY2VsPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmdvTmV4dH0+TmV4dDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICA8L01vZGFsLkRpYWxvZz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TW9kYWwuRGlhbG9nIGNsYXNzTmFtZT1cInJlYWN0LW1vZGFsXCI+XG4gICAgICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uIG9uSGlkZT17KCk9Pnt0aGlzLmhhbmRsZU1vZGFsQ2xvc2UoKTt9fT5cbiAgICAgICAgICAgICAgICA8TW9kYWwuVGl0bGU+RGF0YSBFbnRyeSBGb3JtICgyIG9mIDIpPC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgICA8Rm9ybT5cbiAgICAgICAgICAgICAgICA8UGFuZWw+XG4gICAgICAgICAgICAgICAgICAgIDxQYW5lbC5IZWFkaW5nPjxQYW5lbC5UaXRsZT5BYm91dCBUcmF2ZWw8L1BhbmVsLlRpdGxlPjwvUGFuZWwuSGVhZGluZz5cbiAgICAgICAgICAgICAgICAgICAgPFBhbmVsLkJvZHk+XG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJzZWxUcmF2ZWxUeXBlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+VHJhdmVsIFR5cGU8L0NvbnRyb2xMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIGNvbXBvbmVudENsYXNzPVwic2VsZWN0XCIgcGxhY2Vob2xkZXI9XCJzZWxlY3RcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLnRyYXZlbFR5cGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNlbGVjdFwiPnNlbGVjdDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJ1c2luZXNzXCI+YnVzaW5lc3M8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJsZWlzdXJlXCI+bGVpc3VyZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50cmF2ZWxUeXBlPT09XCJidXNpbmVzc1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+QWRkIENvcnBvcmF0ZSBJRCA/PC9Db250cm9sTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAuQWRkb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBhcmlhLWxhYmVsPVwiLi4uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXAuQWRkb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0R3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50cmF2ZWxUeXBlPT09XCJsZWlzdXJlXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD5BZGQgU3BlY2lhbCBTZXJ2aWNlIFJlcXVlc3QgPzwvQ29udHJvbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwLkFkZG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgYXJpYS1sYWJlbD1cIi4uLlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwLkFkZG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEdyb3VwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvUGFuZWwuQm9keT5cbiAgICAgICAgICAgICAgICA8L1BhbmVsPlxuXG4gICAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVNb2RhbENsb3NlfSBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiPkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5nb0JhY2t9PkJhY2s8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBidG4tc3VjY2Vzc1wiIG9uQ2xpY2s9e3RoaXMuZXhlY3V0ZVNlcnZpY2V9PkNyZWF0ZSBQTlI8L0J1dHRvbj5cblxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICA8L01vZGFsLkRpYWxvZz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPEFsZXJ0IGJzU3R5bGU9XCJzdWNjZXNzXCIgb25EaXNtaXNzPXt0aGlzLmNsb3NlQW5kUmVmcmVzaH0+XG4gICAgICAgICAgICAgICAgPGg0PlN1Y2Nlc3M8L2g0PlxuICAgICAgICAgICAgICAgIDxoci8+XG4gICAgICAgICAgICAgICAgPHA+T3BlcmF0aW9uIGNvbXBsZXRlZCBzdWNlc3NmdWxseSwgZGF0YSB3YXMgd3JpdHRlbiB0byB0aGUgUE5SLCBzZXNzaW9uIHN0YXR1cyB3aWxsIGJlIHJlZnJlc2hlZC4uLjwvcD5cbiAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJzdWNjZXNzXCIgb25DbGljaz17dGhpcy5jbG9zZUFuZFJlZnJlc2h9PkNsb3NlPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9BbGVydD5cbiAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPEFsZXJ0IGJzU3R5bGU9XCJkYW5nZXJcIiBvbkRpc21pc3M9e3RoaXMuaGFuZGxlTW9kYWxDbG9zZX0+XG4gICAgICAgICAgICAgICAgPGg0PkVycm9yPC9oND5cbiAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICBUaGUgb3BlcmF0aW9uIGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQsIHZhbGlkYXRlIHJlY29yZHMgYW5kIHRyeSBhZ2Fpbi4uLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJkYW5nZXJcIiBvbkNsaWNrPXt0aGlzLmdvQmFja30+UmV0cnk8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cblxuICAgIH1cblxufSIsIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBBdXRvLWdlbmVyYXRlZCBmaWxlLiAgICAgICAgICAgICAgKi9cbi8qIERvIG5vdCBtb2RpZnkgaXQuICAgICAgICAgICAgICAgICAqL1xuLyogWW91IG1heSByZW1vdmUgaXQuICAgICAgICAgICAgICAgICovXG4vKiBZb3UgbWF5IGNvbW1pdCBpdC4gICAgICAgICAgICAgICAgKi9cbi8qIFlvdSBtYXkgcHVzaCBpdC4gICAgICAgICAgICAgICAgICAqL1xuLyogUmVtb3ZlIGl0IGlmIG1vZHVsZSBuYW1lIGNoYW5nZWQuICovXG4vKiBlc2xpbnQ6ZGlzYWJsZSAgICAgICAgICAgICAgICAgICAgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQge01haW59IGZyb20gJy4vTWFpbic7XG5pbXBvcnQge0lNb2R1bGVNYW5pZmVzdH0gZnJvbSAnc2FicmUtbmd2LWNvcmUvbW9kdWxlcy9JTW9kdWxlTWFuaWZlc3QnO1xuaW1wb3J0IHtjb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG4vKipcbiAqICBBdXRvZ2VuZXJhdGVkIGNsYXNzIHJlcHJlc2VudGluZyBtb2R1bGUgaW4gcnVudGltZS5cbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZV9jb21fc2FicmVfcmVkYXBwX2Z1bmRhbWVudGFsc193ZWJfbW9kdWxlIGV4dGVuZHMgTWFpbiB7XG4gICAgY29uc3RydWN0b3IobWFuaWZlc3Q6IElNb2R1bGVNYW5pZmVzdCkge1xuICAgICAgICBzdXBlcihtYW5pZmVzdCk7XG4gICAgICAgIGNvbnRleHQuc2V0TW9kdWxlKHRoaXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL21vZHVsZXMvTW9kdWxlJztcbmltcG9ydCB7IGdldFNlcnZpY2UgfSBmcm9tICcuL0NvbnRleHQnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uUG9pbnRTZXJ2aWNlIH0gZnJvbSAnc2FicmUtbmd2LXhwL3NlcnZpY2VzL0V4dGVuc2lvblBvaW50U2VydmljZSc7XG5pbXBvcnQgeyBSZWRBcHBTaWRlUGFuZWxDb25maWcgfSBmcm9tICdzYWJyZS1uZ3YteHAvY29uZmlncy9SZWRBcHBTaWRlUGFuZWxDb25maWcnO1xuaW1wb3J0IHsgUmVkQXBwU2lkZVBhbmVsQnV0dG9uIH0gZnJvbSAnc2FicmUtbmd2LXJlZEFwcFNpZGVQYW5lbC9tb2RlbHMvUmVkQXBwU2lkZVBhbmVsQnV0dG9uJztcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1jb3JlL3NlcnZpY2VzL0xheWVyU2VydmljZSc7XG5pbXBvcnQgeyBDcmVhdGVQTlIgfSBmcm9tICcuL0NyZWF0ZVBOUic7XG5pbXBvcnQgeyBjcmVhdGVQbnJGb3JUd29QYXNzZW5nZXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZVBuckZvclR3b1Bhc3NlbmdlcnMnO1xuaW1wb3J0IHsgUHVibGljTW9kYWxzU2VydmljZSB9IGZyb20gJ3NhYnJlLW5ndi1tb2RhbHMvc2VydmljZXMvUHVibGljTW9kYWxTZXJ2aWNlJztcbmltcG9ydCB7IFNlYXRNYXBzUG9wb3ZlciB9IGZyb20gJy4vY29tcG9uZW50cy9TZWF0TWFwc1BvcG92ZXInO1xuXG5leHBvcnQgY2xhc3MgTWFpbiBleHRlbmRzIE1vZHVsZSB7XG4gICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuXG4gICAgICAgIGNvbnN0IHhwID0gZ2V0U2VydmljZShFeHRlbnNpb25Qb2ludFNlcnZpY2UpO1xuICAgICAgICBjb25zdCBzaWRlcGFuZWxNZW51ID0gbmV3IFJlZEFwcFNpZGVQYW5lbENvbmZpZyhbXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKFxuICAgICAgICAgICAgICAgIFwiQ3JlYXRlIFBOUlwiLFxuICAgICAgICAgICAgICAgIFwiYnRuLXNlY29uZGFyeSBzaWRlLXBhbmVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICgpID0+IHsgdGhpcy5zaG93Rm9ybSgpOyB9LFxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbmV3IFJlZEFwcFNpZGVQYW5lbEJ1dHRvbihcbiAgICAgICAgICAgICAgICBcIlNlYXRNYXBzIEFCQyAzNjBcIixcbiAgICAgICAgICAgICAgICBcImJ0bi1zZWNvbmRhcnkgc2lkZS1wYW5lbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHRoaXMub3BlblNlYXRNYXBzKCk7IH0sXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBuZXcgUmVkQXBwU2lkZVBhbmVsQnV0dG9uKFxuICAgICAgICAgICAgICAgIFwiQ3JlYXRlIFBOUiAyXCIsXG4gICAgICAgICAgICAgICAgXCJidG4tc2Vjb25kYXJ5IHNpZGUtcGFuZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgKCkgPT4geyBjcmVhdGVQbnJGb3JUd29QYXNzZW5nZXJzKCk7IH0sXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgXSk7XG4gICAgICAgIHhwLmFkZENvbmZpZyhcInJlZEFwcFNpZGVQYW5lbFwiLCBzaWRlcGFuZWxNZW51KTtcbiAgICB9XG5cbiAgICBzaG93Rm9ybSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbHMgPSBnZXRTZXJ2aWNlKExheWVyU2VydmljZSk7XG4gICAgICAgIGxzLnNob3dPbkxheWVyKENyZWF0ZVBOUiwgeyBkaXNwbGF5OiBcImFyZWFWaWV3XCIsIHBvc2l0aW9uOiA0MiB9KTtcbiAgICB9XG5cbiAgICBvcGVuU2VhdE1hcHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHB1YmxpY01vZGFsc1NlcnZpY2UgPSBnZXRTZXJ2aWNlKFB1YmxpY01vZGFsc1NlcnZpY2UpO1xuICAgICAgICBwdWJsaWNNb2RhbHNTZXJ2aWNlLnNob3dSZWFjdE1vZGFsKHtcbiAgICAgICAgICAgIGhlYWRlcjogJ1NlbGVjdCBQYXNzZW5nZXJzIGFuZCBTZWdtZW50JyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogUmVhY3QuY3JlYXRlRWxlbWVudChTZWF0TWFwc1BvcG92ZXIpLFxuICAgICAgICAgICAgbW9kYWxDbGFzc05hbWU6ICdzZWF0bWFwLW1vZGFsLWNsYXNzJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge0N1c3RvbUZvcm19IGZyb20gJ3NhYnJlLW5ndi1jdXN0b20tZm9ybXMvaW50ZXJmYWNlcy9mb3JtL0N1c3RvbUZvcm0nO1xuaW1wb3J0IHtJQ3VzdG9tRm9ybXNTZXJ2aWNlfSBmcm9tICdzYWJyZS1uZ3YtY3VzdG9tLWZvcm1zL3NlcnZpY2VzL0lDdXN0b21Gb3Jtc1NlcnZpY2UnO1xuaW1wb3J0IHtnZXRTZXJ2aWNlfSBmcm9tICcuLi9Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IG9wZW5DdXN0b21Gb3JtUGFyYWdyYXBoID0gKHRpdGxlOiBzdHJpbmcsIG1zZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZm9ybTogQ3VzdG9tRm9ybSA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnZmxpZ2h0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUEFSQUdSQVBIJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtc2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Nsb3NlJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBnZXRTZXJ2aWNlKElDdXN0b21Gb3Jtc1NlcnZpY2UpLm9wZW5Gb3JtKGZvcm0pO1xufSIsIi8vIEQwOTs6IFhtbFZpZXdlci50c3hcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBmb3JtYXRYbWwgPSAoeG1sOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IFBBRERJTkcgPSAnICAnO1xuICAgIGNvbnN0IHJlZyA9IC8oPikoPCkoXFwvKikvZztcbiAgICBsZXQgZm9ybWF0dGVkID0gJyc7XG4gICAgbGV0IHBhZCA9IDA7XG5cbiAgICB4bWwgPSB4bWwucmVwbGFjZShyZWcsICckMVxcclxcbiQyJDMnKTtcbiAgICB4bWwuc3BsaXQoJ1xcclxcbicpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgbGV0IGluZGVudCA9IDA7XG4gICAgICAgIGlmIChub2RlLm1hdGNoKC8uKzxcXC9cXHdbXj5dKj4kLykpIHtcbiAgICAgICAgICAgIGluZGVudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5tYXRjaCgvXjxcXC9cXHcvKSkge1xuICAgICAgICAgICAgaWYgKHBhZCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHBhZCAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubWF0Y2goL148XFx3KFtePl0qW14vXSk/Pi4qJC8pKSB7XG4gICAgICAgICAgICBpbmRlbnQgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZW50ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSBQQURESU5HLnJlcGVhdChwYWQpO1xuICAgICAgICBmb3JtYXR0ZWQgKz0gcGFkZGluZyArIG5vZGUgKyAnXFxyXFxuJztcbiAgICAgICAgcGFkICs9IGluZGVudDtcbiAgICB9KTtcblxuICAgIHJldHVybiBmb3JtYXR0ZWQudHJpbSgpO1xufTtcblxuaW50ZXJmYWNlIFhtbFZpZXdlclByb3BzIHtcbiAgICB4bWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IFhtbFZpZXdlcjogUmVhY3QuRkM8WG1sVmlld2VyUHJvcHM+ID0gKHsgeG1sIH0pID0+IHtcbiAgICBjb25zdCBmb3JtYXR0ZWRYbWwgPSBmb3JtYXRYbWwoeG1sKTtcblxuICAgIGNvbnN0IGRvd25sb2FkWG1sID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2Zvcm1hdHRlZFhtbF0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL3htbCcgfSk7XG4gICAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICAgICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgYS5ocmVmID0gdXJsO1xuICAgICAgICBhLmRvd25sb2FkID0gJ0VuaGFuY2VkU2VhdE1hcFJTLnhtbCc7XG4gICAgICAgIGEuY2xpY2soKTtcblxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHgnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJywgbWF4SGVpZ2h0OiAnODB2aCcsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgPGgzPj3rIEVuaGFuY2VkU2VhdE1hcFJTPC9oMz5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAncmlnaHQnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2Rvd25sb2FkWG1sfSBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgPeUgRG93bmxvYWQgWE1MXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwcmUgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLFxuICAgICAgICAgICAgICAgIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmNWY1ZjUnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNXB4JyxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMC44NXJlbScsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dYOiAnYXV0bydcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIHtmb3JtYXR0ZWRYbWx9XG4gICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07Il19 