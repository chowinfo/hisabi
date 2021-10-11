import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TPLView from './TPLView';
import BSView from './BSView';
import CSView from './CSView';

function Viewer({ xref, ...props }) {
    const view = useSelector((state) => state.viewer.view);

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
    children: PropTypes.element
};

export default Viewer;

