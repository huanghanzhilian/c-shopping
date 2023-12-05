import { DisplayError } from 'components'
import { useController } from 'react-hook-form'

export default function TextField(props) {
  //? Props
  const { label, errors, name, type = 'text', control, direction, ...inputProps } = props

  //? Form Hook
  const { field } = useController({ name, control, rules: { required: true } })

  //? Handlers
  const onChangeHandler = e => {
    const inputValue = e.target.value

    if (type === 'number' && inputValue.length !== 0) {
      field.onChange(parseInt(inputValue))
    } else {
      field.onChange(inputValue)
    }
  }

  //? Render(s)
  return (
    <div>
      {label && (
        <label className="block text-xs text-gray-700 lg:text-sm md:min-w-max mb-3" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        style={{ direction: `${direction === 'ltr' ? 'ltr' : ''}` }}
        className="block w-full px-3 py-1.5 text-base transition-colors border border-gray-200 rounded-md outline-none bg-zinc-50/30 lg:text-lg focus:border-blue-600"
        id={name}
        type={type}
        value={field?.value}
        name={field.name}
        onBlur={field.onBlur}
        onChange={onChangeHandler}
        ref={field.ref}
        {...inputProps}
      />

      <DisplayError errors={errors} />
    </div>
  )
}
