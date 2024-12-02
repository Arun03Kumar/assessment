import React, { useEffect } from "react";
import { ReactComponent as Add } from "../icons/add.svg";
import { ReactComponent as Dots } from "../icons/3 dot menu.svg";
import { ReactComponent as User } from "../icons/user.svg";

const Icon = ({ available }) => {
  return (
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
  );
};

const KanbanHeader = ({ title, logo, size, type, available }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "250px",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        {logo}
        {type === "User" && <Icon available={available} />}
        <p style={{ fontSize: "12px", fontWeight: "500", marginLeft: "5px" }}>
          {title}
        </p>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "500",
            marginLeft: "5px",
            color: "gray",
          }}
        >
          {size}
        </p>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Add />
        <Dots />
      </div>
    </div>
  );
};

export default KanbanHeader;
