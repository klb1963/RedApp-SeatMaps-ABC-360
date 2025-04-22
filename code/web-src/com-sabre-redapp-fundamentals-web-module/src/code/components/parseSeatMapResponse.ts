// файл code/components/parseSeatMapResponse.ts

/**
 * Парсит ответ от EnhancedSeatMapRS и возвращает структуру карты салона.
 */

export interface ParsedSeatMap {
    layout: any;
    availability: any;
    passengers: any;
}

export function parseSeatMapResponse(xmlDocument: Document): ParsedSeatMap {
    console.log('📥 Начинаем разбор ответа EnhancedSeatMapRS');

    const layout = {
        decks: [],
    };
    const availability = [];
    const passengers = [];

    // 1. Находим все кабины (Cabin)
    const cabinNodes = xmlDocument.getElementsByTagName('Cabin');

    for (let i = 0; i < cabinNodes.length; i++) {
        const cabinNode = cabinNodes[i];
        const rows = [];

        const rowNodes = cabinNode.getElementsByTagName('Row');

        for (let j = 0; j < rowNodes.length; j++) {
            const rowNode = rowNodes[j];
            const rowLabel = rowNode.getAttribute('number') || (j + 1).toString();

            const seatNodes = rowNode.getElementsByTagName('Seat');
            const seats = [];

            for (let k = 0; k < seatNodes.length; k++) {
                const seatNode = seatNodes[k];
                const seatLabel = seatNode.getAttribute('number') || '';
                const x = 50 + k * 50; // Простейшее позиционирование по X
                const y = 50 + j * 50; // Простейшее позиционирование по Y

                seats.push({ label: seatLabel, x, y });
            }

            rows.push({ label: rowLabel, seats });
        }

        layout.decks.push({
            id: `deck-${i}`,
            name: `Deck ${i + 1}`,
            width: 600,
            height: 800,
            rows,
        });
    }

    // 2. Находим предложения (Offers → места, доступные для покупки)
    const offerNodes = xmlDocument.getElementsByTagName('Offer');

    for (let i = 0; i < offerNodes.length; i++) {
        const offerNode = offerNodes[i];

        const seatNumber = offerNode.getAttribute('seatNumber');
        const priceNode = offerNode.querySelector('Price > TotalAmount');
        const price = priceNode?.textContent || '0';
        const currency = priceNode?.getAttribute('currencyCode') || 'USD';

        availability.push({
            label: seatNumber,
            price: parseFloat(price),
            currency,
        });
    }

    // 3. Пассажиры (упрощённо, можно позже доработать)
    passengers.push({ id: 'PAX1', name: 'Passenger 1', type: 'ADT' });

    console.log('✅ Разобранные данные:', { layout, availability, passengers });

    return { layout, availability, passengers };
}