import style from '../Styles.module.css';
import PropTypes from 'prop-types';
import React, { Component } from "react";

export class Modal extends Component {
    
    componentDidMount(){
        window.addEventListener('keydown', this.escapeClose);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.escapeClose);
    }
    escapeClose = (e) => {
        if (e.code === 'Escape') {
            this.props.toggleFunc();
        }
    }
    onOverlayClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.toggleFunc();
        }
    }
    render() {
        return <>
            <div className={style.Overlay} onClick={this.onOverlayClick}>
                <div className={style.Modal}>
                    <img src={this.props.currentPic} alt="" />
                </div>
            </div>
            </>
    }
    }

    Modal.propTypes = {
        currentPic: PropTypes.string.isRequired,
        toggleFunc: PropTypes.func.isRequired,
    }