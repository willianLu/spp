const goodData = [
  {
    expression: '😊',
    text: '美好的一天，从微笑开始～\n今天也要努力哦！'
  },
  {
    expression: '😄',
    text: '我得意的笑～\n只是因为有你的存在！'
  },
  {
    expression: '💩',
    text: '自在是惬意的状态～\n没错我是在大便。'
  },
  {
    expression: '😏',
    text: '嘴角上扬的弧度，是一种强大的自信～\n你是自己的英雄！'
  },
  {
    expression: '😍',
    text: '遇见男神女神，不过如此～\n崇拜不需言语！'
  },
  {
    expression: '😘',
    text: '没错我心动了\n让我们在一起吧！'
  },
  {
    expression: '😜',
    text: '刮刮乐中了100万～\n要怎样表达我的心情呢！'
  },
  {
    expression: '😴',
    text: '睡觉睡觉，早睡早起～\n我有超长寿命，你用钱买不来！'
  },
  {
    expression: '😛',
    text: '我有大舌头，唱歌贼好听～\n看我高歌一曲！'
  },
  {
    expression: '😋',
    text: '遇到美食总是忍不住～\n没错我是贪吃蛇！'
  },
  {
    expression: '☀️',
    text: '阳光、美丽、炽热～\n一如你的温柔把我包围！'
  },
  {
    expression: '👊',
    text: '该出手时就出手～\n我的拳头硬，我说了算！'
  },
  {
    expression: '❤️',
    text: '闪闪红心我们都有～\n祖国和爱人在心中！'
  },
  {
    expression: '✌️',
    text: '跟生活比个V～\n我要二指破苍穹！'
  },
  {
    expression: '🏃',
    text: '你跑步的样子很飒～\n你是爸妈的小骄傲！'
  },
  {
    expression: '👀',
    text: '我就静静地看着你不说话～\n我的眼睛比你大！'
  },
  {
    expression: '🍦',
    text: '生活就像冰淇凌～\n你不吃它会化，你吃多了它很凉！'
  },
  {
    expression: '🏦',
    text: '我有一栋大hourse～\n它里面装的都是钱！'
  },
  {
    expression: '🌈',
    text: '炫丽的光芒只是外表～\n其实它是一座桥！'
  },
  {
    expression: '🇨🇳',
    text: '五星红旗随风飘扬～\n东方巨龙腾跃万里！'
  }
]
const badData = [
  {
    expression: '😑',
    text: '无表情的日子，也在努力生活～\n我只是不想发表状态！'
  },
  {
    expression: '😦',
    text: '事情有点不顺利呀～\n没关系，我能搞定的！'
  },
  {
    expression: '😅',
    text: '虽然有点紧张～\n一点都不妨碍我笑的灿烂！'
  },
  {
    expression: '😥',
    text: '有一点点的失望，怎么办～\n来让我抱抱你<♥️>！'
  },
  {
    expression: '😩',
    text: '昨晚玩的太嗨了，有点疲惫～\n妈，我想睡觉！'
  },
  {
    expression: '😖',
    text: '有点惊慌失措了～\n别紧张，我专门为你而来。'
  },
  {
    expression: '😭',
    text: '呜呜呜，我哭了～\n别哭了，我把我的大白兔给你！'
  },
  {
    expression: '😠',
    text: '生气～生气～生气～\n莫生气，气坏自己，我心疼！'
  },
  {
    expression: '😡',
    text: '愤怒不已，毫无理智～\n要不你打我一顿，别太用力哦！'
  }
]

export function getHumorData() {
  const data = Math.random() <= 0.8 ? goodData : badData
  const index = Math.floor(Math.random() * data.length)
  return data[index === data.length ? index - 1 : index]
}
