import React, { useState } from "react";
import { ReactComponent as Down } from "../icons/down.svg";
import "./css/Select.css";

const Select = ({ name, options, setType, setVal, open, setOpen }) => {
  // const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState(options[0]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        margin: "15px",
        color: "grey",
      }}
    >
      <p>{name}</p>
      <div
        className="dropdown"
        onClick={setOpen}
        style={{ position: "relative" }}
      >
        <p
          style={{
            textTransform: "capitalize",
            fontWeight: "500",
            fontSize: "14px",
            marginBottom: "1.5px",
            color: "black",
          }}
        >
          {setVal}
        </p>
        <Down />
        {open && (
          <div className="selectOptions">
            {options.map((op, idx) => (
              <p
                key={idx}
                className="items"
                onClick={() => {
                  // setSelected(op);
                  setType(op);
                }}
              >
                {op}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
