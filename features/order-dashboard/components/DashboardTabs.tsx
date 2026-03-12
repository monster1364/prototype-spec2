"use client"

import { Tab, Tabs } from "@mui/material"
import type { OrderTab } from "../models/types"

interface Props {
  activeTab: OrderTab
  onChange: (tab: OrderTab) => void
}

export function DashboardTabs({ activeTab, onChange }: Props) {
  return (
    <Tabs
      value={activeTab}
      onChange={(_, v) => onChange(v)}
      sx={{ minHeight: 40, "& .MuiTab-root": { minHeight: 40, py: 0, fontWeight: 600 } }}
    >
      <Tab label="ORDER" value="ORDER" />
      <Tab label="CLAIM" value="CLAIM" />
    </Tabs>
  )
}
