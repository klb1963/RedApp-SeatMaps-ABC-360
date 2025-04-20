// файл: loadPnrDetailsFromSabre.ts

import { getService } from '../Context';
import { ISoapApiService } from 'sabre-ngv-communication/interfaces/ISoapApiService';
import { PnrPublicService } from 'sabre-ngv-app/app/services/impl/PnrPublicService';
import { parsePnrData, PnrData } from './parcePnrData';

export const loadPnrDetailsFromSabre = async (onDataLoaded: (data: PnrData) => void): Promise<void> => {
    try {
        const pnrService = getService(PnrPublicService);
        const soapApiService = getService(ISoapApiService);

        const recordLocator = pnrService.getRecordLocator();

        if (!recordLocator) {
            console.warn('No active PNR. Please create or retrieve a PNR first.');
            return;
        }

        console.log('Record Locator:', recordLocator);

        const soapPayload = `
            <ns6:GetReservationRQ xmlns:ns6="http://webservices.sabre.com/pnrbuilder/v1_19" Version="1.19.22">
                <ns6:RequestType>Stateful</ns6:RequestType>
                <ns6:ReturnOptions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ns6:ReturnOptions" UnmaskCreditCard="false" ShowTicketStatus="true">
                    <ns6:ViewName>Full</ns6:ViewName>
                    <ns6:ResponseFormat>STL</ns6:ResponseFormat>
                </ns6:ReturnOptions>
            </ns6:GetReservationRQ>
        `;

        const response = await soapApiService.callSws({
            action: 'GetReservationRQ',
            payload: soapPayload,
            authTokenType: 'SESSION'
        });

        console.log('GetReservationRQ Response:', response);

        const parsedData = parsePnrData(response.getParsedValue());

        console.log('🧩 Parsed PNR Data:', JSON.stringify(parsedData, null, 2));
        console.log('Segments:', parsedData.segments);

        // Вот здесь вызываем колбэк, передавая данные!
        onDataLoaded(parsedData);

    } catch (error) {
        console.error('Error calling GetReservationRQ via ISoapApiService:', error);
    }
};