<script lang="ts" setup>
import CHeaderTask from 'src/components/CTask/CHeaderTask.vue'
import { ref } from 'vue';

</script>

<template>
  <q-page class="bg-primary q-px-md q-pt-lg">
    <section>
      <article class="font-14 w-600 text-white q-pb-md">Listado de Tareas</article>
      <article class="bg-white border-md q-pa-md">
        <CHeaderTask/>
      </article>
    </section>
  </q-page>
</template>

<style lang="scss" scoped>

</style>
