import { gql } from "@apollo/client";

export const QUERY_SHOP_NOTIFICATIONS = gql`
  query ShopGetNotifications(
    $page: Int
    $limit: Int
    $sortedBy: BaseOrderByInput
    $where: NotificationWhereInput
  ) {
    shopGetNotifications(
      page: $page
      limit: $limit
      sortedBy: $sortedBy
      where: $where
    ) {
      success
      total
      data {
        id
        title
        description
        data
        is_read
        notification_type
        reference_id
        status
        created_at
      }
      error {
        code
        details
        message
      }
    }
  }
`;

export const MUTATION_SHOP_UPDATE_NOTIFICATIONS = gql`
  mutation ShopReadNotification($shopReadNotificationId: ID!) {
    shopReadNotification(id: $shopReadNotificationId) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;
