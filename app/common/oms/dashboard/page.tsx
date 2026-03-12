"use client"

import { useState } from "react"
import NextLink from "next/link"
import { Box, Breadcrumbs, Link, Typography } from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import {
  DashboardHeader,
  DashboardTabs,
  StatusSummary,
  OrderListTable,
  type OrderTab,
  type DashboardStatusSection,
} from "@/features/order-dashboard"
import {
  mockOrderStatusSections,
  mockClaimStatusSections,
  mockDashboardItems,
} from "@/mock-data"
import { DevModeWrapper } from "@/shared/components/DevModeWrapper"
import { DevModeToggle } from "@/shared/components/DevModeToggle"
import ProtoUpdatedAt from "@/shared/components/ProtoUpdatedAt"
import NotionDrawer from "@/components/NotionDrawer"

const NOTION_PAGE = "https://www.notion.so/OMS-Order-Dashboard-1-321dd8037729806bb705f6f34c98431c"
const PROTO_UPDATED_AT = "2026-03-12 20:45"

export default function OrderDashboardPage() {
  const [activeTab, setActiveTab] = useState<OrderTab>("ORDER")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string>(() => new Date().toISOString())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [devMode, setDevMode] = useState(false)
  const [activeBlock, setActiveBlock] = useState<string | null>(null)

  const statusSections: DashboardStatusSection[] =
    activeTab === "ORDER" ? mockOrderStatusSections : mockClaimStatusSections

  const tabItems = mockDashboardItems.filter((item) => item.tab === activeTab)
  const filteredItems = selectedStatus
    ? tabItems.filter((item) => item.detailStatus === selectedStatus)
    : tabItems

  let selectedStatusLabel: string | null = null
  if (selectedStatus) {
    outer: for (const section of statusSections) {
      for (const group of section.groups) {
        const found = group.subStates.find((s) => s.key === selectedStatus)
        if (found) {
          selectedStatusLabel = found.label
          break outer
        }
      }
    }
  }

  function handleTabChange(tab: OrderTab) {
    setActiveTab(tab)
    setSelectedStatus(null)
  }

  function handleStatusClick(key: string) {
    setSelectedStatus((prev) => (prev === key ? null : key))
  }

  function handleRefresh() {
    setIsRefreshing(true)
    setTimeout(() => {
      setUpdatedAt(new Date().toISOString())
      setIsRefreshing(false)
    }, 800)
  }

  // 현재 탭에 따라 StatusSummary가 가리키는 정책 섹션이 다름 (5.3 ORDER / 5.4 CLAIM)
  const statusSummarySection =
    activeTab === "ORDER"
      ? "5.3 Status Summary Area - ORDER 탭"
      : "5.4 Status Summary Area - CLAIM 탭"

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* 프로토타입 메인 영역 */}
      <Box sx={{ flex: 1, minWidth: 0, bgcolor: "grey.50", overflow: "auto" }}>

      {/* Breadcrumb */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 3,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: 14 }} />}
          sx={{ fontSize: 13 }}
        >
          <Link component={NextLink} href="/" color="text.secondary" underline="hover" fontSize={13}>
            Home
          </Link>
          <Link component={NextLink} href="/common" color="text.secondary" underline="hover" fontSize={13}>
            Common
          </Link>
          <Link component={NextLink} href="/common/oms" color="text.secondary" underline="hover" fontSize={13}>
            OMS
          </Link>
          <Typography color="text.primary" fontSize={13} fontWeight={500}>
            Order Dashboard
          </Typography>
        </Breadcrumbs>
        <ProtoUpdatedAt value={PROTO_UPDATED_AT} />
      </Box>

      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 3 }}>

        {/* 5.1 Page Header Area */}
        <DevModeWrapper
          name="DashboardHeader"
          filePath="features/order-dashboard/components/DashboardHeader.tsx"
          enabled={devMode}
          color="#7c3aed"
          notionBlock={`${NOTION_PAGE}||5.1 Page Header Area`}
          onNotionClick={setActiveBlock}
        >
          <DashboardHeader
            updatedAt={updatedAt}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </DevModeWrapper>

        {/* 5.2 Tab Area */}
        <DevModeWrapper
          name="DashboardTabs"
          filePath="features/order-dashboard/components/DashboardTabs.tsx"
          enabled={devMode}
          color="#b45309"
          notionBlock={`${NOTION_PAGE}||5.2 Tab Area`}
          onNotionClick={setActiveBlock}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2.5 }}>
            <DashboardTabs activeTab={activeTab} onChange={handleTabChange} />
          </Box>
        </DevModeWrapper>

        {/* 5.3 / 5.4 Status Summary Area (탭에 따라 달라짐) */}
        <DevModeWrapper
          name="StatusSummary"
          filePath="features/order-dashboard/components/StatusSummary.tsx"
          enabled={devMode}
          color="#0369a1"
          notionBlock={`${NOTION_PAGE}||${statusSummarySection}`}
          onNotionClick={setActiveBlock}
        >
          <StatusSummary
            sections={statusSections}
            selectedStatus={selectedStatus}
            onStatusClick={handleStatusClick}
          />
        </DevModeWrapper>

        {/* 5.5 Order List Table Area */}
        <DevModeWrapper
          name="OrderListTable"
          filePath="features/order-dashboard/components/OrderListTable.tsx"
          enabled={devMode}
          color="#047857"
          notionBlock={`${NOTION_PAGE}||5.5 Order List Table Area`}
          onNotionClick={setActiveBlock}
        >
          <OrderListTable
            items={filteredItems}
            activeTab={activeTab}
            selectedStatusLabel={selectedStatusLabel}
            selectedStatus={selectedStatus}
            onClearFilter={() => setSelectedStatus(null)}
          />
        </DevModeWrapper>

      </Box>

      <DevModeToggle enabled={devMode} onToggle={() => setDevMode((v) => !v)} />

      </Box>{/* end 프로토타입 메인 영역 */}

      {/* 정책서 사이드 패널 */}
      <NotionDrawer blockUrl={activeBlock} onClose={() => setActiveBlock(null)} />
    </Box>
  )
}
