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
    equipment: string;
}

export interface PnrData {
    passengers: PassengerOption[];
    segments: SegmentOption[];
}

export const parsePnrData = (xmlDoc: XMLDocument): PnrData => {
    const passengers: PassengerOption[] = [];
    const segments: SegmentOption[] = [];

    // --- Пассажиры ---
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

    // --- Сегменты ---
    const airSegmentNodes = xmlDoc.getElementsByTagName('stl19:Air');
    for (let i = 0; i < airSegmentNodes.length; i++) {
        const segment = airSegmentNodes[i];

        const id = segment.getAttribute('id') || '';
        const origin = segment.getElementsByTagName('stl19:DepartureAirport')[0]?.textContent || '';
        const destination = segment.getElementsByTagName('stl19:ArrivalAirport')[0]?.textContent || '';
        const departureDateTime = segment.getElementsByTagName('stl19:DepartureDateTime')[0]?.textContent || '';

        const marketingCarrierNode = segment.getElementsByTagName('stl19:MarketingAirline')[0];
        const operatingCarrierNode = segment.getElementsByTagName('stl19:OperatingAirline')[0];

        const marketingCarrier = marketingCarrierNode?.textContent?.trim()
            || operatingCarrierNode?.textContent?.trim()
            || 'UNKNOWN';

        const marketingFlightNumber = segment.getElementsByTagName('stl19:MarketingFlightNumber')[0]?.textContent || '';
        const bookingClass = segment.getElementsByTagName('stl19:ResBookDesigCode')[0]?.textContent || '';
        const equipment = segment.getElementsByTagName('stl19:Equipment')[0]?.textContent || '';

        // Извлекаем только дату из DepartureDateTime
        let departureDate = '';
        if (departureDateTime.includes('T')) {
            departureDate = departureDateTime.split('T')[0];
        }

        segments.push({
            label: `${origin} → ${destination} (${marketingCarrier}${marketingFlightNumber})`,
            value: id,
            origin,
            destination,
            departureDate,
            marketingCarrier,
            marketingFlightNumber,
            bookingClass,
            equipment
        });
    }

    return { passengers, segments };
};