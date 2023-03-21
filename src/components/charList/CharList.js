import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 210
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true 
        })
    }

    renderItems(arr) {
        const items = arr.map(item => {
            const imgObjectFit = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : null;

            return (
                <li 
                    className="char__item" 
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)} >
                    <img src={item.thumbnail} alt={item.name} style={imgObjectFit} />
                    <div className="char__name">{item.name}</div>
                </li> 
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

    render() {
        const {charList, loading, error, newItemsLoading, offset} = this.state;

        const characters = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? characters : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    onClick={() => this.onRequest(offset)} >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;