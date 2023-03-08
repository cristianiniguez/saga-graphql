import { baseUrl } from './config'

export function getImgUrl(relativeUrl: string): string {
  return `${baseUrl}/static${relativeUrl}`
}
