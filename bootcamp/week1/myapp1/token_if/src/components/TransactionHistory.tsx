import { formatDistanceToNow } from "date-fns"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface Transaction {
  hash: string
  type: string
  timestamp: number
  to?: string
  spender?: string
  amount?: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-400">No transactions yet</p>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{tx.type}</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400">
                        {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {tx.to && <p>To: {shortenAddress(tx.to)}</p>}
                      {tx.spender && <p>Spender: {shortenAddress(tx.spender)}</p>}
                      {tx.amount && <p>Amount: {tx.amount}</p>}
                    </div>
                  </div>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function shortenAddress(address: string): string {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}
