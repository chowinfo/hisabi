import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { FaEye, FaPencilAlt } from 'react-icons/fa';

class EditableFormGroup extends Component {
	static propTypes = {
		keyName: PropTypes.string,
		sheetName: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		handleChange: PropTypes.func,
		handleKeyChange: PropTypes.func,
		editableKey: PropTypes.bool,
	};

	static defaultProps = {
		keyName: 'Key',
		sheetName: 'Info',
		value: '0',
		editableKey: true,
	};

	constructor(props) {
		super(props);
		const { keyName, value } = props;
		this.state = {
			isKeyEditable: false,
			isValueEditable: false,
			valueInputValue: value,
			keyInputValue: keyName,
		};
	}

	handleClickOutside(event) {
		// const path = event.path || (event.composedPath && event.composedPath());

		const newState = this.state;
		if (this.state.isValueEditable) newState.isValueEditable = false;
		if (this.state.isKeyEditable) newState.isKeyEditable = false;
		this.setState(newState);
	}

	updateKey() {
		if (!this.props.editableKey) return;
		const { sheetName, handleKeyChange, keyName } = this.props;
		const newState = this.state;
		newState.isKeyEditable = !this.state.isKeyEditable;
		if (!this.state.isKeyEditable) {
			handleKeyChange({ key: keyName, newKey: this.state.keyInputValue, sheet: sheetName });
		}
		this.setState(newState);
	}

	updateValue() {
		const { sheetName, handleChange, keyName } = this.props;
		const newState = this.state;
		newState.isValueEditable = !this.state.isValueEditable;
		if (!this.state.isValueEditable) {
			handleChange({ key: keyName, value: this.state.valueInputValue, sheet: sheetName });
		}
		this.setState(newState);
	}

	render() {
		const { keyName, value } = this.props;
		const { isValueEditable, isKeyEditable, valueInputValue, keyInputValue } = this.state;
		return (
			<React.Fragment>
				{isKeyEditable ? (
					<input
						className="p-2"
						name={keyName + 'Key'}
						value={keyInputValue}
						onChange={(evt) => {
							const newState = this.state;
							newState.keyInputValue = evt.target.value;
							this.setState(newState);
						}}
						onDoubleClick={() => {
							this.updateKey();
						}}
					/>
				) : (
					<label
						className="p-2 w-full"
						htmlFor={keyName}
						onDoubleClick={() => {
							if (!this.props.editableKey) return;
							const newState = this.state;
							newState.isKeyEditable = true;
							newState.keyInputValue = keyName;
							this.setState(newState);
						}}
					>
						{keyName}
					</label>
				)}
				{isValueEditable ? (
					<input
						className="p-2"
						name={keyName + 'Value'}
						value={valueInputValue}
						onChange={(evt) => {
							const newState = this.state;
							newState.valueInputValue = evt.target.value;
							this.setState(newState);
						}}
						onDoubleClick={() => {
							this.updateValue();
						}}
					/>
				) : (
					<span
						className="p-2"
						onDoubleClick={() => {
							const newState = this.state;
							newState.isValueEditable = true;
							newState.valueInputValue = value;
							this.setState(newState);
						}}
					>
						{value}
					</span>
				)}
			</React.Fragment>
		);
	}
}

export default EditableFormGroup;
