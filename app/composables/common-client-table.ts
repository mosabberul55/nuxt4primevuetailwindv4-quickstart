import type { PageInfo, Loader } from "~/composables/interfaces"
export const useCommonClientSideTable = () => {
    const pageInfo = ref<PageInfo>({
        title: '',
        apiUrl: '',
        description: ''
    })
    const loader = ref<Loader>({
        isLoading: false,
        isSubmitting: false,
        isDeleting: false
    })

    const editMode = ref<boolean>(false)
    const visible = ref<boolean>(false)
    const items = ref<object[]>([])
    const selectedItem = ref<object>({})

    const setPageInfo = (title: string, apiUrl: string, description: string) => {
        pageInfo.value.title = title
        pageInfo.value.apiUrl = apiUrl
        pageInfo.value.description = description
    }

    const init = async (url: string) => {
        loader.value.isLoading = true
        let returnObject: {error: boolean, data: any} = {
            error: false,
            data: null
        }
        const {data, error} = await getData(url)
        if (error && error.value) {
            console.error('Error:', error.value);
            returnObject = {error: true, data: error.value}
        } else {
            items.value = data.value
            returnObject = {error: false, data: data.value}
        }
        loader.value.isLoading = false
        return returnObject
    }

    const createItem = () => {
        selectedItem.value = {}
        editMode.value = false
        visible.value = true
    }

    const editDialog = (item: any) => {
        visible.value = true
        editMode.value = true
        selectedItem.value = item
    }


    const submitForm = async (url: string, formData: object) => {
        loader.value.isSubmitting = true
        let returnObject: {error: boolean, data: any} = {
            error: false,
            data: null
        }
        const {data, error} = editMode.value ? await putData(url, formData) : await postData(url, formData)
        if (error && error.value) {
            console.error('Error:', error.value);
            returnObject = {error: true, data: error.value}
        } else {
            if (editMode.value) {
                const index = items.value.findIndex((item: any) => item._id === data.value._id)
                if (index !== -1) Object.assign(items.value[index], data.value)
            } else {
                items.value.push(data.value)
            }
            visible.value = false;
            returnObject = {error: false, data: data.value}
        }
        loader.value.isSubmitting = false
        return returnObject
    }

    const deleteItem = async (url: string) => {
        loader.value.isDeleting = true
        const {data, error} = await deleteData(url)
        if (error && error.value) {
            console.error('Error:', error.value);
            loader.value.isDeleting = false
            return {error: true, data: error.value}
        } else {
            const index = items.value.findIndex((item: any) => item._id === data.value._id)
            if (index !== -1) items.value.splice(index, 1)
            loader.value.isDeleting = false
            return {error: false, data: data.value}
        }
    }

    return {
        pageInfo,
        loader,
        editMode,
        visible,
        items,
        selectedItem,
        init,
        createItem,
        editDialog,
        submitForm,
        setPageInfo,
        deleteItem
    }
}