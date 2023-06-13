import React from 'react'

const FormInput = ({ type, className, name, value, onChange, required, placeholder }) => {
    return (
        <input type={type} className={className} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} />
    )
}

export default FormInput
