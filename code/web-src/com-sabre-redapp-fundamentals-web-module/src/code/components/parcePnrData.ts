// файл: parsePnrData.ts

import { Option } from 'sabre-ngv-UIComponents/advancedDropdown/interfaces/Option';

export interface PnrData {
    passengers: Option[];
    segments: Option[];
}

// Принимаем XMLDocument
export const parsePnrData = (xmlDoc: XMLDocument): PnrData => {
    const passengers: Option[] = [];
    const segments: Option[] = [];

    // извлекаем пассажиров из PNR
    const passengerNodes = xmlDoc.getElementsByTagName('stl19:Passenger');
    for (let i = 0; i < passengerNodes.length; i++) {
        const passenger = passengerNodes[i];
        const id = passenger.getAttribute('id') || '';
        const lastName = passenger.getElementsByTagName('stl19:LastName')[0]?.textContent || '';
        const firstName = passenger.getElementsByTagName('stl19:FirstName')[0]?.textContent || '';

        passengers.push({
            label: `${lastName}/${firstName}`,
            value: id
        });
    }

    // извлекаем сегменты полета из PNR
    const segmentNodes = xmlDoc.getElementsByTagName('stl19:Air');
    for (let i = 0; i < segmentNodes.length; i++) {
        const segment = segmentNodes[i];
        const departure = segment.getElementsByTagName('stl19:DepartureAirport')[0]?.textContent || '';
        const arrival = segment.getElementsByTagName('stl19:ArrivalAirport')[0]?.textContent || '';
        const marketingFlightNumber = segment.getElementsByTagName('stl19:MarketingFlightNumber')[0]?.textContent || '';

        segments.push({
            label: `${departure} → ${arrival} (${marketingFlightNumber})`,
            value: `${departure}-${arrival}-${marketingFlightNumber}`
        });
    }

    return { passengers, segments };
};