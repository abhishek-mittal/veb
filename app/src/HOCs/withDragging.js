import React from 'react';
import Draggable from 'react-draggable';

export default (TComponent) => {

    const handleStart = (cont) => {
        console.log(cont);
    }

    const hocComponent = ({ ...props }) => (
        <Draggable>
            <div className="handle" style={{width:"100%"}}>
                <TComponent {...props} />
            </div>
        </Draggable>
    )

    return hocComponent;



}
