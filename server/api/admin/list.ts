const fm = useFileManager()

export default defineEventHandler(() => {
  return fm.Files.map(
    file => ({
      name: file.name,
      updateAt: file.stats!.ctimeMs,
      createAt: file.stats!.birthtimeMs,
      size: file.stats!.size,
    }),
  )
})
