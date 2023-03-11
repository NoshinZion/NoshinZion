import {useRef} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const Body = ({ activeNote, onUpdateNote, onDeleteNote, formatDate }) => {
  const quill = useRef();


  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const timezoneOffset = now.getTimezoneOffset();
    const timezoneOffsetFormatted = String(timezoneOffset).padStart(2, "0");
    const datetime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}-${timezoneOffsetFormatted}:00`;
    return datetime;
  }
  console.log(getCurrentDateTime());






  const onSaveNote = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };


  const onEditField = (field, value) => {
    const newNote = {
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    };
    onUpdateNote(newNote);
  };


  if (!activeNote)
    return (
      <div className="no-active-note">Select a note or create a new one </div>
    );


  return (
    <div className="body">
      <div className="body-note-edit">
        <div id="body-header">
          <h1 id="body-title">
            <input
              type="text"
              id="body-title-input"
              value={activeNote.title}
              onChange={(e) => {
                onEditField("title", e.target.value);
              }}
              autoFocus
            />
          </h1>
          <div id="body-buttons">
            <button
              id="save_button"
              onClick={() =>
                onSaveNote("body", quill.current.getEditor().getText())
              }
            >
              Save
            </button>
            <button
            id="edit_button"
            onClick={() =>
              onEditField({
                ...activeNote,
                isEditing: !activeNote.isEditing,
              })
            }
          >
            {activeNote.isEditing ? "View" : "Edit"}
          </button>
            <button
              id="delete_button"
              onClick={(e) => onDeleteNote(activeNote.id)}
            >
              Delete
            </button>
          </div>
        </div>


        <div id="date">
          <input
            type="datetime-local"
            id="date"
            value={new Date(activeNote.lastModified).toISOString().slice(0, -8)}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              const timestamp = newDate.getTime();
              onEditField("lastModified", timestamp);
            }}
          />
        </div>


        <div id="body-content">
          <ReactQuill ref={quill} theme="snow" value={activeNote.body} />
        </div>
      </div>
    </div>
  );
};


export default Body;


