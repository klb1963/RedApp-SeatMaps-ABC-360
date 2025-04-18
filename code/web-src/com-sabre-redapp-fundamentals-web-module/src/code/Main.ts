import { Module } from 'sabre-ngv-core/modules/Module';
import { getService } from './Context';
import { ExtensionPointService } from 'sabre-ngv-xp/services/ExtensionPointService';
import { RedAppSidePanelConfig } from 'sabre-ngv-xp/configs/RedAppSidePanelConfig';
import { RedAppSidePanelButton } from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton';
import { LayerService } from 'sabre-ngv-core/services/LayerService';
import { CreatePNR } from './CreatePNR';
import { SeatMapsPopover } from './components/SeatMapsPopover';
import { createPnrMucDxbForm } from './components/createPnrMucDxbForm';

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
                "Create PNR MUC-DXB",                  // новая кнопка
                "btn-secondary side-panel-button",
                () => { createPnrMucDxbForm(); },       // вызываем createPnrMucDxbForm()
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
        const ls = getService(LayerService);
        ls.showOnLayer(SeatMapsPopover, { display: "areaView", position: 43 });
    }


}