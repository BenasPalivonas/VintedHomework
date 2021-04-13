import React, { useEffect, useState, useRef, useCallback } from 'react';
import './items.css'
import UseSearchPhotos from './UseSearchPhotos';
const Items = ({ tag, date }) => {
    // const [response, setResponse] = useState({ data: { photos: { photo: [] } } });
    const [pageNumber, setPageNumber] = useState(1);
    var time = new Date();
    time.setDate(time.getDate() - date);
    var ts = Math.round(time.getTime() / 1000);
    const {
        pictures,
        hasMore,
        loading,
        resetPictures
    } = UseSearchPhotos(tag, pageNumber, ts)
    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        resetPictures();
    }, [tag, date])
    return (
        <div className="grid">
            { pictures.map((item, index) => {
                if (pictures.length === index + 1) {
                    return <div ref={lastBookElementRef} className="container"><img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`} /></div>
                }
                return <div className="container"><img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`} /></div>
            })}
        </div>
    );
}
export default Items;