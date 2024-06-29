// components/Achievement.tsx

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface AchievementProps {
  title: string;
  percentage: number;
}

const Achievement: React.FC<AchievementProps> = ({ title, percentage }) => {
  return (
    <div className="w-8">
      <div className="w-8 h-8">
        <CircularProgressbar
          value={percentage}
          text={title}
          styles={buildStyles({
            textSize: "24px",
            pathColor: `#3b82f6`,
            textColor: "#3b82f6",
            trailColor: "#d1d5db",
          })}
        />
      </div>
    </div>
  );
};

export default Achievement;
