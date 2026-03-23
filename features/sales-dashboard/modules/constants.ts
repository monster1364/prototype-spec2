import type { PeriodUnit, ProductClassification } from '../models/types'

export const PERIOD_UNIT_LABELS: Record<PeriodUnit, string> = {
  daily: '일별',
  monthly: '월별',
  yearly: '연도별',
}

export const PRODUCT_CLASSIFICATION_LABEL: Record<ProductClassification, string> = {
  opportunity: '기회',
  risk: '위험',
  normal: '일반',
}

export const TREND_UP_COLOR = '#16a34a'
export const TREND_DOWN_COLOR = '#dc2626'
export const CHART_PRIMARY_COLOR = '#1976d2'
export const CHART_PREV_YEAR_COLOR = '#bdbdbd'

export const CHANNEL_COLORS = {
  online: '#1976d2',
  offline: '#9e9e9e',
  gift: '#e65100',
}

export const TOP_N_PRODUCTS = 20

export const CATEGORY_LIST = ['커틀러리', '세라믹', '테이블 액세서리', '글라스웨어']
export const COLLECTION_LIST = ['Nail', 'Line', 'Wave', 'Straight', 'Mini', 'Pattern', 'Office', 'Fashion']
