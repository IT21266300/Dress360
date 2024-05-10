import React, { useEffect, useState } from "react";
import dressTimeReward from "../../public/images/DressTimeReward.png";

interface DressTimeRewardProps {
  timeSpent: number;
  totalEarnedPoints: number;
  claimedPoints: number;
}

  const DressTimeReward: React.FC<DressTimeRewardProps> = ({ timeSpent,
    totalEarnedPoints,
    claimedPoints, }) => {
      const availablePoints = totalEarnedPoints - claimedPoints;
    // ... (existing state and variables) ...
  
    const [timeElapsed, setTimeElapsed] = useState(0); // State to track elapsed seconds
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1); 
      }, 1000); // Update every second
  
      return () => clearInterval(intervalId); // Clean up on unmount
    }, []);
  
    // Function to format elapsed time (e.g., into minutes and seconds)
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    };
  


  return (
    <div className="container dress-time-reward">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">DressTime Reward</h2>

          <ul className="list-group mt-5">
          <div className="row">
        <div className="col-md-8">
          <li className="list-group-item">Time Spent on Dress360</li>
        </div>
        <div className="col-md-4">
          <li className="list-group-item text-center">{formatTime(timeElapsed)}</li> 
        </div>
      </div>
           
            <div className="row">
              <div className="col-md-8">
                <li className="list-group-item">
                Your Total Earned Points
                </li>
              </div>
              <div className="col-md-4"><li className="list-group-item text-center">{totalEarnedPoints}</li></div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <li className="list-group-item">
                Your Claimed Points
                </li>
              </div>
              <div className="col-md-4"><li className="list-group-item text-center">{claimedPoints}</li></div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <li className="list-group-item">
                Your Available Points
                </li>
              </div>
              <div className="col-md-4"><li className="list-group-item text-center">{availablePoints}</li></div>
            </div>




            {/* <li className="list-group-item">
              Time Spent on Dress360: {timeSpent} hr
            </li>
            <li className="list-group-item">
              Your Total Earned Points: {totalEarnedPoints}
            </li>
            <li className="list-group-item">
              Your Claimed Points: {claimedPoints}
            </li>
            <li className="list-group-item">
              Your Available Points: {availablePoints}
            </li> */}
          </ul>
        </div>
        <div className="col-md-6 text-center">
          <img
            src={dressTimeReward}
            alt="Loyalty Rewards Program"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default DressTimeReward;
