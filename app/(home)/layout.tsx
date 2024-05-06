import Sidebar from "@/components/sidebar"
import { ReactNode } from "react"

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-full w-full flex">
        <Sidebar/>
        <main className="bg-[#FFFFFF] flex-1 min-h-full">
            {children}
        </main>
    </div>
  )
}

export default layout
