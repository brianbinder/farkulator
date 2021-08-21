import { Injectable } from '@angular/core';

const toastDuration = 3000;
interface Toast {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];

  constructor() {
  }

  sendToast(message: string): void {
    const toast = { message };
    this.toasts.push(toast);
    setTimeout(() => {
      this.toasts.splice(this.toasts.indexOf(toast), 1);
    }, toastDuration);
  }
}
