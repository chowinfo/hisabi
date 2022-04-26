import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import { updateTPLBy, updateTPLTo } from "../../app/appReducer";
import Modal from "../../components/Modal";

const mapStateToProps = (state, ownProps) => {
	const { data } = state.app;
	return {
		data: data,
		...ownProps,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateTPLTo: (data) => {
		dispatch(updateTPLTo(data));
	},
	updateTPLBy: (data) => {
		dispatch(updateTPLBy(data));
	},
});

class TPLEdit extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	state = {
		showModal: false,
	};

	static handleSubmit(evt) {
		evt.preventDefault();
	}

	render() {
		const { showModal } = this.state;
		return (
			<div className="tpl-edit edit-view">
				<div
					className="form-container flex flex-col items-center justify-center mx-auto bg-green-light p-2"
					style={{ maxWidth: "800px" }}
				>
					<div className="flex-1 text-center underline uppercase text-lg">
						Trading Profit & Loss
					</div>
					<div className="grid grid-cols-2 gap-6">
						<div className="to-column grid grid-cols-2 gap-4">
							<span>To</span>
							<span>Amount</span>
							{Object.keys(this.props.data.BS.To).map(
								(keyName, ind) => (
									<React.Fragment key={ind}>
										<div className="text-left">
											{keyName}
										</div>
										<div className="text-right">
											{this.props.data.T.To[keyName]}
										</div>
									</React.Fragment>
								)
							)}
							<button
								onClick={(evt) => {}}
								className="bg-blue-500 col-span-2 text-sm font-bold leading-relaxed inline-block p-3 py-2 whitespace-nowrap uppercase text-white flex gap-2 items-center"
							>
								<FaPlusCircle /> <span>Add Row</span>
							</button>
						</div>
						<div className="to-column grid grid-cols-2 gap-4">
							<span>From</span>
							<span>Amount</span>
							<button className="bg-blue-500 col-span-2 text-sm font-bold leading-relaxed inline-block p-3 py-2 whitespace-nowrap uppercase text-white flex gap-2 items-center">
								<FaPlusCircle /> <span>Add Row</span>
							</button>
						</div>
					</div>
				</div>
				<Modal modalTitle="Add Field" isActive={showModal}>
					<form id="upload-form" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label className="" htmlFor="keyname">
								Add or Select Field Name
							</label>
							<input type="text" name="keyname" id="keyname" />
						</div>
						<div className="form-group">
							<label className="" htmlFor="value">
								Enter the value
							</label>
							<input type="text" name="value" id="value" value="0" />
						</div>
						<div className="flex justify-center pt-5">
							<button
								type="submit"
								className="flex items-center text-xs uppercase font-bold leading-snug bg-green p-3 rounded text-white hover:bg-green-400 hover:opacity-75"
							>
								<FaPlusCircle className="text-lg leading-lg" />
								Submit
							</button>
						</div>
					</form>
				</Modal>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TPLEdit);
