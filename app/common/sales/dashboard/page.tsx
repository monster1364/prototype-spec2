"use client"

import { useState } from "react"
import NextLink from "next/link"
import { Box, Breadcrumbs, Grid, Link, Typography } from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import {
  SalesDashboardHeader,
  KpiSummary,
  ChannelCompare,
  SalesTrend,
  CategoryAnalysis,
  ProductPerformance,
  InventoryStatus,
  CustomerAnalysis,
  OrderInsights,
  MarketingPerformance,
  type PeriodUnit,
} from "@/features/sales-dashboard"
import {
  mockSalesKPI,
  mockSalesChannelData,
  mockSalesTrend,
  mockCategorySales,
  mockCollectionSales,
  mockProductPerformance,
  mockSalesInventory,
  mockInboundItems,
  mockRestockAlerts,
  mockDtcMtcSummary,
  mockCustomerAnalysis,
  mockBestsellers,
  mockOrderPattern,
  mockMarketingKPI,
  mockMarketingChannels,
  mockCampaigns,
} from "@/mock-data"
import { DevModeWrapper } from "@/shared/components/DevModeWrapper"
import { DevModeToggle } from "@/shared/components/DevModeToggle"
import MdDrawer from "@/components/MdDrawer"

export default function SalesDashboardPage() {
  const [periodUnit, setPeriodUnit] = useState<PeriodUnit>("monthly")
  const [dateRange, setDateRange] = useState({ from: "2025-04", to: "2026-03" })
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [devMode, setDevMode] = useState(false)
  const [activeBlock, setActiveBlock] = useState<string | null>(null)

  function handleExcelDownload() {
    const from = dateRange.from.replace("-", "")
    const to = dateRange.to.replace("-", "")
    alert(`sales_${from}_${to}.xlsx 다운로드 (프로토타입)`)
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Breadcrumb */}
      <Box sx={{ bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider", px: 3, py: 1.5 }}>
        <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize: 14 }} />} sx={{ fontSize: 13 }}>
          <Link component={NextLink} href="/" color="text.secondary" underline="hover" fontSize={13}>Home</Link>
          <Link component={NextLink} href="/common" color="text.secondary" underline="hover" fontSize={13}>Common</Link>
          <Link component={NextLink} href="/common/sales" color="text.secondary" underline="hover" fontSize={13}>Sales</Link>
          <Typography color="text.primary" fontSize={13} fontWeight={500}>Sales Dashboard</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 3 }}>
        {/* 1. Header + Filters */}
        <DevModeWrapper
          name="SalesDashboardHeader"
          filePath="features/sales-dashboard/components/SalesDashboardHeader.tsx"
          enabled={devMode}
          color="#7c3aed"
          specFile="common/sales/dashboard#5.1 Page Header Area"
          onSpecClick={setActiveBlock}
        >
          <SalesDashboardHeader
            periodUnit={periodUnit}
            onPeriodChange={setPeriodUnit}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            selectedCollections={selectedCollections}
            onCollectionChange={setSelectedCollections}
            onExcelDownload={handleExcelDownload}
            updatedAt="2026-03-23T09:00:00Z"
          />
        </DevModeWrapper>

        {/* 2. KPI Summary */}
        <DevModeWrapper
          name="KpiSummary"
          filePath="features/sales-dashboard/components/KpiSummary.tsx"
          enabled={devMode}
          color="#0369a1"
          specFile="common/sales/dashboard#5.2 KPI Summary Area"
          onSpecClick={setActiveBlock}
        >
          <KpiSummary kpi={mockSalesKPI} />
        </DevModeWrapper>

        {/* 3. 채널 비교 + 매출 추이 */}
        <Grid container spacing={2} sx={{ mb: 2.5 }}>
          <Grid size={4}>
            <DevModeWrapper
              name="ChannelCompare"
              filePath="features/sales-dashboard/components/ChannelCompare.tsx"
              enabled={devMode}
              color="#b45309"
              specFile="common/sales/dashboard#5.3 채널 비교"
              onSpecClick={setActiveBlock}
            >
              <ChannelCompare data={mockSalesChannelData} />
            </DevModeWrapper>
          </Grid>
          <Grid size={8}>
            <DevModeWrapper
              name="SalesTrend"
              filePath="features/sales-dashboard/components/SalesTrend.tsx"
              enabled={devMode}
              color="#047857"
              specFile="common/sales/dashboard#5.4 매출 추이"
              onSpecClick={setActiveBlock}
            >
              <SalesTrend data={mockSalesTrend} periodUnit={periodUnit} />
            </DevModeWrapper>
          </Grid>
        </Grid>

        {/* 4. 카테고리 / 컬렉션 분석 */}
        <DevModeWrapper
          name="CategoryAnalysis"
          filePath="features/sales-dashboard/components/CategoryAnalysis.tsx"
          enabled={devMode}
          color="#be185d"
          specFile="common/sales/dashboard#5.5 카테고리"
          onSpecClick={setActiveBlock}
        >
          <CategoryAnalysis
            categories={mockCategorySales}
            collections={mockCollectionSales}
          />
        </DevModeWrapper>

        {/* 5. 상품 성과 */}
        <DevModeWrapper
          name="ProductPerformance"
          filePath="features/sales-dashboard/components/ProductPerformance.tsx"
          enabled={devMode}
          color="#b91c1c"
          specFile="common/sales/dashboard#5.5 상품 성과"
          onSpecClick={setActiveBlock}
        >
          <ProductPerformance products={mockProductPerformance} />
        </DevModeWrapper>

        {/* 5.6 주문 인사이트 */}
        <DevModeWrapper
          name="OrderInsights"
          filePath="features/sales-dashboard/components/OrderInsights.tsx"
          enabled={devMode}
          color="#0f766e"
          specFile="common/sales/dashboard#5.6 주문 인사이트"
          onSpecClick={setActiveBlock}
        >
          <OrderInsights bestsellers={mockBestsellers} orderPattern={mockOrderPattern} />
        </DevModeWrapper>

        {/* 5.7 마케팅 채널 성과 */}
        <DevModeWrapper
          name="MarketingPerformance"
          filePath="features/sales-dashboard/components/MarketingPerformance.tsx"
          enabled={devMode}
          color="#c2410c"
          specFile="common/sales/dashboard#5.7 마케팅 채널 성과"
          onSpecClick={setActiveBlock}
        >
          <MarketingPerformance
            kpi={mockMarketingKPI}
            channels={mockMarketingChannels}
            campaigns={mockCampaigns}
          />
        </DevModeWrapper>

        {/* 6. 재고/입고 현황 */}
        <DevModeWrapper
          name="InventoryStatus"
          filePath="features/sales-dashboard/components/InventoryStatus.tsx"
          enabled={devMode}
          color="#0891b2"
          specFile="common/sales/dashboard#5.6 재고/입고 현황"
          onSpecClick={setActiveBlock}
        >
          <InventoryStatus
            inventory={mockSalesInventory}
            inbound={mockInboundItems}
            dtcMtc={mockDtcMtcSummary}
            restockAlerts={mockRestockAlerts}
          />
        </DevModeWrapper>

        {/* 7. 고객 분석 */}
        <DevModeWrapper
          name="CustomerAnalysis"
          filePath="features/sales-dashboard/components/CustomerAnalysis.tsx"
          enabled={devMode}
          color="#6d28d9"
          specFile="common/sales/dashboard#5.7 고객 분석 (CRM)"
          onSpecClick={setActiveBlock}
        >
          <CustomerAnalysis data={mockCustomerAnalysis} />
        </DevModeWrapper>
      </Box>

      <DevModeToggle enabled={devMode} onToggle={() => setDevMode((v) => !v)} />
      <MdDrawer specFile={activeBlock} onClose={() => setActiveBlock(null)} />
    </Box>
  )
}
