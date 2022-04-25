import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaEye, FaPencilAlt } from "react-icons/fa";

class EditableFormGroup extends Component {
	static propTypes = {
		keyName: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		handleChange: PropTypes.func,
	};

	static defaultProps = {
		keyName: "Key",
		value: "Value",
	};

	constructor(props) {
		super(props);
		const { value } = props;
		this.state = {
			isEditable: false,
			inputValue: value,
		};
		this.inputRef = React.createRef();
	}

	render() {
		const { keyName, value, handleChange } = this.props;
		const { isEditable, inputValue } = this.state;
		return (
			<React.Fragment>
				<label className="p-2" htmlFor="Name">
					{keyName}
				</label>
				{isEditable ? (
					<input
						className="p-2"
						value={inputValue}
						name={keyName}
						onChange={(evt) => {
							const newState = this.state;
							newState.inputValue = evt.target.value;
							this.setState(newState);
						}}
						ref={(ref) => {
							this.inputRef = ref;
						}}
					/>
				) : (
					<span className="p-2">{value}</span>
				)}
				<button
					className=""
					onClick={() => {
						const newState = this.state;
						newState.isEditable = !this.state.isEditable;
						if (!this.state.isEditable) {
							const keyName = this.inputRef.getAttribute("name");
							handleChange({ key: keyName, value: inputValue });
						}
						this.setState(newState);
					}}
					type="button"
				>
					{isEditable ? <FaEye /> : <FaPencilAlt />}
				</button>
			</React.Fragment>
		);
	}
}

export default EditableFormGroup;
