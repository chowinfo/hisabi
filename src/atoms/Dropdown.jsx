import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaChevronDown as ShowMenuIcon, FaChevronUp as HideMenuIcon} from "react-icons/fa";

class Dropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.isOpen,
		};
		this.displayAreaRef = <></>;
		this.dropTogglerRef = <></>;
	}

	static propTypes = {
		isOpen: PropTypes.bool.isRequired,
		label: PropTypes.oneOfType([
			PropTypes.string.isRequired,
			PropTypes.node.isRequired,
		]),
		children: PropTypes.node,
		onChange: PropTypes.func,
	};

	static defaultProps = {
		isOpen: false,
		label: "Dropdown",
		children: null,
	};

	componentDidMount() {
		//Assign click handler to listen the click to close the dropdown when clicked outside
		document.addEventListener("click", this.handleClickOutside);
	}

	componentWillUnmount() {
		//Remove the listener
		document.removeEventListener("click", this.handleClickOutside);
	}

	//If click is outside the dropdown button or display area
	//Close the dropdown
	handleClickOutside = (event) => {
		const path = event.path || (event.composedPath && event.composedPath());
		const { onChange } = this.props;

		if (
			!path.includes(this.displayAreaRef) &&
			!path.includes(this.dropTogglerRef)
		) {
			this.setState({
				isOpen: false,
			});

			onChange && onChange(false);
		}
	};

	//Dropdown toggler
	toggleDropDown = () => {
		const { onChange } = this.props;
		const { isOpen } = this.state;
		this.setState({
			isOpen: !isOpen,
		});

		onChange && onChange(!isOpen);
	};

	//To control component
	componentDidUpdate() {
		if (this.props.isOpen !== this.state.isOpen) {
			this.setState({
				isOpen: this.props.isOpen,
			});
		}
	}

	render() {
		const { label, children } = this.props;
		const { isOpen } = this.state;

		return (
			<div className="dropdown-container relative">
				<div
					className="dropdown-toggler px-3 py-2 flex gap-2 items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ease-linear transition-all duration-150 "
					onClick={this.toggleDropDown}
					ref={(ref) => (this.dropTogglerRef = ref)}
				>
					{label}
					{isOpen ? <HideMenuIcon /> : <ShowMenuIcon />}
				</div>
				<div
					className="dropdown-area absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-2"
					ref={(ref) => (this.displayAreaRef = ref)}
				>
					{isOpen && <div className="">{children}</div>}
				</div>
			</div>
		);
	}
}

export default Dropdown;
