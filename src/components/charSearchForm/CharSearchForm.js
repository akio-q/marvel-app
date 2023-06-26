import './charSearchForm.scss';

const CharSearchForm = () => {

    return (
        <div className="char__search-form">
            <label htmlFor="charName" className="char__search-label">Or find a character by name:</label>
            <div className="char__search-wrapper">
                <input 
                    id="charName" 
                    name="charName" 
                    className="char__search-input" 
                    type="text"
                    placeholder="Enter name" />
                <button type="submit" className="button button__main">
                    <div className="inner">Find</div>
                </button>
            </div>
        </div>
    );
}

export default CharSearchForm;