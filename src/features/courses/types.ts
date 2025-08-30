export interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  price: number;
}

export interface CoursesState {
  courses: Course[];
  status: "idle" | "loading" | "fulfilled" | "rejected";
  error: string;
  purchasedIds: string[];
  purchasingStatus: Record<string, "idle" | "loading" | "fulfilled" | "rejected">;
  purchaseError: Record<string, string>; 
}

export interface PurchaseResult {
  status: string;
  courseId: string;
}
