export default function exsitItem(cartItems, productID, color, size) {
  let result
  if (color) {
    result = cartItems.find(item => item.productID === productID && item.color?.id === color?.id)
  } else if (size) {
    result = cartItems.find(item => item.productID === productID && item.size?.id === size?.id)
  } else {
    result = cartItems.find(item => item.productID === productID)
  }

  return result
}
