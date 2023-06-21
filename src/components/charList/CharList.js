import { useState, useEffect, useRef } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false); 
    const [offset, setOffset] = useState(210); 
    const [charEnded, setCharEnded] = useState(false); 

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true) 

        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemsLoading(newItemsLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const imgObjectFit = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : null;

            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li 
                        className="char__item" 
                        ref={el => itemRefs.current[i] = el}
                        tabIndex={0}
                        onClick={() => {
                            props.onCharSelected(item.id)
                            focusOnItem(i)
                        }} >
                        <img src={item.thumbnail} alt={item.name} style={imgObjectFit} />
                        <div className="char__name">{item.name}</div>
                    </li> 
                </CSSTransition>
            )
        })

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        );
    }

    const characters = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemsLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {characters}
            <button 
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)} >
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;