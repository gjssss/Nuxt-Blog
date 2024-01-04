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

  async insertFile(path: string, stats: Stats) {
    const info = this.getInfo(path)
    if (!info.isMD)
      return
    const _fileObj = await this.getFileObj(stats, info)
    logFile(_fileObj.name, _fileObj.path, 'insert')
    this.Files.push(_fileObj)
  }

  async updateFile(path: string, stats: Stats) {
    const info = this.getInfo(path)
    if (!info.isMD)
      return
    const idx = this.Files.findIndex(f => f.absolutePath === info.absolutePath)
    if (idx >= 0) {
      const _fileObj = await this.getFileObj(stats, info)
      logFile(_fileObj.name, _fileObj.path, 'update')
      this.Files.splice(idx, 1, _fileObj)
    }
    else {
      logger.error(`not find update file [${info.name}]`)
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

  private getInfo(path: string): FileInfo {
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

  private async getFileObj(stats: Stats, info: FileInfo): Promise<FileStructer> {
    // load
    const data = await fs.readFile(info.absolutePath, { encoding: 'utf-8' })
    const result = matter(data, { excerpt: true })

    // resolve
    const _path = result.data.path ?? relative(process.env.ROOT_DIR as string, info.absolutePath)
    const _name = result.data.title ?? result.data.name ?? info.name
    const content = md.render(result.content)
    const excerpt = md.render(result.excerpt ?? '')

    return {
      ...result,
      name: _name,
      path: _path,
      absolutePath: info.absolutePath,
      fileName: info.fileName,
      stats,
      content,
      excerpt,
    }
  }
}

export interface FileStructer extends matter.GrayMatterFile<string> {
  name: string
  path: string
  absolutePath: string
  fileName: string
  stats: Stats
}

interface FileInfo {
  absolutePath: string
  fileName: string
  name: string
  isMD: boolean
}

let _instance: FileManager | undefined
export function useFileManager() {
  if (!_instance)
    _instance = new FileManager()
  return _instance
}
