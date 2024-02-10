

import React from "react";

export default function Input_text(props) {


    return (
        <>
            <div style={{ display: "inline-block" }}>
                <p style={{
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: 15,
                    fontFamily: "cursive"
                }}>
                    {props.message}
                </p>
                <label>{props.label}</label>
                <input type={props.type} id={props.id} onFocus={props.onFocus} onBlur={props.onBlur} />
                <br />
            </div>
            <br />
        </>
        )
}

