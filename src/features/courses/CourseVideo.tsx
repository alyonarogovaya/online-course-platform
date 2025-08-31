import { useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { setCurrentTime, setPlaying } from "./coursesSlice";

interface CourseVideoProps {
  videoUrl: string;
}

export function CourseVideo({ videoUrl }: CourseVideoProps) {
  const dispatch = useAppDispatch();
  const currentTimeRef = useRef(0);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    currentTimeRef.current = e.currentTarget.currentTime;
  };

  const handlePlay = () => {
    dispatch(setPlaying(true));
  };

  const handlePause = () => {
    dispatch(setPlaying(false));
    dispatch(setCurrentTime(currentTimeRef.current));
  };
  return (
    <div className="flex flex-col gap-4 min-h-[378px]">
      <video
        src={videoUrl}
        controls
        autoPlay
        className="rounded-lg shadow-lg max-h-[70vh] min-h-[378px]"
        controlsList="nodownload noremoteplayback"
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}
