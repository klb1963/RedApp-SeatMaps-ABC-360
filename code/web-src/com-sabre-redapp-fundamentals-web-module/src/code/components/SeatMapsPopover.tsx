// файл: SeatMapsPopover.tsx

import * as React from 'react';
import { Button, FormGroup, ControlLabel } from 'react-bootstrap';
import { SimpleDropdown } from 'sabre-ngv-UIComponents/advancedDropdown/components/SimpleDropdown';
import { Option } from 'sabre-ngv-UIComponents/advancedDropdown/interfaces/Option';
import { loadPnrDetailsFromSabre } from './loadPnrDetailsFromSabre';
import { loadSeatMapFromSabre } from './loadSeatMapFromSabre';
import { getService } from '../Context';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';
import { PassengerOption, SegmentOption } from './parcePnrData'; // ✅ исправленный импорт
import { XmlViewer } from './XmlViewer'; // внешний компонент XmlViewer

interface SeatMapsPopoverState {
    selectedPassengers: string[];
    selectedSegment: string;
    passengers: PassengerOption[];
    segments: SegmentOption[];
}

export class SeatMapsPopover extends React.Component<Record<string, unknown>, SeatMapsPopoverState> {
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            selectedPassengers: [],
            selectedSegment: '',
            passengers: [],
            segments: []
        };
    }

    componentDidMount(): void {
        loadPnrDetailsFromSabre((data) => {
            this.setState({
                passengers: data.passengers.map(p => ({ ...p, checked: true })),
                selectedPassengers: data.passengers.map(p => p.value),
                segments: data.segments
            });
        });
    }

    handlePassengerChange = (passengerValue: string): void => {
        const { selectedPassengers } = this.state;
        const isSelected = selectedPassengers.includes(passengerValue);

        const updatedPassengers = isSelected
            ? selectedPassengers.filter(p => p !== passengerValue)
            : [...selectedPassengers, passengerValue];

        this.setState({ selectedPassengers: updatedPassengers });
    }

    handleSegmentChange = (options: Option[]): void => {
        const selected = options.find(opt => opt.checked);
        if (selected) {
            this.setState({ selectedSegment: selected.value });
        }
    }

    handleEmptySeatMap = (): void => {
        const { selectedSegment } = this.state;
        if (!selectedSegment) {
            console.warn('❗ Please select a segment first.');
            return;
        }
        // сюда код для показа пустой карты
    };
    
    handleOccupiedSeatMap = (): void => {
        const { selectedSegment } = this.state;
        if (!selectedSegment) {
            console.warn('❗ Please select a segment first.');
            return;
        }
        // сюда код для запроса карты с данными
    };

    // Общий метод для запроса карты
    private loadSeatMap = ({ availabilityInfo }: { availabilityInfo: boolean }): void => {
        const { selectedPassengers, selectedSegment, segments, passengers } = this.state;

        const selectedSegmentData = segments.find(seg => seg.value === selectedSegment) as SegmentOption;
        if (!selectedSegmentData) {
            console.error('❌ No segment data found for selected segment.');
            return;
        }

        const flightSegment = {
            id: selectedSegment,
            origin: selectedSegmentData.origin,
            destination: selectedSegmentData.destination,
            departureDate: selectedSegmentData.departureDate,
            marketingCarrier: selectedSegmentData.marketingCarrier,
            marketingFlightNumber: selectedSegmentData.marketingFlightNumber,
            flightNumber: selectedSegmentData.marketingFlightNumber,
            bookingClass: selectedSegmentData.bookingClass,
            equipment: selectedSegmentData.equipment
        };

        const selectedPassengersData = passengers.filter(p => selectedPassengers.includes(p.value));

        const mappedPassengers = selectedPassengersData.map(p => ({
            id: p.value,
            travellerId: Number(p.value),
            givenName: p.givenName,
            surname: p.surname
        }));

        loadSeatMapFromSabre(flightSegment, mappedPassengers, (response) => {
            console.log('✅ Seat map response received from Sabre:', response);

            const serializer = new XMLSerializer();
            const prettyXml = serializer.serializeToString(response);

            const publicModalsService = getService(PublicModalsService);
            publicModalsService.showReactModal({
                header: availabilityInfo ? '🛫 Seat Map (Occupied)' : '🛫 Seat Map (Empty)',
                component: <XmlViewer xml={prettyXml} />,
                modalClassName: 'seatmap-xml-modal'
            });
        });
    };

    render(): JSX.Element {
        const { passengers, segments, selectedPassengers, selectedSegment } = this.state;
        const isButtonDisabled = selectedPassengers.length === 0 || !selectedSegment;

        return (
            <div style={{ padding: '20px', minWidth: '400px', backgroundColor: '#fff' }}>
                <FormGroup>
                    <ControlLabel>Select Passengers ({selectedPassengers.length})</ControlLabel>
                    <div style={{ marginTop: '10px' }}>
                        {passengers.map(passenger => (
                            <div key={passenger.value} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                <input
                                    type="checkbox"
                                    checked={selectedPassengers.includes(passenger.value)}
                                    onChange={() => this.handlePassengerChange(passenger.value)}
                                    style={{ marginRight: '8px' }}
                                />
                                <span>{passenger.label}</span>
                            </div>
                        ))}
                    </div>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Select Flight Segment</ControlLabel>
                    <SimpleDropdown
                        options={segments}
                        onChange={this.handleSegmentChange}
                    />
                </FormGroup>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button
                        className="btn-primary"
                        disabled={isButtonDisabled}
                        onClick={this.handleEmptySeatMap}
                    >
                        ✈️ Empty Seat Map
                    </Button>

                    <Button
                        className="btn-success"
                        disabled={isButtonDisabled}
                        onClick={this.handleOccupiedSeatMap}
                    >
                        👥 Occupied Seat Map
                    </Button>
                </div>
            </div>
        );
    }
}