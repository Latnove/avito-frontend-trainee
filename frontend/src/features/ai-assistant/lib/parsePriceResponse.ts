export interface IParsePriceResponse {
  price: number
  text: string
}

export const parsePriceResponse = (text: string): IParsePriceResponse | null => {
  const [pricePart, textPart] = text.split(', text:')

  if (!pricePart || !textPart) return null

  const price = Number(pricePart.replace('price:', '').trim())

  return {
    price,
    text: textPart.trim(),
  }
}
