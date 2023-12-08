import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
  }),
  getters: {
    listTasks: (state) => state.tasks,
  },
  actions: {
    async getTasks(search = null, page = 0, per_page = 15){
      try {
        const resp = await api.get('task',{
          params: {
            search: search,
            page: page,
            per_page: per_page,
          }
        })

        if(resp){
          // this.tasks = resp
        }
        return true
      } catch (error) {
        return false
      }
    }

  },
});
