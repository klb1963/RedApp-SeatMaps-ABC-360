"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSeatMapResponse = void 0;
/**
 * Парсит ответ от EnhancedSeatMapRS и возвращает структуру карты салона.
 */
function parseSeatMapResponse(xmlDocument) {
    console.log('📥 Начинаем разбор ответа EnhancedSeatMapRS');
    var layout = {
        decks: [],
    };
    var availability = [];
    var passengers = [];
    // 1. Находим все кабины (Cabin)
    var cabinNodes = xmlDocument.getElementsByTagName('Cabin');
    for (var i = 0; i < cabinNodes.length; i++) {
        var cabinNode = cabinNodes[i];
        var rows = [];
        var rowNodes = cabinNode.getElementsByTagName('Row');
        for (var j = 0; j < rowNodes.length; j++) {
            var rowNode = rowNodes[j];
            var rowLabel = rowNode.getAttribute('number') || (j + 1).toString();
            var seatNodes = rowNode.getElementsByTagName('Seat');
            var seats = [];
            for (var k = 0; k < seatNodes.length; k++) {
                var seatNode = seatNodes[k];
                var seatLabel = seatNode.getAttribute('number') || '';
                var x = 50 + k * 50; // Простейшее позиционирование по X
                var y = 50 + j * 50; // Простейшее позиционирование по Y
                seats.push({ label: seatLabel, x: x, y: y });
            }
            rows.push({ label: rowLabel, seats: seats });
        }
        layout.decks.push({
            id: "deck-" + i,
            name: "Deck " + (i + 1),
            width: 600,
            height: 800,
            rows: rows,
        });
    }
    // 2. Находим предложения (Offers → места, доступные для покупки)
    var offerNodes = xmlDocument.getElementsByTagName('Offer');
    for (var i = 0; i < offerNodes.length; i++) {
        var offerNode = offerNodes[i];
        var seatNumber = offerNode.getAttribute('seatNumber');
        var priceNode = offerNode.querySelector('Price > TotalAmount');
        var price = (priceNode === null || priceNode === void 0 ? void 0 : priceNode.textContent) || '0';
        var currency = (priceNode === null || priceNode === void 0 ? void 0 : priceNode.getAttribute('currencyCode')) || 'USD';
        availability.push({
            label: seatNumber,
            price: parseFloat(price),
            currency: currency,
        });
    }
    // 3. Пассажиры (упрощённо, можно позже доработать)
    passengers.push({ id: 'PAX1', name: 'Passenger 1', type: 'ADT' });
    console.log('✅ Разобранные данные:', { layout: layout, availability: availability, passengers: passengers });
    return { layout: layout, availability: availability, passengers: passengers };
}
exports.parseSeatMapResponse = parseSeatMapResponse;
