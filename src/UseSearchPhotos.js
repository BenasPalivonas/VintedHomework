import { useEffect, useState } from 'react'
import axios from 'axios'
const UseSearchPhotos = (tag, pageNumber, ts) => {
    const [loading, setLoading] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const resetPictures = () => {
        setPictures([])
    };
    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bfc948041f6b60b0ae1b22edecf85894&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1&privacy_filter=1&safe_search=1&min_upload_date=${ts}&per_page=48&page=${pageNumber}&tags=${tag}&tag_mode=any&sort=interestingness-desc`).then((response) => {
            setPictures(prevPictures => {
                return ([...new Set([...prevPictures, ...response.data.photos.photo])]);
            })
            setHasMore(response.data.photos.page < response.data.photos.pages);
            setLoading(false);
        }).catch(e => {
            console.log(e);
        })
    }, [tag, pageNumber, ts])
    return { pictures, hasMore, loading, resetPictures };
}
export default UseSearchPhotos;