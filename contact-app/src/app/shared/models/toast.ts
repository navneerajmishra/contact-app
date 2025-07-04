export interface ToastMessage {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number; // ms
}
