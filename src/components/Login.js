import React, {Component} from 'react';


export default class Login extends Component {
    render(){
        return(
            <div className='login'>
                <div>
                <h2>SMILEY FACE</h2>
                <h2>Helo</h2>
                <a href={process.env.REACT_APP_LOGIN}> <button>Login</button></a>
                </div>

            </div>
        )
    }
}