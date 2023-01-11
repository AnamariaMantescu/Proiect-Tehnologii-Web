import React from 'react';
import { useSelector } from 'react-redux';

// import {addNote, updateNote} from "../redux/actionCreators";

import {Link} from "react-router-dom"

const Home =()=>{
    const notes = useSelector(state => state.notes);
    console.log('notes',notes)


      return (
          <div className="App">
              {/* <Title /> */}
            <h1>React Notes</h1>
              <div className="container">
                     <Link to="/note">
                        <button type="button" className="btn btn-primary mb-2">Add New Note</button>
                    </Link>

                {notes.map( i => {
                    return (
                    <div className="card mb-2" onClick={() => {}} key={i.id}>
                        <div className="card-body">
                            {/* <h5>{i.title}</h5> */}
                            <h5 className="card-title">{i.title}</h5>
                            <div className="card-text">{ (i.content) }</div>
                            <Link to={`/note`} className="card-link">Edit</Link>
                        </div>
                    </div>  
                    )
                })
                }
            
              </div>
              
              {/* <Footer /> */}
          </div>
      );
  }

  


export default Home