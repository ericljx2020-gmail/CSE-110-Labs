import './App.css';
import { Label, Note } from "./folder/types"; 
import { dummyNotesList } from "./folder/constant"; 
import { ClickCounter, ToggleTheme } from "./hookExercise";
import { Favorite } from "./favorite";
import { useState } from 'react';

function App() {

  const [likes, setLikes] = useState<string[]>([]);

  
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);

  const initialNote: Note = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState<Note>(initialNote);

  
  const handleToggleFavorite = (title: string) => {
    setLikes((prevLikes) => {
      if (prevLikes.includes(title)) {
        return prevLikes.filter((t) => t !== title);
      } else {
        return [...prevLikes, title];
      }
    });
  };

  
  const createNoteHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newNote: Note = {
      ...createNote,
      id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    };
    setNotes([...notes, newNote]);
    setCreateNote(initialNote);
  };

  // Handle deleting a note
  const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className='app-container'>
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })}
            required>
          </input>
        </div>

        <div>
          <textarea
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })}
            required>
          </textarea>
        </div>

        <div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div><button type="submit">Create Note</button></div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item">
            <div className="notes-header">
              <Favorite likes={likes} title={note.title} onToggleFavorite={handleToggleFavorite} />
              <button onClick={() => deleteNoteHandler(note.id)}>x</button>
            </div>
            <h2 contentEditable>{note.title}</h2>
            <p contentEditable>{note.content}</p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>

      <ToggleTheme />

      <div>
        <h3>Favorites:</h3>
        {likes.map((like) => (
          <div key={like}>{like}</div>
        ))}
      </div>
    </div>
  );
}

export default App;