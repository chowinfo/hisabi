import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaPlusCircle as AddIcon, FaTimesCircle as DeleteIcon } from 'react-icons/fa';
import { updateSheet, updateSheetKey, addSheetRow } from '../../app/appReducer';
import Modal from '../../atoms/Modal';
import EditableFormGroup from '../../atoms/EditableFormGroup';

const mapStateToProps = (state, ownProps) => {
	const { data } = state.app;
	return {
		data: data,
		...ownProps,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateSheet: (data) => {
		dispatch(updateSheet(data));
	},
	updateSheetKey: (data) => {
		dispatch(updateSheetKey(data));
	},
	addSheetRow: (data) => {
		dispatch(addSheetRow(data));
	},
});

class TEdit extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	state = {
		showModal: false,
		currentSheet: 'T.To',
		keyInputValue: '',
		valueInputValue: '0',
	};

	handleSubmit(evt) {
		evt.preventDefault();
		const { keyInputValue, valueInputValue, currentSheet } = this.state;
		const { addSheetRow } = this.props;
		const data = {
			key: keyInputValue,
			value: valueInputValue,
			sheet: currentSheet,
		};
		addSheetRow(data);
	}

	openModal(evt) {
		evt.preventDefault();
		const newState = this.state;
		newState.keyInputValue = '';
		newState.valueInputValue = '0';
		newState.showModal = true;
		this.setState(newState);
	}

	closeModal(evt) {
		evt.preventDefault();
		const newState = this.state;
		newState.showModal = false;
		this.setState(newState);
	}

	render() {
		const { T } = this.props.data;
		const { showModal, currentSheet, valueInputValue, keyInputValue } = this.state;
		return (
			<div className="tpl-edit edit-view">
				<div
					className="form-container flex flex-col items-center justify-center mx-auto bg-green-light p-2"
					style={{ maxWidth: '800px' }}
				>
					<div className="flex-1 text-center underline uppercase text-lg">Trading</div>
					<div className="grid grid-cols-2 gap-6">
						<div className="to-column grid grid-cols-2 gap-4">
							<span>To</span>
							<span>Amount</span>
							{Object.keys(T.To).map((keyName, ind) => (
								<React.Fragment key={ind}>
									<EditableFormGroup
										keyName={keyName}
										value={T.To[keyName]}
										sheetName="T.To"
										handleChange={this.props.updateSheet}
										handleKeyChange={this.props.updateSheetKey}
									/>
								</React.Fragment>
							))}
							<button
								onClick={(evt) => {
									// this.setState({ currentSheet: 'T.To' });
									this.openModal(evt);
								}}
								name="T.To"
								className="bg-blue-500 col-span-2 text-sm font-bold leading-relaxed p-3 py-2 whitespace-nowrap uppercase text-white flex gap-2 items-center"
							>
								<AddIcon /> <span>Add Row</span>
							</button>
						</div>
						<div className="to-column grid grid-cols-2 gap-4">
							<span>From</span>
							<span>Amount</span>
							{Object.keys(T.By).map((keyName, ind) => (
								<React.Fragment key={ind}>
									<EditableFormGroup
										keyName={keyName}
										value={T.By[keyName]}
										sheetName="T.By"
										handleChange={this.props.updateSheet}
										handleKeyChange={this.props.updateSheetKey}
									/>
								</React.Fragment>
							))}
							<button
								onClick={(evt) => {
									// this.setState({ currentSheet: 'T.By' });
									this.openModal(evt);
								}}
								className="bg-blue-500 col-span-2 text-sm font-bold leading-relaxed p-3 py-2 whitespace-nowrap uppercase text-white flex gap-2 items-center"
							>
								<AddIcon /> <span>Add Row</span>
							</button>
						</div>
					</div>
				</div>

				<Modal
					modalTitle="Add Field"
					isActive={showModal}
					yesBtn={
						<button
							type="submit"
							className="flex gap-2 items-center text-xs uppercase font-bold leading-snug bg-green p-3 rounded text-white hover:opacity-75"
							onClick={(evt) => {
								this.handleSubmit(evt);
								this.closeModal(evt);
							}}
						>
							<AddIcon className="text-lg leading-lg" />
							Submit
						</button>
					}
					noBtn={
						<button
							type="reset"
							className="flex gap-2 items-center text-xs uppercase font-bold leading-snug border border-gray-dark p-3 rounded text-gray-dark hover:bg-gray-dark hover:text-white"
							onClick={(evt) => {
								this.closeModal(evt);
							}}
						>
							<DeleteIcon className="text-lg leading-lg" />
							Cancel
						</button>
					}
					onClose={(evt) => this.closeModal(evt)}
				>
					<form id="upload-form" onSubmit={this.handleSubmit}>
						<div className="form-group grid grid-cols-2 gap-2">
							<label htmlFor="currentSheet">Current Sheet</label>
							<select
								id="currentSheet"
								className="border p-2 bg-white"
								value={currentSheet}
								onChange={(evt) => {
									this.setState({ currentSheet: evt.target.value });
								}}
							>
								<option value="T.To">To</option>
								<option value="T.By">By</option>
							</select>
							<label className="" htmlFor="keyname">
								Field Name
							</label>
							<input
								className="p-2 border"
								type="text"
								name="keyname"
								id="keyname"
								value={keyInputValue}
								onChange={(evt) => {
									evt.preventDefault();
									this.setState({ keyInputValue: evt.target.value });
								}}
							/>

							<label className="" htmlFor="value">
								Field Value
							</label>
							<input
								className="p-2 border"
								type="text"
								name="value"
								id="value"
								value={valueInputValue}
								onChange={(evt) => {
									evt.preventDefault();
									this.setState({ valueInputValue: evt.target.value });
								}}
							/>
						</div>
					</form>
				</Modal>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TEdit);
