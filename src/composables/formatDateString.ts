export const useFormatDate = (dateStr: string) => {
  const dateArr = dateStr.split('/') // [dd, mm, yyyy]

  return dateArr.join('-')
}

export const useFormatDateTime = (dateStr: string | null | undefined) => {
  if (!dateStr?.length) return 'NA'
  
  const date = new Date(dateStr).toLocaleDateString()
  const time = new Date(dateStr).toLocaleTimeString()

  const dateTime = `${useFormatDate(date)} ${time}`

  return dateTime
}
