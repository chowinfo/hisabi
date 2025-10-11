import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import TEdit from "./TEdit";
import PLEdit from "./PLEdit";
import BSEdit from "./BSEdit";
import CSEdit from "./CSEdit";
import InfoEdit from "./InfoEdit";

const Editor = ({ isActive = true, children, ...others }) => {
    const sheet = useSelector((state) => state.editor.sheet);
    if (!isActive) return null;
    return (
        <div className="editor" {...others}>
            {sheet === "Info" ? <InfoEdit /> : <></>}
            {sheet === "T" ? <TEdit /> : <></>}
            {sheet === "PL" ? <PLEdit /> : <></>}
            {sheet === "BS" ? <BSEdit /> : <></>}
            {sheet === "CS" ? <CSEdit /> : <></>}
        </div>
    );
};

Editor.propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool.isRequired
};

export default Editor;
