import React from 'react'

const Skeleton = props => {
  //? Porps
  const { count, children } = props

  //? Assets
  const arr = Array(count).fill('_')

  //? Render(s)
  return (
    <>
      {arr.map((item, index) =>
        React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { index })
          }

          return child
        })
      )}
    </>
  )
}

const Items = props => {
  //? Props
  const { index, children, className } = props

  //? Render(s)
  return (
    <div className={className}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { index })
        }

        return child
      })}
    </div>
  )
}

export const Item = ({ index, height, width, animated, className, children }) => (
  <div
    key={index}
    className={` ${height} ${width} ${
      animated === 'background'
        ? 'animate-pulse bg-red-200'
        : animated === 'border'
          ? 'animate-pulse border-2 border-red-200'
          : 'bg-white'
    } rounded-md  ${className}`}
  >
    {children}
  </div>
)

const _default = Object.assign(Skeleton, {
  Skeleton,
  Items,
  Item,
})

export default _default
