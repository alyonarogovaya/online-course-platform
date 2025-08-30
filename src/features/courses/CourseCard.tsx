import type { JSX } from "react"
import type { Course } from "./types"
import Modal from "../../components/UI/Modal";
import { PurchaseButton } from "./PurchaseButton";
import { useAppDispatch } from "../../hooks";
import { closeVideo, openVideo, setCurrentTime, setPlaying } from "./coursesSlice";

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps): JSX.Element {
  const { id, title, description, price, videoUrl } = course;
  const dispatch = useAppDispatch();

  return <Modal>
    <Modal.Open opens={`course-${id}`} onOpen={() => dispatch(openVideo(id))}>
      <div
        className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between relative"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold cursor-pointer line-clamp-2">{title}</h2>
          <p className="text-gray-600 text-sm line-clamp-8">{description}</p>
        </div>

        <div className="flex flex-wrap items-end justify-between mt-6 gap-2">
          <span className="font-semibold">${price}</span>
          <PurchaseButton courseId={id} />
        </div>
      </div>
    </Modal.Open>
    <Modal.Window name={`course-${id}`} onCloseModal={() => dispatch(closeVideo())}>
      <div className="flex flex-col gap-4 min-h-[378px]">
        <video
          src={videoUrl}
          controls
          autoPlay
          className="rounded-lg shadow-lg max-h-[70vh]  min-h-[378px]"
          onPlay={() => dispatch(setPlaying(true))}
          onPause={() => dispatch(setPlaying(false))}
          onTimeUpdate={(e) => dispatch(setCurrentTime(e.currentTarget.currentTime))}
        />
      </div>
    </Modal.Window>
  </Modal>
}

export default CourseCard