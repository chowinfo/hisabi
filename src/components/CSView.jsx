import React, { Component } from "react";
import { formatCurrency, getObjectSum } from "../helpers";

export default class CSView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2021,
      Info: {
        Name: "",
        "Trade Name": "",
        PAN: "",
        "Address 1": "",
        "Address 2": "",
      },
      T: {
        To: {},
        By: {},
      },
      PL: {
        To: {},
        By: {},
      },
      BS: {
        To: {},
        By: {},
      },
      CS: {},
    };
  }
  async componentDidMount() {
    const res = await fetch("data.json");
    const jsRes = await res.json();
    this.setState(jsRes);
  }
  render() {
    return (
      <div className="bs-view print-view">
        <div className="text-center">
          <div className="name uppercase">{this.state.Info.Name}</div>
          <div className="pan">PAN - {this.state.Info.PAN}</div>
          <div className="address1">{this.state.Info["Address 1"]}</div>
          <div className="underline address2">
            {this.state.Info["Address 2"]}
          </div>
          <div className="fyay">
            FY- {(this.state.year - 2) + '-' + (this.state.year - 1)},
            AY- {(this.state.year - 1) + '-' + this.state.year}
          </div>
          <div className="underline title">
            Computation of Total Income
          </div>
        </div>

        <div className="cs-container">
          <div className="">
            <div className="px-1" style={{ width: "600px", margin: "auto" }}>
              {
                Object.keys(this.state.CS).map((keyName, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className="grid grid-cols-2" >
                        <div className="text-left">{keyName}</div>
                        <div className="text-right">{typeof this.state.CS[keyName] == 'number' ? (this.state.CS[keyName] === 0 ? "NIL" :formatCurrency(this.state.CS[keyName])) : ""}</div>
                      </div>
                      {typeof this.state.CS[keyName] == 'object' ?
                        <React.Fragment>
                          {Object.keys(this.state.CS[keyName]).map((key, ind) => (
                            <div className="grid grid-cols-2" key={ind}>
                              <div className="text-left pl-4">{key}</div>
                              <div className="text-right pr-4">
                                <span className={(Object.keys(this.state.CS[keyName])[Object.keys(this.state.CS[keyName]).length - 1] === key ? 'accounting-col border-2 border-t-0 border-l-0 border-r-0 border-current' : '')}>
                                  {typeof this.state.CS[keyName][key] === 'number' ? (this.state.CS[keyName][key] === 0 ? "NIL" : formatCurrency(this.state.CS[keyName][key])) : ""}
                                </span>
                              </div>
                            </div>
                          ))}
                          <div className="grid grid-cols-2">
                            <div className=""></div>
                            <div className="text-right">{this.state.CS[keyName] === 0 ? "NIL" : formatCurrency(getObjectSum(this.state.CS[keyName]))}</div>
                          </div>
                        </React.Fragment>
                        : <></>}
                    </React.Fragment>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
