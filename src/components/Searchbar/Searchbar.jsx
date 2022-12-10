import style from '../Styles.module.css';
import PropTypes from 'prop-types';


export const Searchbar = ({onSubmit, onInput, searchValue}) => {
    return <div className={style.Searchbar}>

        <form className={style.SearchForm} onSubmit={onSubmit}>
            <button className={style.SearchFormButton} type="submit">
                 <label className={style.SearchFormButtonLabel}></label>
            </button>
            <input value={searchValue} onInput={onInput} className={style.SearchFormInput} type="text" name="searchBar"/>
        </form>

    </div>
}


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onInput: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
}