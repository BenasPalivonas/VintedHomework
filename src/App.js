import Items from './Items.js';
import React, { useState } from 'react';
import Navbar from './Navbar.js';
import './App.css';
import DatePicker from './DatePicker';
const App = () => {
    const [tag, setTag] = useState("");
    const [date, setDate] = useState("today");
    const onChange = (text) => {
        setTag(text);
    }
    const onClickDate = (event) => {
        setDate(event.target.value)
    }
    return (<div>
        <Navbar onChange={onChange} />
        <DatePicker onClickDate={onClickDate} />
        <Items tag={tag} date={date} />
    </div>
    );
}
export default App;