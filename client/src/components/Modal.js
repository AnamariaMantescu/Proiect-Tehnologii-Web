import moment from "moment";
import React, { useEffect, useState } from "react";
import createNoteService from "../service/createNoteService";
import getUsersService from "../service/getUsersService";
import "./Modal.css";
const Modal = ({ setShowModal,nota }) => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const data = await getUsersService();
    setUsers(data);
  };
 
  const [selectUser, setSelectUser] = useState();
  useEffect(() => {
    getUsers();
  }, []);
  const handleSendNote = () => {
    let date = moment().format("YYYY-MM-DD hh:mm:ss");
    const newInputNote = {
        userId: selectUser,
        matterId: nota.matterId,
        title: nota.title,
        description: nota.description,
        created: date,
        matterName: nota.matterName,
      };
    createNoteService(newInputNote);
    setShowModal(value=>!value)
  };
  return (
    <div className="modaldiv" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Partajare Nota</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <select
              className="form-control"
              value={selectUser}
              onChange={(e) => setSelectUser(e.target.value)}
            >  
              {users.map((item,id) => (
                <option value={item.id} key={id}>{item.email}</option>
              ))}
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSendNote}>
             Partajeazas
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => setShowModal((value) => !value)}
            >
              Anulare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
