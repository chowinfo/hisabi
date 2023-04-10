import React, { Component } from "react";
import { connect } from "react-redux";
import { CSFilter } from "../../utilities/filterUtil";

const mapStateToProps = (state, ownProps) => {
    const { data } = state.app;
    return {
        data: data,
        ...ownProps
    };
};

class CSView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Name",
            pan: "PAN",
            address: ["Address1", "Address2"],
            fyay: "FY - 2009-10, AY - 2010-11",
            cs_rows: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const filteredData = CSFilter(nextProps.data);

        if (filteredData.success) {
            const { title, name, pan, address, fyay, cs_rows } = filteredData.data;
            return {
                title,
                name,
                pan,
                address,
                fyay,
                cs_rows
            }
        }
    }

    render() {
        return (
            <div className="cs-view print-view">
                <div className="text-center">
                    <div className="name uppercase">{this.state.name}</div>
                    <div className="pan">PAN - {this.state.pan}</div>
                    <div className="address1">
                        {this.state.address[0]}
                    </div>
                    <div className="underline address2">
                        {this.state.address[1]}
                    </div>
                    <div className="fyay">
                        {this.state.fyay}
                    </div>
                    <div className="underline title">
                        {this.state.title}
                    </div>
                </div>

                <div className="cs-container">
                    {/* CS Rows */}
                    <div className="px-1" style={{ width: "600px", margin: "auto" }}>

                        {this.state.cs_rows.map((row, index) => {
                            return (
                                <div
                                    className={
                                        "grid grid-cols-2 px-" +
                                        row.height * 4 +
                                        (row.valid
                                            ? ""
                                            : " bg-red-light")
                                    }
                                    key={index}
                                >
                                    <div
                                        className={
                                            "text-left" +
                                            (row.underline
                                                .name
                                                ? " underline"
                                                : "")
                                        }
                                    >
                                        {row.name}
                                    </div>
                                    <div
                                        className={
                                            "text-right" +
                                            (row.underline
                                                .amount
                                                ? " accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current"
                                                : "")
                                        }
                                    >
                                        {row.amount}
                                    </div>
                                </div>
                            );
                        })}

                        {/* {
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
                            } */}
                    </div>
                    {/* \CS Rows */}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CSView);