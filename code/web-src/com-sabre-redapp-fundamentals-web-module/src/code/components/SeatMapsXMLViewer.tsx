// файл: SeatMapXmlViewer.tsx

import * as React from 'react';

interface SeatMapXmlViewerProps {
    xml: string;
    onClose: () => void;
}

export const SeatMapXmlViewer: React.FC<SeatMapXmlViewerProps> = ({ xml, onClose }) => {

    const formatXml = (xmlString: string): string => {
        const PADDING = '  ';
        const reg = /(>)(<)(\/*)/g;
        let formatted = '';
        let pad = 0;

        xmlString = xmlString.replace(reg, '$1\r\n$2$3');
        xmlString.split('\r\n').forEach((node) => {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad !== 0) pad -= 1;
            } else if (node.match(/^<\w([^>]*[^/])?>.*$/)) {
                indent = 1;
            } else {
                indent = 0;
            }

            formatted += PADDING.repeat(pad) + node + '\r\n';
            pad += indent;
        });

        return formatted.trim();
    };

    const downloadXml = (): void => {
        const blob = new Blob([formatXml(xml)], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'EnhancedSeatMapRS.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>🛫 EnhancedSeatMapRS XML</h2>
                <button onClick={downloadXml} style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
                    📥 Download XML
                </button>
            </div>

            <pre style={{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                marginTop: '20px'
            }}>
                {formatXml(xml)}
            </pre>

            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <button className="btn btn-secondary" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};