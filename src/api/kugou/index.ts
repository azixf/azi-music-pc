import { http } from '@/lib/request/request'

// verify music by hash
export const apiVerifyMusicByHash = (hash: string) => {
  return http.get(`/kugou/verify/${hash}`)
}