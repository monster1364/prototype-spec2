"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import NextLink from "next/link"
import { Box, Breadcrumbs, Link, Typography } from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import {
  SalesDashboardHeader,
  KpiSummary,
  SalesTrend,
  CategoryAnalysis,
  ProductPerformance,
  InventoryStatus,
  CustomerAnalysis,
  OrderInsights,
  TrafficAnalysis,
  type PeriodUnit,
} from "@/features/sales-dashboard"
import { CATEGORY_LIST, COLLECTION_LIST } from "@/features/sales-dashboard/modules/constants"
import {
  mockSalesKPI,
  mockSalesTrend,
  mockSalesTrendDaily,
  mockCategorySales,
  mockCollectionSales,
  mockCollectionTrend,
  mockCollectionTrendDaily,
  mockProductPerformance,
  mockInboundTracking,
  mockDtcMtcSummary,
  mockCustomerAnalysis,
  mockBestsellers,
  mockOrderPattern,
  mockTrafficData,
  mockConversionFunnel,
} from "@/mock-data"
import { DevModeWrapper } from "@/shared/components/DevModeWrapper"
import { DevModeToggle } from "@/shared/components/DevModeToggle"
import MdDrawer from "@/components/MdDrawer"

// ── 섹션 앵커 네비 ────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "kpi",       label: "KPI",          team: null },
  { id: "trend",     label: "매출 추이",     team: null },
  { id: "orders",    label: "주문 인사이트", team: "ec" },
  { id: "traffic",   label: "트래픽 & 전환", team: "ec" },
  { id: "customer",  label: "고객 분석",     team: "ec" },
  { id: "product",   label: "상품 성과",     team: "md" },
  { id: "inventory", label: "재고/입고",     team: "md" },
  { id: "category",  label: "카테고리",      team: "md" },
] as const

const TEAM_BG:    Record<string, string> = { ec: "#dbeafe", md: "#dcfce7" }
const TEAM_COLOR: Record<string, string> = { ec: "#1d4ed8", md: "#15803d" }

