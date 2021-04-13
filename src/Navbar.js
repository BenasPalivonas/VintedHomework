import React, { useState } from 'react'
import './navbar.css'
import favorite from './favorite.png'
const Navbar = ({ onChange }) => {
    const [input, setInput] = useState('');
    return (
        <ul className="navbar">
            <li className='favorite' >Favorites <img src={favorite} /></li>
            <li style={{ marginRight: 'calc(50vw - 400px)' }}><input style={{
                height: '30px',
                width: '200px',
                borderRadius: '10px'
            }} onChange={(event) => {
                setInput(event.target.value);
            }} type="text" placeholder="Search for tags" value={input} /><button onClick={() => onChange(input)}>Search</button> <button onClick={() => {
                onChange("");
                setInput("");
            }}>Clear</button></li>
            < li > Profile</li>
        </ul>
    )
}
export default Navbar;