import React from "react";
import { BsEyeFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { toggleView } from '../viewer/viewerSlice';
import { toggleEditMode } from "../../app/appReducer";
import Dropdown from "../../atoms/Dropdown";

export default function ViewDropdown(props) {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  // const btnDropdownRef = React.createRef();
  // const popoverDropdownRef = React.createRef();
  const dispatch = useDispatch();

  // function openDropdownPopover() {
  //   // createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
  //   //   placement: "bottom-start",
  //   // });
  //   setDropdownPopoverShow(true);
  // }
  function closeDropdownPopover() {
    setDropdownPopoverShow(false);
  }



  return (
    <>
      {/* <div className="relative">
        <a
          className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ease-linear transition-all duration-150 "
          href="#view"
          type="button"
          ref={btnDropdownRef}
          onClick={() => {
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
        >
          <BsEyeFill className="text-lg leading-lg text-white opacity-75" />
          <span className="ml-2">View</span>
        </a>
        <div
          ref={popoverDropdownRef}
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-2"
          }
          style={{ minWidth: "12rem" }}
        >
          <a
            href="#tpl"
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleView("TPL"));
              dispatch(toggleEditMode({ type: "view" }));
              closeDropdownPopover();
            }}
          >
            Trading Profit & Loss
          </a>
          <a
            href="#bs"
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleView("BS"));
              dispatch(toggleEditMode({ type: "view" }));
              closeDropdownPopover();
            }}
          >
            BalanceSheet
          </a>
          <a
            href="#cs"
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleView("CS"));
              dispatch(toggleEditMode({ type: "view" }));
              closeDropdownPopover();
            }}
          >
            Computation Sheet
          </a>
        </div>
      </div> */}
      <Dropdown onChange={setDropdownPopoverShow} isOpen={dropdownPopoverShow}
        label={<><BsEyeFill className="text-lg leading-lg text-white opacity-75" />
          <span>View</span></>}>
        <a
          href="#tpl"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleView("TPL"));
            dispatch(toggleEditMode({ type: "view" }));
            closeDropdownPopover();
          }}
        >
          Trading Profit & Loss
        </a>
        <a
          href="#bs"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleView("BS"));
            dispatch(toggleEditMode({ type: "view" }));
            closeDropdownPopover();
          }}
        >
          BalanceSheet
        </a>
        <a
          href="#cs"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleView("CS"));
            dispatch(toggleEditMode({ type: "view" }));
            closeDropdownPopover();
          }}
        >
          Computation Sheet
        </a>
      </Dropdown>
    </>
  );
}
