import { watch } from 'chokidar'
import { resolve } from 'pathe'

export default defineNitroPlugin(() => {
  if (process.env.ROOT_DIR) {
    logger.box('Welcome To Nuxt Blog')
    const rootPath = process.env.ROOT_DIR as string

    const fm = useFileManager()
    logger.success(`FileManager Setup at ${rootPath}`)

    logger.info('Wait Loading Initial File')
    watch(resolve(rootPath))
      .on('add', (path, stats) => fm.insertFile(path, stats!))
      .on('change', (path, stats) => fm.updateFile(path, stats!))
      .on('unlink', path => fm.removeFile(path))
  }
  else {
    logger.error('No Root Directory')
  }
})
