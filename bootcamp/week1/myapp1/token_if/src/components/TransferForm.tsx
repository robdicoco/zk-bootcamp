"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface TransferFormProps {
  onTransfer: (to: string, amount: string) => void
}

export function TransferForm({ onTransfer }: TransferFormProps) {
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!to || !amount) return

    setIsLoading(true)
    try {
      await onTransfer(to, amount)
      setTo("")
      setAmount("")
    } catch (error) {
      console.error("Transfer error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>Transfer Tokens</CardTitle>
        <CardDescription>Send tokens to another address</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x..."
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-gray-900 border-gray-700"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.000000000000000001"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-900 border-gray-700"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Transfer Tokens
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
