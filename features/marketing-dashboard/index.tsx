// Public API for marketing-dashboard feature
export { default as InstagramKpiCards } from './components/InstagramKpiCards'
export { default as InstagramTrend } from './components/InstagramTrend'
export { default as InstagramPostTable } from './components/InstagramPostTable'
export { NaverTrends } from './components/NaverTrends'

export type { InstagramKPI, InstagramDailyMetric, InstagramPost, PostType } from './models/types'
export { POST_TYPE_LABEL, POST_TYPE_COLOR } from './modules/constants'
