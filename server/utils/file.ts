import type { Stats } from 'node:fs'
import fs from 'node:fs/promises'
import normalizePath from 'normalize-path'
import matter from 'gray-matter'
import { relative } from 'pathe'
import markdownit from 'markdown-it'
import { tasklist } from '@mdit/plugin-tasklist'

const md = markdownit().use(tasklist, {
  disabled: false,
})

class FileManager {
  Files: Array<FileStructer>
  constructor() {
    this.Files = []
  }

  async insertFile(path: string, stats?: Stats) {
    const { absolutePath, name, isMD } = this.getInfo(path)
    if (!isMD)
      return

    const _fileObj = await this.getFileObj(absolutePath, name, stats)
    logFile(_fileObj.name, _fileObj.path, 'insert')
    this.Files.push(_fileObj)
  }

  async updateFile(path: string, stats?: Stats) {
    const { absolutePath, name, isMD } = this.getInfo(path)
    if (!isMD)
      return
    const idx = this.Files.findIndex(f => f.absolutePath === absolutePath)
    if (idx >= 0) {
      const _fileObj = await this.getFileObj(absolutePath, name, stats)
      logFile(_fileObj.name, _fileObj.path, 'update')
      this.Files.splice(idx, 1, _fileObj)
    }
    else {
      logger.error(`not find update file [${name}]`)
    }
  }

  removeFile(path: string) {
    const { absolutePath, isMD } = this.getInfo(path)
    if (!isMD)
      return
    const idx = this.Files.findIndex(f => f.absolutePath === absolutePath)
    if (idx >= 0) {
      const [file] = this.Files.splice(idx, 1)
      logFile(file.name, file.path, 'delete')
    }
  }

  find(path: string, isAbs?: boolean) {
    if (isAbs)
      return this.Files.find(f => f.absolutePath === path)
    else
      return this.Files.find(f => f.path === path)
  }

  private getInfo(path: string) {
    const absolutePath = normalizePath(path)
    const fileName = absolutePath.split('/').pop()!
    const name = fileName.split('.').shift()!
    const isMD = fileName.endsWith('.md')
    return {
      absolutePath,
      fileName,
      name,
      isMD,
    }
  }

  private async getFileObj(absolutePath: string, name: string, stats?: Stats) {
    // load
    const data = await fs.readFile(absolutePath, { encoding: 'utf-8' })
    const result = matter(data, { excerpt: true })

    // resolve
    const _path = result.data.path ?? relative(process.env.ROOT_DIR as string, absolutePath)
    const _name = result.data.title ?? result.data.name ?? name
    const content = md.render(result.content)
    const excerpt = md.render(result.excerpt ?? '')

    return {
      ...result,
      name: _name,
      path: _path,
      absolutePath,
      stats,
      content,
      excerpt,
    }
  }
}

interface FileStructer extends matter.GrayMatterFile<string> {
  name: string
  path: string
  absolutePath: string
  stats?: Stats
}

let _instance: FileManager | undefined
export function useFileManager() {
  if (!_instance)
    _instance = new FileManager()
  return _instance
}
