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
        <a 
              href="https://sepolia.etherscan.io/address/0x1949b0d792ed35dd04eb540b5571d20fb698d566"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary font-semibold text-sm break-all hover:text-primary transition-colors"
            ><span className="status-badge secure">Verified Contract</span></a>
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
            <a 
              href="https://sepolia.etherscan.io/address/0x1949b0d792ed35dd04eb540b5571d20fb698d566"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary font-semibold text-sm break-all hover:text-primary transition-colors"
            >
              0x1949b0d792ed35dd04eb540b5571d20fb698d566
            </a>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-text-secondary">Add to Wallet: </span>
            <button
              onClick={() => {
                if (window.ethereum) {
                  window.ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                      type: 'ERC20',
                      options: {
                        address: '0x1949b0d792ed35dd04eb540b5571d20fb698d566',
                        symbol: 'CPGO',
                        decimals: 18,
                        image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1949b0d792ed35dd04eb540b5571d20fb698d566/logo.png'
                      },
                    },
                  })
                }
              }}
              className="text-text-primary font-semibold text-sm hover:text-primary transition-colors"
            >
              Add Token
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
