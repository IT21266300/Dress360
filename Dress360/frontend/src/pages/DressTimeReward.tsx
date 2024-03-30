import React from 'react';
import dressTimeReward from '../../public/images/DressTimeReward.png';


interface DressTimeRewardProps {
  timeSpent: number;
  totalEarnedPoints: number;
  claimedPoints: number;
}

const DressTimeReward: React.FC<DressTimeRewardProps> = ({
  timeSpent,
  totalEarnedPoints,
  claimedPoints,
}) => {
  const availablePoints = totalEarnedPoints - claimedPoints;

  return (
    <div className="container dress-time-reward">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">DressTime Reward</h2>
          <ul className="list-group mt-5">
            <li className="list-group-item">
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
            </li>
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