import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(112); 

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset);
    }, []);
    
    const onRequest = (offset) => {
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
    }

    function renderItems(arr) {
        const items = arr.map(item => {
            console.log(item.thumbnail);
            console.log(item);
            
            return (
                <li className="comics__item" key={item.id}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const comics = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {comics}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;