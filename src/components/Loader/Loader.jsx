import style from '../Styles.module.css';
import { Oval } from 'react-loader-spinner';

export const Loader = () => {
    return <span className={style.Loader}>
        <Oval
        width="100"
        color = 'green'
        visible = {true}    
        ariaLabel='oval'
        />
    </span>
}
