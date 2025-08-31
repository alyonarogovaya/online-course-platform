import type { JSX } from "react"
import type { Course } from "./types"
import Modal from "../../components/UI/Modal";
import { PurchaseButton } from "./PurchaseButton";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeVideo, openVideo } from "./coursesSlice";
import { CourseVideo } from "./CourseVideo";
import Spinner from "../../components/UI/Spinner";

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps): JSX.Element {
  const { id, title, description, price, videoUrl } = course;
  const { user, status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeVideo());
  };

  return <Modal>
    <Modal.Open opens={`course-${id}`} onOpen={() => dispatch(openVideo(id))}>
      <div
        className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between relative cursor-pointer hover:shadow-lg"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold cursor-pointer line-clamp-2">{title}</h2>
          <p className="text-gray-600 text-sm line-clamp-8">{description}</p>
        </div>

        <div className="flex flex-wrap items-end justify-between mt-6 gap-2">
          <span className="font-semibold">${price}</span>
          {status === "loading" ? (
            <Spinner />
          ) : user ? (
            <PurchaseButton courseId={id} />
          ) : (
            <span className="text-blue-500">Login to buy a course</span>
          )}
        </div>
      </div>
    </Modal.Open>
    <Modal.Window name={`course-${id}`} onCloseModal={handleCloseModal}>
      <div>
        <CourseVideo videoUrl={videoUrl} />
        <h2 className="text-lg font-bold cursor-pointer mt-4">{title}</h2>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </Modal.Window>
  </Modal>
}

export default CourseCard