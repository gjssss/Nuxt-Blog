import { useLogger } from '@nuxt/kit'

export const logger = useLogger('Nuxt-Blog')

export function logFile(name: string, path: string, opration: string) {
  logger.success('\x1B[90m[\x1B[36m%s\x1B[90m](%s) -> \x1B[32m%s\x1B[0m', name, path, opration)
}
