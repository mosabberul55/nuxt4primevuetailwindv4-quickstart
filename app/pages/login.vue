<script setup lang="ts">
import {useLoginForm} from "~/composables/form/loginForm";

definePageMeta({
  layout: 'blank',
  middleware: 'guest',
})

const router = useRouter();
const authStore = useAuthStore();

const {phone, password, errors, handleSubmit, setErrors} = useLoginForm()
const isLoading = ref<boolean>(false)


const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  const { data, error } = await authStore.login(values);
  if (error && error.value) {
    if (error.value.data.statusCode === 422) {
      setErrors(error.value.data.message);
    } else {
      setErrors({ phone: [error.value.data.message] });
    }
  } else {
    console.log('Login successful', data.value);
    await router.push('/')
  }
  isLoading.value = false;
});

</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <nuxt-link to="/" class="flex items-center mb-6 text-2xl font-semibold">
        Nuxt4 primevue
      </nuxt-link>
      <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
            <div>
              <label for="phone" class="block mb-2 text-sm font-medium">Your phone</label>
              <InputText type="text" name="phone" v-model="phone" :invalid="!!errors.phone" fluid />
              <Message v-if="errors.phone" severity="error" size="small" variant="simple">{{ errors.phone }}</Message>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium">Your password</label>
              <Password name="password" toggleMask :feedback="false" v-model="password"  :invalid="!!errors.password" fluid />
              <Message v-if="errors.password" severity="error" size="small" variant="simple">{{ errors.password }}</Message>
            </div>
            <Button type="submit" label="Login" :loading="isLoading" fluid  />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>