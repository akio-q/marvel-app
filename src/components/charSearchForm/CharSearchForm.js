import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import * as Yup from 'yup';

import './charSearchForm.scss';

const CharSearchForm = () => {

    return (
        <Formik
            initialValues={{charName: ''}}
            validationSchema={Yup.object({
                charName: Yup.string()
                         .min(2, 'Minimum 2 symbols')
                         .required('Required field'), 
            })}>
                <Form className="char__search-form">
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
                    <ErrorMessage name="charName" className="char__search-error" component="div" />
                </Form>
        </Formik>
    );
}

export default CharSearchForm;