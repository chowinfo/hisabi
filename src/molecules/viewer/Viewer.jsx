import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import TPLView from "./TPLView";
import BSView from "./BSView";
import CSView from "./CSView";

const Viewer = React.forwardRef(({ isActive = true, children, ...props }, ref) => {
    const sheet = useSelector((state) => state.viewer.sheet);
    if (!isActive) return null;
    return (
        <div className="viewer" ref={ref}>
            {sheet === "TPL" ? <TPLView /> : <></>}
            {sheet === "BS" ? <BSView /> : <></>}
            {sheet === "CS" ? <CSView /> : <></>}
        </div>
    );
});

Viewer.propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool.isRequired
};

export default Viewer;
