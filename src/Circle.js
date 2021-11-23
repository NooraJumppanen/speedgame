import React from 'react';
import './Circle.css';

const Circle = (props) => {
    return (
        <div 
        style = {{
            backgroundColor: props.color,
            pointerEvents: props.disabled ? "auto" : "none"
        }}
        className={`circle ${props.active ? "active" : ""}`}
        onClick={props.click}>
        </div>
    );
};

export default Circle;