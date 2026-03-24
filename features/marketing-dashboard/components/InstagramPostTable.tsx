"use client"

import { useState } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import type { InstagramPost, PostType } from '../models/types'
import { POST_TYPE_LABEL, POST_TYPE_COLOR } from '../modules/constants'

interface Props {
  posts: InstagramPost[]
}

type FilterType = 'all' | PostType

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'reel', label: '릴스' },
  { value: 'post', label: '피드' },
  { value: 'story', label: '스토리' },
]

function engagementChipColor(rate: number): 'success' | 'primary' | 'default' {
  if (rate >= 5) return 'success'
  if (rate >= 2) return 'primary'
  return 'default'
}

export default function InstagramPostTable({ posts }: Props) {
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.type === filter)

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {FILTER_OPTIONS.map((opt) => (
          <Button
            key={opt.value}
            size="small"
            variant={filter === opt.value ? 'contained' : 'outlined'}
            onClick={() => setFilter(opt.value)}
            sx={
              filter === opt.value
                ? {}
                : { color: 'text.secondary', borderColor: 'divider' }
            }
          >
            {opt.label}
          </Button>
        ))}
      </Stack>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>유형</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>내용</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>게시일</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>도달</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>좋아요</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>저장</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>댓글</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>참여율</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((post) => (
              <TableRow key={post.id} hover>
                <TableCell>
                  <Chip
                    label={POST_TYPE_LABEL[post.type]}
                    size="small"
                    sx={{
                      backgroundColor: POST_TYPE_COLOR[post.type],
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 220 }}>
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={post.caption}
                  >
                    {post.caption.length > 30 ? post.caption.slice(0, 30) + '…' : post.caption}
                  </Box>
                </TableCell>
                <TableCell>{post.publishedAt}</TableCell>
                <TableCell align="right">{post.reach.toLocaleString()}</TableCell>
                <TableCell align="right">{post.likes.toLocaleString()}</TableCell>
                <TableCell align="right">{post.saves.toLocaleString()}</TableCell>
                <TableCell align="right">{post.comments.toLocaleString()}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${post.engagementRate.toFixed(1)}%`}
                    size="small"
                    color={engagementChipColor(post.engagementRate)}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
