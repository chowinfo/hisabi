import React from "react";

import { FaBars, FaFileUpload, FaFileDownload } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

import ViewDropdown from "./ViewDropdown";
import { updateData } from "../app/appReducer";
import { downloadFile } from "../app/helpers";

export default function Header({ printButton, setCurrentView, fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [uploadModal, setUploadModal] = React.useState(false);
  const jsonFileInputRef = React.createRef();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app.data);

  function handleSubmit(event) {
    event.preventDefault();
    if (jsonFileInputRef.current.files.length > 0) {
      const file = jsonFileInputRef.current.files[0];

      const reader = new FileReader();
      reader.onload = function (e) {
        dispatch(updateData(JSON.parse(e.target.result)));
        setUploadModal(!uploadModal);
      };
      reader.readAsText(file);
    } else {
      alert("Please select a file");
    }
  }

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-green-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#hisabi"
            >
              Hisabi
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">{printButton}</li>
              <li className="nav-item">
                <ViewDropdown>

                </ViewDropdown>
              </li>
              <li className="nav-item">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#upload"
                  onClick={() => setUploadModal(!uploadModal)}
                >
                  <FaFileUpload className="text-lg leading-lg text-white opacity-75" />
                  <span className="ml-2">Upload</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#upload"
                  onClick={() => {
                    const filename = Date.now() + "-" + data.Info.Name + "-" + data.year + ".json";
                    downloadFile(data, filename);
                    console.log("File downloaded!!");
                  }}
                >
                  <FaFileDownload className="text-lg leading-lg text-white opacity-75" />
                  <span className="ml-2">Download</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {
        uploadModal ? <Modal modalTitle="JSON Data Upload" yesBtn={<></>} noBtn={<></>} isActive={uploadModal} onClose={() => { setUploadModal(!uploadModal); }} >
          <form id="upload-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="" htmlFor="jsonFile">Upload JSON file: </label>
              <input type="file" name="jsonFile" id="jsonFile" ref={jsonFileInputRef} />
            </div>
            <div className="flex justify-center pt-5">
              <button type="submit" className="flex items-center text-xs uppercase font-bold leading-snug bg-green-500 p-3 rounded text-xs uppercase text-white hover:bg-green-400 hover:opacity-75"> <FiUpload className="text-lg leading-lg" />Upload</button>
            </div>
          </form>
        </Modal> : <></>
      }
    </>
  );
}
