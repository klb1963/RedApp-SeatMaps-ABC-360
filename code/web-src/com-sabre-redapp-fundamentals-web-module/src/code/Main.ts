import * as React from 'react';
import { Module } from 'sabre-ngv-core/modules/Module';
import { getService } from './Context';
import { ExtensionPointService } from 'sabre-ngv-xp/services/ExtensionPointService';
import { RedAppSidePanelConfig } from 'sabre-ngv-xp/configs/RedAppSidePanelConfig';
import { RedAppSidePanelButton } from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton';
import { LayerService } from 'sabre-ngv-core/services/LayerService';
import { CreatePNR } from './CreatePNR';
import { createPnrForTwoPassengers } from './components/createPnrForTwoPassengers';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';
import { SeatMapsPopover } from './components/SeatMapsPopover';

export class Main extends Module {
    init(): void {
        super.init();

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

}