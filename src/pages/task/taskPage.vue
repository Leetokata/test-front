<script lang="ts" setup>
import CHeaderTask from 'src/components/CTask/CHeaderTask.vue'
import CListTask from 'src/components/CTask/CListTask.vue';
import useTask from 'src/composables/useTask'
import { onMounted } from 'vue';


const columns = [
  { name: 'status', align: 'center', label: 'Estatus', field: 'status', style: 'width: auto',},
  { name: 'date', align: 'center', label: 'Fecha', field: 'date' },
  { name: 'title', align: 'left', label: 'Titulo', field: 'title', style: 'max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' },
  { name: 'description', align: 'left', label: 'Descripcion', field: 'description', style: 'max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' },
  { name: 'action', align: 'center', label: 'Accion', field: 'action' },
]

const {
  //data
  loading,
  searchLoading,
  submitLoading,
  pagination,
  tasks,
  isShowModal,
  search,
  //methods
  getTasks,
  handleRequest,
  onSearchData,
  submit,
  onChangeStatus,
  onDeleteTask
} = useTask()

onMounted(()=>{
  getTasks()
})

</script>

<template>
  <q-page class="bg-primary q-px-md q-pt-sm">
    <section class="font-14 w-600 text-white q-pb-md">Listado de Tareas</section>
    <section class="bg-white border-md">
      <article class="full-width q-pa-md">
        <CHeaderTask
          :is-show="isShowModal"
          :loading="searchLoading"
          :submit-loading="submitLoading"
          :search-query="search"
          @search-task="onSearchData"
          @submit-data="submit"
          @toggle-modal="isShowModal = !isShowModal"
        />
      </article>
      <article class="full-width">
        <CListTask
          :columns="columns"
          :data="tasks"
          :loading="loading"
          :pagination="pagination"
          @change-pagination="handleRequest"
          @change-status="onChangeStatus"
          @delete-task="onDeleteTask"
        />
      </article>
    </section>
  </q-page>
</template>

<style lang="scss" scoped>

</style>
