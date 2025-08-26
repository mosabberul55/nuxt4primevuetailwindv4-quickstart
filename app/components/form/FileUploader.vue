<script setup lang="ts">
interface Props {
  modelValue: undefined | string
  invalid?: any
  multiple?: boolean
  uploadPath?: string
  accept?: string
  maxFileSize?: number
}
const props = withDefaults(defineProps<Props>(), {
  label: 'Select Photo',
  multiple: false,
  uploadPath: 'uploads',
  accept: 'image/*',
  maxFileSize: 1000000,
  invalid: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | any): void;
}>()
const backendBaseUrl = useRuntimeConfig().public.baseURL
const progress = ref<number>(0)

const onUploadFile = (event: any) => {
  emit('update:modelValue', event?.xhr.response)
}
</script>

<template>
  <FileUpload
      mode="basic"
      name="file"
      :accept="accept"
      :multiple="multiple"
      :url="`${backendBaseUrl}/upload`"
      @progress="event => progress = event.progress"
      :maxFileSize="maxFileSize"
      @upload="onUploadFile"
      :auto="true"
      :invalid="invalid"
  />
  <ProgressBar
      class="mt-2"
      v-if="progress > 0"
      :value="progress"
      :showValue="true"
      :style="{ width: '100%' }"
      />
</template>

<style scoped>

</style>