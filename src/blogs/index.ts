import { stringToId } from '@/utils/util'
export interface BlogItem {
  key: string
  title: string
  date: string
  desc: string
  tags: string[]
  relevance: string[]
}
const modules = import.meta.glob('./**/*.md', { eager: true })
const list: BlogItem[] = []
const blogMap: Record<string, number> = {}
Object.keys(modules).forEach((key: string) => {
  const item = modules[key] as any
  if (item && item.frontmatter) {
    const res = {
      key: stringToId(key.replace(/(\.\/)|(\.\.\/)|(\.md$)/g, '')),
      title: item.frontmatter.title,
      date: item.frontmatter.date,
      desc: item.frontmatter.desc,
      tags: item.frontmatter.tags || [],
      relevance: (item.frontmatter.relevance || []).map(name => {
        return stringToId(name.replace(/(\.\/)|(\.\.\/)|(\.md$)/g, ''))
      })
    }
    blogMap[res.key] = list.length
    list.push(res)
  }
})

export const BlogData = list
export const BlogMap = blogMap
