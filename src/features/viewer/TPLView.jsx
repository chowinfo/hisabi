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

class TPLView extends Component {

    render() {
        return (
            <div className="tpl-view print-view">
                <div className="text-center">
                    <div className="tradeName">{this.props.data.Info['Trade Name']}</div>
                    <div className="name">Prop - {this.props.data.Info.Name}</div>
                    <div className="address1">{this.props.data.Info['Address 1']}</div>
                    <div className="underline address2">{this.props.data.Info['Address 2']}</div>
                    <div className="underline title">Trading and Profit & Loss Account for the year
                        ending 31st March, {this.props.data.year}</div>
                </div>
                <div className="h-container">
                    <div className="grid grid-cols-2">
                        <div className="grid grid-cols-2 px-1">
                            <div className="text-left underline">Particulars</div>
                            <div className="text-right underline">Amount</div>
                        </div>

                        <div className="grid grid-cols-2 px-1">
                            <div className="text-left underline">Particulars</div>
                            <div className="text-right underline">Amount</div>
                        </div>
                    </div>
                </div>
                {('T' in this.props.data) ?
                    <div className="t-container mb-4 text-sm">
                        <div className="grid grid-cols-2">
                            <div className="px-1">
                                {
                                    Object.keys(this.props.data.T.To).map((keyName, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="grid grid-cols-2" >
                                                    <div className="text-left">To {keyName}</div>
                                                    <div className="text-right">{typeof this.props.data.T.To[keyName] == 'number' ? formatCurrency(this.props.data.T.To[keyName]) : ""}</div>
                                                </div>
                                                {typeof this.props.data.T.To[keyName] == 'object' ?
                                                    <React.Fragment>
                                                        {Object.keys(this.props.data.T.To[keyName]).map((key, ind) => (
                                                            <div className="grid grid-cols-2" key={ind}>
                                                                <div className="text-left pl-4">on {key}</div>
                                                                <div className="text-right pr-4">
                                                                    <span className={(Object.keys(this.props.data.T.To[keyName])[Object.keys(this.props.data.T.To[keyName]).length - 1] === key ? 'accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                        {typeof this.props.data.T.To[keyName][key] == 'number' ? formatCurrency(this.props.data.T.To[keyName][key]) : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="grid grid-cols-2">
                                                            <div className=""></div>
                                                            <div className="text-right">{formatCurrency(getObjectSum(this.props.data.T.To[keyName]))}</div>
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
                                    Object.keys(this.props.data.T.By).map((keyName, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="grid grid-cols-2" >
                                                    <div className="text-left">By {keyName}</div>
                                                    <div className="text-right">{typeof this.props.data.T.By[keyName] == 'number' ? formatCurrency(this.props.data.T.By[keyName]) : ""}</div>
                                                </div>
                                                {typeof this.props.data.T.By[keyName] == 'object' ?
                                                    <React.Fragment>
                                                        {Object.keys(this.props.data.T.By[keyName]).map((key, ind) => (
                                                            <div className="grid grid-cols-2" key={ind}>
                                                                <div className="text-left pl-4">on {key}</div>
                                                                <div className="text-right pr-4">
                                                                    <span className={(Object.keys(this.props.data.T.By[keyName])[Object.keys(this.props.data.T.By[keyName]).length - 1] === key ? 'inline-block accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                        {typeof this.props.data.T.By[keyName][key] == 'number' ? formatCurrency(this.props.data.T.By[keyName][key]) : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="grid grid-cols-2">
                                                            <div className=""></div>
                                                            <div className="text-right">{formatCurrency(getObjectSum(this.props.data.T.By[keyName]))}</div>
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

                {('PL' in this.props.data) ?
                    <div className="pl-container mb-4 text-sm">
                        <div className="grid grid-cols-2">
                            <div className="px-1">
                                {
                                    Object.keys(this.props.data.PL.To).map((keyName, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="grid grid-cols-2" >
                                                    <div className="text-left">To {keyName}</div>
                                                    <div className="text-right">{typeof this.props.data.PL.To[keyName] == 'number' ? formatCurrency(this.props.data.PL.To[keyName]) : ""}</div>
                                                </div>
                                                {typeof this.props.data.PL.To[keyName] == 'object' ?
                                                    <React.Fragment>
                                                        {Object.keys(this.props.data.PL.To[keyName]).map((key, ind) => (
                                                            <div className="grid grid-cols-2" key={ind}>
                                                                <div className="text-left pl-4">on {key}</div>
                                                                <div className="text-right pr-4">
                                                                    <span className={(Object.keys(this.props.data.PL.To[keyName])[Object.keys(this.props.data.PL.To[keyName]).length - 1] === key ? 'inline-block accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                        {typeof this.props.data.PL.To[keyName][key] == 'number' ? formatCurrency(this.props.data.PL.To[keyName][key]) : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="grid grid-cols-2">
                                                            <div className=""></div>
                                                            <div className="text-right">{formatCurrency(getObjectSum(this.props.data.PL.To[keyName]))}</div>
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
                                    Object.keys(this.props.data.PL.By).map((keyName, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="grid grid-cols-2">
                                                    <div className="text-left">By {keyName}</div>
                                                    <div className="text-right">{typeof this.props.data.PL.By[keyName] == 'number' ? formatCurrency(this.props.data.PL.By[keyName]) : ""}</div>
                                                </div>
                                                {typeof this.props.data.PL.By[keyName] == 'object' ?
                                                    <React.Fragment>
                                                        {Object.keys(this.props.data.PL.By[keyName]).map((key, ind) => (
                                                            <div className="grid grid-cols-2" key={ind}>
                                                                <div className="text-left pl-4">on {key}</div>
                                                                <div className="text-right pr-4">
                                                                    <span className={(Object.keys(this.props.data.PL.By[keyName])[Object.keys(this.props.data.PL.By[keyName]).length - 1] === key ? 'inline-block accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                        {typeof this.props.data.PL.By[keyName][key] == 'number' ? formatCurrency(this.props.data.PL.By[keyName][key]) : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="grid grid-cols-2">
                                                            <div className=""></div>
                                                            <div className="text-right">{formatCurrency(getObjectSum(this.props.data.PL.By[keyName]))}</div>
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
                                            {formatCurrency(getObjectSum(this.props.data.PL.To))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {formatCurrency(getObjectSum(this.props.data.PL.By))}
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

export default connect(mapStateToProps)(TPLView);