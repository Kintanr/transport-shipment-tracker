import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import transporter from "~/data/transporter.json";

export const useShipmentStore = defineStore('shipment', () => {
  const name = ref<string>('Guest')
  const isLoggedIn = ref<boolean>(false)

  interface data {
    id: string;
    origin: string;
    date: string;
    destination: string;
    status: string;
    transporter_id: string;
    transporter: string;
  }


  let currentShipment : any = ref({})
  let currentTransporter : any = ref({})

  const welcomeMessage = computed(() =>
    isLoggedIn.value ? `Hi, ${name.value}!` : 'Welcome, Guest!'
  )

  function login(newName: string): void {
    name.value = newName
    isLoggedIn.value = true
  }

  function logout(): void {
    name.value = 'Guest'
    isLoggedIn.value = false
  }

  function setCurrentShipment(data: data): void{
    currentShipment.value = data
    if(data.transporter_id != null){
      currentTransporter.value = transporter.find((v:any) => v.id == data.transporter_id)
    } else {
      currentTransporter.value = {}
    }
  }

  return { currentShipment, currentTransporter, setCurrentShipment }
})