<script setup>

defineProps({
  onClose: Function
})

const authStore = useAuthStore();
const route = useRoute();

const menuItems = ref([
  {label: 'Dashboard', icon: 'pi pi-home', to: '/', resource: 'dashboard'},
  // {
  //   label: 'Content Management', icon: 'pi pi-folder', resource: 'content management',
  //   items: [
  //     {label: 'Module', icon: 'pi pi-objects-column', to: '/module', resource: 'content management'},
  //     {label: 'Library', icon: 'pi pi-server', to: '/library', resource: 'content management'},
  //     {label: 'Level', icon: 'pi pi-book', to: '/levels', resource: 'content management'},
  //   ]
  // },
  // {
  //   label: 'Submission', icon: 'pi pi-send', resource: 'submission management',
  //   items: [
  //     {label: 'All Submissions', icon: 'pi pi-file-check', to: '/submissions', resource: 'submission management'},
  //     {label: 'Request List', icon: 'pi pi-inbox', to: '/module-request', resource: 'submission management'},
  //     {label: 'Support Ticket', icon: 'pi pi-bookmark', to: '/support-ticket', resource: 'submission management'},
  //   ]
  // },
  // {
  //   label: 'User Management', icon: 'pi pi-users', resource: 'user management',
  //   items: [
  //     {label: 'User List', icon: 'pi pi-users', to: '/users', resource: 'user management'},
  //     {label: 'Role & Permission', icon: 'pi pi-address-book', to: '/roles', resource: 'user management'},
  //     {label: 'Enrollment', icon: 'pi pi-ticket', to: '/enrollment', resource: 'user management'},
  //   ]
  // },
  // {
  //   label: 'Payment', icon: 'pi pi-credit-card', resource: 'payment management',
  //   items: [
  //     {label: 'Payment', icon: 'pi pi-credit-card', to: '/payment', resource: 'payment management'},
  //     {label: 'Refund', icon: 'pi pi-receipt', to: '/refund', resource: 'payment management'},
  //   ]
  // },
  // {label: 'Review', icon: 'pi pi-comment', to: '/review', resource: 'review management'},
  // {label: 'Announcement', icon: 'pi pi-megaphone', to: '/announcement', resource: 'announcement management'},
  // {label: 'Settings', icon: 'pi pi-cog', to: '/settings', resource: 'setting management'}
])

// Track expanded/collapsed state of each menu
const expandedMenus = ref(
    menuItems.value.reduce((acc, item) => {
      if (item.items) {
        acc[item.label] = true;
      }
      return acc;
    }, {})
);

// Toggle menu expansion
const toggleMenu = (label) => {
  expandedMenus.value = {
    ...expandedMenus.value,
    [label]: !expandedMenus.value[label]
  };
};

// Automatically expand menu if current route is in its items
const isParentActive = (items) => {
  return items?.some(item => route?.path === item.to);
}

// Check if menu should be initially expanded
const shouldExpandInitially = (items) => {
  return isParentActive(items);
}

const isActive = (path) => {
  return route?.path === path;
}
</script>

