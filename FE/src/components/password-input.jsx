import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { strengthIndicator, strengthColor } from './strength-password';
import {
    ProgressBar,

} from 'react-bootstrap'
export default function PasswordInput(props) {

    const strength = strengthIndicator(props.value);
    const color = strengthColor(strength);
    const strength2 = (strength + strength) * 10
    // const ss = "background-color: "+color+" width:" +strength2+"%;"
    var ss = {
        backgroundColor: color,
        width: (strength2.toString()) + "%"
        // 
    };
    return (
        <>
            <input
                type='password'
                value={props.value}
                className='password-input form-control'
                placeholder={props.placeholder}
                onChange={props.handleChanges}

            />
            <div className="progress">
                <div role="progressbar" class="progress-bar"
                    aria-valuenow={strength2} aria-valuemin="0"
                    aria-valuemax="100" style={ss}

                ></div>


            </div>
            {/* <ProgressBar now={strength2} style={{
                    backgroundColor: color                    
                }}
            /> */}
        </>
    )
}