"use client"

import { useState } from "react"
import NextLink from "next/link"
import { Box, Breadcrumbs, Link, Tab, Tabs, Typography } from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import {
  DashboardHeader,
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
import MdDrawer from "@/components/MdDrawer"

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

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Breadcrumb */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 3,
          py: 1.5,
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: 14 }} />}
          sx={{ fontSize: 13 }}
        >
          <Link component={NextLink} href="/" color="text.secondary" underline="hover" fontSize={13}>
            Home
          </Link>
          <Link
            component={NextLink}
            href="/common"
            color="text.secondary"
            underline="hover"
            fontSize={13}
          >
            Common
          </Link>
          <Link
            component={NextLink}
            href="/common/oms"
            color="text.secondary"
            underline="hover"
            fontSize={13}
          >
            OMS
          </Link>
          <Typography color="text.primary" fontSize={13} fontWeight={500}>
            Order Dashboard
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 3 }}>
        {/* Header */}
        <DevModeWrapper
          name="DashboardHeader"
          filePath="features/order-dashboard/components/DashboardHeader.tsx"
          enabled={devMode}
          color="#7c3aed"
          specFile="common/oms/dashboard#5.1 Page Header Area"
          onSpecClick={setActiveBlock}
        >
          <DashboardHeader
            updatedAt={updatedAt}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </DevModeWrapper>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2.5 }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => handleTabChange(v)}
            sx={{ minHeight: 40, "& .MuiTab-root": { minHeight: 40, py: 0, fontWeight: 600 } }}
          >
            <Tab label="ORDER" value="ORDER" />
            <Tab label="CLAIM" value="CLAIM" />
          </Tabs>
        </Box>

        {/* Status Summary */}
        <DevModeWrapper
          name="StatusSummary"
          filePath="features/order-dashboard/components/StatusSummary.tsx"
          enabled={devMode}
          color="#0369a1"
          specFile="common/oms/dashboard#5.3 Status Summary Area"
          onSpecClick={setActiveBlock}
        >
          <StatusSummary
            sections={statusSections}
            selectedStatus={selectedStatus}
            onStatusClick={handleStatusClick}
          />
        </DevModeWrapper>

        {/* Order List Table */}
        <DevModeWrapper
          name="OrderListTable"
          filePath="features/order-dashboard/components/OrderListTable.tsx"
          enabled={devMode}
          color="#047857"
          specFile="common/oms/dashboard#5.5 Order List Table Area"
          onSpecClick={setActiveBlock}
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
      <MdDrawer specFile={activeBlock} onClose={() => setActiveBlock(null)} />
    </Box>
  )
}
