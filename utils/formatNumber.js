export default function formatNumber(n) {
  if (n) {
    let newNumber = n.toString()

    return newNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return ''
}
