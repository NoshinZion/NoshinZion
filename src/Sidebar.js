const Sidebar = ({ notes, onAddNote, activeNote, setActiveNote }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
  
    return (
      <div id="sidebar">
        <div className="sidebar-header">
          <h1>Notes</h1>
          <button id = "add"onClick={onAddNote}>+</button>
        </div>
        <div className="sidebar-notes">
          {sortedNotes.map(({ id, title, body, lastModified }, i) => (
            <div
              className={`sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
              <div className="sidebar-note-title">
                <strong>{title && title.substr(0, 50) + "..."}</strong>
              </div>
              <p>{body && body.substr(0, 100) + "..."}</p>
              <small className="note-meta">
                Last Modified{" "}
                {new Date(lastModified).toLocaleDateString("en-CA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
  export default Sidebar;
  
  
  