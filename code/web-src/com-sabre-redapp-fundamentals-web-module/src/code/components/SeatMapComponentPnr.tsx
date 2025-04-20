// файл: SeatMapComponentPnr.tsx

import * as React from 'react';
import { useEffect, useRef } from 'react';

interface SeatMapComponentPnrProps {
    layout: any;
    config: any;
}

const SeatMapComponentPnr: React.FC<SeatMapComponentPnrProps> = ({ layout, config }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const flight = {
        id: '001', // можно будет заменить на реальный потом
        airlineCode: 'EK',
        flightNo: '50',
        departureDate: '2025-05-30',
        departure: 'MUC',
        arrival: 'DXB',
        cabinClass: 'Y'
    };

    const sendToIframe = () => {
        const iframe = iframeRef.current;
        if (!iframe?.contentWindow) {
            console.warn('⚠️ iframe or contentWindow not available');
            return;
        }

        const message = {
            type: 'seatMaps',
            config: JSON.stringify(config),
            flight: JSON.stringify(flight),
            layout: JSON.stringify(layout),

            // availability и passengers пока не передаем
        };

        console.log('📤 [SeatMapComponentPnr] sending to iframe:', message);
        iframe.contentWindow.postMessage(message, '*');
    };

    useEffect(() => {
        console.log('🛠️ [SeatMapComponentPnr] mounted, sending seat map data to iframe');
        sendToIframe();
    }, [layout]);

    return (
        <div style={{ padding: '1rem' }}>
            <h2>🛫 Seat Map from PNR</h2>

            <iframe
                ref={iframeRef}
                src="https://quicket.io/react-proxy-app/"
                width="100%"
                height="800"
                style={{ border: '1px solid #ccc' }}
                title="SeatMapIframe"
                onLoad={() => {
                    console.log('✅ [SeatMapComponentPnr] iframe loaded, sending seat map data...');
                    sendToIframe();
                }}
            />
        </div>
    );
};

export default SeatMapComponentPnr;