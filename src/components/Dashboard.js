import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUser } from './../ducks/reducer.js'
import Navbar from './Navbar.js'


 class Dashboard extends Component {

    componentDidMount(){
        this.props.getUser();
    }

    render() {
        const user = this.props.user;
        return(
            <div>
                <Navbar/>
                <div>
                    <p>firstname: {user? user.first_name: null}</p>
                    <p>lastname: {user? user.last_name: null} </p>
                    <select>
                        <option  value=''>First Name</option>
                        <option value=''>Last Name</option>
                    </select>
                    <h2>recommended friends</h2>
                    <span>
                        
                    </span>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return{
        user:state.user
    }
}

export default connect(mapStateToProps, {getUser})(Dashboard)