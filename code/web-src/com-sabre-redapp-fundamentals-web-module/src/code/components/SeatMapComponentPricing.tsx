import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

interface SeatMapComponentPricingProps {
  config: any;
  flightSegments: any[];
  selectedSegmentIndex: number;
}

const SeatMapComponentPricing: React.FC<SeatMapComponentPricingProps> = ({
  config,
  flightSegments,
  selectedSegmentIndex
}) => {
  const [segmentIndex, setSegmentIndex] = useState(selectedSegmentIndex);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentSegment = flightSegments[segmentIndex] || {};

  const seatMapData = {
    config,
    flight: {
      id: '001',
      airlineCode: currentSegment.marketingAirline || 'LH',
      flightNo: currentSegment.flightNumber || '123',
      departureDate: currentSegment.departureDateTime || '2025-04-22',
      departure: currentSegment.origin || 'MUC',
      arrival: currentSegment.destination || 'FRA',
      cabinClass: currentSegment.cabinClass || 'A'
    },
    layout: {
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
    },
    availability: [
      { label: '1A', price: 50, currency: 'USD', color: 'green', onlyForPassengerType: ['ADT'] },
      { label: '1B', price: 45, currency: 'USD', color: 'yellow', onlyForPassengerType: ['ADT'] },
      { label: '2A', price: 30, currency: 'USD', color: 'lightblue' }
    ],
    passengers: [{ id: 'PAX1', name: 'Иванов И.И.', type: 'ADT' }]
  };

  const sendToIframe = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) {
      console.warn('⚠️ iframe or contentWindow not available');
      return;
    }

    const message = {
      type: 'seatMaps',
      config: JSON.stringify(seatMapData.config),
      flight: JSON.stringify(seatMapData.flight),
      layout: JSON.stringify(seatMapData.layout)
      // availability: JSON.stringify(seatMapData.availability),
      // passengers: JSON.stringify(seatMapData.passengers)
    };

    console.log('📤 [SeatMapComponent] sending to iframe:', message);
    iframe.contentWindow.postMessage(message, '*');
  };

  useEffect(() => {
    console.log(`🔄 Segment index changed: ${segmentIndex}`);
    sendToIframe();
  }, [segmentIndex]);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="segmentSelect">Выберите сегмент: </label>
        <select
          id="segmentSelect"
          value={segmentIndex}
          onChange={(e) => setSegmentIndex(Number(e.target.value))}
        >
          {flightSegments.map((segment, index) => (
            <option key={index} value={index}>
              {segment.marketingAirline || 'XX'} {segment.flightNumber || '000'} → {segment.origin || '???'} – {segment.destination || '???'}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#333' }}>
        <strong>🛫 Flight info:</strong>
        <pre>{JSON.stringify(currentSegment, null, 2)}</pre>
      </div>

      <iframe
        ref={iframeRef}
        src="https://quicket.io/react-proxy-app/"
        width="100%"
        height="800"
        style={{ border: '1px solid #ccc' }}
        title="SeatMapIframe"
        onLoad={() => {
          console.log('✅ [SeatMapComponent] iframe loaded, sending data...');
          sendToIframe();
        }}
      />
    </div>
  );
};

export default SeatMapComponentPricing;