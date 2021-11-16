import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = ({ match, history }) => {
	let noteId = match.params.id;
	let [note, setNote] = useState(null);

	useEffect(() => {
		getNote();
	}, [noteId]);

	let getNote = async () => {
		let response = await fetch(`/api/notes/${noteId}`);
		let data = await response.json();
		setNote(data);
	};

	let updateNote = async () => {
		let response = await fetch(`/api/notes/${noteId}/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(note),
		});
		let data = await response.json();
		setNote(data);
	};

	let handleSubmit = () => {
		updateNote();
		history.push("/");
	};

	return (
		<div className="note">
			<div className="note-header">
				<h3>
					<ArrowLeft onClick={handleSubmit} />
				</h3>
			</div>
			<textarea
				defaultValue={note?.body}
				onChange={(e) => {
					setNote({ ...note, body: e.target.value });
				}}
			/>
		</div>
	);
};

export default NotePage;
