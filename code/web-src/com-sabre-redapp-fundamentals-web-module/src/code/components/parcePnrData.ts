import { Option } from 'sabre-ngv-UIComponents/advancedDropdown/interfaces/Option';

export interface PassengerOption extends Option<string> {
    givenName: string;
    surname: string;
}

export interface SegmentOption extends Option<string> {
    origin: string;
    destination: string;
    departureDate: string;
    marketingCarrier: string;
    marketingFlightNumber: string;
    bookingClass: string;
    equipment: string; // ⚡️ добавили сюда!
}

export interface PnrData {
    passengers: PassengerOption[];
    segments: SegmentOption[];
}

export const parsePnrData = (xmlDoc: XMLDocument): PnrData => {
    const passengers: PassengerOption[] = [];
    const segments: SegmentOption[] = [];

    // --- пассажиры ---
    const passengerNodes = xmlDoc.getElementsByTagName('stl19:Passenger');
    for (let i = 0; i < passengerNodes.length; i++) {
        const passenger = passengerNodes[i];
        const id = passenger.getAttribute('id') || '';
        const lastName = passenger.getElementsByTagName('stl19:LastName')[0]?.textContent || '';
        const firstName = passenger.getElementsByTagName('stl19:FirstName')[0]?.textContent || '';

        passengers.push({
            label: `${lastName}/${firstName}`,
            value: id,
            givenName: firstName,
            surname: lastName
        });
    }

    // --- сегменты ---
    const segmentNodes = xmlDoc.getElementsByTagName('stl19:Air');
    for (let i = 0; i < segmentNodes.length; i++) {
        const segment = segmentNodes[i];

        const departure = segment.getElementsByTagName('stl19:DepartureAirport')[0]?.textContent || '';
        const arrival = segment.getElementsByTagName('stl19:ArrivalAirport')[0]?.textContent || '';

        const marketingCarrier = segment.getElementsByTagName('stl19:MarketingCarrier')[0]?.textContent || 'LH'; // ставим дефолт LH
        const bookingClass = segment.getElementsByTagName('stl19:ResBookDesigCode')[0]?.textContent || 'Y';       // ставим дефолт Y

        const marketingFlightNumber = segment.getElementsByTagName('stl19:MarketingFlightNumber')[0]?.textContent || '';
        const departureDateRaw = segment.getElementsByTagName('stl19:DepartureDateTime')[0]?.textContent || '';
        const equipment = segment.getElementsByTagName('stl19:EquipmentType')[0]?.textContent || ''; // ⚡️ equipment

        const departureDate = departureDateRaw.split('T')[0];

        segments.push({
            label: `${departure} → ${arrival} (${marketingFlightNumber})`,
            value: `${departure}-${arrival}-${marketingFlightNumber}`,
            origin: departure,
            destination: arrival,
            departureDate,
            marketingCarrier,
            marketingFlightNumber,
            bookingClass,
            equipment // ⚡️ equipment добавляем в сегмент
        });
    }

    return { passengers, segments };
};