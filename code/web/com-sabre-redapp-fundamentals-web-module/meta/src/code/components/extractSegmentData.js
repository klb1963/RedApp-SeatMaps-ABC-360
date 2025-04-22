"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSegmentData = void 0;
function extractSegmentData(segment) {
    return {
        flightNumber: segment.getSegmentId(),
        marketingCarrier: segment.getMarketingOperatingAirline(),
        departureDate: segment.getRawDepartureDate(),
        rbd: segment.getSelectedBookingClass() || 'N/A',
        origin: segment.getOriginIata(),
        destination: segment.getDestinationIata(),
        equipmentCode: segment.getEquipmentCode(),
        equipmentCodes: segment.getEquipmentCodes().map(function (codeInfo) { return String(codeInfo); }),
        segmentRph: segment.getRph()
    };
}
exports.extractSegmentData = extractSegmentData;
