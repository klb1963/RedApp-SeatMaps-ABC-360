import * as React from 'react';
import { getService } from '../Context';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';
import { ReactModalOptions } from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import SeatMapComponentAvail from './SeatMapComponentAvail';
import { quicketConfig } from '../utils/quicketConfig'; // config с настройками библиотеки для отображения карты салона
import { PublicAirAvailabilityData } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityData';

// data: PublicAirAvailabilityData 

export function showSeatMapAvailModal(data: PublicAirAvailabilityData): void {

  const modalService = getService(PublicModalsService); // используем PublicModalsService

  // формируем options для передачи в модальное окно
  const options: ReactModalOptions = {
    header: 'SeatMaps ABC 360 Viewer',
    // создаем React-компонент на основе SeatMapComponent
    component: React.createElement(SeatMapComponentAvail, {
      config: quicketConfig,
      data // передаём data - объект типа PublicAirAvailabilityData целиком
    }),
    onHide: () => console.log('[SeatMap Modal] Closed')
  };

  modalService.showReactModal(options); // показываем модальное окно с его options
  
}