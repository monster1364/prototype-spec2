"use client"

import { useState } from "react"
import NextLink from "next/link"
import { Box, Breadcrumbs, Link, Typography } from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import {
  OrderListFilter,
  OrderListToolbar,
  OrderListTable,
  type FilterState,
  defaultFilterState,
} from "@/features/order-list"
import { mockOrderListItems, type OrderListItem } from "@/mock-data"
import ProtoUpdatedAt from "@/shared/components/ProtoUpdatedAt"

const NOTION_PAGE = "https://www.notion.so/OMS-Order-list-321dd803772980388729e836f5d33ffe"
const PROTO_UPDATED_AT = "2026-03-12 23:30"

function parseOrderDate(dateStr: string): Date {
  // "2026.03.12 09:32:11" → Date
  return new Date(dateStr.replace(/\./g, "-").replace(" ", "T"))
}

function applyFilters(items: OrderListItem[], filters: FilterState): OrderListItem[] {
  return items.filter((item) => {
    // Keyword search
    if (filters.searchKeyword) {
      const kw = filters.searchKeyword.toLowerCase()
      const target = (() => {
        switch (filters.searchType) {
          case "orderId":      return item.orderId.toLowerCase()
          case "ordererName":  return item.ordererName?.toLowerCase() ?? ""
          case "ordererEmail": return item.ordererEmail.toLowerCase()
          case "ordererPhone": return item.ordererPhone?.toLowerCase() ?? ""
        }
      })()
      if (!target.includes(kw)) return false
    }

    // Order status
    if (filters.orderStatuses.length > 0 && !filters.orderStatuses.includes(item.status)) {
      return false
    }

    // Shipping status
    if (filters.shippingStatuses.length > 0) {
      const hasMatch = item.shippingStatuses.some((s) =>
        filters.shippingStatuses.includes(s)
      )
      if (!hasMatch) return false
    }

    // Channel
    if (filters.channels.length > 0 && !filters.channels.includes(item.channel)) {
      return false
    }

    // Date range
    const orderDate = parseOrderDate(item.orderDate)
    const start = new Date(filters.startDate)
    const end = new Date(filters.endDate + "T23:59:59")
    if (orderDate < start || orderDate > end) return false

    return true
  })
}

export default function OrderListPage() {
  const [filterInput, setFilterInput] = useState<FilterState>(defaultFilterState)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(() => {
    // Default: today's date range — show all items for demo
    const f = defaultFilterState()
    f.startDate = "2026-03-01"
    f.endDate = "2026-03-31"
    return f
  })
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [updatedAt, setUpdatedAt] = useState(() =>
    new Date().toLocaleString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  )
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isError, setIsError] = useState(false)

  const filteredItems = applyFilters(mockOrderListItems, appliedFilters)

  function handleSearch() {
    setAppliedFilters({ ...filterInput })
    setSelectedIds([])
  }

  function handleReset() {
    const fresh = defaultFilterState()
    // Keep a wider range for demo
    fresh.startDate = "2026-03-01"
    fresh.endDate = "2026-03-31"
    setFilterInput(fresh)
    setAppliedFilters(fresh)
    setSelectedIds([])
  }

  function handleRefresh() {
    setIsRefreshing(true)
    setIsError(false)
    setTimeout(() => {
      setUpdatedAt(
        new Date().toLocaleString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      )
      setIsRefreshing(false)
    }, 800)
  }

  function handleBulkCancel() {
    // prototype: alert only
    alert(`선택된 ${selectedIds.length}건을 취소 처리합니다. (프로토타입)`)
    setSelectedIds([])
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F8F9FA" }}>
      {/* Breadcrumb */}
      <Box
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 3,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link component={NextLink} href="/common/oms" underline="hover" fontSize={13} color="text.secondary">
            OMS
          </Link>
          <Link component={NextLink} href="/common/oms/integrated-order/order-list" underline="hover" fontSize={13} color="text.secondary">
            Integrated Order
          </Link>
          <Typography fontSize={13} color="text.primary" fontWeight={500}>
            Order List
          </Typography>
        </Breadcrumbs>
        <ProtoUpdatedAt value={PROTO_UPDATED_AT} />
      </Box>

      {/* Main Content */}
      <Box sx={{ px: 3, py: 2.5, maxWidth: 1600 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Order List
        </Typography>

        {/* Filter */}
        <OrderListFilter
          filters={filterInput}
          onChange={setFilterInput}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {/* Toolbar */}
        <OrderListToolbar
          totalCount={filteredItems.length}
          updatedAt={updatedAt}
          selectedCount={selectedIds.length}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onBulkCancel={handleBulkCancel}
        />

        {/* Table */}
        <Box sx={{ height: "calc(100vh - 320px)", minHeight: 400 }}>
          <OrderListTable
            items={filteredItems}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            isLoading={isRefreshing}
            isError={isError}
            onRetry={handleRefresh}
          />
        </Box>
      </Box>
    </Box>
  )
}
