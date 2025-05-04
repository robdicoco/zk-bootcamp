import { Coins } from "lucide-react"

export function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="h-8 w-8 text-emerald-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Token Playground
            </h1>
          </div>
          <div>
            <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Sepolia Network
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
