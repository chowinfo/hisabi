import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'

class Modal extends Component {

    render() {
        return (
            <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

                    <div onClick={() => { this.props.closeBtn() }} className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">                        <FaTimes />
                        {/* <span className="text-sm">(Esc)</span> */}
                    </div>

                    {/* Add margin if you want to see some of the overlay behind the modal */}
                    <div className="modal-content py-4 text-left px-6">
                        {/* Title */}
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">{this.props.modalTitle}</p>
                            <div className="modal-close cursor-pointer z-50" onClick={() => { this.props.closeBtn() }}>
                                <FaTimes />
                            </div>
                        </div>

                        {/* Body */}
                        <div className="modal-body p-2">
                            {this.props.children}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-center pt-2">
                            <button onClick={() => {
                                // document.getElementById("jsonFile");
                            }} className="modal-close px-4 bg-green-500 p-3 rounded text-xs uppercase text-white hover:bg-green-400">Ok</button>
                            <button onClick={() => { this.props.closeBtn() }} className="modal-close border ml-4 px-4 bg-white p-3 rounded text-xs uppercase text-black hover:bg-gray-200">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    modalTitle: PropTypes.string
}

Modal.defaultProps = {
    modalTitle: "Simple Modal"
}

export default Modal

