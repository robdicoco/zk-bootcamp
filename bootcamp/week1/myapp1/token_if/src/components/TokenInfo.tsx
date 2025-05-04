import { formatEther } from "viem"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface TokenInfoProps {
  name: string
  symbol: string
  decimals: number
  totalSupply: bigint
}

export function TokenInfo({ name, symbol, decimals, totalSupply }: TokenInfoProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">Token Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-xl font-medium">{name || "Loading..."}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Symbol</p>
            <p className="text-xl font-medium">{symbol || "Loading..."}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Decimals</p>
            <p className="text-xl font-medium">{decimals || "Loading..."}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Total Supply</p>
            <p className="text-xl font-medium">{totalSupply ? formatEther(totalSupply) : "Loading..."}</p>
          </div>
          <div className="col-span-2 space-y-1">
            <p className="text-sm text-gray-400">Contract Address</p>
            <p className="text-sm font-medium break-all">0xc16b4f8c569212774ee2e8dc41ca2112cc1b8da7</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
