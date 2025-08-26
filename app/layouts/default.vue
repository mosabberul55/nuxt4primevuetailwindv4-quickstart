
<script setup>
const visible = ref(false)
</script>
<template>
  <div class="flex h-screen">
    <!-- Sidebar (visible on desktop, hidden on mobile) -->
    <aside class="hidden md:block w-64 bg-white dark:bg-gray-900 shadow h-full overflow-y-auto">
      <layouts-sidebar-content />
    </aside>

    <!-- Drawer for small screens -->
    <Drawer v-model:visible="visible" modal :dismissable="true">
      <template #container="{ closeCallback }">
        <div class="w-full h-full bg-white dark:bg-gray-900 overflow-y-auto">
          <layouts-sidebar-content :onClose="closeCallback" />
        </div>
      </template>
    </Drawer>

    <!-- Main content area -->
    <div class="flex flex-col flex-1">
      <!-- Top Navbar -->
      <layouts-app-topbar  @visible="visible = !visible" />

      <!-- Main Page Content -->
      <main class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
        <slot />
      </main>
    </div>
  </div>
</template>
