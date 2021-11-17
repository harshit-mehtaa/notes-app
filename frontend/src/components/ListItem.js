import React from "react";
import { Link } from "react-router-dom";

let getTitle = (note) => {
	let title = note.body.split("\n")[0];
	return title.length > 45 ? title.slice(0, 45) : title;
};

let getContent = (note) => {
    let content = note.body.replaceAll("\n", '').replaceAll(getTitle(note), '');
    return content.length > 45 ? content.slice(0, 45) + '...' : content;
};

let getTime = (note) => {
	return new Date(note.updated).toLocaleString();
};

const ListItem = ({ note }) => {
	return (
		<Link to={`/note/${note.id}`}>
			<div className="notes-list-item">
				<h3>{getTitle(note)}</h3>
                <p>
					<span>{getContent(note)}</span>
				</p>
				<p>
					<span>{getTime(note)}</span>
				</p>
			</div>
		</Link>
	);
};

export default ListItem;
