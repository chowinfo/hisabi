import React from "react";
import { useDispatch } from "react-redux";

import { toggleEdit } from '../editor/editorSlice';
import { toggleEditMode } from "../../app/appReducer";
import Dropdown from "../../atoms/Dropdown";
import { FaEdit } from "react-icons/fa";

export default function EditDropdown(props) {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const dispatch = useDispatch();
    function closeDropdownPopover() {
        setDropdownPopoverShow(false);
    }



    return (
        <>
            <Dropdown onChange={setDropdownPopoverShow} isOpen={dropdownPopoverShow}
                label={<><FaEdit className="text-lg leading-lg text-white opacity-75" />
                    <span>Edit</span></>}>
                <a
                    href="#info"
                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleEdit("Info"));
                        dispatch(toggleEditMode({ type: "edit" }));
                        closeDropdownPopover();
                    }}
                >
                    Information
                </a>
                <a
                    href="#t"
                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleEdit("T"));
                        dispatch(toggleEditMode({ type: "edit" }));
                        closeDropdownPopover();
                    }}
                >
                    Trading
                </a>
                <a
                    href="#pl"
                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleEdit("PL"));
                        dispatch(toggleEditMode({ type: "edit" }));
                        closeDropdownPopover();
                    }}
                >
                    Profit & Loss
                </a>
                <a
                    href="#bs"
                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleEdit("BS"));
                        dispatch(toggleEditMode({ type: "edit" }));
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
                        dispatch(toggleEdit("CS"));
                        dispatch(toggleEditMode({ type: "edit" }));
                        closeDropdownPopover();
                    }}
                >
                    Computation Sheet
                </a>
            </Dropdown>
        </>
    );
}
