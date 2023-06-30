import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik'; 
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss';

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <div className='char__search-critical-error'><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ? 
                    <div className="char__search-wrapper">
                        <div className="char__search-succes">There is! Visit {char[0].name}'s page?</div>
                        <div className="button button__secondary">
                            <div className="inner">To page</div>
                        </div>
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
                            <button type="submit" className="button button__main">
                                <div className="inner">Find</div>
                            </button>
                        </div>
                        <FormikErrorMessage name="charName" className="char__search-error" component="div" />
                    </Form>
            </Formik>
            {errorMessage}
            {results}
        </div>
    );
}

export default CharSearchForm;