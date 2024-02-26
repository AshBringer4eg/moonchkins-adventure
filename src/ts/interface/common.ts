export default interface Activatable {
  activate(): void
  deactivate(): void
}

// ^_^ Don't blame me, here I was really upset and those arrows makes me happy ^_^
export enum Direction {
  TOP_LEFT = '⇖',
  TOP = '⇑',
  TOP_RIGHT = '⇗',
  RIGHT = '⇒',
  BOTTOM_RIGHT = '⇘',
  BOTTOM = '⇓',
  BOTTOM_LEFT = '⇙',
  LEFT = '⇐',
  CENTER = '↺',
  NONE = ''
}