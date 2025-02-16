export interface GetShopNotificationResponse {
  shopGetNotifications: {
    success: boolean;
    total: number;
    data: INotificationData[];
    error?: ErrorDetails;
  };
}

export interface INotificationData {
  id: string;
  title: string;
  description: string;
  data: JSON;
  is_read: boolean;
  notification_type: string;
  reference_id: string;
  status: string;
  created_at: string;
}
