"use strict";
// файл: parsePnrData.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePnrData = void 0;
// Принимаем XMLDocument
var parsePnrData = function (xmlDoc) {
    var _a, _b, _c, _d, _e;
    var passengers = [];
    var segments = [];
    var passengerNodes = xmlDoc.getElementsByTagName('stl19:Passenger');
    for (var i = 0; i < passengerNodes.length; i++) {
        var passenger = passengerNodes[i];
        var id = passenger.getAttribute('id') || '';
        var lastName = ((_a = passenger.getElementsByTagName('stl19:LastName')[0]) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        var firstName = ((_b = passenger.getElementsByTagName('stl19:FirstName')[0]) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        passengers.push({
            label: lastName + "/" + firstName,
            value: id
        });
    }
    var segmentNodes = xmlDoc.getElementsByTagName('stl19:Air');
    for (var i = 0; i < segmentNodes.length; i++) {
        var segment = segmentNodes[i];
        var departure = ((_c = segment.getElementsByTagName('stl19:DepartureAirport')[0]) === null || _c === void 0 ? void 0 : _c.textContent) || '';
        var arrival = ((_d = segment.getElementsByTagName('stl19:ArrivalAirport')[0]) === null || _d === void 0 ? void 0 : _d.textContent) || '';
        var marketingFlightNumber = ((_e = segment.getElementsByTagName('stl19:MarketingFlightNumber')[0]) === null || _e === void 0 ? void 0 : _e.textContent) || '';
        segments.push({
            label: departure + " \u2192 " + arrival + " (" + marketingFlightNumber + ")",
            value: departure + "-" + arrival + "-" + marketingFlightNumber
        });
    }
    return { passengers: passengers, segments: segments };
};
exports.parsePnrData = parsePnrData;
