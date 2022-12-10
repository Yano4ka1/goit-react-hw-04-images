import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import {nanoid} from 'nanoid';

export const ImageGalleryItem = ({ imgs }) => {
    return <>{imgs.map(image => {
          return (<li className={style.ImageGalleryItem} key={nanoid()}>
            <img className={style.ImageGalleryItemImage} src={image.webformatURL} alt="" />
          </li>)
    })}
        </>
}

ImageGalleryItem.propTypes = {
  imgs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
        })
    ).isRequired,
}
