export const useNumberToCurrencyConverter = (value: number, countryCode: string, currency: string) =>
  value?.toLocaleString(countryCode, { style: 'currency', currency })

export const useFormatNumberToNumberStr = (value: number) => value?.toLocaleString('en-NG')

export const useFormatNumberStrToNumber = (value: string) => Number(value?.split(',').join(''))
