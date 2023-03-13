import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            char: {},
            loading: true
        }    

        this.updateChar();
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
    }

    render() {
        const {char, loading} = this.state;

        return (
            <div className="randomchar">
                {loading ? <Spinner /> : <View char={char} />}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today! <br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">Try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, thumbnail, homepage, wiki} = char; 
    let {description} = char;

    if (!description) {
        description = 'No aviable data';
    }
    if (description.length > 210) {
        const visibleDescr = description.substring(0, 210);
        description = visibleDescr + '...';
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random Char" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;