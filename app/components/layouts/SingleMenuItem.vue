<script setup lang="ts">
const props = defineProps<{
  item: object
}>();
const router = useRouter();
const route = useRoute();
</script>

<template>
  <a
      v-ripple
      class="flex items-center cursor-pointer p-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
      :class="{ 'bg-primary text-primary-contrast': route.path === item.to }"
      @click="item.to && router.push(item.to)"
  >
    <i :class="item.icon + ' mr-2'"></i>
    <span class="font-medium">{{ item.label }}</span>
    <span
        v-if="item?.badge"
        class="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full"
        style="min-width: 1.5rem; height: 1.5rem"
    >
          {{ item.badge }}
        </span>
  </a>
</template>