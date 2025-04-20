import {CustomForm} from 'sabre-ngv-custom-forms/interfaces/form/CustomForm';
import {ICustomFormsService} from 'sabre-ngv-custom-forms/services/ICustomFormsService';
import {CustomFormRs} from 'sabre-ngv-custom-forms/interfaces/form/CustomFormRs';
import {TextField} from 'sabre-ngv-custom-forms/interfaces/form/fields/TextField';
import {DatesService} from 'sabre-ngv-app/app/services/impl/DatesService';
import {CommandMessageBasicRs} from 'sabre-ngv-pos-cdm/commsg';
import {ICommandMessageService} from 'sabre-ngv-commsg/services/ICommandMessageService';
import {InterstitialService} from 'sabre-ngv-app/app/services/impl/InterstitialService';

import {getService} from '../Context';
import {openCustomFormParagraph} from '../utils/openCustomFormParagraph';

export const createPnrForTwoPassengers = async (): Promise<void> => {
    const twentyDaysAhead = getService(DatesService).getNow().add(20, 'days').format('DDMMM').toUpperCase();
    const flightCommand = `1EK50Y${twentyDaysAhead}MUCDXB/SS2`; // исправлено: MUC, не FRA

    const form: CustomForm = {
        title: 'Create PNR',
        fields: [
            {
                id: 'name',
                value: '-KLEIMANN/LEONIDMR\n-KLEIMANN/GALINAMRS'
            },
            {
                id: 'flight',
                value: flightCommand
            },
            {
                id: 'ticket',
                value: '01Y2'
            },
            {
                id: 'agent',
                label: 'Agent Info',
                value: '6AGENT'
            },
            {
                id: 'phone',
                value: '912345678900'
            },
            {
                id: 'timeLimit',
                label: 'Ticketing time limit',
                value: '7TAW/'
            }
        ],
        actions: [
            {
                id: 'cancel',
                label: 'Cancel'
            },
            {
                id: 'ok',
                label: 'Submit'
            }
        ]
    };

    const result: CustomFormRs = await getService(ICustomFormsService).openForm(form);
    if (result.action === 'ok') {
        selfSubmitPnrAction(result);
    }
}

const selfSubmitPnrAction = async (form: CustomForm): Promise<void> => {
    const interstitialService = getService(InterstitialService);

    const nameRq: string = (form.fields.find(field => field.id === 'name') as TextField).value;
    const flightRq: string = (form.fields.find(field => field.id === 'flight') as TextField).value;
    const ticketRq: string = (form.fields.find(field => field.id === 'ticket') as TextField).value;
    const agentInfoRq: string = (form.fields.find(field => field.id === 'agent') as TextField).value;
    const phoneRq: string = (form.fields.find(field => field.id === 'phone') as TextField).value;
    const tawRq: string = (form.fields.find(field => field.id === 'timeLimit') as TextField).value;

    interstitialService.showInterstitial(15000);

    const nameRsStatus = await sendCommand(nameRq, 'Name');
    const flightsStatus = nameRsStatus && await sendCommand(flightRq, 'Flight list');
    const ticketRsStatus = flightsStatus && await sendCommand(ticketRq, 'Ticket');
    const agentInfoRsStatus = ticketRsStatus && await sendCommand(agentInfoRq, 'Agent Info');
    const phoneRsStatus = agentInfoRsStatus && await sendCommand(phoneRq, 'Phone');
    const tawRsStatus = phoneRsStatus && await sendCommand(tawRq, 'TAW');
    const receivedFromStatus = tawRsStatus && await sendCommand('6LEONID', 'Received From'); // добавил сюда
    const wpRsStatus = receivedFromStatus && await sendCommand('WP', 'WP');
    const pqRsStatus = wpRsStatus && await sendCommand('PQ', 'PQ');

    interstitialService.hideInterstitial();
    pqRsStatus && openCustomFormParagraph('Create PNR', 'PNR created');
}

const sendCommand = async (command: string, failureSegment: string): Promise<boolean> => {
    const rsStatus: CommandMessageBasicRs = await getService(ICommandMessageService).send(command);
    let isSuccess: boolean = rsStatus.Status.Success;

    if (isSuccess && rsStatus.Status.Messages[0] && rsStatus.Status.Messages[0].Text.includes('SIGN IN')) {
        isSuccess = false;
        handleFailure('Command failed, not signed in.');
    } else if (!isSuccess) {
        handleFailure(failureSegment);
    }

    return isSuccess;
}

const handleFailure = (segment: string): void => {
    openCustomFormParagraph('Create PNR', `${segment} creation failed`);
}