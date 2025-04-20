"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePnrData = void 0;
var parsePnrData = function (xmlDoc) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var passengers = [];
    var segments = [];
    // --- пассажиры ---
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
    // --- сегменты ---
    var segmentNodes = xmlDoc.getElementsByTagName('stl19:Air');
    for (var i = 0; i < segmentNodes.length; i++) {
        var segment = segmentNodes[i];
        var departure = ((_c = segment.getElementsByTagName('stl19:DepartureAirport')[0]) === null || _c === void 0 ? void 0 : _c.textContent) || '';
        var arrival = ((_d = segment.getElementsByTagName('stl19:ArrivalAirport')[0]) === null || _d === void 0 ? void 0 : _d.textContent) || '';
        var marketingCarrier = ((_e = segment.getElementsByTagName('stl19:MarketingCarrier')[0]) === null || _e === void 0 ? void 0 : _e.textContent) || 'LH'; // ставим дефолт LH
        var bookingClass = ((_f = segment.getElementsByTagName('stl19:ResBookDesigCode')[0]) === null || _f === void 0 ? void 0 : _f.textContent) || 'Y'; // ставим дефолт Y
        var marketingFlightNumber = ((_g = segment.getElementsByTagName('stl19:MarketingFlightNumber')[0]) === null || _g === void 0 ? void 0 : _g.textContent) || '';
        var departureDateRaw = ((_h = segment.getElementsByTagName('stl19:DepartureDateTime')[0]) === null || _h === void 0 ? void 0 : _h.textContent) || '';
        var equipment = ((_j = segment.getElementsByTagName('stl19:EquipmentType')[0]) === null || _j === void 0 ? void 0 : _j.textContent) || ''; // ⚡️ equipment
        var departureDate = departureDateRaw.split('T')[0];
        segments.push({
            label: departure + " \u2192 " + arrival + " (" + marketingFlightNumber + ")",
            value: departure + "-" + arrival + "-" + marketingFlightNumber,
            origin: departure,
            destination: arrival,
            departureDate: departureDate,
            marketingCarrier: marketingCarrier,
            marketingFlightNumber: marketingFlightNumber,
            bookingClass: bookingClass,
            equipment: equipment // ⚡️ equipment добавляем в сегмент
        });
    }
    return { passengers: passengers, segments: segments };
};
exports.parsePnrData = parsePnrData;
