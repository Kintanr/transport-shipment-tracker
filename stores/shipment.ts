import { defineStore } from 'pinia'
import { ref } from 'vue'
import transporter from "~/data/transporter.json";
import dayjs from "dayjs";

export const useShipmentStore = defineStore('shipment', () => {
  interface data {
    key: number;
    id: string;
    origin: string;
    date: string;
    destination: string;
    status: string;
    transporter_id: string;
    transporter: string;
    timestamp: string
  }

  const status = ["Assigned", "Not Assigned"];
  const destination = [
    "Jakarta",
    "Surabaya",
    "Semarang",
    "Denpasar",
    "Jambi",
    "Medan",
  ];

  let isInitial = ref(false)

  let allData = ref<data[]>([]);
  function generateRandomData() {
    if(!isInitial.value){
      // let tempData: any = ref([]);
      let current_transporter: any = ref(null);

      // looping insert data
      for (let index = 0; index < 50; index++) {
        // set date for each data
        let date = getRandomDate(new Date("2025-06-14"), new Date("2025-06-16"));

        // get random transporter from json data
        current_transporter = transporter[Math.floor(Math.random() * 10)] ?? null;

        // get the capacity for validation each date
        let transporter_capacity =
          current_transporter != null ? Number(current_transporter.capacity) : 0;

        // validity availability transporter
        if (transporter_capacity != 0) {
          // check data length in the same date using transporter id
          if (
            allData.value.filter(
              (v: any) =>
                v.transporter_id === current_transporter?.value &&
                new Date(v.date).getTime() === new Date(date).getTime()
            ).length > transporter_capacity
          ) {
            // if no more capacity, set null in current transporter
            current_transporter = null;
          }
        }

        // finalisation to push data
        allData.value.push({
          key: index,
          id: Math.random().toString(36).substr(2, 9),
          transporter_id: current_transporter?.value ?? null,
          transporter: current_transporter?.label ?? null,
          origin: destination[Math.floor(Math.random() * 6)],
          destination: destination[Math.floor(Math.random() * 6)],
          date: date,
          status: current_transporter?.value ? status[0] : status[1],
          timestamp: dayjs().format('DD-MM-YYYY HH:mm:ss')
        });
      }
      isInitial.value = true
    } 
    
  }
  

  // function to generate random date from start to end
  function getRandomDate(start: Date, end: Date) {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime).toISOString().split("T")[0];
  }

  interface datas {
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

  function setCurrentShipment(data: datas): void{
    currentShipment.value = data
    if(data.transporter_id != null){
      currentTransporter.value = transporter.find((v:any) => v.value == data.transporter_id)
    } else {
      currentTransporter.value = {}
    }
  }

  function updateData(id: any, transport_id:any){
    const selected_transporter = transporter.find(val => val.value == transport_id.value) ?? {}
    
    const i = allData.value.findIndex(item => item.id === id)
     if (i !== -1) {
        allData.value[i].transporter_id = selected_transporter.value ?? null
        allData.value[i].transporter = selected_transporter.label ?? null
        allData.value[i].status = status[0]
        allData.value[i].timestamp = dayjs().format('DD-MM-YYYY HH:mm:ss')

        currentTransporter.value = selected_transporter
      }
  }

  function statusUpdate(){
    let not_assigned_data = allData.value.filter(v => v.status == 'Not Assigned')

    not_assigned_data.map(value => {
        let new_transport = transporter[Math.floor(Math.random() * 10)]

        allData.value[value.key].transporter_id = new_transport?.value ?? null
        allData.value[value.key].transporter = new_transport?.label ?? null
        allData.value[value.key].status = new_transport?.value ? status[0] : status[1]
        if(new_transport?.value){
          allData.value[value.key].timestamp = dayjs().format('DD-MM-YYYY HH:mm:ss')
        }
        
    })
  }

  return { currentShipment, currentTransporter, setCurrentShipment,generateRandomData, allData, updateData , statusUpdate}
})