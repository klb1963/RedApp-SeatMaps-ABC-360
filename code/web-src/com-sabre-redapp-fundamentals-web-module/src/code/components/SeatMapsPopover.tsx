import * as React from 'react';
import { Button, FormGroup, ControlLabel } from 'react-bootstrap';
import { SimpleDropdown } from 'sabre-ngv-UIComponents/advancedDropdown/components/SimpleDropdown';
import { Option } from 'sabre-ngv-UIComponents/advancedDropdown/interfaces/Option';
import { loadPnrDetailsFromSabre } from './loadPnrDetailsFromSabre';
import { getService } from '../Context';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';
import { ReactModalOptions } from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import { SeatMapComponent } from './SeatMapComponent';

interface SeatMapsPopoverState {
    selectedPassengers: string[];
    selectedSegment: string;
    passengers: Option[];
    segments: Option[];
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

    handleOpenSeatMap = (): void => {
        const publicModalsService = getService(PublicModalsService);

        const modalOptions: ReactModalOptions = {
            header: 'Seat Map',
            component: React.createElement(SeatMapComponent, {
                passengerIds: this.state.selectedPassengers,
                segmentId: this.state.selectedSegment
            }),
            modalClassName: 'seatmap-modal-class'
        };

        publicModalsService.showReactModal(modalOptions);

        (this.props['__layerInstance'] as any)?.close(); // Без ошибок
    }

    render(): JSX.Element {
        const { passengers, segments, selectedPassengers, selectedSegment } = this.state;
        const isButtonDisabled = selectedPassengers.length === 0 || !selectedSegment;

        return (
            <div style={{
                padding: '20px',
                width: '400px',
                minHeight: '350px',
                overflowY: 'auto',
                backgroundColor: '#fff',
                borderRadius: '8px'
            }}>
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

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button className="btn-primary" onClick={this.handleOpenSeatMap} disabled={isButtonDisabled}>
                        Open Seat Map
                    </Button>
                </div>
            </div>
        );
    }
}