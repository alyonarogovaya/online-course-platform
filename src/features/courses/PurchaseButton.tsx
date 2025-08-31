import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import type { RootState } from "../../store";
import { purchaseCourse } from "./coursesSlice";
import { TiTick } from "react-icons/ti";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { toast } from "react-toastify";

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

  const onPurchase = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (status !== "loading") {
      const resultAction = await dispatch(purchaseCourse({ courseId }));

      if (purchaseCourse.fulfilled.match(resultAction)) {
        toast.success("Course purchased successfully!");
      } else if (purchaseCourse.rejected.match(resultAction)) {
        toast.error(resultAction.payload || "Failed to purchase course.");
      }
    }
  };

  if (isPurchased) return <span className="text-green-600 font-semibold"><TiTick /></span>;

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={onPurchase}
        disabled={status === "loading"}
        className={`px-4 py-2 rounded bg-blue-500 text-white cursor-pointer ${status === "loading" ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
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
