import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='nav'>
            <div>
                <h2>Helo</h2>
                <span>Home</span>
                <span>Search</span>
            </div>
            <div>
                <span>Dashboard</span>
            </div>
            <div>
                <a href = 'http://localhost:3535/auth/logout'><span>Logout</span></a>
            </div>
        </div>
    )
}