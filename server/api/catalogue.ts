const fm = useFileManager()
export default defineEventHandler(() => {
  return fm.Files.map(f => ({
    name: f.name,
    path: f.path,
    excerpt: f.excerpt,
    updateAt: f.stats.ctimeMs,
    createAt: f.stats.birthtimeMs,
  })).sort((a, b) => b.updateAt - a.updateAt)
})
