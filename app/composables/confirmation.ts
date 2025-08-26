import { useConfirm } from "primevue/useconfirm";
export function useConfirmation() {
    const confirm = useConfirm();
    const { showSuccessMessage, showInfoMessage } = useMessages();

    // eslint-disable-next-line unused-imports/no-unused-vars
    function doNothing(id: any) {
    }

    function confirmDelete(idToDelete: any, acceptCallback: (id: any) => void, rejectCallback: (id: any) => void = doNothing) {
        confirm.require({
            message: 'Should this entry be deleted ?',
            header: 'Are you sure',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            acceptLabel: 'Delete',
            rejectClass: 'p-button-secondary p-button-outlined',
            acceptClass: 'p-button-danger',
            accept: () => {
                // showSuccessMessage('Action confirmed', `Entry with ID ${idToDelete} was deleted`)
                acceptCallback(idToDelete)
            },
            reject: () => {
                // showInfoMessage('Action cancelled', 'No changes are processed')
                rejectCallback(idToDelete)
            },
        })
    }

    function confirmAction(idAction: any, acceptCallback: (id: any) => void, rejectCallback: (id: any) => void = doNothing) {
        confirm.require({
            message: 'Should proceed with this action ?',
            header: 'Attention',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            acceptLabel: 'Accept',
            rejectClass: 'p-button-secondary p-button-outlined',
            acceptClass: 'p-button-success',
            accept: () => {
                acceptCallback(idAction)
                showInfoMessage('Action confirmed', `Entry with ID ${idAction} was processed`)
            },
            reject: () => {
                showInfoMessage('Action cancelled')
            },
        })
    }

    return { confirmDelete, confirmAction }
}