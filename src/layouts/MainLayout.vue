<script setup lang="ts">
import { ref } from 'vue';
import CDItem from 'src/components/CDrawer/CDItem/CDItem.vue';
import { menuItems } from 'src/config/MenuItems'

const drawerLeft = ref(false)

</script>



<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated  class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawerLeft = !drawerLeft" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="drawerLeft" side="left" behavior="desktop">
      <!-- drawer content -->
      <q-scroll-area class="fit bg-primary text-white">
        <q-list class="q-pt-md q-gutter-y-xs">
          <CDItem
            v-for="item in menuItems"
            :key="item.id"
            :item="item"
          />

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

