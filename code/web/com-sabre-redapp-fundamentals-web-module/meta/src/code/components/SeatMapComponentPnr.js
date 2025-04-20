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
