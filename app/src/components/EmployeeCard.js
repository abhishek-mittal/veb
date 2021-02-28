import React, { useState } from 'react'
import withDragging from '../HOCs/withDragging'
import { ModalContext } from './Modal/context';
import './style.scss';

const UpdateDetailForm = ({ name, title, ...rest }) => {

    const { onSubmit, onCancel } = rest;
    const [state, setstate] = useState({ name, title });

    const handleChange = (key) => (e) => {
        const val = e.target.value;
        setstate((prev) => ({ ...state, [key]: val}));
    }

    console.log(state)

    return (
        <div className="form card p-4">
            <div className="card-content">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={name} onChange={handleChange('name')} placeholder="Text input" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Department</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={title} onChange={handleChange('title')} placeholder="Text input" />
                    </div>
                </div>
            </div>

            <footer className="card-footer">
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={(e) => onSubmit(state)} >Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" onClick={onCancel} >Cancel</button>
                    </div>
                </div>
            </footer>
        </div>
    )
}


function EmployeeCard({ employee, ...rest }) {

    
    
    let { handleModal } = React.useContext(ModalContext);
    const { onClick } = rest;

    const handleChange = ({name: newName, pos: newTitle}) => {
        employee.name = newName;
        employee.pos = newTitle;
        onClick(employee);
    }
 
    return (
        <>
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {employee.name}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        {employee.pos}
                    </div>
                </div>
                <footer className="card-footer">
                    <a href="#" className="card-footer-item">
                        <button
                            className="mt-6 rounded  bg-purple-700 text-purple-100 px-5 h-12"
                            onClick={() => handleModal(() => <UpdateDetailForm name={employee.name} title={employee.pos} onSubmit={handleChange} />)}
                        >
                            open this modal!
                        </button>
                    </a>
                    <a href="#" className="card-footer-item">Delete</a>
                </footer>
            </div>
        </>
    )
}


export default withDragging(EmployeeCard);