import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Spinner from "../../components/UI/Spinner";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { getCourses } from "./coursesSlice";
import CourseCard from "./CourseCard";


const CourseList: React.FC = () => {
  const { courses, status, error } = useAppSelector(
    (state) => state.courses
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="flex items-center justify-center">
      <Spinner />
    </div>;
  }
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>
  }

  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard course={course} />
      ))}

    </div>
  );
};

export default CourseList;
