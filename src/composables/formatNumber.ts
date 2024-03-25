const currencyOptions = {
  style: 'currency',
  currencyDisplay: 'code'
}

export const useFormatNumWithDecimal = (num: number) => {
  return Number(num)
}

export const useNumberToCurrency = (num: number, currency: string) => {
  const result = currency
    ? useFormatNumWithDecimal(num)?.toLocaleString('en-NG', {
      ...currencyOptions,
      currency
    })
    : useFormatNumWithDecimal(num)?.toLocaleString('en-NG')

  return result
}
