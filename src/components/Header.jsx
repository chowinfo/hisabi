import React from "react";

import { FaBars, FaFileUpload } from "react-icons/fa";
import Modal from "./Modal";

import ViewDropdown from "./ViewDropdown";

export default function Header({ printButton, setCurrentView, fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [uploadModal, setUploadModal] = React.useState(false);

  function processJSONFile(files) {
    const file = files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      console.log(JSON.parse(e.target.result));
    }
    reader.readAsText(file);
  }

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-green-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
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
                <ViewDropdown setCurrentView={setCurrentView}>

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
            </ul>
          </div>
        </div>
      </nav>
      {
        uploadModal ? <Modal modalTitle="JSON Data Upload" closeBtn={() => { setUploadModal(!uploadModal) }} >
          <form id="upload-form" onSubmit={(event) => {
            event.preventDefault();
          }}>
            <div className="form-group">
              <label className="" htmlFor="jsonFile">Upload JSON file: </label>
              <input type="file" name="jsonFile" id="jsonFile" onChange={(event) => { processJSONFile(event.target.files) }} />
            </div>
          </form>
        </Modal> : <></>
      }
    </>
  );
}
