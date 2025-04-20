// файл: SeatMapComponent.tsx

// файл: SeatMapComponent.tsx

import * as React from 'react';

interface SeatMapComponentProps {
    passengerIds: string[];
    segmentId: string;
}

interface SeatMapComponentState {
    layout: any | null;
}

export class SeatMapComponent extends React.Component<SeatMapComponentProps, SeatMapComponentState> {
    iframeRef = React.createRef<HTMLIFrameElement>();

    constructor(props: SeatMapComponentProps) {
        super(props);
        this.state = {
            layout: null
        };
    }

    handleLoadSeatMap = (): void => {
        // 🚀 Вместо запроса - тестовый layout
        const dummyLayout = {
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

        this.setState({ layout: dummyLayout }, () => {
            console.log('✅ Dummy layout set. Sending to iframe...');
            this.sendSeatMapData();
        });
    };

    sendSeatMapData = (): void => {
        const iframe = this.iframeRef.current;
        if (!iframe?.contentWindow) {
            console.warn('⚠️ iframe not ready');
            return;
        }

        const seatMapData = {
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
            layout: this.state.layout
        };

        iframe.contentWindow.postMessage({
            type: 'seatMaps',
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
            layout: JSON.stringify(seatMapData.layout)
        }, '*');

        console.log('📤 Sent seatMapData to iframe:', seatMapData);
    };

    render(): JSX.Element {
        const { passengerIds, segmentId } = this.props;
        const { layout } = this.state;

        return (
            <div style={{ padding: '20px', backgroundColor: '#fff', minHeight: '400px' }}>
                <h2>Seat Map</h2>

                <p><strong>Flight Segment:</strong> {segmentId}</p>

                <p><strong>Selected Passengers:</strong></p>
                <ul>
                    {passengerIds.map((passengerId, index) => (
                        <li key={index}>{passengerId}</li>
                    ))}
                </ul>

                <hr />

                {!layout ? (
                    <div style={{
                        marginTop: '20px',
                        padding: '10px',
                        backgroundColor: '#eef',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <p><em>Seat map visualization coming soon+++</em></p>
                        <button
                            className="btn btn-primary"
                            onClick={this.handleLoadSeatMap}
                        >
                            🚀 Load Dummy Seat Map
                        </button>
                    </div>
                ) : (
                    <iframe
                        ref={this.iframeRef}
                        src="https://quicket.io/react-proxy-app/"
                        width="100%"
                        height="800"
                        style={{ border: '1px solid #ccc', marginTop: '20px' }}
                        title="SeatMapIframe"
                        onLoad={this.sendSeatMapData}
                    />
                )}
            </div>
        );
    }
}