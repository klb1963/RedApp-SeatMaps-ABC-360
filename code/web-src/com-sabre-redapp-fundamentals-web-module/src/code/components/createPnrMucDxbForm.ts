// файл: createPnrMucDxbForm.ts

import { CustomForm } from 'sabre-ngv-custom-forms/interfaces/form/CustomForm';
import { ICustomFormsService } from 'sabre-ngv-custom-forms/services/ICustomFormsService';
import { CustomFormRs } from 'sabre-ngv-custom-forms/interfaces/form/CustomFormRs';
import { TextField } from 'sabre-ngv-custom-forms/interfaces/form/fields/TextField';
import { DatesService } from 'sabre-ngv-app/app/services/impl/DatesService';
import { CommandMessageBasicRs } from 'sabre-ngv-pos-cdm/commsg';
import { ICommandMessageService } from 'sabre-ngv-commsg/services/ICommandMessageService';
import { InterstitialService } from 'sabre-ngv-app/app/services/impl/InterstitialService';

import { getService } from '../Context';
import { openCustomFormParagraph } from '../utils/openCustomFormParagraph';

export const createPnrMucDxbForm = async (): Promise<void> => {
    const form: CustomForm = {
        title: 'Create PNR MUC-DXB',
        fields: [
            { id: 'name', value: '-KLEIMANN/LEONID' },
            { id: 'daysAhead', value: '20' }, // по умолчанию 20 дней
            { id: 'ticket', value: '01Y2' },
            { id: 'agent', value: '6AGENT' },
            { id: 'phone', value: '91234567' },
            { id: 'timeLimit', value: '7TAW/' }
        ],
        actions: [
            { id: 'cancel', label: 'Cancel' },
            { id: 'ok', label: 'Submit' }
        ]
    };

    const result: CustomFormRs = await getService(ICustomFormsService).openForm(form);
    if (result.action === 'ok') {
        selfSubmitPnrMucDxbAction(result);
    }
};

const selfSubmitPnrMucDxbAction = async (form: CustomForm): Promise<void> => {
    const interstitialService = getService(InterstitialService);

    const nameRq: string = (form.fields.find(f => f.id === 'name') as TextField).value;
    const daysAheadStr: string = (form.fields.find(f => f.id === 'daysAhead') as TextField)?.value || '20';
    const daysAhead: number = parseInt(daysAheadStr, 10) || 20;

    const flightDate = getService(DatesService).getNow().add(daysAhead, 'days').format('DDMMM').toUpperCase();
    const flightRq = `0EK${flightDate}MUCDXB50Y`; // правильная команда на рейс EK50!

    const ticketRq: string = (form.fields.find(f => f.id === 'ticket') as TextField).value;
    const agentInfoRq: string = (form.fields.find(f => f.id === 'agent') as TextField).value;
    const phoneRq: string = (form.fields.find(f => f.id === 'phone') as TextField).value;
    const tawRq: string = (form.fields.find(f => f.id === 'timeLimit') as TextField).value;

    interstitialService.showInterstitial(15000);

    try {
        await sendCommand(nameRq, 'Name');
        await sendCommand(flightRq, 'Flight segment');
        await sendCommand(ticketRq, 'Ticket');
        await sendCommand(agentInfoRq, 'Agent info');
        await sendCommand(phoneRq, 'Phone');
        await sendCommand(tawRq, 'Time limit');
        await sendCommand('WP', 'WP');
        await sendCommand('PQ', 'PQ');

        openCustomFormParagraph('Create PNR MUC-DXB', 'PNR created');
    } catch (error) {
        console.error('Error during PNR creation:', error);
    } finally {
        interstitialService.hideInterstitial();
    }
};

const sendCommand = async (command: string, context: string): Promise<void> => {
    const commandService = getService(ICommandMessageService);
    const response: CommandMessageBasicRs = await commandService.send(command);

    if (!response.Status.Success) {
        throw new Error(`${context} creation failed: ${response.Status.Messages?.[0]?.Text}`);
    }
};