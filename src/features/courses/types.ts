export interface Course {
  id: string, 
  title: string,
  description: string,
  videoUrl: string, 
  price: number
}

export interface CoursesState {
  items: Course[]
}