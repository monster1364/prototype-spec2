export type PostType = 'reel' | 'post' | 'story'

export interface InstagramKPI {
  followers: number
  followersDelta: number       // 기간 내 증감 (절대값)
  followersDeltaRate: number   // 증감률 %
  totalReach: number
  totalImpressions: number
  totalLikes: number
  totalSaves: number
  totalComments: number
  avgEngagementRate: number    // (좋아요+저장+댓글) / 도달 * 100
}

export interface InstagramDailyMetric {
  date: string   // "YYYY-MM-DD"
  reach: number
  likes: number
  saves: number
  newFollowers: number
}

export interface InstagramPost {
  id: string
  type: PostType
  caption: string
  publishedAt: string   // "YYYY-MM-DD"
  reach: number
  likes: number
  saves: number
  comments: number
  shares: number
  engagementRate: number
}
