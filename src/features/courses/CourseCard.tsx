import type { JSX } from "react"
import type { Course } from "./types"
import Modal from "../../components/UI/Modal";

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps): JSX.Element {
  const { id, title, description, price, videoUrl } = course


  return <Modal>
    <Modal.Open opens={`course-${id}`}>
      <div
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
    </Modal.Open>
    <Modal.Window name={`course-${id}`}>
     <div className="flex flex-col gap-4 min-h-[378px]">
      <video
        src={videoUrl}
        controls
        autoPlay
        className="rounded-lg shadow-lg max-h-[70vh]  min-h-[378px]"
      />
    </div>
    </Modal.Window>
  </Modal>
}

export default CourseCard