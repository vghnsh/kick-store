const calculateTotal = (cartData) => {
  let totalAmount = 0
  console.log(cartData)
  for (const cartItem of cartData) {
    const { item, quantity } = cartItem
    const { price } = item
    totalAmount += price * quantity
  }

  // Round the total amount to two decimal places
  totalAmount = parseFloat(totalAmount.toFixed(2))

  return totalAmount
}

export { calculateTotal }
