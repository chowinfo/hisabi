import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TPLFilter } from '../../utilities/filterUtil';

const mapStateToProps = (state, ownProps) => {
    const { data } = state.app;
    return {
        data: data,
        ...ownProps
    };
};

class TPLView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tradename: "Trade Name",
            name: "Name",
            address: ["Address1", "Address2"],
            title: "Title",
            t_to: [],
            t_by: [],
            t_total: ["₹0.00", "₹0.00"],
            pl_to: [],
            pl_by: [],
            pl_total: ["₹0.00", "₹0.00"],
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const filteredData = TPLFilter(nextProps.data);
        if (filteredData.success) {
            const {
                tradename,
                name,
                address,
                title,
                t_to,
                t_by,
                t_total,
                pl_to,
                pl_by,
                pl_total,
            } = filteredData.data;
            return {
                tradename,
                name,
                address,
                title,
                t_to,
                t_by,
                t_total,
                pl_to,
                pl_by,
                pl_total,
            };
        }
    }

    render() {
        return (
            <div className="tpl-view print-view">
                <div className="text-center">
                    <div className="tradeName">{this.state.tradename}</div>
                    <div className="name">Prop - {this.state.name}</div>
                    <div className="address1">{this.state.address[0]}</div>
                    <div className="underline address2">{this.state.address[1]}</div>
                    <div className="underline title">{this.state.title}</div>
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
                            {/* Trading To */}
                            <div className="px-1">
                                {this.state.t_to.map(
                                    (to, index) => {
                                        return (
                                            <div
                                                className={
                                                    "grid grid-cols-2 px-" +
                                                    to.height * 4 +
                                                    (to.valid
                                                        ? ""
                                                        : " bg-red-light")
                                                }
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        "text-left" +
                                                        (to.underline
                                                            .name
                                                            ? " underline"
                                                            : "")
                                                    }
                                                >
                                                    {to.name}
                                                </div>
                                                <div
                                                    className={
                                                        "text-right" +
                                                        (to.underline
                                                            .amount
                                                            ? " accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current"
                                                            : "")
                                                    }
                                                >
                                                    {to.amount}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            {/* \Trading To */}

                            {/* Trading By */}
                            <div className="px-1">
                                {this.state.t_by.map(
                                    (by, index) => {
                                        return (
                                            <div
                                                className={
                                                    "grid grid-cols-2 px-" +
                                                    by.height * 4 +
                                                    (by.valid
                                                        ? ""
                                                        : " bg-red-light")
                                                }
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        "text-left" +
                                                        (by.underline
                                                            .name
                                                            ? " underline"
                                                            : "")
                                                    }
                                                >
                                                    {by.name}
                                                </div>
                                                <div
                                                    className={
                                                        "text-right" +
                                                        (by.underline
                                                            .amount
                                                            ? " accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current"
                                                            : "")
                                                    }
                                                >
                                                    {by.amount}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            {/* \Trading By */}

                        </div>

                        <div className="grid grid-cols-2">
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {this.state.t_total[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {this.state.t_total[1]}
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
                            {/* PL To */}
                            <div className="px-1">
                                {this.state.pl_to.map(
                                    (to, index) => {
                                        return (
                                            <div
                                                className={
                                                    "grid grid-cols-2 px-" +
                                                    to.height * 4 +
                                                    (to.valid
                                                        ? ""
                                                        : " bg-red-light")
                                                }
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        "text-left" +
                                                        (to.underline
                                                            .name
                                                            ? " underline"
                                                            : "")
                                                    }
                                                >
                                                    {to.name}
                                                </div>
                                                <div
                                                    className={
                                                        "text-right" +
                                                        (to.underline
                                                            .amount
                                                            ? " accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current"
                                                            : "")
                                                    }
                                                >
                                                    {to.amount}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            {/* \PL To */}

                            {/* PL By */}
                            <div className="px-1">
                                {this.state.pl_by.map(
                                    (by, index) => {
                                        return (
                                            <div
                                                className={'grid grid-cols-2 px-' + by.height * 4 + (by.valid ? "" : " bg-red-light")}
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        "text-left" +
                                                        (by.underline
                                                            .name
                                                            ? " underline"
                                                            : "")
                                                    }
                                                >
                                                    {by.name}
                                                </div>
                                                <div
                                                    className={
                                                        "text-right" +
                                                        (by.underline
                                                            .amount
                                                            ? " accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current"
                                                            : "")
                                                    }
                                                >
                                                    {by.amount}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                                {/* {
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
                                } */}
                            </div>
                            {/* \PL By */}

                        </div>

                        <div className="grid grid-cols-2">
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {this.state.pl_total[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {this.state.pl_total[1]}
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