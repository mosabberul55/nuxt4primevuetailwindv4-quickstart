<script setup lang="ts">
const props = defineProps<{
  item: any
}>();
const route = useRoute();
</script>

<template>
  <li>
    <div v-if="item.children">
      <a
          v-ripple
          v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-slidedown',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-slideup'
        }"
          class="flex items-center cursor-pointer p-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
          :class="{ 'bg-primary text-primary-contrast': route.path === item.to }"
      >
        <i :class="item.icon + ' mr-2'"></i>
        <span class="font-medium">{{ item.label }}</span>
        <i class="pi pi-chevron-down ml-auto"></i>
      </a>
      <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out">
        <MenuItem v-for="child in item.children" :key="child.label" :item="child" />
      </ul>
    </div>

    <div v-else>
      <layouts-single-menu-item :item="item" />
    </div>
  </li>
</template>