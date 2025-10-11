import React from "react";
import { BsEyeFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { toggleSheet } from '../viewer/viewerSlice';
import { toggleTemplate } from "../../app/appReducer";
import Dropdown from "../../atoms/Dropdown";

export default function ViewDropdown(props) {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const dispatch = useDispatch();

  function closeDropdownPopover() {
    setDropdownPopoverShow(false);
  }



  return (
    <>
      <Dropdown onChange={setDropdownPopoverShow} isOpen={dropdownPopoverShow}
        label={<><BsEyeFill className="text-lg leading-lg text-white opacity-75" />
          <span>View</span></>}>
        <a
          href="#tpl"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleSheet("TPL"));
            dispatch(toggleTemplate({ type: "view" }));
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
            dispatch(toggleSheet("BS"));
            dispatch(toggleTemplate({ type: "view" }));
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
            dispatch(toggleSheet("CS"));
            dispatch(toggleTemplate({ type: "view" }));
            closeDropdownPopover();
          }}
        >
          Computation Sheet
        </a>
      </Dropdown>
    </>
  );
}
