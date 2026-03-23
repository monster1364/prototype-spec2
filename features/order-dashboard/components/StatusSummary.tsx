"use client"

import { alpha, Box, Divider, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import type { DashboardStatusSection } from "../models/types"
import { getSubStateCountColor, groupTotal } from "../modules/utils"

interface Props {
  sections: DashboardStatusSection[]
  selectedStatus: string | null
  onStatusClick: (key: string) => void
  isLoading?: boolean
  isError?: boolean
}

export function StatusSummary({ sections, selectedStatus, onStatusClick, isLoading, isError }: Props) {
  return (
    <Grid container spacing={2} mb={2.5}>
      {sections.map((section) => (
        <Grid size={4} key={section.sectionTitle}>
          <Paper
            variant="outlined"
            sx={{ overflow: "hidden", borderRadius: 1.5, height: "100%" }}
          >
            {/* Section header */}
            <Box
              sx={{
                px: 2,
                py: 1.25,
                bgcolor: "grey.50",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle2" fontWeight={700} fontSize={13}>
                {section.sectionTitle}
              </Typography>
            </Box>

            {/* Error state */}
            {isError && (
              <Stack alignItems="center" justifyContent="center" spacing={0.5} sx={{ py: 3, px: 2 }}>
                <ErrorOutlineIcon sx={{ fontSize: 20, color: "error.main" }} />
                <Typography variant="caption" color="text.secondary" textAlign="center">
                  Failed to load status data.
                </Typography>
              </Stack>
            )}

            {/* Groups */}
            {!isError && section.groups.map((group, idx) => (
              <Box key={group.groupLabel}>
                {idx > 0 && <Divider />}
                <Box sx={{ px: 2, py: 1.5 }}>
                  {/* Group header */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={0.75}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        fontWeight: 700,
                        color: "text.secondary",
                        fontSize: 10,
                      }}
                    >
                      {group.groupLabel}
                      {group.isFinalized && (
                        <Box
                          component="span"
                          sx={{
                            ml: 0.5,
                            textTransform: "none",
                            fontWeight: 400,
                            letterSpacing: 0,
                            fontSize: 10,
                          }}
                        >
                          · last 30 days
                        </Box>
                      )}
                    </Typography>
                    {isLoading ? (
                      <Skeleton width={24} height={16} />
                    ) : (
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ fontVariantNumeric: "tabular-nums", fontSize: 11 }}
                      >
                        {groupTotal(group.subStates).toLocaleString()}
                      </Typography>
                    )}
                  </Stack>

                  {/* Sub-state rows */}
                  <Stack spacing={0.25}>
                    {group.subStates.map((sub) => {
                      const isSelected = selectedStatus === sub.key
                      return (
                        <Box
                          key={sub.key}
                          component="button"
                          onClick={() => !isLoading && onStatusClick(sub.key)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 1,
                            py: 0.75,
                            borderRadius: 1,
                            border: "none",
                            cursor: isLoading ? "default" : "pointer",
                            bgcolor: isSelected
                              ? (theme) => alpha(theme.palette.primary.main, 0.08)
                              : "transparent",
                            outline: isSelected
                              ? (theme) =>
                                  `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                              : "none",
                            "&:hover": {
                              bgcolor: isLoading ? "transparent" : isSelected
                                ? (theme) => alpha(theme.palette.primary.main, 0.12)
                                : "grey.100",
                            },
                            transition: "background-color 0.12s",
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontSize={13}
                            fontWeight={isSelected ? 600 : 400}
                            color={isSelected ? "primary.main" : "text.primary"}
                          >
                            {sub.label}
                          </Typography>
                          {isLoading ? (
                            <Skeleton width={20} height={16} />
                          ) : (
                            <Typography
                              variant="body2"
                              fontSize={13}
                              fontWeight={isSelected ? 700 : 600}
                              sx={{
                                fontVariantNumeric: "tabular-nums",
                                color: isSelected
                                  ? "primary.main"
                                  : getSubStateCountColor(group.groupLabel, sub.label),
                              }}
                            >
                              {sub.count.toLocaleString()}
                            </Typography>
                          )}
                        </Box>
                      )
                    })}
                  </Stack>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
