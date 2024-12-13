import React from 'react'
import { ReactComponent as Close } from "../svg/Close.svg"
import "../styles/Modal.css"

const Modal = (Component) => {
    return ({ isOpen, close, ...props }) => {
        if (!isOpen) return null;
        return (
            <div className="modalOverlay" onClick={close}>
                <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                    <Close className="closeBtn" onClick={close} width="20" height="20" />
                    <Component {...props} />
                </div>
            </div>
        )
    }

}

export default Modal
