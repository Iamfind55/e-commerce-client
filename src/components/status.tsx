import React from "react";

interface StatusBadgeProps {
  status: string;
}

const useStatus = {
  NO_PICKUP: "NO_PICKUP",
  PROCESSING: "PROCESSING",
  CANCELLED: "CANCELLED",
  NOT_DELIVERY: "NOT_DELIVERY",
  PACKING: "PACKING",
  ON_THE_WAY: "ON_THE_WAY",
  ACTIVE: "ACTIVE",
  SUCCESS: "SUCCESS",
  INACTIVE: "INACTIVE",
  DELETED: "deleted",
  FAILED: "FAILED",
  LOCKED: "locked",
  BLOCKED: "blocked",
  PENDING: "pending",
  APPROVED: "approved",
  REGECTED: "rejected",
  COMPLETED: "COMPLETED",
  CancelD: "canceled",
  CANCELED: "cancelled",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case useStatus.ACTIVE:
        return {
          className: "bg-green-100 text-green-800",
          weight: "bg-green-500",
        };
      case useStatus.APPROVED:
        return {
          className: "bg-green-100 text-green-800",
          weight: "bg-green-500",
        };
      case useStatus.SUCCESS:
        return {
          className: "bg-green-100 text-green-800",
          weight: "bg-green-500",
        };
      case useStatus.INACTIVE:
        return {
          className: "bg-gray-100 text-gray-800",
          weight: "bg-b_text",
        };
      case useStatus.COMPLETED:
        return {
          className: "bg-green-100 text-green-800",
          weight: "bg-green-500",
        };
      case useStatus.DELETED:
        return {
          className: "bg-red-100 text-red-800",
          weight: "bg-red-500",
        };
      case useStatus.NOT_DELIVERY:
        return {
          className: "bg-red-100 text-red-800",
          weight: "bg-red-500",
        };
      case useStatus.NO_PICKUP:
        return {
          className: "bg-red-100 text-red-800",
          weight: "bg-red-500",
        };
      case useStatus.CancelD:
        return {
          className: "bg-red-100 text-red-800",
          weight: "bg-red-500",
        };
      case useStatus.CANCELED:
        return {
          className: "bg-red-100 text-red-800",
          weight: "bg-red-500",
        };
      case useStatus.REGECTED:
        return {
          className: "bg-red-100 text-red-800",
          weight: "bg-red-500",
        };
      case useStatus.FAILED:
        return {
          className: "bg-red-100 text-red-800",
          weight: "bg-red-500",
        };
      case useStatus.LOCKED:
        return {
          className: "bg-cyan-100 text-secondary",
          weight: "bg-secondary",
        };
      case useStatus.PENDING:
        return {
          className: "bg-yellow-200 text-yellow-600",
          weight: "bg-yellow-600",
        };
      case useStatus.PROCESSING:
        return {
          className: "bg-yellow-200 text-yellow-600",
          weight: "bg-yellow-600",
        };
      case useStatus.BLOCKED:
        return {
          className: "bg-cyan-100 text-white",
          weight: "bg-white",
        };
      default:
        return {
          className: "bg-gray-200 text-gray-800",
          weight: "bg-b_text",
        };
    }
  };

  const { className, weight } = getStatusStyles(status);

  return (
    <span
      className={`${className} inline-flex items-center justify-center text-xs font-medium px-2.5 py-0.5 rounded-lg`}
    >
      <span className={`w-2 h-2 me-1 rounded-full ${weight}`}></span>
      {status}
    </span>
  );
};

export default StatusBadge;
