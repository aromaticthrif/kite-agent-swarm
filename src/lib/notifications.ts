export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface AppNotification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: number;
}

export function emitNotification(type: NotificationType, message: string): void {
  const event = new CustomEvent('app_notification', {
    detail: {
      id: 'notif-' + Date.now(),
      type,
      message,
      timestamp: Date.now(),
    },
  });
  window.dispatchEvent(event);
}
