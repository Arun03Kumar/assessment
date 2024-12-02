import React from "react";
import "./css/Card.css";

import { ReactComponent as Backlog } from "../icons/Backlog.svg";
import { ReactComponent as Todo } from "../icons/To-do.svg";
import { ReactComponent as Inprogress } from "../icons/in-progress.svg";
import { ReactComponent as Done } from "../icons/Done.svg";
import { ReactComponent as Canceled } from "../icons/Cancelled.svg";
import { ReactComponent as NoPriority } from "../icons/No-priority.svg";
import { ReactComponent as UrgentColor } from "../icons/SVG - Urgent Priority colour.svg";
import { ReactComponent as HighPriority } from "../icons/Img - High Priority.svg";
import { ReactComponent as MediumPriority } from "../icons/Img - Medium Priority.svg";
import { ReactComponent as LowPriority } from "../icons/Img - Low Priority.svg";
import { ReactComponent as User } from "../icons/user.svg";

const Card = ({ type, values, available }) => {
  const priorityMap = {
    0: <NoPriority />,
    4: <UrgentColor />,
    3: <HighPriority />,
    2: <MediumPriority />,
    1: <LowPriority />,
  };

  const statusMap = {
    Backlog: <Backlog />,
    Todo: <Todo />,
    "In progress": <Inprogress />,
    Done: <Done />,
    Canceled: <Canceled />,
  };

  return (
    <div className="card-container">
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="card-id">{values.id}</p>
          {type !== "user" && (
            <div
              className={`available ${available ? "bg-avail" : ""}`}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "1px solid gray",
              }}
            >
              <User />
            </div>
          )}
        </div>

        <div style={{ display: "flex" }}>
          {(type === "priority" || type === "user") && (
            <div>{statusMap[values.status]}</div>
          )}
          <p
            className={`card-title ${
              type === "priority" || type === "user" ? "title-margin" : ""
            }`}
          >
            {values.title.length > 70
              ? values.title.slice(0, 70) + "..."
              : values.title}
          </p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {(type === "status" || type === "user") && (
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "2px",
            }}
          >
            {priorityMap[values.priority]}
          </div>
        )}
        <div className="card-tag">
          <div className="solid-circle" />
          <p>Feature Request</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
