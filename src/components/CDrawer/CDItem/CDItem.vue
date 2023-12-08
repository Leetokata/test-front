<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { IMenuItem } from 'src/interfaces/Layaout';

// props
defineProps({
  id: {
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  iconActive: {
    type: String,
    default: ''
  },
  item: {
    type: Object as ()=> IMenuItem,
    default: () => ({})
  },
})

const router = useRouter()
const route = useRoute()

const checkItemChildActive = (item:IMenuItem) =>{
  let r = route.name
  if(r !== undefined && r === item.routeName) return true
  return false
}
const pushToPath = (item:IMenuItem) =>{
  if(item.routeName) router.push({name: item.routeName})
  else if(item.to) router.push({path: item.to})
}
</script>


<template>
  <q-item
    v-if="!item.children"
    @click="pushToPath(item)"
    :active="route.params.id? route.path === item.to + route.params.id : route.path === item.to ? true : (route.meta.pathFather != null && route.meta.pathFather === item.to)"
    active-class="bg-secondary item-menu--active"
    clickable
    v-ripple
    style="border-radius: 0px 10px 10px 0px; position: relative"
  >
    <q-item-section avatar>
      <q-icon :name="route.path === item.to ? item.iconActive : item.icon" />
      <!-- <q-icon :name="'img:images/arrow.svg'" /> -->

    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{item.title}}
      </q-item-label>
    </q-item-section>
  </q-item>
  <q-expansion-item v-else expand-icon-class="text-white">
    <template v-slot:header>
      <q-item-section class="col-auto" avatar >
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section class="col q-pl-md">
        <q-item-label>
          {{item.title}}
        </q-item-label>
      </q-item-section>
    </template>
    <q-item
      v-for="(child,index) in item.children"
      :key="index"
      style="padding: 0;"
    >
      <div
      class="flex items-center item-child"
      :class="checkItemChildActive(child)?'item-child-active':''">
        <q-item-section
          class="cursor-pointer"
          @click="pushToPath(child)"
        >
          <q-item-label>
            {{child.title}}
          </q-item-label>
        </q-item-section>
      </div>
    </q-item>
  </q-expansion-item>
</template>

<style lang="scss">
.item-menu--active {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: rgb(0, 0, 0);
}

.item-child{
  width: 95%;
  border-radius: 0 6px 6px 0;
  padding-left: 70px;
}

.item-child-active{
  background: $secondary;
  font-weight: 600;
  color: #333333;
}
</style>
