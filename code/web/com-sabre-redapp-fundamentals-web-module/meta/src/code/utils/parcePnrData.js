"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePnrData = void 0;
var parsePnrData = function (xmlDoc) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var passengers = [];
    var segments = [];
    // --- Пассажиры ---
    var passengerNodes = xmlDoc.getElementsByTagName('stl19:Passenger');
    for (var i = 0; i < passengerNodes.length; i++) {
        var passenger = passengerNodes[i];
        var id = passenger.getAttribute('id') || '';
        var lastName = ((_a = passenger.getElementsByTagName('stl19:LastName')[0]) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        var firstName = ((_b = passenger.getElementsByTagName('stl19:FirstName')[0]) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        passengers.push({
            label: lastName + "/" + firstName,
            value: id,
            givenName: firstName,
            surname: lastName
        });
    }
    // --- Сегменты ---
    var airSegmentNodes = xmlDoc.getElementsByTagName('stl19:Air');
    for (var i = 0; i < airSegmentNodes.length; i++) {
        var segment = airSegmentNodes[i];
        var id = segment.getAttribute('id') || '';
        var origin_1 = ((_c = segment.getElementsByTagName('stl19:DepartureAirport')[0]) === null || _c === void 0 ? void 0 : _c.textContent) || '';
        var destination = ((_d = segment.getElementsByTagName('stl19:ArrivalAirport')[0]) === null || _d === void 0 ? void 0 : _d.textContent) || '';
        var departureDateTime = ((_e = segment.getElementsByTagName('stl19:DepartureDateTime')[0]) === null || _e === void 0 ? void 0 : _e.textContent) || '';
        var marketingCarrierNode = segment.getElementsByTagName('stl19:MarketingAirline')[0];
        var operatingCarrierNode = segment.getElementsByTagName('stl19:OperatingAirline')[0];
        var marketingCarrier = ((_f = marketingCarrierNode === null || marketingCarrierNode === void 0 ? void 0 : marketingCarrierNode.textContent) === null || _f === void 0 ? void 0 : _f.trim())
            || ((_g = operatingCarrierNode === null || operatingCarrierNode === void 0 ? void 0 : operatingCarrierNode.textContent) === null || _g === void 0 ? void 0 : _g.trim())
            || 'UNKNOWN';
        var marketingFlightNumber = ((_h = segment.getElementsByTagName('stl19:MarketingFlightNumber')[0]) === null || _h === void 0 ? void 0 : _h.textContent) || '';
        var bookingClass = ((_j = segment.getElementsByTagName('stl19:ResBookDesigCode')[0]) === null || _j === void 0 ? void 0 : _j.textContent) || '';
        var equipment = ((_k = segment.getElementsByTagName('stl19:Equipment')[0]) === null || _k === void 0 ? void 0 : _k.textContent) || '';
        // Извлекаем только дату из DepartureDateTime
        var departureDate = '';
        if (departureDateTime.includes('T')) {
            departureDate = departureDateTime.split('T')[0];
        }
        segments.push({
            label: origin_1 + " \u2192 " + destination + " (" + marketingCarrier + marketingFlightNumber + ")",
            value: id,
            origin: origin_1,
            destination: destination,
            departureDate: departureDate,
            marketingCarrier: marketingCarrier,
            marketingFlightNumber: marketingFlightNumber,
            bookingClass: bookingClass,
            equipment: equipment
        });
    }
    return { passengers: passengers, segments: segments };
};
exports.parsePnrData = parsePnrData;
