<script setup lang="ts">
const authStore = useAuthStore()
await useAsyncData('getLoggedUser', async () => {
  await authStore.getLoggedUser()
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
