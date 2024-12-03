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

  const handleDrop = (e, val, type) => {
    e.preventDefault();
    if (type === "User") {
      const draggedData = JSON.parse(e.dataTransfer.getData("text/plain"));

      const start_user = draggedData.userId;
      const end_user = val[0].userId;

      if (start_user !== end_user) {
        setTicketsByUsers((prevTicketsByUsers) => {
          const updatedTicketsByUsers = JSON.parse(
            JSON.stringify(prevTicketsByUsers)
          );

          updatedTicketsByUsers[start_user] = updatedTicketsByUsers[
            start_user
          ].filter((ticket) => ticket.id !== draggedData.id);

          const updatedTicket = { ...draggedData, userId: end_user };

          if (!updatedTicketsByUsers[end_user]) {
            updatedTicketsByUsers[end_user] = [];
          }

          const isDuplicate = updatedTicketsByUsers[end_user].some(
            (ticket) => ticket.id === updatedTicket.id
          );

          if (!isDuplicate) {
            updatedTicketsByUsers[end_user].push(updatedTicket);
          }

          // console.log("Updated tickets by users:", updatedTicketsByUsers);
          return updatedTicketsByUsers;
        });
      }
    }
  };

  const handleDropPriority = (e, val) => {
    console.log("drag end", val);
    console.log("com", ticketsByPriority);
    const draggedData = JSON.parse(e.dataTransfer.getData("text/plain"));

    const start_user = draggedData.priority;
    const end_user = val[0].priority;

    if (start_user !== end_user) {
      setTicketsByPriority((prevTicketsByUsers) => {
        const updatedTicketsByUsers = JSON.parse(
          JSON.stringify(prevTicketsByUsers)
        );

        updatedTicketsByUsers[start_user] = updatedTicketsByUsers[
          start_user
        ].filter((ticket) => ticket.id !== draggedData.id);

        const updatedTicket = { ...draggedData, userId: end_user };

        if (!updatedTicketsByUsers[end_user]) {
          updatedTicketsByUsers[end_user] = [];
        }

        const isDuplicate = updatedTicketsByUsers[end_user].some(
          (ticket) => ticket.id === updatedTicket.id
        );

        if (!isDuplicate) {
          updatedTicketsByUsers[end_user].push(updatedTicket);
        }

        // console.log("Updated tickets by users:", updatedTicketsByUsers);
        return updatedTicketsByUsers;
      });
    }
  };

  const handleDropStatus = (e, val, txt) => {
    console.log(txt);
    console.log(ticketsByStatus);
    const draggedData = JSON.parse(e.dataTransfer.getData("text/plain"));

    const start_user = draggedData.status;
    const end_user = txt;

    if (start_user !== end_user) {
      setTicketsByStatus((prevTicketsByUsers) => {
        const updatedTicketsByUsers = JSON.parse(
          JSON.stringify(prevTicketsByUsers)
        );

        updatedTicketsByUsers[start_user] = updatedTicketsByUsers[
          start_user
        ].filter((ticket) => ticket.id !== draggedData.id);

        const updatedTicket = { ...draggedData, userId: end_user };

        if (!updatedTicketsByUsers[end_user]) {
          updatedTicketsByUsers[end_user] = [];
        }

        const isDuplicate = updatedTicketsByUsers[end_user].some(
          (ticket) => ticket.id === updatedTicket.id
        );

        if (!isDuplicate) {
          updatedTicketsByUsers[end_user].push(updatedTicket);
        }

        // console.log("Updated tickets by users:", updatedTicketsByUsers);
        return updatedTicketsByUsers;
      });
    }
  };

  return (
    <div style={{ display: "flex", gap: "50px", backgroundColor: "#f4f6fa" }}>
      {header.map((item, idx) => (
        <div key={idx} style={{ display: "flex", flexDirection: "column" }}>
          {type === "Status" && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) =>
                handleDropStatus(e, ticketsByStatus[item[0]], item[0])
              }
            >
              <KanbanHeader
                title={item[0]}
                logo={item[1]}
                size={ticketsByStatus[item[0]]?.length}
                type={type}
              />
              {ticketsByStatus[item[0]]?.map((t) => {
                const user = users.find((u) => u.id === t.userId);
                return (
                  <Card type="status" values={t} available={user?.available} />
                );
              })}
            </div>
          )}

          {type === "Priority" && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropPriority(e, ticketsByPriority[item[0]])}
            >
              <KanbanHeader
                title={priorityMapping[item[0]]}
                logo={item[1]}
                size={ticketsByPriority[item[0]]?.length}
                type={type}
              />
              {ticketsByPriority[item[0]]?.map((t) => {
                const user = users.find((u) => u.id === t.userId);
                return (
                  <Card
                    type="priority"
                    values={t}
                    available={user?.available}
                  />
                );
              })}
            </div>
          )}

          {type === "User" && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, ticketsByUsers[item.id], type)}
            >
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
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
