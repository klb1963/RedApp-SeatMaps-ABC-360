// файл: code/components/SeatMapsPopover.tsx

/**
 * SeatMapsPopover - интерфейс для загрузки и отображения карты мест рейса на основе данных PNR.
 * 
 * Позволяет выбрать пассажиров, сегмент, класс обслуживания и перевозчика.
 * Отправляет запрос EnhancedSeatMapRQ в Sabre, отображает результат в модальном окне.
 * 
 * Использует:
 * - loadPnrDetailsFromSabre() для получения данных PNR
 * - loadSeatMapFromSabre() для загрузки карты мест
 */

import * as React from 'react';
import { Button, FormGroup, ControlLabel } from 'react-bootstrap';
import { SimpleDropdown } from 'sabre-ngv-UIComponents/advancedDropdown/components/SimpleDropdown';
import { Option } from 'sabre-ngv-UIComponents/advancedDropdown/interfaces/Option';
import { loadPnrDetailsFromSabre } from './loadPnrDetailsFromSabre';
import { loadSeatMapFromSabre } from './loadSeatMapFromSabre';
import { getService } from '../Context';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';
import { PassengerOption, SegmentOption } from '../utils/parcePnrData';
import { XmlViewer } from '../utils/XmlViewer';

interface SeatMapsPopoverState {
    selectedPassengers: string[];
    selectedSegment: string;
    selectedSegmentFullData: SegmentOption | null;
    selectedCabinClass: string;
    selectedMarketingCarrier: string;
    customMarketingCarrier: string;
    passengers: PassengerOption[];
    segments: SegmentOption[];
    lastXmlResponse: string | null;
}

