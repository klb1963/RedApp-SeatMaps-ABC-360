import * as React from 'react';
import { useEffect } from 'react';
import { PublicAirAvailabilityData } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityData';
import { showSeatMapAvailModal } from '../showSeatMapAvailModal';

export const SeatMapAvailView = (data: PublicAirAvailabilityData): React.ReactElement => {
    useEffect(() => {
      console.log('🚀 SeatMapAvailView data:', data); // лог в онсоль
      showSeatMapAvailModal(data); // вызываем функцию показа модального окна c данными (data)
    }, []);
  
    return (
      <div className={'sdk-seatmap-custom-tile-content'}>
        <p>Открываем SeatMap Viewer...</p>
      </div>
    );
  };