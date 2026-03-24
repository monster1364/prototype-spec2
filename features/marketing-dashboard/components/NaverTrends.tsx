'use client'

import { useState, useCallback } from 'react'
import {
  Box, Button, Chip, CircularProgress, IconButton, Paper,
  Stack, Tab, Tabs, TextField, Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { LineChart } from '@mui/x-charts/LineChart'

interface KeywordGroup { groupName: string; keywords: string[] }
interface TrendPoint   { period: string; ratio: number }
interface TrendSeries  { title: string; data: TrendPoint[] }

const COLORS = ['#1976d2', '#e91e63', '#ff9800', '#15803d', '#7c3aed']

const PRESETS: { id: string; label: string; description: string; groups: KeywordGroup[] }[] = [
  {
    id: 'brand',
    label: '브랜드 인지도',
    description: '우리 브랜드가 경쟁사 대비 얼마나 검색되고 있나',
    groups: [
      { groupName: '누플랏',   keywords: ['누플랏', 'nuflaat'] },
      { groupName: '무인양품', keywords: ['무인양품', 'muji'] },
      { groupName: '자주',     keywords: ['자주', 'jaju'] },
    ],
  },
  {
    id: 'category',
    label: '카테고리 수요',
    description: '우리가 속한 카테고리의 시장 관심도 추이',
    groups: [
      { groupName: '텀블러',      keywords: ['텀블러', '보온병'] },
      { groupName: '커틀러리',    keywords: ['커틀러리', '수저세트'] },
      { groupName: '테이블웨어',  keywords: ['테이블웨어', '식기세트'] },
    ],
  },
  {
    id: 'season',
    label: '시즌 기회',
    description: '시즌별 선물 수요 — 콘텐츠 발행 타이밍 포착',
    groups: [
      { groupName: '집들이선물', keywords: ['집들이 선물', '집들이선물'] },
      { groupName: '크리스마스선물', keywords: ['크리스마스 선물', '크리스마스선물'] },
      { groupName: '생일선물',   keywords: ['생일 선물', '생일선물'] },
      { groupName: '명절선물',   keywords: ['추석 선물', '설날 선물'] },
    ],
  },
  {
    id: 'product',
    label: '상품별 관심',
    description: '주력 상품 키워드 검색량 — 출시 타이밍·재입고 수요 판단',
    groups: [
      { groupName: '네일텀블러',   keywords: ['네일 텀블러', '네일텀블러'] },
      { groupName: '라인머그',     keywords: ['라인 머그', '머그컵'] },
      { groupName: '펜슬커틀러리', keywords: ['펜슬 커틀러리', '커틀러리세트'] },
    ],
  },
  {
    id: 'custom',
    label: '직접 입력',
    description: '키워드를 직접 조합해서 분석',
    groups: [],
  },
]

export function NaverTrends() {
  const [presetId,    setPresetId]    = useState('brand')
  const [customGroups, setCustomGroups] = useState<KeywordGroup[]>([])
  const [inputValue,  setInputValue]  = useState('')
  const [series,      setSeries]      = useState<TrendSeries[]>([])
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState<string | null>(null)

  const activePreset = PRESETS.find((p) => p.id === presetId)!
  const groups = presetId === 'custom' ? customGroups : activePreset.groups

  const fetchTrends = useCallback(async (keywordGroups: KeywordGroup[]) => {
    if (keywordGroups.length === 0) return
    setLoading(true)
    setError(null)
    setSeries([])
    try {
      const res = await fetch('/api/naver-trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: '2025-01-01',
          endDate:   new Date().toISOString().slice(0, 10),
          timeUnit:  'month',
          keywordGroups,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setSeries(data.results as TrendSeries[])
    } catch (e) {
      setError(e instanceof Error ? e.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  function handleTabChange(_: React.SyntheticEvent, value: string) {
    setPresetId(value)
    setSeries([])
    setError(null)
  }

  function addCustomGroup() {
    const trimmed = inputValue.trim()
    if (!trimmed || customGroups.length >= 5) return
    setCustomGroups((prev) => [...prev, { groupName: trimmed, keywords: [trimmed] }])
    setInputValue('')
  }

  function removeCustomGroup(index: number) {
    setCustomGroups((prev) => prev.filter((_, i) => i !== index))
  }

  const labels = series[0]?.data.map((d) => d.period.slice(0, 7)) ?? []

  return (
    <Paper variant="outlined" sx={{ borderRadius: 1.5, mb: 2.5, overflow: 'hidden' }}>
      {/* 헤더 */}
      <Stack direction="row" alignItems="center" gap={1} px={2.5} pt={2.5} pb={1.5}>
        <Typography variant="subtitle2" fontWeight={700} fontSize={13}>키워드 검색량 트렌드</Typography>
        <Chip label="Naver DataLab" size="small" sx={{ fontSize: 11, bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }} />
      </Stack>

      {/* 프리셋 탭 */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 2.5 }}>
        <Tabs
          value={presetId}
          onChange={handleTabChange}
          sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 0, fontSize: 12, textTransform: 'none', fontWeight: 600 } }}
        >
          {PRESETS.map((p) => <Tab key={p.id} value={p.id} label={p.label} />)}
        </Tabs>
      </Box>

      <Box px={2.5} py={2}>
        {/* 프리셋 설명 + 키워드 chips + 조회 버튼 */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={1.5} gap={2}>
          <Box flex={1}>
            <Typography fontSize={12} color="text.secondary" mb={1}>{activePreset.description}</Typography>
            <Stack direction="row" gap={0.75} flexWrap="wrap" alignItems="center">
              {groups.map((g, i) => (
                <Chip
                  key={i}
                  label={g.groupName}
                  size="small"
                  onDelete={presetId === 'custom' ? () => removeCustomGroup(i) : undefined}
                  deleteIcon={presetId === 'custom' ? <CloseIcon /> : undefined}
                  sx={{ bgcolor: COLORS[i % COLORS.length] + '22', color: COLORS[i % COLORS.length], fontWeight: 600, fontSize: 12 }}
                />
              ))}
              {presetId === 'custom' && groups.length < 5 && (
                <Stack direction="row" gap={0.5}>
                  <TextField
                    size="small"
                    placeholder="키워드 입력"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCustomGroup()}
                    sx={{ '& .MuiInputBase-root': { fontSize: 12, height: 28 }, width: 120 }}
                  />
                  <IconButton size="small" onClick={addCustomGroup} sx={{ p: 0.5 }}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Box>
          <Button
            variant="contained"
            size="small"
            onClick={() => fetchTrends(groups)}
            disabled={loading || groups.length === 0}
            sx={{ fontSize: 12, height: 32, flexShrink: 0 }}
          >
            {loading ? <CircularProgress size={14} color="inherit" /> : '조회'}
          </Button>
        </Stack>

        {error && (
          <Box sx={{ px: 1.5, py: 1, bgcolor: '#fee2e2', borderRadius: 1, mb: 1.5 }}>
            <Typography fontSize={12} color="error">{error}</Typography>
          </Box>
        )}

        {series.length > 0 ? (
          <LineChart
            height={240}
            series={series.map((s, i) => ({
              data: s.data.map((d) => d.ratio),
              label: s.title,
              color: COLORS[i % COLORS.length],
              showMark: false,
              valueFormatter: (v: number | null) => v != null ? `${v.toFixed(1)}` : '-',
            }))}
            xAxis={[{
              scaleType: 'point',
              data: labels,
              tickLabelStyle: { fontSize: 11, fill: '#9e9e9e' },
            }]}
            yAxis={[{
              min: 0,
              max: 100,
              tickLabelStyle: { fontSize: 11, fill: '#9e9e9e' },
            }]}
            sx={{
              '& .MuiLineElement-root': { strokeWidth: 2 },
              '& .MuiChartsAxis-line': { stroke: '#f0f0f0' },
              '& .MuiChartsAxis-tick': { stroke: '#f0f0f0' },
            }}
            margin={{ top: 10, right: 16, bottom: 28, left: 44 }}
          />
        ) : (
          <Box sx={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography fontSize={13} color="text.disabled">
              {loading ? '데이터를 불러오는 중...' : '조회 버튼을 눌러 트렌드를 확인하세요'}
            </Typography>
          </Box>
        )}

        <Typography fontSize={11} color="text.disabled" mt={1}>
          * 검색량 지수는 0~100 상대값 (100 = 기간 내 최고 검색량)
        </Typography>
      </Box>
    </Paper>
  )
}
