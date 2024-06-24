import React from "react"

const Button = ({
    children,
    buttonType = "submit",
    variant = "primary",
    outline = false,
    size = "",
    padding = "px-4 py-2",
    handleClick = () => {},
    disabled = false,
}) => {

    return (
        <button
            type={buttonType}
            className={`btn ${!outline ? `btn-${variant}` : `btn-outline-${variant}`} ${size} ${padding}`}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button