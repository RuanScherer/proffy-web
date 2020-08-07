import React from 'react'
import './styles.css'

interface ToastProps {
    visible: boolean
    text: string
}

const Toast: React.FC<ToastProps> = ({visible, text}) => {
    return (
        <p className="toast" data-visible={visible}>
            {text}
        </p>
    )
}

export default Toast