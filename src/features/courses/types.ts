export interface Course {
  id: string, 
  title: string,
  description: string,
  videoUrl: string, 
  price: number
}

export interface CoursesState {
  courses: Course[],
  status: string,
  error: string,
}