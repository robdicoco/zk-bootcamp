"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface ApproveFormProps {
  onApprove: (spender: string, amount: string) => void
}

export function ApproveForm({ onApprove }: ApproveFormProps) {
  const [spender, setSpender] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!spender || !amount) return

    setIsLoading(true)
    try {
      await onApprove(spender, amount)
      setSpender("")
      setAmount("")
    } catch (error) {
      console.error("Approval error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>Approve Tokens</CardTitle>
        <CardDescription>Allow another address to spend tokens on your behalf</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="spender">Spender Address</Label>
            <Input
              id="spender"
              placeholder="0x..."
              value={spender}
              onChange={(e) => setSpender(e.target.value)}
              className="bg-gray-900 border-gray-700"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="approve-amount">Amount</Label>
            <Input
              id="approve-amount"
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
                <Check className="mr-2 h-4 w-4" />
                Approve Tokens
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
