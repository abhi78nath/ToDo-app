import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context

    const [note, setNote] = useState({title:"",description:"", tag:""})

    const handleClick = (e) =>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({title:"",description:"", tag:""})
    }
    const onChange = (e)=>{
        setNote({ ...note, [e.target.name]: e.target.value})
    }
    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" value={note.title}id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control"value={note.description} id="description" name="description" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.tag}id="tag" name="tag" onChange={onChange} minLength={3} required/>
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>


        </div>
    )
}

export default AddNote