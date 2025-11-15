export function encodePolyline(locations: Array<{ latitude: number, longitude: number }>): string {
    let result = '';
    let prevLat = 0;
    let prevLng = 0;

    for (const location of locations) {
        const lat = Math.round(location.latitude * 1e5);
        const lng = Math.round(location.longitude * 1e5);

        const dLat = lat - prevLat;
        const dLng = lng - prevLng;

        result += encodeValue(dLat);
        result += encodeValue(dLng);

        prevLat = lat;
        prevLng = lng;
    }

    return result;
}

export function decodePolyline(encoded: string): Array<{ latitude: number, longitude: number }> {
    const locations: Array<{ latitude: number, longitude: number }> = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
        let result = 1;
        let shift = 0;
        let b;
        do {
            b = encoded.charCodeAt(index++) - 63 - 1;
            result += b << shift;
            shift += 5;
        } while (b >= 0x1f);
        lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

        result = 1;
        shift = 0;
        do {
            b = encoded.charCodeAt(index++) - 63 - 1;
            result += b << shift;
            shift += 5;
        } while (b >= 0x1f);
        lng += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

        locations.push({
            latitude: lat / 1e5,
            longitude: lng / 1e5
        });
    }

    return locations;
}

function encodeValue(value: number): string {
    let encoded = '';

    value = value < 0 ? ~(value << 1) : value << 1;

    while (value >= 0x20) {
        encoded += String.fromCharCode((0x20 | (value & 0x1f)) + 63);
        value >>= 5;
    }

    encoded += String.fromCharCode(value + 63);
    return encoded;
}