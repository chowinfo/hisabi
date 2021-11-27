import React, { Component } from "react";
import { connect } from "react-redux";
import { formatCurrency, getObjectSum } from "../../app/helpers";

const mapStateToProps = (state, ownProps) => {
    const { data } = state.app;
    return {
        data: data,
        ...ownProps
    };
};

class CSView extends Component {


    render() {
        return (
            <div className="bs-view print-view text-lg">
                <div className="text-center">
                    <div className="name uppercase">{this.props.data.Info.Name}</div>
                    <div className="pan">PAN - {this.props.data.Info.PAN}</div>
                    <div className="address1">{this.props.data.Info["Address 1"]}</div>
                    <div className="underline address2">
                        {this.props.data.Info["Address 2"]}
                    </div>
                    <div className="fyay">
                        FY- {(this.props.data.year - 1) + '-' + (this.props.data.year)},
                        AY- {(this.props.data.year) + '-' + this.props.data.year + 1}
                    </div>
                    <div className="underline title">
                        Computation of Total Income
                    </div>
                </div>

                <div className="cs-container">
                    <div className="">
                        <div className="px-1" style={{ width: "600px", margin: "auto" }}>
                            {
                                Object.keys(this.props.data.CS).map((keyName, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <div className="grid grid-cols-2" >
                                                <div className="text-left">{keyName}</div>
                                                <div className="text-right">
                                                    <span className={(keyName === "Tax Payable" ? "accounting-col border-2 border-current border-r-0 border-l-0" : "")}>
                                                        {typeof this.props.data.CS[keyName] == 'number' ? (this.props.data.CS[keyName] === 0 ? "NIL" : formatCurrency(this.props.data.CS[keyName])) : ""}
                                                    </span>
                                                </div>
                                            </div>
                                            {typeof this.props.data.CS[keyName] == 'object' ?
                                                <React.Fragment>
                                                    {Object.keys(this.props.data.CS[keyName]).map((key, ind) => (
                                                        <div className="grid grid-cols-2" key={ind}>
                                                            <div className="text-left pl-4">{key}</div>
                                                            <div className="text-right pr-4">
                                                                <span className={(Object.keys(this.props.data.CS[keyName])[Object.keys(this.props.data.CS[keyName]).length - 1] === key ? 'accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                    {typeof this.props.data.CS[keyName][key] === 'number' ? (this.props.data.CS[keyName][key] === 0 ? "NIL" : formatCurrency(this.props.data.CS[keyName][key])) : ""}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="grid grid-cols-2">
                                                        <div className=""></div>
                                                        <div className="text-right">{this.props.data.CS[keyName] === 0 ? "NIL" : formatCurrency(getObjectSum(this.props.data.CS[keyName]))}</div>
                                                    </div>
                                                </React.Fragment>
                                                : <></>}
                                        </React.Fragment>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CSView);