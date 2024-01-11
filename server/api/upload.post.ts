import fs from 'node:fs/promises'
import normalizePath from 'normalize-path'
import { join } from 'pathe'

const path = normalizePath(process.env.ROOT_DIR as string ?? '')

export default defineEventHandler(async (event) => {
  const ContentType = getHeader(event, 'Content-Type')
  if (ContentType) {
    if (ContentType.startsWith('multipart/form-data')) {
      const data = (await readMultipartFormData(event)) ?? []
      const file = data.find(item => item.type === 'text/markdown')
      if (file) {
        const { data: buf, filename } = file
        const content = buf.toString('utf-8')
        try {
          await fs.writeFile(join(path, filename ?? `${new Date().getTime().toString()}.md`), content)
          return 'Saved'
        }
        catch (e) {
          return 'Error save'
        }
      }
      else {
        return 'Please upload file'
      }
    }
    return 123
  }
  else {
    return 'Unhandle Event'
  }
})
