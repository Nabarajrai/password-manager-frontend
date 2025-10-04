import { memo } from "react";
import classnames from "classnames";

const CardComponent = ({ title, number, icon, type, iconColor }) => {
  const iconClass = classnames("icon", `icon-${iconColor}`);
  const joinClass = classnames("card-container", `${type}`);
  return (
    <div className={joinClass}>
      <div className="card-des">
        <div className="card-des__name">{title}</div>
        <div className="card-des__number">{number}</div>
      </div>
      <div className={iconClass}>{icon} </div>
    </div>
  );
};

export default memo(CardComponent);
