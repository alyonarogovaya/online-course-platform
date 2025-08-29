import type { JSX } from "react"
import type { Course } from "./types"

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps): JSX.Element {
  const {id, title, description, price} = course


  return <div
    key={id}
    className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between"
  >
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold cursor-pointer line-clamp-2">{title}</h2>
      <p className="text-gray-600 text-sm line-clamp-8">{description}</p>
    </div>

    <div className="flex justify-between items-center mt-3">
      <span className="font-semibold">${price}</span>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded-lg"
      >
        Buy
      </button>
    </div>
  </div>
}

export default CourseCard