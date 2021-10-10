import "./App.css";

import React, { Component } from "react";
import { ImPrinter } from "react-icons/im";
import ReactToPrint from "react-to-print";

import Header from "./components/Header";
import TPLView from "./components/TPLView";
import BSView from "./components/BSView";
import CSView from "./components/CSView";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.componentRef = <></>;
    this.tplViewRef = <></>;
    // this.componentRef = React.createRef();
    this.state = JSON.parse(localStorage.getItem("hisabi-app")) || {
      currentView: "TPL",
    };

    this.setCurrentView = this.setCurrentView.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem("hisabi-app", JSON.stringify(this.state));
  }

  setCurrentView(view) {
    this.setState({ ...this.state, currentView: view });
  }

  render() {
    return (
      <div className="App">
        <Header
          printButton={
            <ReactToPrint
              trigger={() => (
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#print"
                >
                  <ImPrinter className="text-lg leading-lg text-white opacity-75" />
                  <span className="ml-2">Print</span>
                </a>
              )}
              content={() => this.componentRef}
            />
          }
          setCurrentView={this.setCurrentView}
        />

        {this.state.currentView === "TPL" ? (
          <TPLView ref={(el) => (this.componentRef = el)} />
        ) : (
          <></>
        )}
        {this.state.currentView === "BS" ? (
          <BSView ref={(el) => (this.componentRef = el)} />
        ) : (
          <></>
        )}
        {this.state.currentView === "CS" ? (
          <CSView ref={(el) => (this.componentRef = el)} />
        ) : (
          <></>
        )}
      </div>
    );
  }
}
