const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', async(event) => {
    event.preventDefault()

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    const location = search.value
    
    const response = await fetch(`http://localhost:3000/weather?address=${location}`)
    const data = await response.json()

    if (data.error) {
        return messageOne.textContent = data.error
    }

    messageOne.textContent = data.location
    messageTwo.textContent = `${data.weather_descriptions}. It is currently ${data.temperature} degrees and it feels like ${data.feelslike} degrees`
})
