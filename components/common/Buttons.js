import { Loading } from 'components'

export const Button = props => {
  //? Props
  const {
    type = 'button',
    isLoading = false,
    children,
    className = '',
    isRounded = false,
    ...restPropps
  } = props

  //? Render
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`button ${isRounded ? 'rounded-3xl' : ''} ${className}
      `}
      {...restPropps}
    >
      {isLoading ? <Loading /> : children}
    </button>
  )
}

export const LoginBtn = ({ children, ...restPropps }) => (
  <Button type="submit" className="mx-auto rounded-3xl w-44" {...restPropps}>
    {children}
  </Button>
)

export const SubmitModalBtn = ({ children, ...restPropps }) => (
  <Button
    type="submit"
    className="w-full max-w-xl mx-auto rounded-md btn lg:w-64 lg:ml-0"
    {...restPropps}
  >
    {children}
  </Button>
)
