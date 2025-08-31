import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import type { RootState } from "../../store";
import { purchaseCourse } from "./coursesSlice";
import { TiTick } from "react-icons/ti";
import ErrorMessage from "../../components/UI/ErrorMessage";

interface PurchaseButtonProps {
  courseId: string;
}

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({ courseId }) => {
  const dispatch = useAppDispatch();
  const purchasedIds = useSelector((state: RootState) => state.courses.purchasedIds);
  const purchasingStatus = useSelector(
    (state: RootState) => state.courses.purchasingStatus
  );
  const purchaseError = useSelector(
    (state: RootState) => state.courses.purchaseError
  );

  const status = purchasingStatus[courseId] || "idle"; 
  const error = purchaseError[courseId];
  const isPurchased = purchasedIds.includes(courseId);

  const onPurchase = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
     if (status !== "loading") {
      dispatch(purchaseCourse({ courseId }));
    }
  };

  if (isPurchased) return <span className="text-green-600 font-semibold"><TiTick /></span>;

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={onPurchase}
        disabled={status === "loading"}
        className={`px-4 py-2 rounded bg-blue-500 text-white cursor-pointer ${
          status === "loading" ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {status === "loading"
          ? "Processing..."
          : status === "rejected"
          ? "Retry Purchase"
          : "Buy Course"}
      </button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};
