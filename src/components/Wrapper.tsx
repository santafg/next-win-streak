import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { incrementPercentage } from "@/redux/ac.slice";

const Wrapper = ({ children }: any) => {
  const achievements = useSelector(
    (state: RootState) => state.achievements.achievements
  );
  const currentIndex = useSelector(
    (state: RootState) => state.achievements.currentIndex
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(incrementPercentage());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, achievements, currentIndex]);
  return (
    <div>
      <div>
        <Header />
      </div>

      {children}
    </div>
  );
};

export default Wrapper;
