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
    <Card className="bg-dark-surface border-dark-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-text-primary">Token Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-dark-border">
            <span className="text-text-secondary">Name: </span>
            <span className="text-text-primary font-semibold">{name || "Loading..."}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-dark-border">
            <span className="text-text-secondary">Symbol: </span>
            <span className="text-text-primary font-semibold">{symbol || "Loading..."}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-dark-border">
            <span className="text-text-secondary">Decimals: </span>
            <span className="text-text-primary font-semibold">{decimals || "Loading..."}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-dark-border">
            <span className="text-text-secondary">Total Supply: </span>
            <span className="text-text-primary font-semibold">{totalSupply ? formatEther(totalSupply) : "Loading..."}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-text-secondary">Contract Address: </span>
            <span className="text-text-primary font-semibold text-sm break-all">0xc16b4f8c569212774ee2e8dc41ca2112cc1b8da7</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
