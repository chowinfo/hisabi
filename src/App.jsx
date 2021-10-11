import "./App.css";

import React, { Component } from "react";
import { ImPrinter } from "react-icons/im";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";

import Header from "./components/Header";
import Viewer from "./features/viewer/Viewer";
import { updateData } from "./app/appReducer";

const mapDispatchToProps = (dispatch) => ({
  updateData: data => dispatch(updateData(data))
});
class App extends Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  async componentDidMount() {
    // const res = await fetch('data.json');
    // const jsRes = await res.json();
    // this.props.updateData(jsRes);
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
        />

        <Viewer xref={this.componentRef} />
      </div>
    );
  }
}


export default connect(null, mapDispatchToProps)(App);