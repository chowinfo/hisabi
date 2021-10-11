import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatCurrency, getObjectSum } from "../../app/helpers";

const mapStateToProps = (state, ownProps) => {
    const { data } = state.app;
    return {
        data: data,
        ...ownProps
    };
};

class BSView extends Component {

    render() {
        return (
            <div className="bs-view print-view">
                <div className="text-center">
                    <div className="tradeName">{this.props.data.Info['Trade Name']}</div>
                    <div className="name">Prop - {this.props.data.Info.Name}</div>
                    <div className="address1">{this.props.data.Info['Address 1']}</div>
                    <div className="underline address2">{this.props.data.Info['Address 2']}</div>
                    <div className="underline title">Balance Sheet as at 31st March, {this.props.data.year}</div>
                </div>

                <div className="h-container">
                    <div className="grid grid-cols-2">
                        <div className="grid grid-cols-2 px-1">
                            <div className="text-left underline">Liabilities</div>
                            <div className="text-right underline">Amount</div>
                        </div>

                        <div className="grid grid-cols-2 px-1">
                            <div className="text-left underline">Assets</div>
                            <div className="text-right underline">Amount</div>
                        </div>
                    </div>
                </div>

                {('BS' in this.props.data) ?

                    <div className="t-container mb-4 text-sm">
                        <div className="grid grid-cols-2">
                            <div className="px-1">
                                {
                                    Object.keys(this.props.data.BS.To).map((keyName, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="grid grid-cols-2" >
                                                    <div className="text-left underline">{keyName}</div>
                                                    <div className="text-right">{typeof this.props.data.BS.To[keyName] == 'number' ? formatCurrency(this.props.data.BS.To[keyName]) : ""}</div>
                                                </div>
                                                {typeof this.props.data.BS.To[keyName] == 'object' ?
                                                    <React.Fragment>
                                                        {Object.keys(this.props.data.BS.To[keyName]).map((key, ind) => (
                                                            <div className="grid grid-cols-2" key={ind}>
                                                                <div className="text-left pl-4">{key}</div>
                                                                <div className="text-right pr-4">
                                                                    <span className={(Object.keys(this.props.data.BS.To[keyName])[Object.keys(this.props.data.BS.To[keyName]).length - 1] === key ? 'accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                        {typeof this.props.data.BS.To[keyName][key] == 'number' ? formatCurrency(this.props.data.BS.To[keyName][key]) : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="grid grid-cols-2">
                                                            <div className=""></div>
                                                            <div className="text-right">{formatCurrency(getObjectSum(this.props.data.BS.To[keyName]))}</div>
                                                        </div>
                                                    </React.Fragment>
                                                    : <></>}
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </div>

                            <div className="px-1">
                                {
                                    Object.keys(this.props.data.BS.By).map((keyName, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="grid grid-cols-2" >
                                                    <div className="text-left underline">{keyName}</div>
                                                    <div className="text-right">{typeof this.props.data.BS.By[keyName] == 'number' ? formatCurrency(this.props.data.BS.By[keyName]) : ""}</div>
                                                </div>
                                                {typeof this.props.data.BS.By[keyName] == 'object' ?
                                                    <React.Fragment>
                                                        {Object.keys(this.props.data.BS.By[keyName]).map((key, ind) => (
                                                            <div className="grid grid-cols-2" key={ind}>
                                                                <div className="text-left pl-4">{key}</div>
                                                                <div className="text-right pr-4">
                                                                    <span className={(Object.keys(this.props.data.BS.By[keyName])[Object.keys(this.props.data.BS.By[keyName]).length - 1] === key ? 'inline-block accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                        {typeof this.props.data.BS.By[keyName][key] == 'number' ? formatCurrency(this.props.data.BS.By[keyName][key]) : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="grid grid-cols-2">
                                                            <div className=""></div>
                                                            <div className="text-right">{formatCurrency(getObjectSum(this.props.data.BS.By[keyName]))}</div>
                                                        </div>
                                                    </React.Fragment>
                                                    : <></>}
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {formatCurrency(getObjectSum(this.props.data.T.To))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {formatCurrency(getObjectSum(this.props.data.T.By))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    : ''}
            </div>
        );
    }
}

export default connect(mapStateToProps)(BSView);