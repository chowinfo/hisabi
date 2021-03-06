import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateSheet } from '../../app/appReducer';
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
					style={{ maxWidth: '800px' }}
				>
					<div className="flex-1 text-center underline uppercase text-lg">Information</div>
					<div className="grid grid-cols-2 gap-4">
						{Info ? (
							<React.Fragment>
								{Object.keys(Info).map((keyName, i) => {
									return (
										<React.Fragment key={i}>
											<EditableFormGroup
												editableKey={false}
												keyName={keyName}
												value={Info[keyName]}
												sheetName="Info"
												handleChange={this.props.updateSheet}
												handleKeyChange={this.props.updateSheetKey}
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
