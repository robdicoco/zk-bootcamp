"use client"

import { formatEther } from "viem"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Wallet } from "lucide-react"

interface ConnectWalletProps {
  account: string | null
  balance: bigint
  onConnect: () => void
  onDisconnect: () => void
}

export function ConnectWallet({ account, balance, onConnect, onDisconnect }: ConnectWalletProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        {account ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-sm text-gray-400">Connected Account: </span>
              <span className="text-sm font-medium break-all">{account}</span>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-gray-400">Token Balance: </span>
              <span className="text-2xl font-bold text-emerald-400">{formatEther(balance)} Tokens</span>
            </div>
            <Button 
              onClick={onDisconnect} 
              className="w-full bg-red-600 hover:bg-red-700"
              variant="destructive"
            >
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400">Connect your wallet to interact with the token</p>
            <Button onClick={onConnect} className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
