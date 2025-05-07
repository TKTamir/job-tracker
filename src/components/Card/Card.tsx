import React from "react";
import {CardProps} from "./interfaces.ts";

const Card: React.FC<CardProps> = ({icon, description, subtitle, title}) => {

  return (
    <div className="Card flex flex-col max-w-52">
      <img alt="card-icon" src={icon}></img>
      <div className="flex flex-col">
        <h3 className="m-2 font-bold text-lg">{title}</h3>
        <h5 className="m-2 text-xs">{subtitle}</h5>
        <p className="m-2 text-md">{description}</p>
      </div>
    </div>
  )
}

export default Card;
