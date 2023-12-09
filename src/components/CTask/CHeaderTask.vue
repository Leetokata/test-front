<script lang="ts" setup>
import {  ref, watch, computed } from 'vue';
import {  ITaskForm } from 'src/interfaces/Task';

export interface IEmits {
  (event: 'searchTask', data: string|number|null): void;
  (event: 'toggleModal', data: boolean): void;
  (event: 'submitData', data: ITaskForm): void;

}

export interface IProps {
  loading: boolean;
  submitLoading: boolean;
  searchQuery: string|number|null;
  isShow: boolean;
}

const emits = defineEmits<IEmits>()
const props = defineProps<IProps>()

const form = ref({
  title: '',
  description: '',

})

const search = computed({
  // getter
  get() {
    return props.searchQuery
  },
  // setter
  set(newValue) {
   emits('searchTask', newValue)
  }
})

const isShowModal = computed({
  // getter
  get() {
    return props.isShow
  },
  // setter
  set(newValue) {
   emits('toggleModal', newValue)
  }
})


watch(isShowModal, (newValue) => {
  if(!newValue){
    form.value.title = ''
    form.value.description = ''
  }
})


</script>

<template>
  <section class="row justify-between">
    <article class="col-xs-12 col-sm-8 col-md-6">
      <q-input
        dense
        outlined
        :loading="loading"
        debounce="500"
        v-model="search"
        placeholder="Buscar"
        @update:model-value="$emit('searchTask', $event)"
        bg-color="white"
        label-color="primary"
      >
      </q-input>
    </article>
    <article class="col-md-3">
      <q-btn
        class="full-width"
        text-color="primary"
        color="secondary"
        no-caps
        unelevated
        @click="isShowModal = !isShowModal"
      >
        <q-icon name="add"></q-icon>
        <span class="q-ml-sm">Agregar Tarea</span>
      </q-btn>
    </article>
    <q-dialog v-model="isShowModal" >
      <q-card class="bg-white modal border-md q-px-md q-pt-sm">
        <q-form @submit.prevent="$emit('submitData', {...form})" class="row">
          <q-card-section class="col-12 q-pa-none flex justify-between items-center">
            <article class="font-13 w-500 secondary">Crear tarea</article>
            <q-btn
              padding="xs xs"
              round
              flat
              icon="close"
              unelevated
              v-close-popup
            />
          </q-card-section>
          <q-card-section class="col-12 q-pa-none q-pt-md">
            <div class="primary font-12 w-500 q-pb-xs">
              Título*
            </div>
            <q-input
              outlined
              round
              v-model="form.title"
              placeholder="Ingrese el título de la tarea"
              bg-color="accent"
              :rules="[
                val => !!val || 'Campo requerido',
                val => !(val.length > 50) || 'Máximo 50 caracteres',
                val => val && !!val.trim() || 'El valor no puede estar en blanco',
              ]"
            />
          </q-card-section>
          <q-card-section class="col-12 q-pa-none q-pt-md">
            <div class="primary font-12 w-500 q-pb-xs">
              Descripción*
            </div>
            <q-input
              outlined
              round
              type="textarea"
              v-model="form.description"
              placeholder="Ingrese alguna descripción"
              bg-color="accent"
              rows="6"
              :rules="[
                val => !!val || 'Campo requerido',
                val => !(val.length > 250) || 'Máximo 250 caracteres',
                val => val && !!val.trim() || 'El valor no puede estar en blanco',
              ]"
            />
          </q-card-section>
          <q-card-section class="q-pa-none q-pt-xl full-width q-pb-md">
            <article class="q-col-gutter-md row">
              <div class="col-6">
                <q-btn
                  outline
                  class="full-width"
                  text-color="primary"
                  color="primary"
                  label="Cancelar"
                  no-caps
                  unelevated
                  v-close-popup
                >

                </q-btn>
              </div>
              <div class="col-6">
                <q-btn
                  class="full-width"
                  text-color="primary"
                  color="secondary"
                  label="Aceptar"
                  :loading="submitLoading"
                  no-caps
                  unelevated
                  type="submit"
                >
                </q-btn>
              </div>
            </article>
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </section>
</template>

<style lang="scss" scoped>

</style>
