import { defineStore, acceptHMRUpdate } from 'pinia'

export const useWidgetsStore = defineStore('widgets', () => {
 const weather = ref<any>(null)
 const locations = ref(["Hanoi", "Ho Chi Minh City", "Huế", "Danang", "Hai Phong", "Nha Trang"])
 const selectedLocation = ref("Hanoi")

 async function fetchWeatherByLocation(location?:string){
    try {
        if(!location){
            location = selectedLocation.value
        }
        const response = await $fetch(
            `https://api.weatherapi.com/v1/current.json?key=56e1a8576f0c482280d84625230905&q=${location}&aqi=yes`
        );
        weather.value = response;
    } catch (error) {
        console.error(error);
    }
 }
 return {locations,selectedLocation,weather,fetchWeatherByLocation}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useWidgetsStore, import.meta.hot))
}
