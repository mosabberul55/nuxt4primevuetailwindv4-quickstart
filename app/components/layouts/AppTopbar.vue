<script setup>
const { isDarkMode, toggleDarkMode } = useLayout();
</script>

<template>
    <div class="w-full dark:bg-surface-900  border-b border-surface-200 dark:border-surface-800">
      <div
          class="p-2 max-w-7xl mx-auto w-full border-b border-surface-200 dark:border-surface-800"
      >

        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <div class="block md:hidden">
              <Button icon="pi pi-bars" class="block md:hidden" @click="$emit('visible', true)" />
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
                type="button"
                class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-all text-surface-900 dark:text-surface-0 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 dark:focus-visible:ring-offset-surface-950"
                @click="toggleDarkMode"
            >
              <i :class="['pi text-base', { 'pi-moon': isDarkMode, 'pi-sun': !isDarkMode }]" />
            </button>
            <div class="relative">
              <Button
                  v-styleclass="{
                            selector: '@next',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-scalein',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-fadeout',
                            hideOnOutsideClick: true,
                        }"
                  icon="pi pi-cog"
                  text
                  rounded
                  aria-label="Settings"
              />
              <layouts-app-config />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
