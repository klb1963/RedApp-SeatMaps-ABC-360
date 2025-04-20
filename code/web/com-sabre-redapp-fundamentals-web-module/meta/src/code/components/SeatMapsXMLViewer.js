"use strict";
// файл: SeatMapXmlViewer.tsx
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatMapXmlViewer = void 0;
var React = require("react");
var SeatMapXmlViewer = function (_a) {
    var xml = _a.xml, onClose = _a.onClose;
    var formatXml = function (xmlString) {
        var PADDING = '  ';
        var reg = /(>)(<)(\/*)/g;
        var formatted = '';
        var pad = 0;
        xmlString = xmlString.replace(reg, '$1\r\n$2$3');
        xmlString.split('\r\n').forEach(function (node) {
            var indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            }
            else if (node.match(/^<\/\w/)) {
                if (pad !== 0)
                    pad -= 1;
            }
            else if (node.match(/^<\w([^>]*[^/])?>.*$/)) {
                indent = 1;
            }
            else {
                indent = 0;
            }
            formatted += PADDING.repeat(pad) + node + '\r\n';
            pad += indent;
        });
        return formatted.trim();
    };
    var downloadXml = function () {
        var blob = new Blob([formatXml(xml)], { type: 'application/xml' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = 'EnhancedSeatMapRS.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (React.createElement("div", { style: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        } },
        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement("h2", null, "\uD83D\uDEEB EnhancedSeatMapRS XML"),
            React.createElement("button", { onClick: downloadXml, style: { padding: '8px 16px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none' } }, "\uD83D\uDCE5 Download XML")),
        React.createElement("pre", { style: {
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                marginTop: '20px'
            } }, formatXml(xml)),
        React.createElement("div", { style: { textAlign: 'right', marginTop: '20px' } },
            React.createElement("button", { className: "btn btn-secondary", onClick: onClose }, "Close"))));
};
exports.SeatMapXmlViewer = SeatMapXmlViewer;
