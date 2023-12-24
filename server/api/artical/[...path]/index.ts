const fm = useFileManager()

export default defineEventHandler((event) => {
  const path = decodeURIComponent(event.context.params!.path)
  const file = fm.find(path)
  if (!file || !file.content)
    setResponseStatus(event, 404, 'Not Find Artical')
  else
    return file.content
})
