import React, { ForwardRefRenderFunction, ForwardedRef, Ref, forwardRef } from 'react'
import { Control, useController } from 'react-hook-form'

const BaseCheckbox = (props, ref) => {
  const { label, name, checked, onChange } = props

  return (
    <div className="flex justify-between items-center py-2.5">
      <span className="font-medium text-gray-700 w-3/4">{label}</span>
      <div className="relative inline-block w-12 mr-2 align-middle select-none">
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
          ref={ref}
          className="absolute block w-4 h-4 duration-200 ease-in bg-gray-400 rounded-full appearance-none cursor-pointer checked:bg-white right-6 top-1 checked:right-1"
        />
        <label
          htmlFor={name}
          className={`block h-6 overflow-hidden border-2 border-gray-400  rounded-full cursor-pointer ${
            checked ? 'bg-blue-500 border-blue-500' : 'bg-white'
          }`}
        ></label>
      </div>
    </div>
  )
}

export const CustomCheckbox = forwardRef(BaseCheckbox)

export const ControlledCheckbox = ({ name, control, ...restProps }) => {
  const { field } = useController({ name, control })

  return (
    <CustomCheckbox
      checked={field.value}
      name={field.name}
      onChange={field.onChange}
      {...restProps}
    />
  )
}
