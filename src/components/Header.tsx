import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import Achievement from "./Achievement";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

interface Achievement {
  title: string;
  percentage: number;
  name: string;
}

export interface Route {
  label: string;
  path: string;
}

export const routes: Route[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
];

const Header: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const sliderRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState<null | number>(0);
  const [glow, setGlow] = useState(false);

  const mockData = useSelector(
    (state: RootState) => state.achievements.achievements
  );

  // console.log("currentIndex", currentIndex);
  const [myIndex, setMyIndex] = useState(0);

  const [trigger, setTrigger] = useState(false);

  // useEffect(() => {
  //   if (mockData && mockData.length > 0) {
  //     const curr = mockData.filter((s) => s.percentage == 100).length;
  //     console.log("curr , OUT", curr, myIndex);
  //     // setAchievements(mockData.filter((s) => s.percentage != 100));
  //     setMyIndex(curr);
  //     // if (curr == 0) {
  //     //   console.log("curr zero");
  //     //   setAchievements(mockData);
  //     // } else {
  //     //   if (achievements.length == 0) {
  //     //     console.log("in length");

  //     //     setAchievements(mockData.filter((s) => s.percentage != 100));
  //     //   } else {
  //     //     // setAchievements(mockData);
  //     //     if (curr > myIndex) {
  //     //       if (sliderRef.current) {
  //     //         sliderRef.current.slickNext();
  //     //       }
  //     //       setTimeout(() => {
  //     //         setAchievements(mockData.filter((s) => s.percentage != 100));
  //     //       }, 500);
  //     //     }
  //     //   }
  //     // }
  //   }
  // }, [mockData]);

  // useEffect(() => {
  //   if (mockData && mockData.length > 0) {
  //     setMyIndex
  //   }
  // }, [mockData])

  useEffect(() => {
    console.log(
      "first",
      achievements.filter((s) => s.percentage != 100).length,
      mockData.filter((s) => s.percentage != 100).length
    );
    if (
      achievements.filter((s) => s.percentage != 100).length > 0 &&
      achievements.filter((s) => s.percentage != 100).length !=
        mockData.filter((s) => s.percentage != 100).length
    ) {
      console.log("hello");

      setAchievements(mockData);
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
      setTimeout(() => {
        setAchievements(mockData);
      }, 3000);
    } else {
      if (achievements.length == 0) {
        setAchievements(mockData.filter((s) => s.percentage != 100));
      }
    }
  }, [mockData]);

  // const incrementPercentage = () => {
  //   if (currentIndex != null) {
  //     console.log("achievements[currentIndex]", currentIndex,achievements.length);
  //     if (
  //       currentIndex < achievements.length - 1 &&
  //       achievements[currentIndex-1] &&
  //       achievements[currentIndex-1].percentage == 100
  //     ) {
  // if (sliderRef.current) {
  //   sliderRef.current.slickNext();
  // }
  // setGlow(true);
  // setTimeout(() => {
  //   setGlow(false);
  // }, 3000);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (currentIndex != null) {
  //     incrementPercentage();
  //   }
  // }, [currentIndex]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex justify-between mx-4">
      <div>
        <ul className="flex gap-2">
          {routes.map((route: Route, index: number) => (
            <li key={index}>
              <Link href={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`border-4 ${glow ? "border-yellow-500" : ""}`}
        style={{ width: "120px" }}
      >
        {currentIndex != null ? (
          <Slider initialSlide={currentIndex} ref={sliderRef} {...settings}>
            {achievements.length > 0 &&
              achievements.map((achievement, index) => (
                <Achievement
                  key={index}
                  title={achievement.name}
                  percentage={achievement.percentage}
                />
              ))}
          </Slider>
        ) : (
          <h2>Loading..</h2>
        )}
      </div>
    </div>
  );
};

export default Header;
