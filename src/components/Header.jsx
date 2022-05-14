import React from 'react';

import {
	FaBars as MenuIconToggler,
	FaFileUpload as FileUploadIcon,
	FaFileDownload as FileDownloadIcon,
} from 'react-icons/fa';
import { FiUpload as UploadIcon } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';

import ViewDropdown from './ViewDropdown';
import { updateData } from '../app/appReducer';
import { downloadFile } from '../app/helpers';
import EditDropdown from './EditDropdown';

export default function Header({ printButton, setCurrentView, fixed }) {
	const [navbarOpen, setNavbarOpen] = React.useState(false);
	const [uploadModal, setUploadModal] = React.useState(false);
	const jsonFileInputRef = React.createRef();
	const dispatch = useDispatch();
	const data = useSelector((state) => state.app.data);

	function handleSubmit(event) {
		event.preventDefault();
		if (jsonFileInputRef.current.files.length > 0) {
			const file = jsonFileInputRef.current.files[0];

			const reader = new FileReader();
			reader.onload = function (e) {
				dispatch(updateData(JSON.parse(e.target.result)));
				setUploadModal(!uploadModal);
			};
			reader.readAsText(file);
		} else {
			alert('Please select a file');
		}
	}

	return (
		<>
			<nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-green mb-3">
				<div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
					<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
						<a
							className="text-sm font-bold leading-relaxed flex flex-row items-center gap-2 mr-4 py-2 whitespace-nowrap uppercase text-white"
							href={process.env.PUBLIC_URL + '/'}
						>
							<img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Hisabi Logo" className="w-10" />
							<span>Hisabi</span>
						</a>
						<button
							className="text-white cursor-pointer text-l leading-none px-4 py-2 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
							type="button"
							onClick={() => setNavbarOpen(!navbarOpen)}
						>
							<MenuIconToggler />
						</button>
					</div>
					<div
						className={'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}
						id="example-navbar-danger"
					>
						<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
							<li className="nav-item">{printButton}</li>
							<li className="nav-item">
								<ViewDropdown />
							</li>
							<li className="nav-item">
								<EditDropdown />
							</li>
							<li className="nav-item">
								<a
									className="px-3 py-2 flex gap-2 items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
									href="#upload"
									onClick={() => setUploadModal(!uploadModal)}
								>
									<FileUploadIcon className="text-lg leading-lg text-white opacity-75" />
									<span>Upload</span>
								</a>
							</li>
							<li className="nav-item">
								<a
									className="px-3 py-2 flex gap-2 items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
									href="#upload"
									onClick={() => {
										const filename = Date.now() + '-' + data.Info.Name + '-' + data.year + '.json';
										downloadFile(data, filename);
										console.log('File downloaded!!');
									}}
								>
									<FileDownloadIcon className="text-lg leading-lg text-white opacity-75" />
									<span>Download</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{uploadModal ? (
				<Modal
					modalTitle="JSON Data Upload"
					yesBtn={null}
					noBtn={null}
					isActive={uploadModal}
					onClose={() => {
						setUploadModal(!uploadModal);
					}}
				>
					<form id="upload-form" onSubmit={handleSubmit}>
						<div className="form-group grid grid-cols-1 gap-2">
							<label className="" htmlFor="jsonFile">
								Upload JSON file:{' '}
							</label>
							<input type="file" name="jsonFile" id="jsonFile" ref={jsonFileInputRef} />
						</div>
						<div className="flex justify-center pt-5">
							<button
								type="submit"
								className="flex items-center text-xs uppercase font-bold leading-snug bg-green p-3 rounded text-white hover:bg-green-dark hover:opacity-75"
							>
								{' '}
								<UploadIcon className="text-lg leading-lg" />
								Upload
							</button>
						</div>
					</form>
				</Modal>
			) : (
				<></>
			)}
		</>
	);
}
