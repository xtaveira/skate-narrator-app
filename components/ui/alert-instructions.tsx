import type React from "react"
import { AlertTriangle } from "lucide-react"

interface AlertInstructionsProps {
  title: string
  children: React.ReactNode
}

export function AlertInstructions({ title, children }: AlertInstructionsProps) {
  return (
    <div className="rounded-lg border bg-amber-50 border-amber-200 text-amber-900 p-4">
      <div className="flex items-center font-semibold mb-2">
        <AlertTriangle className="h-5 w-5 mr-2" />
        {title}
      </div>
      {children}
    </div>
  )
}
