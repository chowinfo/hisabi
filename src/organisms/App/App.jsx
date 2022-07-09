import React from 'react';
import { ImPrinter } from 'react-icons/im';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Header from '../../atoms/Header';
import Viewer from '../../molecules/viewer/Viewer';
import Editor from '../../molecules/editor/Editor';
import { updateData } from '../../app/appReducer';
import { fetchData } from '../../utilities/fetchUtil';
// import { downloadAsPDF } from './app/helpers';

const App = () => {
    const componentRef = React.useRef();
    const dispatch = useDispatch();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // function handlePrint() {
    //     downloadAsPDF(componentRef.current, 'test.pdf');
    // }

    // Load a local mockup
    React.useEffect(() => {
        fetchData('sample_mock').then((data) => {
            dispatch(updateData(data));
        }).catch((err) => {
            console.log(err);
        });
    }, [dispatch]);

    React.useEffect(() => {
        window.onkeydown = function (e) {
            if (e.ctrlKey && e.keyCode === 'P'.charCodeAt(0)) {
                e.preventDefault();
                handlePrint();
            }
        };
    });

    const isEditing = useSelector((state) => state.app.isEditing);

    return (
        <div className="App dark:bg-black">
            <Header
                printButton={
                    !isEditing ? (
                        <a
                            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                            href="#print"
                            onClick={handlePrint}
                        >
                            <ImPrinter className="text-lg leading-lg text-white opacity-75" />
                            <span className="ml-2">Print</span>
                        </a>
                    ) : null
                }
            />

            <Viewer isActive={!isEditing} ref={componentRef} />
            <Editor isActive={isEditing} />
        </div>
    );
}

export default App;
