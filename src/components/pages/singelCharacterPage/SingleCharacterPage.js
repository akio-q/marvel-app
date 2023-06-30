import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';

import AppBanner from '../../appBanner/AppBanner';
import Spinner from '../../spinner/Spinner';
import Page404 from '../404';

import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
    const {characterId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterById, clearError} = useMarvelService();
    

    useEffect(() => {
        updateChar();
    }, [characterId]);

    const updateChar = () => {
        clearError();
        getCharacterById(characterId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorPage = error ? <Page404 /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            {errorPage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {thumbnail, name, description} = char;

    return (
        <>
            <AppBanner />
            <div className="single-character">
                <img src={thumbnail} alt='Loki' className="single-character__img" />
                <div>
                    <h2 className="single-character__name">{name}</h2>
                    <p className="single-character__descr">{description}</p>
                </div>
            </div>
        </>
    )
}

export default SingleCharacterPage; 