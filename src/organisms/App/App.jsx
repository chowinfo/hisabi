import React from "react";
import { ImPrinter } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import "@/styles/print.css";
import Header from "@/atoms/Header";
import Viewer from "@/molecules/viewer/Viewer";
import Editor from "@/molecules/editor/Editor";
// import { updateData } from "@/app/appReducer";
// import { fetchData } from "@/utilities/fetchUtil";
import { updateURLParam } from "@/app/helpers";
import { toggleTemplate } from "../../app/appReducer";

const App = () => {
    const dispatch = useDispatch();

    const template = useSelector((state) => state.app.template);

    function handlePrint() {
        dispatch(toggleTemplate({ type: "print" }));
    }

    // Load a local mockup
    // React.useEffect(() => {
    //     if (process.env.NODE_ENV === "development")
    //         fetchData("sample_mock")
    //             .then((data) => {
    //                 dispatch(updateData(data));
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    // }, [dispatch]);

    React.useEffect(() => {
        // Shortcut keys
        window.onkeydown = function (e) {
            if (e.ctrlKey && e.keyCode === "P".charCodeAt(0) && template !== "print") {
                e.preventDefault();
                handlePrint();
            }

            if (e.key === "Escape") {
                dispatch(toggleTemplate({ type: "view" }));
            }
        };
        updateURLParam("template", "view", true);
        updateURLParam("sheet", "TPL", true);
    });

    React.useEffect(() => {
        if (template == "print") {
            window.print();
        }
    }, [template]);

    return (
        <div className="App dark:bg-black">
            <Header
                isActive={template !== "print"}
                printButton={
                    template !== "edit" ? (
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

            <Viewer isActive={template !== "edit"} />
            <Editor isActive={template === "edit"} />
        </div>
    );
};

export default App;
