import { stringToId } from '@/utils/util'
interface BlogItem {
  key: string
  title: string
  date: string
  desc: string
  tags: string[]
}
const modules = import.meta.glob('./**/*.md', { eager: true })
const list: BlogItem[] = []
Object.keys(modules).forEach((key: string) => {
  const item = modules[key] as any
  if (item && item.frontmatter) {
    list.push({
      // eslint-disable-next-line no-useless-escape
      key: stringToId(key.replace(/(\.\/)|(\.\.\/)|(\.md$)/g, '')),
      title: item.frontmatter.title,
      date: item.frontmatter.date,
      desc: item.frontmatter.desc,
      tags: item.frontmatter.tags || []
    })
  }
})

export const BlogData = list
