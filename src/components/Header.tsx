import React, { useEffect, useState } from "react";
import Achievement from "./Achievement";

interface Achievement {
  title: string;
  percentage: number;
}

const initialAchievements: Achievement[] = [
  { title: "First Trade", percentage: 0 },
  { title: "Every 5 bets", percentage: 0 },
  { title: "5x streak", percentage: 0 },
  { title: "5x wins", percentage: 0 },
  { title: "10x win streak", percentage: 0 },
  { title: "20x win streak", percentage: 0 },
  { title: "40x win streak", percentage: 0 },
];

const Header: React.FC = () => {
  const [achievements, setAchievements] =
    useState<Achievement[]>(initialAchievements);

  useEffect(() => {
    const incrementPercentage = (index: number) => {
      setAchievements((prev) => {
        // Check if percentage is already 100, don't increase further
        if (prev[index].percentage < 100) {
          return prev.map((achievement, i) =>
            i === index
              ? { ...achievement, percentage: achievement.percentage + 10 }
              : achievement
          );
        }
        return prev;
      });
    };

    const timers = achievements.map((_, index) =>
      setInterval(() => {
        incrementPercentage(index);
      }, 1000 * (index + 1))
    );

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [achievements]);
  return (
    <div className="flex justify-between">
      <div></div>
      <div className="flex gap-2 w-36 overflow-hidden border-4 ">
        {achievements.map((achievement, index) => (
          <Achievement
            key={index}
            title={index}
            percentage={achievement.percentage}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
