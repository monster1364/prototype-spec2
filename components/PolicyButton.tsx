'use client'

interface PolicyButtonProps {
  specFile: string  // e.g. "common/oms/dashboard"
  onClick: (specFile: string) => void
}

export default function PolicyButton({ specFile, onClick }: PolicyButtonProps) {
  return (
    <button
      onClick={() => onClick(specFile)}
      title="정책서 보기"
      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600 text-xs font-bold transition-colors border border-gray-200 hover:border-blue-300 ml-1.5 flex-shrink-0"
    >
      ?
    </button>
  )
}
