import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

class Modal extends Component {
	static propTypes = {
		isActive: PropTypes.bool,
		modalTitle: PropTypes.string,
		yesBtn: PropTypes.element,
		noBtn: PropTypes.element,
		children: PropTypes.element,
		onClose: PropTypes.func,
	};
	static defaultProps = {
		isActive: false,
		modalTitle: 'Simple Modal',
		children: (
			<div>
				<h5 className="center">Do you like this modal?</h5>
			</div>
		),
		yesBtn: (
			<button className="modal-close px-4 bg-green p-3 rounded text-xs uppercase text-white hover:bg-green-light">
				Yes
			</button>
		),
		noBtn: (
			<button className="modal-close border-gray-dark ml-4 px-4 bg-white p-3 rounded text-xs uppercase text-gray-dark hover:bg-gray-dark hover:text-white">
				No
			</button>
		),
	};
	render() {
		if (!this.props.isActive) {
			return null;
		}
		return (
			<div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
				<div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

				<div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
					<div
						onClick={() => {
							this.props.onClose();
						}}
						className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
					>
						{' '}
						<FaTimes />
						{/* <span className="text-sm">(Esc)</span> */}
					</div>

					{/* Add margin if you want to see some of the overlay behind the modal */}
					<div className="modal-content text-left border border-gray-dark">
						{/* Title */}
						<div className="flex justify-between items-center p-5">
							<p className="text-2xl font-bold">{this.props.modalTitle}</p>
							<div
								className="modal-close cursor-pointer z-50"
								onClick={(evt) => {
									this.props.onClose(evt);
								}}
							>
								<FaTimes />
							</div>
						</div>

						{/* Body */}
						<div className="modal-body p-5">{this.props.children}</div>

						{/* Footer */}
						{this.props.yesBtn && this.props.noBtn ? (
							<div className="flex justify-center gap-2 p-5">
								{this.props.yesBtn}
								{this.props.noBtn}
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;
