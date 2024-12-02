import React, { useEffect, useState } from "react";
import KanbanHeader from "./KanbanHeader";
import Card from "./Card";

export const Kanban = ({ type, header, tickets, orderType, users }) => {
  const [ticketsByStatus, setTicketsByStatus] = useState({});
  const [ticketsByPriority, setTicketsByPriority] = useState({});
  const [ticketsByUsers, setTicketsByUsers] = useState({});

  const priorityMapping = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };

  const sortObjectValuesByKey = (obj, orderType) => {
    const sortedObj = {};

    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        sortedObj[key] = [...obj[key]].sort((a, b) => {
          if (
            typeof a[orderType] === "string" &&
            typeof b[orderType] === "string"
          ) {
            return a[orderType].localeCompare(b[orderType]);
          } else {
            return b[orderType] - a[orderType];
          }
        });
      } else {
        sortedObj[key] = obj[key];
      }
    }

    return sortedObj;
  };

  const extractTicketsByStatus = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      if (!acc[ticket.status]) {
        acc[ticket.status] = [];
      }
      acc[ticket.status].push(ticket);
      return acc;
    }, {});
  };

  const extractTicketsByPriority = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      if (!acc[ticket.priority]) {
        acc[ticket.priority] = [];
      }
      acc[ticket.priority].push(ticket);
      return acc;
    }, {});
  };

  const extractTicketsByUsers = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      if (!acc[ticket.userId]) {
        acc[ticket.userId] = [];
      }
      acc[ticket.userId].push(ticket);
      return acc;
    }, {});
  };

  useEffect(() => {
    const categorizedTickets = extractTicketsByStatus(tickets);
    const sortedTicketsByStatus = sortObjectValuesByKey(
      categorizedTickets,
      orderType
    );
    setTicketsByStatus(sortedTicketsByStatus);

    // console.log(sortedTicketsByStatus)

    const ticketsByP = extractTicketsByPriority(tickets);
    const sortedTicketsByPriority = sortObjectValuesByKey(
      ticketsByP,
      orderType
    );
    setTicketsByPriority(sortedTicketsByPriority);

    const ticketsByU = extractTicketsByUsers(tickets);
    const sortedTicketsByUsers = sortObjectValuesByKey(ticketsByU, orderType);
    setTicketsByUsers(sortedTicketsByUsers);
  }, [tickets, orderType]);

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      {header.map((item, idx) => (
        <div key={idx} style={{ display: "flex", flexDirection: "column" }}>
          {type === "Status" && (
            <>
              <KanbanHeader
                title={item[0]}
                logo={item[1]}
                size={ticketsByStatus[item[0]]?.length}
                type={type}
              />
              {ticketsByStatus[item[0]]?.map((t) => {
                const user = users.find((u) => u.id === t.userId);
                return (
                  <Card type="status" values={t} available={user.available} />
                );
              })}
            </>
          )}

          {type === "Priority" && (
            <>
              <KanbanHeader
                title={priorityMapping[item[0]]}
                logo={item[1]}
                size={ticketsByPriority[item[0]]?.length}
                type={type}
              />
              {ticketsByPriority[item[0]]?.map((t) => {
                const user = users.find((u) => u.id === t.userId);
                return (
                  <Card type="priority" values={t} available={user.available} />
                );
              })}
            </>
          )}

          {type === "User" && (
            <>
              <KanbanHeader
                title={item.name}
                logo={item[1]}
                size={ticketsByUsers[item.id]?.length}
                type={type}
                available={item.available}
              />
              {ticketsByUsers[item.id]?.map((t) => (
                <Card type="user" values={t} />
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
