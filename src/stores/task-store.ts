import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ITaskForm } from 'src/interfaces/Task';
import useNotification from 'src/composables/useNotification';

export const useTaskStore = defineStore('task', () => {

  const { notify } = useNotification()

  const getTasks = async (params:object)=>{
    try {
      const {data} = await api.get('task',{
        params
      })

      if(data.success) return data.data
      return null;
    } catch (e) {

    }
  }


  const save = async(formData:ITaskForm)=>{
    try {
       const { data } = await api.post('task',formData)

       if(data.success){
         notify(data.message,'positive')
       }
      return true
    } catch (e) {
      return false
    }
  }

  const updateStatus = async(status:string, id:string)=>{
    try {
       const { data } = await api.put(`task/${id}/status`,{status})

       if(data.success){
         notify(data.message,'positive')
       }
      return true
    } catch (e) {
      return false
    }
  }

  const deleteTask = async(id:string)=>{
    try {
       const { data } = await api.delete(`task/${id}`)

       if(data.success){
         notify(data.message,'positive')
       }
      return true
    } catch (e) {
      return false
    }
  }

  return {
    getTasks,
    save,
    updateStatus,
    deleteTask
  }
})
