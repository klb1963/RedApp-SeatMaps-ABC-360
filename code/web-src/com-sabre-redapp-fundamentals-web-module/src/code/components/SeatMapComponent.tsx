// файл: SeatMapComponent.tsx

import * as React from 'react';

interface SeatMapComponentProps {
    passengerIds: string[];  // массив выбранных пассажиров
    segmentId: string;       // выбранный сегмент
}

export class SeatMapComponent extends React.Component<SeatMapComponentProps> {
    render(): JSX.Element {
        const { passengerIds, segmentId } = this.props;

        return (
            <div style={{
                padding: '20px',
                backgroundColor: '#fff',
                minHeight: '400px'
            }}>
                <h2>Seat Map</h2>

                <p><strong>Flight Segment:</strong> {segmentId}</p>

                <p><strong>Selected Passengers:</strong></p>

                <ul>
                    {passengerIds.map((passengerId, index) => (
                        <li key={index}>{passengerId}</li>
                    ))}
                </ul>

                <hr />

                {/* Здесь потом будет карта мест */}
                <div style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#eef',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <p><em>Seat map visualization coming soon...</em></p>
                </div>
            </div>
        );
    }
}