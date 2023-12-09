<script lang="ts" setup>
import { computed } from 'vue';

export interface IColumn {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
}


export interface IProps {
  columns: Array<any>;
  data: Array<any>;
  pagination: object;
  loading: boolean;
}

export interface IEmits {

(event: 'changePagination', data: any): void;
(event: 'changeStatus', status: string, index: number, id: string): void;
(event: 'deleteTask', id: string, index: number): void;

}

defineEmits<IEmits>()
const props = defineProps<IProps>()

const paginate = computed({
  // getter
  get() {
    return props.pagination
  },
  // setter
  set(newValue) {
   //emits('changePagination', newValue)
  }
})

const getClass = (status:string) => {
  switch (status) {
    case 'pendiente':
      return 'chip-pending'
    case 'aprobado':
      return 'chip-approved'
    case 'cancelado':
      return 'chip-cancel'

    default:
    break;
  }

}


</script>

<template>
  <q-card class="no-shadow">
    <q-table
      :rows="data"
      :columns="columns"
      :loading="loading"
      rows-per-page-label="Filas por página"
      row-key="id"
      @request="$emit('changePagination', $event.pagination)"
      v-model:pagination="paginate"
      class="tableTask"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div class="text-center">
            <q-chip class="chip" :class="getClass(props.value)" style="height: 25px;">
              <div class="q-px-md text-capitalize">{{props.value}}</div>
            </q-chip>

          </div>
        </q-td>
      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props">
          <div class="semi-capitalize">
            {{props.value}}

          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="text-center">
            <q-btn
              icon="done"
              :color="props.row.status === 'pendiente' ? 'positive' : ''"
              :disable="props.row.status === 'pendiente' ? false : true"
              :loading="props.row.loading"
              no-caps
              unelevated
              round
              flat
              dense
              padding="xs xs"
              class="q-mr-sm"
              @click="$emit('changeStatus', 'aprobado', props.rowIndex, props.row.id)"
            />
            <q-btn
              icon="block"
              :color="props.row.status === 'pendiente' ? 'negative' : ''"
              :disable="props.row.status === 'pendiente' ? false : true"
              :loading="props.row.loadingDeny"
              no-caps
              unelevated
              round
              flat
              dense
              padding="xs xs"
              class="q-mr-sm"
              @click="$emit('changeStatus', 'cancelado', props.rowIndex, props.row.id )"
            />
            <q-btn
              icon="delete"
              :color="'negative'"
              :loading="props.row.loadingDelete"
              no-caps
              unelevated
              round
              flat
              dense
              padding="xs xs"
              @click="$emit('deleteTask', props.row.id, props.rowIndex )"
            />
          </div>
        </q-td>
      </template>

      <!-- <template v-slot:loading>
        <q-inner-loading showing color="secondary" />
      </template> -->

      <template v-slot:no-data>
        <q-icon size="1.1rem" name="warning" class="q-mr-sm" color="secondary"/>
        <span>No hay tareas</span>
      </template>
    </q-table>
  </q-card>
</template>

<style lang="scss" scoped>
:deep(.tableTask tbody td){
  color: #5a647a;

}
:deep(.tableTask thead tr){
  background: #eaf0f8;
}

:deep(.tableTask tbody tr:hover){
  background: #ffeac4;

}
:deep(.tableTask .q-table td::before){
  background: none !important;
}
:deep(.tableTask tbody td:after){
  background: none;
}
</style>
