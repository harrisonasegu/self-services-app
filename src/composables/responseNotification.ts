export const useResponseNotification = (
    notification: any,
    type: string,
    content: string,
    title: string,
    duration: number
) => notification[type]({
  content,
  meta: title,
  duration: duration ?? 3000,
  keepAliveOnHover: true
})
