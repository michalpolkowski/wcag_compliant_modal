// @ts-nocheck

import React, { useEffect, useRef } from 'react';
import css from './styles.module.css'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

function Modal({ isOpen, onClose, children } :Props) {
    // Create a ref for the modal
    const modalRef = useRef();

    // This useEffect will run whenever the isOpen prop changes
    useEffect(() => {

        // This function handles keydown events
        const handleKeyDown = (event) => {

            // If the user presses the Tab key, we need to handle focus
            if (event.key === 'Tab') {

                // get focusable elements
                const focusableModalElements = modalRef.current.querySelectorAll(
                    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
                );
                const firstElement = focusableModalElements[0];
                const lastElement = focusableModalElements[focusableModalElements.length - 1];

                // If the user presses the Tab key while the last focusable element is focused, we need to focus the first element
                if (!event.shiftKey && document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }

                //  If the user presses the Shift + Tab key while the first focusable element is focused, we need to focus the last element
                if (event.shiftKey && document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            }


            // If the user presses the Escape key, we need to close the modal
            if (event.key === 'Escape') {
                onClose();
            }
        };

        // If the modal is open, add an event listener to handle keydown events
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            modalRef.current.querySelector('button').focus();
        } else {
            // If the modal is closed, remove the event listener
            window.removeEventListener('keydown', handleKeyDown);
        }

        // This is a cleanup function that runs when the component unmounts or before the component updates
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // If the modal is not open, don't render anything
    if (!isOpen) return null;

    return (
        <div>
            <div className={css.overlay}></div>
            <div
                role="dialog"
                aria-modal="true"
                ref={modalRef}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                className={css.dialog}
            >
                <h2 id="dialog-title">My Modal</h2>
                {/* The content of this paragraph will be read by screen readers in conjunction with the dialog title */}
                <p id="dialog-description">This is a modal dialog that requires your attention</p>
                {children}
                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
