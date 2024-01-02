const SpecialSell = props => {
  //? Props
  const { discount, inStock } = props

  //? Render(s)
  if (discount > 0 && inStock !== 0) {
    return <div className="w-16 h-7 text-red-500">特价销售</div>
  } else {
    return <div className="h-7" />
  }
}

export default SpecialSell
