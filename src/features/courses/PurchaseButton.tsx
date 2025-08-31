import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { purchaseCourse } from "./coursesSlice";
import { TiTick } from "react-icons/ti";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { toast } from "react-toastify";

interface PurchaseButtonProps {
  courseId: string;
}

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({ courseId }) => {
  const purchasedIds = useAppSelector((state) => state.courses.purchasedIds);
  const user = useAppSelector((state) => state.auth.user);
  const purchasingStatus = useAppSelector(
    (state) => state.courses.purchasingStatus
  );
  const purchaseError = useAppSelector(
    (state) => state.courses.purchaseError
  );
  const dispatch = useAppDispatch();

  const status = purchasingStatus[courseId] || "idle";
  const error = purchaseError[courseId];
  const isPurchased = purchasedIds.includes(courseId);

  const onPurchase = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (status !== "loading" && user) {
      const resultAction = await dispatch(purchaseCourse({ courseId, userEmail: user.email }));

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
