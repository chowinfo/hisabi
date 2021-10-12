import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TPLView from './TPLView';
import BSView from './BSView';
import CSView from './CSView';

function Viewer({ isActive, xref, ...props }) {
    const view = useSelector((state) => state.viewer.view);
    if (!isActive)
        return null;
    return (
        <div className="viewer">
            {view === "TPL" ? (
                <TPLView />
            ) : (
                <></>
            )}
            {view === "BS" ? (
                <BSView />
            ) : (
                <></>
            )}
            {view === "CS" ? (
                <CSView />
            ) : (
                <></>
            )}
        </div>
    );
}

Viewer.propTypes = {
    children: PropTypes.element,
    isActive: PropTypes.bool
};

Viewer.defaultProps = {
    isActive: true
};

export default Viewer;

