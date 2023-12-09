import { ref } from 'vue'
import { useTaskStore } from 'src/stores/task-store'
import {  ITaskForm } from 'src/interfaces/Task';

const useTask = () => {
  const store = useTaskStore();
  const loading = ref(false)
  const submitLoading = ref(false)
  const searchLoading = ref(false)

  const tasks = ref<any>([])
  const search = ref<string|number|null>('')
  const isShowModal = ref(false)
  const pagination  = ref<any>({
    page: 1,
    rowsPerPage: 5,
    rowsNumber: 0,
  })

  const getTasks = async()=>{
    try {
      loading.value = true
      const res = await store.getTasks({
        search: search.value,
        perPage: pagination.value.rowsPerPage,
        page: pagination.value.page
      })

      if(res){
        tasks.value = res.data.map((task:any)=>{
          return {
            ...task,
            loading:false,
            loadingDeny:false,
            loadingDelete:false
          }
        })
        //Actualizar paginacion
        pagination.value.page = res.current_page
        pagination.value.rowsPerPage = res.per_page
        pagination.value.rowsNumber = res.total
      }
    } catch (e) {console.log(e)} finally {
      loading.value = false
    }
  }

  const submit = async (formData:ITaskForm)=>{
    try {
      submitLoading.value = true
      const resp = await store.save(formData)
      if(resp) {
        getTasks()
        isShowModal.value = false
      }

    } catch (e) {
      console.log(e)
    }finally{
      submitLoading.value = false
    }
  }

  const onSearchData = async(newValue:string|number|null)=>{

    search.value = newValue
    searchLoading.value = true
    await getTasks()
    searchLoading.value = false
  }

  const handleRequest = (p:any)=>{
    pagination.value.page = p.page
    pagination.value.rowsPerPage = p.rowsPerPage
    getTasks()
  }

  const changeLoadingRow = (type:string, idx:number, newValue = false)=>{
    if(
      tasks.value[idx]
      && 'loading' in  tasks.value[idx]
      && 'loadingDeny' in tasks.value[idx]
      && 'loadingDelete' in tasks.value[idx]
    ){
      if(type == 'aprobado') tasks.value[idx].loading = newValue
      if(type == 'cancelado') tasks.value[idx].loadingDeny = newValue
      if(type == 'delete')  tasks.value[idx].loadingDelete = newValue
    }
  }

  const onChangeStatus = async(status:string, idx:number, id:string)=>{
    changeLoadingRow(status, idx, true)
    try {
      const res = await store.updateStatus(status, id)
      if(res){
        getTasks()
      }

    } catch (e) {} finally {
      changeLoadingRow(status, idx)
    }
  }

  const onDeleteTask = async(id:string, index:number)=>{
    changeLoadingRow('delete', index, true)
    try {
      const res = await store.deleteTask(id)
      if(res){
        getTasks()
      }
    } catch (e) {} finally{
      changeLoadingRow('delete', index)
    }
  }

  return {
    loading,
    submitLoading,
    searchLoading,
    search,
    isShowModal,
    pagination,
    tasks,
    //methods
    getTasks,
    onSearchData,
    submit,
    handleRequest,
    onChangeStatus,
    onDeleteTask
  }
}

export default useTask
