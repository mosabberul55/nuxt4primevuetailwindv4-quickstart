import {useToast} from "primevue/usetoast";

export enum MessageSeverity {
    SUCCESS = 'success',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    Secondary = 'secondary',
    Contrast = 'contrast',
}

export function useMessages() {
    const toast = useToast();

    function showMessage(severity: MessageSeverity, summary: string, detail: string, life: number = 3000) {
        toast.add({severity, summary, detail, life});
    }

    function showSuccessMessage(summary: string, detail: string = summary, life: number = 3000) {
        showMessage(MessageSeverity.SUCCESS, summary, detail, life);
    }

    function showInfoMessage(summary: string, detail: string = summary, life: number = 3000) {
        showMessage(MessageSeverity.INFO, summary, detail, life);
    }

    function showWarnMessage(summary: string, detail: string = summary, life: number = 3000) {
        showMessage(MessageSeverity.WARN, summary, detail, life);
    }

    function showErrorMessage(summary: string, detail: string = summary, life: number = 3000) {
        showMessage(MessageSeverity.ERROR, summary, detail, life);
    }

    function showSecondaryMessage(summary: string, detail: string = summary, life: number = 3000) {
        showMessage(MessageSeverity.Secondary, summary, detail, life);
    }

    function showContrastMessage(summary: string, detail: string = summary, life: number = 3000) {
        showMessage(MessageSeverity.Contrast, summary, detail, life);
    }



    return {
        showMessage, showSuccessMessage, showInfoMessage, showWarnMessage, showErrorMessage, showSecondaryMessage, showContrastMessage
    }

}