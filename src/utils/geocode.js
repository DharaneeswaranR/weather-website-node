import fetch from "node-fetch"

const geocode = async(location) => {
    try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYnRyYXZlcnN5IiwiYSI6ImNrbmh0dXF1NzBtbnMyb3MzcTBpaG10eXcifQ.h5ZyYCglnMdOLAGGiL1Auw&limit=1`)
        const data = await response.json()

        if (data.features.length === 0) {
            throw "Unable to find location. Try another search."
        } else {
            return {
                longitude: data.features[0].center[1],
                latitude: data.features[0].center[0],
                location: data.features[0].place_name
            }
        }
    } catch (error) {
        if (typeof error === 'string') {
            throw error
        } else {
            throw "Unable to connect to location services."
        }
    }
}

export default geocode