export class SeatMapsPopover extends React.Component<Record<string, unknown>, SeatMapsPopoverState> {
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            selectedPassengers: [],
            selectedSegment: '',
            selectedSegmentFullData: null, 
            selectedCabinClass: 'Economy',
            selectedMarketingCarrier: 'LH',
            customMarketingCarrier: '',
            passengers: [],
            segments: [],
            lastXmlResponse: null
        };
    }

    cabinClasses: Option<string>[] = [
        { label: 'Economy (Y)', value: 'Economy' },
        { label: 'Premium Economy (W)', value: 'PremiumEconomy' },
        { label: 'Business (J)', value: 'Business' },
        { label: 'First (F)', value: 'First' }
    ];

    componentDidMount(): void {
        loadPnrDetailsFromSabre((data) => {
            let selectedSegment = '';
            let selectedSegmentFullData: SegmentOption | null = null;
    
            if (data.segments.length === 1) {
                selectedSegment = data.segments[0].value;
                selectedSegmentFullData = data.segments[0];
            }
    
            let selectedMarketingCarrier = 'LH';
            let customMarketingCarrier = '';
    
            if (data.segments.length > 0) {
                const marketingCarrier = data.segments[0].marketingCarrier.trim().toUpperCase();
                if (marketingCarrier === 'LH' || marketingCarrier === 'EK') {
                    selectedMarketingCarrier = marketingCarrier;
                } else if (marketingCarrier) {
                    selectedMarketingCarrier = 'Other';
                    customMarketingCarrier = marketingCarrier;
                }
            }
    
            this.setState({
                passengers: data.passengers.map(p => ({ ...p, checked: true })),
                selectedPassengers: data.passengers.map(p => p.value),
                segments: data.segments,
                selectedSegment,
                selectedSegmentFullData,
                lastXmlResponse: null,
                selectedMarketingCarrier,
                customMarketingCarrier
            });
        });
    }

    handlePassengerChange = (passengerValue: string): void => {
        this.setState((prevState) => ({
            selectedPassengers: prevState.selectedPassengers.includes(passengerValue)
                ? prevState.selectedPassengers.filter(p => p !== passengerValue)
                : [...prevState.selectedPassengers, passengerValue]
        }));
    };

    handleSegmentChange = (options: Option[]): void => {
        const selected = options.find(opt => opt.checked);
        if (selected) {
            const fullData = this.state.segments.find(seg => seg.value === selected.value) || null;
            this.setState({ selectedSegment: selected.value, selectedSegmentFullData: fullData });
        }
    }

    handleCabinClassChange = (options: Option[]): void => {
        const selected = options.find(opt => opt.checked);
        if (selected) this.setState({ selectedCabinClass: selected.value });
    };

    handleMarketingCarrierChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        this.setState({
            selectedMarketingCarrier: event.target.value,
            customMarketingCarrier: event.target.value === 'Other' ? '' : ''
        });
    };

    handleCustomMarketingCarrierChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ customMarketingCarrier: event.target.value.toUpperCase() });
    };

    private loadSeatMap = async ({ availabilityInfo, silent = false }: { availabilityInfo: boolean; silent?: boolean }): Promise<void> => {
        const { selectedPassengers, selectedSegment, selectedCabinClass, selectedMarketingCarrier, customMarketingCarrier, segments, passengers } = this.state;
        const selectedSegmentData = segments.find(seg => seg.value === selectedSegment);
        if (!selectedSegmentData) return console.error('❌ No segment data found.');

        const marketingCarrierFinal = selectedMarketingCarrier === 'Other' ? customMarketingCarrier : selectedMarketingCarrier;

        const flightSegment = {
            id: selectedSegment,
            origin: selectedSegmentData.origin,
            destination: selectedSegmentData.destination,
            departureDate: selectedSegmentData.departureDate,
            marketingCarrier: marketingCarrierFinal,
            marketingFlightNumber: selectedSegmentData.marketingFlightNumber,
            flightNumber: selectedSegmentData.marketingFlightNumber,
            bookingClass: selectedSegmentData.bookingClass,
            equipment: selectedSegmentData.equipment,
            cabin: selectedCabinClass as any
        };

        const mappedPassengers = passengers.filter(p => selectedPassengers.includes(p.value)).map(p => ({
            id: p.value,
            travellerId: Number(p.value),
            givenName: p.givenName,
            surname: p.surname
        }));

        await loadSeatMapFromSabre(flightSegment, mappedPassengers, (response) => {
            const prettyXml = new XMLSerializer().serializeToString(response);
            this.setState({ lastXmlResponse: prettyXml });

            if (!silent) {
                getService(PublicModalsService).showReactModal({
                    header: availabilityInfo ? '🛫 Seat Map (Occupied)' : '🛫 Seat Map (Empty)',
                    component: <XmlViewer xml={prettyXml} />, modalClassName: 'seatmap-xml-modal'
                });
            }
        });
    };

    handleShowRawXml = async (): Promise<void> => {
        if (!this.state.lastXmlResponse) {
            await this.loadSeatMap({ availabilityInfo: false, silent: true });
        }
        getService(PublicModalsService).showReactModal({
            header: '📄 Last EnhancedSeatMapRS XML',
            component: <XmlViewer xml={this.state.lastXmlResponse || ''} />,
            modalClassName: 'seatmap-xml-modal'
        });
    };

    render(): JSX.Element {
        const { passengers, segments, selectedPassengers, selectedSegment, selectedCabinClass, selectedMarketingCarrier, customMarketingCarrier } = this.state;
        const isButtonDisabled = selectedPassengers.length === 0 || !selectedSegment;
        const selectedSegmentData = segments.find(seg => seg.value === selectedSegment);

        return (
            <div style={{ padding: '20px', minWidth: '400px', backgroundColor: '#fff' }}>
                <FormGroup>
                    <ControlLabel>Select Passengers ({selectedPassengers.length})</ControlLabel>
                    <div style={{ marginTop: '10px' }}>
                        {passengers.map(passenger => (
                            <div key={passenger.value} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                <input type="checkbox" checked={selectedPassengers.includes(passenger.value)} onChange={() => this.handlePassengerChange(passenger.value)} style={{ marginRight: '8px' }} />
                                <span>{passenger.label}</span>
                            </div>
                        ))}
                    </div>
                </FormGroup>

                {this.state.selectedSegmentFullData && (
                    <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>
                        ✈️ {this.state.selectedSegmentFullData.origin} → {this.state.selectedSegmentFullData.destination}
                        ({this.state.selectedSegmentFullData.marketingCarrier}{this.state.selectedSegmentFullData.marketingFlightNumber})
                        <br />
                        📅 Departure: {this.state.selectedSegmentFullData.departureDate}
                    </div>
                )}

                <FormGroup>
                    <ControlLabel>Select Flight Segment</ControlLabel>

                    <SimpleDropdown
                        options={segments.map(seg => ({
                            ...seg,
                            checked: seg.value === selectedSegment
                        }))}
                        onChange={this.handleSegmentChange}
                    />

                </FormGroup>

                <FormGroup>
                    <ControlLabel>Select Cabin Class</ControlLabel>
                    <SimpleDropdown options={this.cabinClasses.map(opt => ({ ...opt, checked: opt.value === selectedCabinClass }))} onChange={this.handleCabinClassChange} />
                </FormGroup>

                {selectedCabinClass && (
                    <div style={{ marginTop: '10px', marginBottom: '10px',fontWeight: 'bold', color: '#0066cc' }}>
                        🎟️ Selected Cabin: {selectedCabinClass}
                    </div>
                )}

                <FormGroup>
                    <ControlLabel>Select Marketing Carrier</ControlLabel>
                    <select value={selectedMarketingCarrier} onChange={this.handleMarketingCarrierChange} className="form-control">
                        <option value="LH">LH (Lufthansa)</option>
                        <option value="EK">EK (Emirates)</option>
                        <option value="Other">Other...</option>
                    </select>
                    {selectedMarketingCarrier === 'Other' && (
                        <input type="text" maxLength={2} className="form-control" placeholder="e.g., AA, BA, AF" value={customMarketingCarrier} onChange={this.handleCustomMarketingCarrierChange} />
                    )}
                </FormGroup>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                    <Button className="btn-info" disabled={isButtonDisabled} onClick={this.handleShowRawXml}>
                        📄 Show Raw XML
                    </Button>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button className="btn-primary" style={{ flex: 1 }} disabled={isButtonDisabled} onClick={() => this.loadSeatMap({ availabilityInfo: false })}>
                            ✈️ Empty Seat Map
                        </Button>
                        <Button className="btn-success" style={{ flex: 1 }} disabled={isButtonDisabled} onClick={() => this.loadSeatMap({ availabilityInfo: true })}>
                            👥 Occupied Seat Map
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
