"use strict";
// файл: getFlightFromSabreData.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlightFromSabreData = void 0;
var equipmentNames = {
    '388': 'Airbus A380',
    '77W': 'Boeing 777-300ER',
    '789': 'Boeing 787-9 Dreamliner',
    '320': 'Airbus A320',
    '321': 'Airbus A321',
    '738': 'Boeing 737-800',
    '319': 'Airbus A319',
    '744': 'Boeing 747-400',
    '359': 'Airbus A350-900',
    'E90': 'Embraer 190',
    // можно потом дополнить по мере необходимости
};
var getFlightFromSabreData = function (data, segmentIndex) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    if (segmentIndex === void 0) { segmentIndex = 0; }
    var segment = (_a = data.flightSegments) === null || _a === void 0 ? void 0 : _a[segmentIndex];
    if (!segment) {
        console.warn("\u26A0\uFE0F Segment index " + segmentIndex + " not found");
        return {
            id: '001',
            airlineCode: '',
            flightNo: '',
            departureDate: '',
            departure: '',
            arrival: '',
            cabinClass: '',
            equipment: ''
        };
    }
    console.log('📌 [getFlightFromSabreData] Полные данные сегмента:', JSON.stringify(segment, null, 2));
    var departureDateTime = segment.DepartureDateTime;
    var equipmentCode = ((_c = (_b = segment.Equipment) === null || _b === void 0 ? void 0 : _b.EncodeDecodeElement) === null || _c === void 0 ? void 0 : _c.Code) || '';
    var equipmentName = equipmentNames[equipmentCode] || equipmentCode; // Человекочитаемое название или код
    if (!departureDateTime) {
        console.warn('⚠️ [getFlightFromSabreData] DepartureDateTime отсутствует в данных сегмента!');
        return {
            id: '001',
            airlineCode: ((_e = (_d = segment.MarketingAirline) === null || _d === void 0 ? void 0 : _d.EncodeDecodeElement) === null || _e === void 0 ? void 0 : _e.Code) || '',
            flightNo: segment.FlightNumber || '',
            departureDate: '',
            departure: ((_g = (_f = segment.OriginLocation) === null || _f === void 0 ? void 0 : _f.EncodeDecodeElement) === null || _g === void 0 ? void 0 : _g.Code) || '',
            arrival: ((_j = (_h = segment.DestinationLocation) === null || _h === void 0 ? void 0 : _h.EncodeDecodeElement) === null || _j === void 0 ? void 0 : _j.Code) || '',
            cabinClass: '',
            equipment: equipmentName
        };
    }
    var departureDate = departureDateTime.split('T')[0]; // Оставляем только дату
    return {
        id: '001',
        airlineCode: (_l = (_k = segment.MarketingAirline) === null || _k === void 0 ? void 0 : _k.EncodeDecodeElement) === null || _l === void 0 ? void 0 : _l.Code,
        flightNo: segment.FlightNumber,
        departureDate: departureDate,
        departure: (_o = (_m = segment.OriginLocation) === null || _m === void 0 ? void 0 : _m.EncodeDecodeElement) === null || _o === void 0 ? void 0 : _o.Code,
        arrival: (_q = (_p = segment.DestinationLocation) === null || _p === void 0 ? void 0 : _p.EncodeDecodeElement) === null || _q === void 0 ? void 0 : _q.Code,
        cabinClass: '',
        equipment: equipmentName
    };
};
exports.getFlightFromSabreData = getFlightFromSabreData;
