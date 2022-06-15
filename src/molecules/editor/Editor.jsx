import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TEdit from "./TEdit";
import PLEdit from "./PLEdit";
import BSEdit from "./BSEdit";
import CSEdit from "./CSEdit";
import InfoEdit from './InfoEdit';

const Editor = ({ isActive, ...others }) => {
    const edit = useSelector((state) => state.editor.edit);
    if (!isActive)
        return null;
    return (
        <div className="editor" {...others}>
            {edit === "Info" ? (
                <InfoEdit />
            ) : (
                <></>
            )}
            {edit === "T" ? (
                <TEdit />
            ) : (
                <></>
            )}
            {edit === "PL" ? (
                <PLEdit />
            ) : (
                <></>
            )}
            {edit === "BS" ? (
                <BSEdit />
            ) : (
                <></>
            )}
            {edit === "CS" ? (
                <CSEdit />
            ) : (
                <></>
            )}
        </div>
    );
}

Editor.propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool.isRequired,
};

Editor.defaultProps = {
    isActive: true
};

export default Editor;