<template>
  <div class="flex flex-col h-full border-r">
    <!-- Logo and close (visible on mobile only) -->
    <div class="flex items-center justify-between px-4 py-2 shrink-0 md:hidden">
      <img src="/logo-1.png" alt="Logo" class="h-10 w-auto"/>
      <Button icon="pi pi-times" class="h-8 w-8" @click="onClose" rounded outlined/>
    </div>
    <!-- Logo (visible on desktop only) -->
    <div class="hidden md:flex items-center justify-center py-[8px] bg-gray-100 dark:bg-gray-900 shrink-0">
      <div>
        <img src="/logo-1.png" alt="Logo" class="h-10 w-auto"/>
      </div>
    </div>
    <div class="overflow-y-auto border-t">
      <ul class="list-none p-4 m-0 space-y-1">
        <li v-for="section in menuItems" :key="section.label" class="mb-2">
          <div v-if="section.items" class="group">
            <!-- Section Title - Now clickable -->
            <div @click="toggleMenu(section.label)"
                 class="py-3 px-2 flex items-center gap-1 text-surface-600 dark:text-surface-300 cursor-pointer rounded-lg transition-all duration-200 hover:bg-surface-50 dark:hover:bg-surface-800"
                 :class="isParentActive(section.items) ? 'bg-primary bg-opacity-10 text-primary dark:text-primary border-l-4 border-primary' : ''">
              <i :class="section.icon" class="text-sm w-5 flex justify-center"></i>
              <span class="font-medium text-[15px]">{{ section.label }}</span>
              <i class="pi ml-auto text-xs opacity-60 transition-transform duration-300 ease-in-out"
                 :class="expandedMenus[section.label] || isParentActive(section.items) ? 'pi-chevron-up' : 'pi-chevron-down'"></i>
            </div>

            <!-- Sub Items with smooth transition -->
            <div class="dropdown-container overflow-hidden transition-all duration-300 ease-in-out"
                 :class="(expandedMenus[section.label] || isParentActive(section.items)) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
              <ul
                  class="list-none ml-0 p-0 m-0 mt-1 space-y-0.5">
                <li v-for="item in section.items" :key="item.label">
                  <NuxtLink
                      :to="item.to"
                      class="group-item flex items-center justify-between px-3 py-[6px] ml-6 text-surface-600 dark:text-surface-300 rounded-lg transition-all duration-200 relative hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-primary dark:hover:text-primary"
                      :class="isActive(item.to) ? 'bg-primary bg-opacity-10 text-primary dark:text-primary font-medium shadow-sm' : ''"
                      active-class="bg-primary bg-opacity-10 text-primary dark:text-primary font-medium shadow-sm">

                    <!-- Left Side: Icon + Label -->
                    <div class="flex items-center gap-3">
                      <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full opacity-0 group-hover-item:opacity-100 transition-opacity duration-200"
                           :class="isActive(item.to) ? 'opacity-100' : ''"></div>
                      <i :class="item.icon" class="text-sm w-5 flex justify-center"></i>
                      <span class="text-sm">{{ item.label }}</span>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </div>

          </div>

          <!-- Single Menu Items -->
          <div v-else>
            <NuxtLink
                :to="section.to"
                class="group-single flex items-center gap-1 py-3 px-2 text-surface-600 dark:text-surface-300 rounded-lg transition-all duration-200 relative hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-primary dark:hover:text-primary"
                :class="isActive(section.to) ? 'bg-primary bg-opacity-10 text-primary dark:text-primary font-medium shadow-sm' : ''"
                active-class="bg-primary bg-opacity-10 text-primary dark:text-primary font-medium shadow-sm">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full opacity-0 group-hover-single:opacity-100 transition-opacity duration-200"
                   :class="isActive(section.to) ? 'opacity-100' : ''"></div>
              <i :class="section.icon" class="text-sm w-5 flex justify-center"></i>
              <span class="text-[16px] font-medium">{{ section.label }}</span>
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>

    <!-- User Profile Section -->
    <div class="mt-auto border-t shadow-[0_-6px_16px_rgba(0,0,0,0.1)]">
      <div class="m-2 md:m-3 px-3 py-1 bg-surface-50 dark:bg-surface-800 bg-opacity-50 rounded-xl">
        <div class="flex items-center gap-3">
          <div class="relative">
            <Avatar
                v-if="authStore.user?.avatarUrl"
                :image="authStore.user.avatarUrl"
                shape="circle"
                class="ring-2 ring-primary ring-opacity-20" />
            <Avatar
                v-else
                icon="pi pi-user"
                shape="circle"
                class="bg-primary bg-opacity-10 text-primary ring-2 ring-primary ring-opacity-20" />
            <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm text-surface-800 dark:text-surface-100 truncate">{{ authStore.user?.name }}</p>
            <p class="text-xs text-surface-500 dark:text-surface-400 truncate">{{ authStore.user?.type }}</p>
          </div>
          <Button
              icon="pi pi-sign-out"
              @click="authStore.logout()"
              rounded
              outlined
              size="small"
              class="hover:bg-red-50 hover:border-red-300 hover:text-red-500 dark:hover:bg-red-900 dark:hover:bg-opacity-20 dark:hover:border-red-400 dark:hover:text-red-400 transition-all duration-200" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Enhanced dropdown animation */
.dropdown-container {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

/* Custom styles for enhanced hover effects */
.group-item:hover .pi,
.group-single:hover .pi {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

/* Hover effects for left border */
.group-item:hover .absolute {
  opacity: 1;
}

.group-single:hover .absolute {
  opacity: 1;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
}

/* For WebKit browsers (Chrome, Safari, Edge) */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Dark mode styles */
.dark .overflow-y-auto::-webkit-scrollbar-track {
  background: #2d3748;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4a5568;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>
