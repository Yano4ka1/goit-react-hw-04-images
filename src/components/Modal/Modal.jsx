import style from '../Styles.module.css';
import PropTypes from 'prop-types';
import React,{ useEffect } from "react";

export const Modal = ({toggleFunc, currentPic}) => {

    useEffect(() => {
        const escapeClose = (e) => {
            if (e.code === 'Escape') {
                toggleFunc();
            }
        }
            window.addEventListener('keydown', escapeClose);

            return () => window.removeEventListener('keydown', escapeClose)
        }, [toggleFunc])
   
        const onOverlayClick = (e) => {
            if (e.currentTarget === e.target) {
                toggleFunc();
            }
        }
 
        return <>
                <div className={style.Overlay} onClick={onOverlayClick}>
                    <div className={style.Modal}>
                        <img src={currentPic} alt="" />
                    </div>
                </div>
            </>
    }

    Modal.propTypes = {
        currentPic: PropTypes.string.isRequired,
        toggleFunc: PropTypes.func.isRequired,
    }