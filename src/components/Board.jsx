import axios from "axios";

import React, { useEffect, useState } from "react";
import "./css/Board.css";
import { Kanban } from "./Kanban";

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

const Board = ({ displayType, orderType }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // const status = ["Backlog", "Todo", "In Progress", "Done", "Canceled"]
  const status = [
    ["Backlog", <Backlog />],
    ["Todo", <Todo />],
    ["In progress", <Inprogress />],
    ["Done", <Done />],
    ["Canceled", <Canceled />],
  ];
  const priority = [
    ["0", <NoPriority />],
    ["4", <UrgentColor />],
    ["3", <HighPriority />],
    ["2", <MediumPriority />],
    ["1", <LowPriority />],
  ];

  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        // console.log(res.data)
        setTickets(res.data.tickets);
        setUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };

    data();
  }, []);
  return (
    <div className="board">
      {displayType === "Status" && (
        <Kanban
          type="Status"
          header={status}
          tickets={tickets}
          orderType={orderType}
          users={users}
        />
      )}
      {displayType === "Priority" && (
        <Kanban
          type="Priority"
          header={priority}
          tickets={tickets}
          orderType={orderType}
          users={users}
        />
      )}
      {displayType === "User" && (
        <Kanban
          type="User"
          header={users}
          tickets={tickets}
          orderType={orderType}
        />
      )}
    </div>
  );
};

export default Board;
