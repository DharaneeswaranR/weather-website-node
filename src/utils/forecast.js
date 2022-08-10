import fetch from "node-fetch"

const forecast = async({ longitude, latitude, location }) => {
    try {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=8a2f23c0abd52acb68c554ead5605f8a&query=${longitude},${latitude}`)
        const data = await response.json()

        if (data.error) {
            throw "Unable to find location."
        } else {
            const { temperature, feelslike, weather_descriptions } =  data.current

            return {
                location,
                weather_descriptions,
                temperature,
                feelslike
            }
        }
    } catch (error) {
        if (typeof error === 'string') {
            throw error
        } else {
            throw "Unable to connect to weather service."
        }
    }
}

export default forecast