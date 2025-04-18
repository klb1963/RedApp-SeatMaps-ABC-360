import { ExtensionPointService } from 'sabre-ngv-xp/services/ExtensionPointService';
import { NoviceButtonConfig } from 'sabre-ngv-xp/configs/NoviceButtonConfig';
import { getService } from '../Context'; // если уже подключено в Main.ts
import { SeatMapsPopover } from './SeatMapsPopover'; // это React-компонент для поповера

export function registerCommandHelperButton() {
    const onClick = (isOpen: boolean) => {
        console.log('SeatMaps ABC 360 button clicked. Popover isOpen:', isOpen);
    };

    const onClose = () => {
        console.log('SeatMaps ABC 360 popover closed');
    };

    const config = new NoviceButtonConfig(
        'SeatMaps ABC 360',       // Label
        'fa-plane',               // Иконка FontAwesome
        'seatmaps-abc360', // CSS класс для поповера (можешь переопределить стили потом)
        SeatMapsPopover,          // Компонент поповера
        -1000,                    // Приоритет: будет слева
        onClick,                  // При клике
        onClose                   // При закрытии
    );

    getService(ExtensionPointService).addConfig('novice-buttons', config);
}