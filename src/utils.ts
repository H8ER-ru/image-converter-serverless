export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (!+bytes) return '0 Bytes'

  const k: number = 1024
  const dm: number = decimals < 0 ? 0 : decimals
  const sizes: string[] = ['Bytes', 'KB', 'MB', ]

  const i: number = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}