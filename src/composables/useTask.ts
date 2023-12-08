import { ref } from 'vue'
import { useTaskStore } from 'src/stores/task-store'

const useTask = () => {
  const store = useTaskStore();
  const loading = ref(false)
  const search = ref('')
  const pagination = ref({
    page: 1
  })

  const getTasks = async()=>{
    try {
      loading.value = true


    } catch (e) {console.log(e)} finally {
      loading.value = false
    }
  }

  const onSearchData = (newValue:string)=>{
    console.log(newValue)
  }

  return {
    loading,
    search,
    //methods
    getTasks,
    onSearchData
  }
}

export default useTask
