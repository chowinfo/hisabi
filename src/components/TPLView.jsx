import React, { Component } from 'react';
import { formatCurrency, getObjectSum } from "../helpers";


export default class TPLView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "year": 2021,
            "Info": {
                "Name": "",
                "Trade Name": "",
                "PAN": "",
                "Address 1": "",
                "Address 2": ""
            },
            "T": {
                To: {},
                By: {}
            },
            "PL": {
                To: {},
                By: {}
            },
            "BS": {
                To: {},
                By: {}
            },
            "CS": {}
        };
    }
    async componentDidMount() {
        const res = await fetch('data.json');
        const jsRes = await res.json();
        this.setState(jsRes);
    }
    render() {
        return (
            <div className="tpl-view print-view">
                <div className="text-center">
                    <div className="tradeName">{this.state.Info['Trade Name']}</div>
                    <div className="name">Prop - {this.state.Info.Name}</div>
                    <div className="address1">{this.state.Info['Address 1']}</div>
                    <div className="underline address2">{this.state.Info['Address 2']}</div>
                    <div className="underline title">Trading and Profit & Loss Account for the year
                        ending 31st March, {this.state.year}</div>
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
                {('T' in this.state) ?
                    <div className="t-container mb-4 text-sm">
                        <div className="grid grid-cols-2">
                            <div className="px-1">
                                {
                                    Object.keys(this.state.T.To).map((keyName, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="grid grid-cols-2" >
                                                    <div className="text-left">To {keyName}</div>
                                                    <div className="text-right">{typeof this.state.T.To[keyName] == 'number' ? formatCurrency(this.state.T.To[keyName]) : ""}</div>
                                                </div>
                                                {typeof this.state.T.To[keyName] == 'object' ?
                                                    <React.Fragment>
                                                        {Object.keys(this.state.T.To[keyName]).map((key, ind) => (
                                                            <div className="grid grid-cols-2" key={ind}>
                                                                <div className="text-left pl-4">on {key}</div>
                                                                <div className="text-right pr-4">
                                                                    <span className={(Object.keys(this.state.T.To[keyName])[Object.keys(this.state.T.To[keyName]).length - 1] === key ? 'accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                        {typeof this.state.T.To[keyName][key] == 'number' ? formatCurrency(this.state.T.To[keyName][key]) : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="grid grid-cols-2">
                                                            <div className=""></div>
                                                            <div className="text-right">{formatCurrency(getObjectSum(this.state.T.To[keyName]))}</div>
                                                        </div>
                                                    </React.Fragment>
                                                    : <></>}
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>

                            <div className="px-1">
                                {
                                    Object.keys(this.state.T.By).map((keyName, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="grid grid-cols-2" >
                                                    <div className="text-left">By {keyName}</div>
                                                    <div className="text-right">{typeof this.state.T.By[keyName] == 'number' ? formatCurrency(this.state.T.By[keyName]) : ""}</div>
                                                </div>
                                                {typeof this.state.T.By[keyName] == 'object' ?
                                                    <React.Fragment>
                                                        {Object.keys(this.state.T.By[keyName]).map((key, ind) => (
                                                            <div className="grid grid-cols-2" key={ind}>
                                                                <div className="text-left pl-4">on {key}</div>
                                                                <div className="text-right pr-4">
                                                                    <span className={(Object.keys(this.state.T.By[keyName])[Object.keys(this.state.T.By[keyName]).length - 1] === key ? 'inline-block accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                        {typeof this.state.T.By[keyName][key] == 'number' ? formatCurrency(this.state.T.By[keyName][key]) : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="grid grid-cols-2">
                                                            <div className=""></div>
                                                            <div className="text-right">{formatCurrency(getObjectSum(this.state.T.By[keyName]))}</div>
                                                        </div>
                                                    </React.Fragment>
                                                    : <></>}
                                            </React.Fragment>
                                        )
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
                                            {formatCurrency(getObjectSum(this.state.T.To))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {formatCurrency(getObjectSum(this.state.T.By))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    : ''}

                {('PL' in this.state) ?
                    <div className="pl-container mb-4 text-sm">
                        <div className="grid grid-cols-2">
                            <div className="px-1">
                                {
                                    Object.keys(this.state.PL.To).map((keyName, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="grid grid-cols-2" >
                                                    <div className="text-left">To {keyName}</div>
                                                    <div className="text-right">{typeof this.state.PL.To[keyName] == 'number' ? formatCurrency(this.state.PL.To[keyName]) : ""}</div>
                                                </div>
                                                {typeof this.state.PL.To[keyName] == 'object' ?
                                                    <React.Fragment>
                                                        {Object.keys(this.state.PL.To[keyName]).map((key, ind) => (
                                                            <div className="grid grid-cols-2" key={ind}>
                                                                <div className="text-left pl-4">on {key}</div>
                                                                <div className="text-right pr-4">
                                                                    <span className={(Object.keys(this.state.PL.To[keyName])[Object.keys(this.state.PL.To[keyName]).length - 1] === key ? 'inline-block accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                        {typeof this.state.PL.To[keyName][key] == 'number' ? formatCurrency(this.state.PL.To[keyName][key]) : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="grid grid-cols-2">
                                                            <div className=""></div>
                                                            <div className="text-right">{formatCurrency(getObjectSum(this.state.PL.To[keyName]))}</div>
                                                        </div>
                                                    </React.Fragment>
                                                    : <></>}
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>

                            <div className="px-1">
                                {
                                    Object.keys(this.state.PL.By).map((keyName, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="grid grid-cols-2">
                                                    <div className="text-left">By {keyName}</div>
                                                    <div className="text-right">{typeof this.state.PL.By[keyName] == 'number' ? formatCurrency(this.state.PL.By[keyName]) : ""}</div>
                                                </div>
                                                {typeof this.state.PL.By[keyName] == 'object' ?
                                                    <React.Fragment>
                                                        {Object.keys(this.state.PL.By[keyName]).map((key, ind) => (
                                                            <div className="grid grid-cols-2" key={ind}>
                                                                <div className="text-left pl-4">on {key}</div>
                                                                <div className="text-right pr-4">
                                                                    <span className={(Object.keys(this.state.PL.By[keyName])[Object.keys(this.state.PL.By[keyName]).length - 1] === key ? 'inline-block accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                                                        {typeof this.state.PL.By[keyName][key] == 'number' ? formatCurrency(this.state.PL.By[keyName][key]) : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="grid grid-cols-2">
                                                            <div className=""></div>
                                                            <div className="text-right">{formatCurrency(getObjectSum(this.state.PL.By[keyName]))}</div>
                                                        </div>
                                                    </React.Fragment>
                                                    : <></>}
                                            </React.Fragment>
                                        )
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
                                            {formatCurrency(getObjectSum(this.state.PL.To))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1">
                                <div className="grid grid-cols-2">
                                    <div className=""></div>
                                    <div className="text-right">
                                        <span className="accounting-col border-2 border-l-0 border-r-0 border-current">
                                            {formatCurrency(getObjectSum(this.state.PL.By))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    : ''}

            </div>
        )
    }
}
