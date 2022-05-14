import './App.css';

import React from 'react';
import { ImPrinter } from 'react-icons/im';
import { useReactToPrint } from 'react-to-print';

import Header from './components/Header';
import Viewer from './features/viewer/Viewer';
import Editor from './features/editor/Editor';
import { useSelector } from 'react-redux';

function App() {
	const componentRef = React.useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	React.useEffect(() => {
		window.onkeydown = function (e) {
			if (e.ctrlKey && e.keyCode === 'P'.charCodeAt(0)) {
				e.preventDefault();
				handlePrint();
			}
		};
	});

	const isEditing = useSelector((state) => state.app.isEditing);

	return (
		<div className="App">
			<Header
				printButton={
					!isEditing ? (
						<a
							className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
							href="#print"
							onClick={handlePrint}
						>
							<ImPrinter className="text-lg leading-lg text-white opacity-75" />
							<span className="ml-2">Print</span>
						</a>
					) : null
				}
			/>

			<Viewer isActive={!isEditing} ref={componentRef} />
			<Editor isActive={isEditing} />
		</div>
	);
}

export default App;
