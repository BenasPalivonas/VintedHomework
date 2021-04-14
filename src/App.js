import Items from './Items/Items.js';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar.js';
import './App.css';
import DatePicker from './DatePicker/DatePicker';
const App = () => {
    const [tag, setTag] = useState("");
    const [date, setDate] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const onChange = (text) => {
        setTag(text);
    }
    const onClickDate = (event) => {
        setDate(event.target.value)
    }
    const addFavorites = (newFavorite) => {
        setFavorites((prevFavorites) => {
            localStorage.setItem('favoriteItems', JSON.stringify([...new Set([...prevFavorites, newFavorite])]));
            return [...new Set([...prevFavorites, newFavorite])];
        })
    }
    const deleteFavorite = (deleteFavorite) => {
        setFavorites((prevFavorites) => {
            const newArray = prevFavorites.filter((item) => {
                return item !== deleteFavorite;
            })
            localStorage.setItem('favoriteItems', JSON.stringify(newArray));
            return newArray;
        })
    }
    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('favoriteItems'))
        if (favs !== null) {
            setFavorites(favs);
        }
    }, [])
    return (<div>
        <Navbar favorites={favorites} onChange={onChange} deleteFavorite={deleteFavorite} addFavorites={addFavorites} />
        <DatePicker onClickDate={onClickDate} />
        <Items favorites={favorites} deleteFavorite={deleteFavorite} addFavorites={addFavorites} tag={tag} date={date} />
    </div>
    );
}
export default App;