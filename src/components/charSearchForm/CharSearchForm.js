import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik'; 
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss';

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {process, setProcess, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const errorMessage = process === "error" ? <div className='char__search-critical-error'><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ? 
                    <div className="char__search-wrapper">
                        <div className="char__search-succes">There is! Visit {char[0].name}'s page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> :
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{charName: ''}}
                validationSchema={Yup.object({
                    charName: Yup.string()
                            .min(2, 'Minimum 2 symbols')
                            .required('Required field'), 
                })}
                onSubmit={values => { 
                    updateChar(values.charName);
                }}> 
                    <Form>
                        <label htmlFor="charName" className="char__search-label">Or find a character by name:</label>
                        <div className="char__search-wrapper">
                            <Field 
                                id="charName" 
                                name="charName" 
                                className="char__search-input" 
                                type="text"
                                placeholder="Enter name" />
                            <button 
                                type="submit" 
                                className="button button__main"
                                disabled={process === 'loading'}>
                                <div className="inner">Find</div>
                            </button>
                        </div>
                        <FormikErrorMessage name="charName" className="char__search-error" component="div" />
                    </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    );
}

export default CharSearchForm;