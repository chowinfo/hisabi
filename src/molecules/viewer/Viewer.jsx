import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TPLView from './TPLView';
import BSView from './BSView';
import CSView from './CSView';

const Viewer = React.forwardRef(({ isActive, ...props }, ref) => {
    const view = useSelector((state) => state.viewer.view);
    if (!isActive)
        return null;
    return (
        <div className="viewer" ref={ref}>
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
});

Viewer.propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool.isRequired
};

Viewer.defaultProps = {
    isActive: true
};

export default Viewer;

