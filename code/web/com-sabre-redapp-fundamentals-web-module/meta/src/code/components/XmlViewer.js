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
