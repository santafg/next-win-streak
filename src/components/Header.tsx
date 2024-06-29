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
  const [pendingachievements, setPendingAchievements] = useState<Achievement[]>(
    []
  );
  const sliderRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState<null | number>(0);
  const [glow, setGlow] = useState(false);

  const mockData = useSelector(
    (state: RootState) => state.achievements.achievements
  );

  // console.log("currentIndex", currentIndex);
  const [myIndex, setMyIndex] = useState<null | number>(null);

  const [trigger, setTrigger] = useState(false);

  // console.log("achievements", achievements);

  // console.log("myIndex", myIndex);

  const [display, setDisplay] = useState(false);

  const [land, setland] = useState(false);

  useEffect(() => {
    if (mockData && mockData.length > 0) {
      setAchievements(mockData);
      setPendingAchievements(mockData.filter((s) => s.percentage != 100));

      // const curr = mockData.filter((s) => s.percentage != 100).length;
      // if (curr != myIndex && achievements.length > 0) {
      setMyIndex(mockData.filter((s) => s.percentage == 100).length);
      // }
    }
  }, [mockData]);

  useEffect(() => {
    if (
      myIndex &&
      myIndex > 0 &&
      myIndex == mockData.filter((s) => s.percentage == 100).length &&
      land
    ) {
      setDisplay(true);

      setGlow(true);
      setTimeout(() => {
        setGlow(false);
      }, 3000);

      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.slickNext();
        }
      }, 1000);

      setTimeout(() => {
        setDisplay(false);
      }, 2000);
    }
  }, [myIndex]);

  useEffect(() => {
    setTimeout(() => {
      setland(true);
    }, 3000);
  }, []);

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

  // useEffect(() => {
  //   console.log(
  //     "first",
  //     achievements.filter((s) => s.percentage != 100).length,
  //     mockData.filter((s) => s.percentage != 100).length
  //   );
  //   if (
  //     achievements.filter((s) => s.percentage != 100).length > 0 &&
  //     achievements.filter((s) => s.percentage != 100).length !=
  //       mockData.filter((s) => s.percentage != 100).length
  //   ) {
  //     console.log("hello");

  //     setAchievements(mockData);
  //     if (sliderRef.current) {
  //       sliderRef.current.slickNext();
  //     }
  //     setTimeout(() => {
  //       setAchievements(mockData);
  //     }, 3000);
  //   } else {
  //     if (achievements.length == 0) {
  //       setAchievements(mockData.filter((s) => s.percentage != 100));
  //     }
  //   }
  // }, [mockData]);

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
      <div className="relative">
        {display && myIndex && myIndex > 0 && (
          <div
            className={`border-4 absolute top-0 right-0 z-20 bg-white ${
              glow ? "border-yellow-500" : ""
            }`}
            style={{ width: "120px" }}
          >
            <Slider initialSlide={myIndex - 1} ref={sliderRef} {...settings}>
              {achievements.length > 0 &&
                achievements.map((achievement, index) => (
                  <Achievement
                    key={index}
                    title={achievement.name}
                    percentage={achievement.percentage}
                  />
                ))}
            </Slider>
          </div>
        )}

        <div
          className={`border-4 absolute top-0 right-0 ${
            glow ? "border-yellow-500" : ""
          }`}
          style={{ width: "120px" }}
        >
          <Slider {...settings}>
            {pendingachievements.length > 0 &&
              pendingachievements.map((achievement, index) => (
                <Achievement
                  key={index}
                  title={achievement.name}
                  percentage={achievement.percentage}
                />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Header;
