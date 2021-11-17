import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = ({ match, history }) => {
	let noteId = match.params.id;
	let [note, setNote] = useState(null);

	useEffect(() => {
		async function getNote() {
			if (noteId === "new") return;

			let response = await fetch(`/api/notes/${noteId}`);
			let data = await response.json();
			setNote(data);
		}
		getNote();
		return () => {};
	}, [noteId]);

	let createNote = async () => {
		await fetch(`/api/notes/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(note),
		});
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

	let deleteNote = async () => {
		await fetch(`/api/notes/${noteId}/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		history.push("/");
	};

	let handleSubmit = () => {
		if (noteId === "new" && note !== null) {
			createNote();
		} else if (noteId !== "new") {
			updateNote();
		}
		history.push("/");
	};

	return (
		<div className="note">
			<div className="note-header">
				<h3>
					<ArrowLeft onClick={handleSubmit} />
				</h3>
				{noteId !== "new" ? (
					<button onClick={deleteNote}>Delete</button>
				) : (
					<button onClick={handleSubmit}>Done</button>
				)}
			</div>
			<textarea
				value={note?.body}
				onChange={(e) => {
					setNote({ ...note, body: e.target.value });
				}}
			/>
		</div>
	);
};

export default NotePage;
