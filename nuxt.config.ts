import Aura from '@primeuix/themes/aura';
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@primevue/nuxt-module', '@vee-validate/nuxt', '@pinia/nuxt'],
    css: [ "~/assets/main.css"],
    vite: {
        plugins: [tailwindcss()],
    },
    primevue: {
        autoImport: true,
        usePrimeVue: true,
        options: {
            ripple: true,
            inputVariant: 'filled',
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: ".p-dark",
                    // cssLayer: {
                    //     name: 'primevue',
                    //     order: 'theme, base, primevue'
                    // }
                }
            }
        }
    },
    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_URL || 'http://localhost:5001/api',
        }
    }
})