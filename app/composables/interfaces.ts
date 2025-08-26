export interface PageInfo {
    title: string,
    apiUrl: string,
    description: string
}
export type Loader = {
    isLoading: boolean,
    isSubmitting: boolean,
    isDeleting?: boolean
}