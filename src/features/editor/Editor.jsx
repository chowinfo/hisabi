import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TPLEdit from "./TPLEdit";
import BSEdit from "./BSEdit";
import CSEdit from "./CSEdit";
import InfoEdit from './InfoEdit';

function Editor({ isActive, ...props }) {
    const edit = useSelector((state) => state.editor.edit);
    if (!isActive)
        return null;
    return (
        <div className="editor" {...props}>
            {edit === "Info" ? (
                <InfoEdit />
            ) : (
                <></>
            )}
            {edit === "TPL" ? (
                <TPLEdit />
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
    isActive: PropTypes.bool.isRequired
};

Editor.propTypes = {
    isActive: true
};

export default Editor;

