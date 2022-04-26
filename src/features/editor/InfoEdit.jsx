import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateInfo } from "../../app/appReducer";
import EditableFormGroup from "./EditableFormGroup";

const mapStateToProps = (state, ownProps) => {
	const { data } = state.app;
	return {
		data: data,
		...ownProps,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateInfo: (data) => {
		dispatch(updateInfo(data));
	},
});

class InfoEdit extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	static defaultProps = {};

	render() {
		const { Info } = this.props.data;

		return (
			<div className="info-edit edit-view">
				<div
					className="form-container flex flex-col items-center justify-center mx-auto bg-green-light p-2"
					style={{ maxWidth: "800px" }}
				>
					<div className="flex-1 text-center underline uppercase text-lg">
						Information
					</div>
					<div className="grid grid-cols-3 gap-4">
						{Info ? (
							<React.Fragment>
								{Object.keys(Info).map((keyName, i) => {
									return (
										<React.Fragment key={i}>
											<EditableFormGroup
												keyName={keyName}
												value={Info[keyName]}
												handleChange={
													this.props.updateInfo
												}
											/>
										</React.Fragment>
									);
								})}
							</React.Fragment>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoEdit);
