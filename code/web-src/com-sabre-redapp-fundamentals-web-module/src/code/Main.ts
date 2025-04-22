import * as React from 'react';
import { Module } from 'sabre-ngv-core/modules/Module';
import { getService } from './Context';
import { ExtensionPointService } from 'sabre-ngv-xp/services/ExtensionPointService';
import { RedAppSidePanelConfig } from 'sabre-ngv-xp/configs/RedAppSidePanelConfig';
import { RedAppSidePanelButton } from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton';
import { LayerService } from 'sabre-ngv-core/services/LayerService';
import { PublicAirAvailabilityService } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityService';
import { ReactModalOptions } from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';

import { CreatePNR } from './components/createPnr/CreatePNR';
import { createPnrForTwoPassengers } from './components/createPnr/createPnrForTwoPassengers';
import { SeatMapsPopover } from './components/SeatMapsPopover';
import { SeatMapAvailTile } from './components/widgets/SeatMapAvailTile';
import { SeatMapAvailView } from './components/widgets/SeatMapAvailView';

export class Main extends Module {
    init(): void {
        super.init();
        // подключаем виджет для Availability
        this.registerSeatMapAvailTile();
        //
        const xp = getService(ExtensionPointService);
        const sidepanelMenu = new RedAppSidePanelConfig([
            new RedAppSidePanelButton(
                "Create PNR",
                "btn-secondary side-panel-button",
                () => { this.showForm(); },
                false
            ),
            new RedAppSidePanelButton(
                "SeatMaps ABC 360",
                "btn-secondary side-panel-button",
                () => { this.openSeatMaps(); },
                false
            ),
            new RedAppSidePanelButton(
                "Create PNR 2",
                "btn-secondary side-panel-button",
                () => { createPnrForTwoPassengers(); },
                false
            )
        ]);
        xp.addConfig("redAppSidePanel", sidepanelMenu);
    }

    showForm(): void {
        const ls = getService(LayerService);
        ls.showOnLayer(CreatePNR, { display: "areaView", position: 42 });
    }

    openSeatMaps(): void {
        const publicModalsService = getService(PublicModalsService);
        publicModalsService.showReactModal({
            header: 'Select Passengers and Segment',
            component: React.createElement(SeatMapsPopover),
            modalClassName: 'seatmap-modal-class'
        });
    }

    // AvailabilityTile
    private registerSeatMapAvailTile(): void {
        const airAvailabilityService = getService(PublicAirAvailabilityService); // внутренний сервис для предоставления данных в рамках Availability

        const showSeatMapAvailabilityModal = (data: any) => {

            console.log('📥 [Availability] Received Data:', JSON.stringify(data, null, 2));

            const modalOptions: ReactModalOptions = {
                header: 'SeatMaps ABC 360',
                component: React.createElement(SeatMapAvailView, data),
                modalClassName: 'react-tile-modal-class'
            };

            getService(PublicModalsService).showReactModal(modalOptions);
        };

        airAvailabilityService.createAirAvailabilitySearchTile(
            SeatMapAvailTile,
            showSeatMapAvailabilityModal,
            'SeatMaps ABC 360'
        );
    }


}