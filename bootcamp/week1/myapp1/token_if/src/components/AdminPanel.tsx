"use client"

import type React from "react"

import { useState } from "react"
import { createWalletClient, custom, parseEther } from "viem"
import { sepolia } from "viem/chains"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useToast } from "./ui/use-toast"
import { abi } from "../lib/abi"

interface AdminPanelProps {
  contractAddress: string
  account: string
  onActionComplete: () => void
}

export function AdminPanel({ contractAddress, account, onActionComplete }: AdminPanelProps) {
  const [mintAmount, setMintAmount] = useState("")
  const [burnAddress, setBurnAddress] = useState("")
  const [burnAmount, setBurnAmount] = useState("")
  const [blacklistAddress, setBlacklistAddress] = useState("")
  const [whitelistAddress, setWhitelistAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const executeContractWrite = async (functionName: string, args: any[] = [], successMessage: string) => {
    setIsLoading(true)

    try {
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      })

      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi,
        functionName,
        args,
        account,
      })

      toast({
        title: "Transaction Submitted",
        description: `Transaction has been submitted to the network.`,
      })

      // Wait for transaction to be mined
      const result = await new Promise((resolve, reject) => {
        const checkReceipt = async () => {
          try {
            const receipt = await walletClient.transport.request({
              method: "eth_getTransactionReceipt",
              params: [hash],
            })

            if (receipt) {
              resolve(receipt.status === "0x1")
            } else {
              setTimeout(checkReceipt, 2000)
            }
          } catch (error) {
            reject(error)
          }
        }

        checkReceipt()
      })

      if (result) {
        toast({
          title: "Success",
          description: successMessage,
        })

        onActionComplete()
      } else {
        toast({
          variant: "destructive",
          title: "Transaction Failed",
          description: "The transaction failed to execute.",
        })
      }
    } catch (error) {
      console.error("Contract write error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mintAmount) return

    await executeContractWrite("mint", [parseEther(mintAmount)], `Successfully minted ${mintAmount} tokens`)

    setMintAmount("")
  }

  const handleBurn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!burnAddress || !burnAmount) return

    await executeContractWrite(
      "burn",
      [burnAddress, parseEther(burnAmount)],
      `Successfully burned ${burnAmount} tokens from ${burnAddress}`,
    )

    setBurnAddress("")
    setBurnAmount("")
  }

  const handleBlacklist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!blacklistAddress) return

    await executeContractWrite("blacklist", [blacklistAddress], `Successfully blacklisted ${blacklistAddress}`)

    setBlacklistAddress("")
  }

  const handleWhitelist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!whitelistAddress) return

    await executeContractWrite("whitelist", [whitelistAddress], `Successfully whitelisted ${whitelistAddress}`)

    setWhitelistAddress("")
  }

  const handlePause = async () => {
    await executeContractWrite("pause", [], "Successfully paused the contract")
  }

  const handleUnpause = async () => {
    await executeContractWrite("unpause", [], "Successfully unpaused the contract")
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>Admin Panel</CardTitle>
        <CardDescription>Manage your token as the contract owner</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mint" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900">
            <TabsTrigger value="mint">Mint/Burn</TabsTrigger>
            <TabsTrigger value="lists">Lists</TabsTrigger>
            <TabsTrigger value="pause">Pause</TabsTrigger>
          </TabsList>

          <TabsContent value="mint" className="space-y-4">
            <form onSubmit={handleMint} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mint-amount">Mint Amount</Label>
                <Input
                  id="mint-amount"
                  type="number"
                  step="0.000000000000000001"
                  placeholder="0.0"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  className="bg-gray-900 border-gray-700"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                {isLoading ? "Processing..." : "Mint Tokens"}
              </Button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-800 px-2 text-sm text-gray-400">OR</span>
              </div>
            </div>

            <form onSubmit={handleBurn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="burn-address">Burn From Address</Label>
                <Input
                  id="burn-address"
                  placeholder="0x..."
                  value={burnAddress}
                  onChange={(e) => setBurnAddress(e.target.value)}
                  className="bg-gray-900 border-gray-700"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="burn-amount">Burn Amount</Label>
                <Input
                  id="burn-amount"
                  type="number"
                  step="0.000000000000000001"
                  placeholder="0.0"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="bg-gray-900 border-gray-700"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Processing..." : "Burn Tokens"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="lists" className="space-y-4">
            <form onSubmit={handleBlacklist} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blacklist-address">Blacklist Address</Label>
                <Input
                  id="blacklist-address"
                  placeholder="0x..."
                  value={blacklistAddress}
                  onChange={(e) => setBlacklistAddress(e.target.value)}
                  className="bg-gray-900 border-gray-700"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Processing..." : "Blacklist Address"}
              </Button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-800 px-2 text-sm text-gray-400">OR</span>
              </div>
            </div>

            <form onSubmit={handleWhitelist} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whitelist-address">Whitelist Address</Label>
                <Input
                  id="whitelist-address"
                  placeholder="0x..."
                  value={whitelistAddress}
                  onChange={(e) => setWhitelistAddress(e.target.value)}
                  className="bg-gray-900 border-gray-700"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                {isLoading ? "Processing..." : "Whitelist Address"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="pause" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handlePause} className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Processing..." : "Pause Contract"}
              </Button>
              <Button
                onClick={handleUnpause}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Unpause Contract"}
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Pausing the contract will prevent all transfers, approvals, and other operations until it is unpaused.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
