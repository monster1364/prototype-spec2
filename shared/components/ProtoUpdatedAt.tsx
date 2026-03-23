import { Typography } from "@mui/material"

interface Props {
  value: string
}

/** 브레드크럼 우측에 프로토타입 마지막 수정 시점을 표시합니다.
 *  각 page.tsx 상단에 PROTO_UPDATED_AT 상수를 선언하고 이 컴포넌트에 전달하세요.
 */
export default function ProtoUpdatedAt({ value }: Props) {
  return (
    <Typography fontSize={12} color="text.disabled" sx={{ whiteSpace: "nowrap" }}>
      Proto updated: {value}
    </Typography>
  )
}
