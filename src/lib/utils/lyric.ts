interface LyricItem {
  time: number
  content: string
}

interface Lyric {
  ti?: string
  ar?: string
  al?: string
  by?: string
  offset?: string
  items: Array<LyricItem>
}

export function parseLrc(content: string): Lyric {
  const lrc: Lyric = { items: [] }
  const lines = (content + '')
    .trim()
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(s => !!s)
  //逐行转换
  lines.forEach(line => {
    //基本信息
    if (stringeq(line, '[ti:')) lrc.ti = line.match(/\[ti:([\s\S]*?)\]/)![1]
    else if (stringeq(line, '[ar:'))
      lrc.ar = line.match(/\[ar:([\s\S]*?)\]/)![1]
    else if (stringeq(line, '[al:'))
      lrc.al = line.match(/\[al:([\s\S]*?)\]/)![1]
    else if (stringeq(line, '[by:'))
      lrc.by = line.match(/\[by:([\s\S]*?)\]/)![1]
    else if (stringeq(line, '[offset:'))
      lrc.offset = line.match(/\[offset:([\s\S]*?)\]/)![1]
    //歌词信息
    else {
      //整体匹配
      const match = line.match(/^((\[\d+:\d+(\.\d+)?\])+)([\s\S]+?)$/)
      if (!match) return
      const times = match[1].trim()
      const text = match[4].trim()
      //时间匹配
      const tmatch = times.match(/(\[\d+:\d+(\.\d+)?\])/g)
      if (!tmatch) return
      //逐个时间处理
      tmatch
        .map(t => t.trim())
        .map(t => t.substr(1, t.length - 2))
        .forEach(time => {
          //分秒匹配
          const match = time.match(/^(\d+):(\d+)(\.\d+)?$/)
          if (!match) return
          // eslint-disable-next-line prefer-const, no-unused-vars, @typescript-eslint/no-unused-vars
          let [_, m, s, ms] = match
          //计算时间
          let t = (parseInt(m) * 60 + parseInt(s)) * 1000
          if (ms) {
            ms = ms.substr(1)
            if (ms.length == 2) t += parseInt(ms) * 10
            else t += parseInt(ms)
          }
          if (isNaN(t)) return
          //保存歌词
          lrc.items.push({ time: t, content: text })
        })
    }
  })
  //时间排序
  lrc.items = lrc.items.sort((a, b) => {
    if (a.time == b.time) return 0
    if (a.time > b.time) return 1
    return -1
  })
  return lrc
}

function stringeq(str: string, sub: string, offset = 0): boolean {
  if (sub.length + offset > str.length) return false
  for (let i = 0; i < sub.length; i++) {
    if (sub[i] != str[i + offset]) return false
  }
  return true
}