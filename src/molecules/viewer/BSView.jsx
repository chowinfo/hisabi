import React, { Component } from "react";
import { connect } from "react-redux";
import {
    BSFilter,
} from "../../utilities/filterUtil";

const mapStateToProps = (state, ownProps) => {
    const { data } = state.app;
    return {
        data: data,
        ...ownProps,
    };
};

class BSView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tradename: "Trade Name",
            name: "Name",
            address: ["Address1", "Address2"],
            title: "Title",
            assets: [],
            liabilities: [],
            total: ["₹0.00", "₹0.00"],
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const filteredData = BSFilter(nextProps.data);
        if (filteredData.success) {
            const {
                tradename,
                name,
                address,
                title,
                assets,
                liabilities,
                total,
            } = filteredData.data;
            return {
                tradename,
                name,
                address,
                title,
                liabilities,
                assets,
                total,
            };
        }
    }

    render() {
        return (
            <div className="bs-view print-view">
                <div className="text-center">
                    <div className="tradeName">{this.state.tradename}</div>
                    <div className="name">Prop - {this.state.name}</div>
                    <div className="address1">{this.state.address[0]}</div>
                    <div className="underline address2">
                        {this.state.address[1]}
                    </div>
                    <div className="underline title">{this.state.title}</div>
                </div>

                <div className="h-container">
                    <div className="grid grid-cols-2">
                        <div className="grid grid-cols-2 px-1">
                            <div className="text-left underline">
                                Liabilities
                            </div>
                            <div className="text-right underline">Amount</div>
                        </div>

                        <div className="grid grid-cols-2 px-1">
                            <div className="text-left underline">Assets</div>
                            <div className="text-right underline">Amount</div>
                        </div>
                    </div>
                </div>

                {"BS" in this.props.data ? (
                    <div className="t-container mb-4 text-sm">
                        <div className="grid grid-cols-2">
                            {/* Balance Sheet To */}
                            <div className="px-1">
                                {this.state.liabilities.map(
                                    (liability, index) => {
                                        return (
                                            <div
                                                className={
                                                    "grid grid-cols-2 px-1 mx-" +
                                                    liability.height * 4 +
                                                    (liability.valid
                                                        ? ""
                                                        : " bg-red-light")
                                                }
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        "text-left" +
                                                        (liability.underline
                                                            .name
                                                            ? " underline"
                                                            : "")
                                                    }
                                                >
                                                    {liability.name}
                                                </div>
                                                <div
                                                    className={
                                                        "text-right" +
                                                        (liability.underline
                                                            .amount
                                                            ? " accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current"
                                                            : "")
                                                    }
                                                >
                                                    {liability.amount}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            {/* \Balance Sheet To */}

                            {/* Balance Sheet By */}
                            <div className="px-1">
                                {this.state.assets.map((asset, index) => {
                                    return (
                                        <div
                                            className={
                                                "grid grid-cols-2 px-1 mx-" +
                                                asset.height * 4 +
                                                (asset.valid
                                                    ? ""
                                                    : " bg-red-light")
                                            }
                                            key={index}
                                        >
                                            <div
                                                className={
                                                    "text-left" +
                                                    (asset.underline.name
                                                        ? " underline"
                                                        : "")
                                                }
                                            >
                                                {asset.name}
                                            </div>
                                            <div
                                                className={
                                                    "text-right" +
                                                    (asset.underline.amount
                                                        ? " accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current"
                                                        : "")
                                                }
                                            >
                                                {asset.amount}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* \Balance Sheet By */}
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {this.state.total[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {this.state.total[1]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(BSView);