function SectionNav() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <Box sx={{ position: "sticky", top: 0, zIndex: 100, bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider", px: 3, py: 0.75, display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
      {NAV_ITEMS.map((item, i) => {
        const showDivider = i > 0 && NAV_ITEMS[i - 1].team !== item.team
        const bg    = item.team ? TEAM_BG[item.team]    : "#f3f4f6"
        const color = item.team ? TEAM_COLOR[item.team] : "#374151"
        return (
          <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {showDivider && <Box component="span" sx={{ color: "divider", mx: 0.5, userSelect: "none" }}>|</Box>}
            <Box
              component="button"
              onClick={() => scrollTo(item.id)}
              sx={{ border: "none", cursor: "pointer", borderRadius: 1, px: 1.25, py: 0.5, fontSize: 12, fontWeight: 500, bgcolor: bg, color, "&:hover": { opacity: 0.8 }, transition: "opacity 0.15s" }}
            >
              {item.label}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

function SalesDashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initPeriod = (searchParams.get("period") as PeriodUnit) || "monthly"
  const initFrom   = searchParams.get("from") || (initPeriod === "daily" ? "2026-03-01" : "2025-04")
  const initTo     = searchParams.get("to")   || (initPeriod === "daily" ? "2026-03-23" : "2026-03")
  const initCats   = searchParams.get("categories")?.split(",").filter((c) => CATEGORY_LIST.includes(c)) ?? [...CATEGORY_LIST]
  const initCols   = searchParams.get("collections")?.split(",").filter((c) => COLLECTION_LIST.includes(c)) ?? [...COLLECTION_LIST]

  const [periodUnit,          setPeriodUnit]          = useState<PeriodUnit>(initPeriod)
  const [dateRange,           setDateRange]           = useState({ from: initFrom, to: initTo })
  const [selectedCategories,  setSelectedCategories]  = useState<string[]>(initCats)
  const [selectedCollections, setSelectedCollections] = useState<string[]>(initCols)
  const [applied, setApplied] = useState({ periodUnit: initPeriod, categories: initCats, collections: initCols })
  const [devMode,     setDevMode]     = useState(false)
  const [activeBlock, setActiveBlock] = useState<string | null>(null)

  function handleSearch() {
    setApplied({ periodUnit, categories: selectedCategories, collections: selectedCollections })
    const params = new URLSearchParams()
    params.set("period", periodUnit)
    params.set("from", dateRange.from)
    params.set("to", dateRange.to)
    if (selectedCategories.length > 0 && selectedCategories.length < CATEGORY_LIST.length)
      params.set("categories", selectedCategories.join(","))
    if (selectedCollections.length > 0 && selectedCollections.length < COLLECTION_LIST.length)
      params.set("collections", selectedCollections.join(","))
    router.push(`?${params.toString()}`, { scroll: false })
  }

  function handleReset() {
    const defaults = { periodUnit: "monthly" as PeriodUnit, from: "2025-04", to: "2026-03", categories: [...CATEGORY_LIST], collections: [...COLLECTION_LIST] }
    setPeriodUnit(defaults.periodUnit)
    setDateRange({ from: defaults.from, to: defaults.to })
    setSelectedCategories(defaults.categories)
    setSelectedCollections(defaults.collections)
    setApplied({ periodUnit: defaults.periodUnit, categories: defaults.categories, collections: defaults.collections })
    router.push("?", { scroll: false })
  }

  function handleExcelDownload() {
    alert(`sales_${dateRange.from}_${dateRange.to}.xlsx 다운로드 (프로토타입)`)
  }

  const trendData           = applied.periodUnit === "daily" ? mockSalesTrendDaily : mockSalesTrend
  const collectionTrendData = applied.periodUnit === "daily" ? mockCollectionTrendDaily : mockCollectionTrend

  const byCat = (item: { category: string })   => applied.categories.includes(item.category)
  const byCol = (item: { collection: string }) => applied.collections.includes(item.collection)

  const filteredCategorySales   = mockCategorySales.filter(byCat)
  const filteredCollectionSales = mockCollectionSales.filter(byCol)
  const filteredCollectionTrend = collectionTrendData.filter(byCol)
  const filteredProducts        = mockProductPerformance.filter(byCat)
  const filteredInboundTracking = mockInboundTracking.filter(byCat)

  return (
    <>
      {/* Breadcrumb */}
      <Box sx={{ bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider", px: 3, py: 1.5 }}>
        <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize: 14 }} />} sx={{ fontSize: 13 }}>
          <Link component={NextLink} href="/" color="text.secondary" underline="hover" fontSize={13}>Home</Link>
          <Link component={NextLink} href="/nuflaat" color="text.secondary" underline="hover" fontSize={13}>Nuflaat</Link>
          <Link component={NextLink} href="/nuflaat/sales" color="text.secondary" underline="hover" fontSize={13}>Sales</Link>
          <Typography color="text.primary" fontSize={13} fontWeight={500}>Sales Dashboard</Typography>
        </Breadcrumbs>
      </Box>

      {/* 섹션 앵커 네비 */}
      <SectionNav />

      {/* 헤더 필터 */}
      <Box sx={{ bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider" }}>
        <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 2 }}>
          <DevModeWrapper name="SalesDashboardHeader" filePath="features/sales-dashboard/components/SalesDashboardHeader.tsx" enabled={devMode} color="#7c3aed" specFile="nuflaat/sales/dashboard#5.1 Page Header Area" onSpecClick={setActiveBlock}>
            <SalesDashboardHeader
              periodUnit={periodUnit} onPeriodChange={setPeriodUnit}
              dateRange={dateRange} onDateRangeChange={setDateRange}
              selectedCategories={selectedCategories} onCategoryChange={setSelectedCategories}
              selectedCollections={selectedCollections} onCollectionChange={setSelectedCollections}
              onSearch={handleSearch} onReset={handleReset} onExcelDownload={handleExcelDownload}
              updatedAt="2026-03-23T09:00:00Z"
            />
          </DevModeWrapper>
        </Box>
      </Box>

      {/* 콘텐츠 */}
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 3 }}>

        <Box id="kpi" sx={{ scrollMarginTop: 48 }}>
          <DevModeWrapper name="KpiSummary" filePath="features/sales-dashboard/components/KpiSummary.tsx" enabled={devMode} color="#0369a1" specFile="nuflaat/sales/dashboard#5.2 KPI Summary Area" onSpecClick={setActiveBlock}>
            <KpiSummary kpi={mockSalesKPI} />
          </DevModeWrapper>
        </Box>

        <Box id="trend" sx={{ scrollMarginTop: 48, mb: 2 }}>
          <DevModeWrapper name="SalesTrend" filePath="features/sales-dashboard/components/SalesTrend.tsx" enabled={devMode} color="#047857" specFile="nuflaat/sales/dashboard#5.3 매출 추이" onSpecClick={setActiveBlock}>
            <SalesTrend data={trendData} periodUnit={applied.periodUnit} />
          </DevModeWrapper>
        </Box>

        <Box id="orders" sx={{ scrollMarginTop: 48 }}>
          <DevModeWrapper name="OrderInsights" filePath="features/sales-dashboard/components/OrderInsights.tsx" enabled={devMode} color="#0f766e" specFile="nuflaat/sales/dashboard#5.4 주문 인사이트" onSpecClick={setActiveBlock}>
            <OrderInsights bestsellers={mockBestsellers} orderPattern={mockOrderPattern} />
          </DevModeWrapper>
        </Box>

        <Box id="traffic" sx={{ scrollMarginTop: 48 }}>
          <DevModeWrapper name="TrafficAnalysis" filePath="features/sales-dashboard/components/TrafficAnalysis.tsx" enabled={devMode} color="#7c3aed" specFile="nuflaat/sales/dashboard#5.5 트래픽 & 전환 분석" onSpecClick={setActiveBlock}>
            <TrafficAnalysis data={mockTrafficData} funnelData={mockConversionFunnel} />
          </DevModeWrapper>
        </Box>

        <Box id="customer" sx={{ scrollMarginTop: 48 }}>
          <DevModeWrapper name="CustomerAnalysis" filePath="features/sales-dashboard/components/CustomerAnalysis.tsx" enabled={devMode} color="#6d28d9" specFile="nuflaat/sales/dashboard#5.6 고객 분석" onSpecClick={setActiveBlock}>
            <CustomerAnalysis data={mockCustomerAnalysis} />
          </DevModeWrapper>
        </Box>

        <Box id="product" sx={{ scrollMarginTop: 48 }}>
          <DevModeWrapper name="ProductPerformance" filePath="features/sales-dashboard/components/ProductPerformance.tsx" enabled={devMode} color="#b91c1c" specFile="nuflaat/sales/dashboard#5.7 상품 성과" onSpecClick={setActiveBlock}>
            <ProductPerformance products={filteredProducts} />
          </DevModeWrapper>
        </Box>

        <Box id="inventory" sx={{ scrollMarginTop: 48 }}>
          <DevModeWrapper name="InventoryStatus" filePath="features/sales-dashboard/components/InventoryStatus.tsx" enabled={devMode} color="#0891b2" specFile="nuflaat/sales/dashboard#5.8 재고/입고 현황" onSpecClick={setActiveBlock}>
            <InventoryStatus inboundTracking={filteredInboundTracking} dtcMtc={mockDtcMtcSummary} />
          </DevModeWrapper>
        </Box>

        <Box id="category" sx={{ scrollMarginTop: 48 }}>
          <DevModeWrapper name="CategoryAnalysis" filePath="features/sales-dashboard/components/CategoryAnalysis.tsx" enabled={devMode} color="#be185d" specFile="nuflaat/sales/dashboard#5.9 카테고리 / 컬렉션 분석" onSpecClick={setActiveBlock}>
            <CategoryAnalysis
              categories={filteredCategorySales}
              collections={filteredCollectionSales}
              collectionTrend={filteredCollectionTrend}
              periodUnit={applied.periodUnit}
            />
          </DevModeWrapper>
        </Box>

      </Box>

      <DevModeToggle enabled={devMode} onToggle={() => setDevMode((v) => !v)} />
      <MdDrawer specFile={activeBlock} onClose={() => setActiveBlock(null)} />
    </>
  )
}

export default function SalesDashboardPage() {
  return (
    <Suspense>
      <SalesDashboardContent />
    </Suspense>
  )
}
