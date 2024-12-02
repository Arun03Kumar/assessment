import React, { useState, useRef, useEffect } from "react";
import "./css/Header.css";
import { ReactComponent as Display } from "../icons/Display.svg";
import { ReactComponent as Down } from "../icons/down.svg";
import Select from "./Select";

export const Header = ({
  displayType,
  orderType,
  setDisplayType,
  setOrderType,
}) => {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="display" onClick={() => setOpen(!open)}>
        <Display />
        <p
          style={{ fontWeight: "500", fontSize: "14px", marginBottom: "1.5px" }}
        >
          Display
        </p>
        <Down />
      </div>
      {open && (
        <div className="displayOptions" ref={modalRef}>
          <div>
            <Select
              name="Grouping"
              options={["Status", "User", "Priority"]}
              setType={setDisplayType}
              setVal={displayType}
              open={openDropdown === "Grouping"}
              setOpen={() =>
                setOpenDropdown((prev) =>
                  prev === "Grouping" ? null : "Grouping"
                )
              }
            />
            <Select
              name="Ordering"
              options={["priority", "title"]}
              setType={setOrderType}
              setVal={orderType}
              open={openDropdown === "Ordering"}
              setOpen={() =>
                setOpenDropdown((prev) =>
                  prev === "Ordering" ? null : "Ordering"
                )
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
