const fm = useFileManager()

export default defineEventHandler((event) => {
  const path = event.context.params!.path
  const mdSrc = fm.find(path)
  if (!mdSrc || !mdSrc.data)
    return {}
  else
    return mdSrc.data
})
