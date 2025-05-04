"use client"

import { useState, useEffect } from "react"
import { createPublicClient, http, createWalletClient, custom, parseEther } from "viem"
import { sepolia } from "viem/chains"
import { Header } from "./components/Header"
import { TokenInfo } from "./components/TokenInfo"
import { ConnectWallet } from "./components/ConnectWallet"
import { TransferForm } from "./components/TransferForm"
import { ApproveForm } from "./components/ApproveForm"
import { AdminPanel } from "./components/AdminPanel"
import { TransactionHistory } from "./components/TransactionHistory"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Toaster } from "./components/ui/toaster"
import { useToast } from "./components/ui/use-toast"
import { abi } from "./lib/abi"
import "./App.css"

const CONTRACT_ADDRESS = "0xc16b4f8c569212774ee2e8dc41ca2112cc1b8da7"

function App() {
  const [account, setAccount] = useState<string | null>(null)
  const [isOwner, setIsOwner] = useState(false)
  const [tokenInfo, setTokenInfo] = useState({
    name: "",
    symbol: "",
    decimals: 0,
    totalSupply: BigInt(0),
  })
  const [balance, setBalance] = useState(BigInt(0))
  const [transactions, setTransactions] = useState<any[]>([])
  const { toast } = useToast()

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  })

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAccount(accounts[0])

        // Check if connected account is the owner
        const owner = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: "owner",
        })

        setIsOwner(accounts[0].toLowerCase() === owner.toLowerCase())

        // Get user balance
        fetchBalance(accounts[0])
      } catch (error) {
        console.error("Error connecting to wallet:", error)
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: "Failed to connect to your wallet.",
        })
      }
    } else {
      toast({
        variant: "destructive",
        title: "Wallet Not Found",
        description: "Please install MetaMask or another Ethereum wallet.",
      })
    }
  }

  const fetchTokenInfo = async () => {
    try {
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: "name",
        }),
        publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: "symbol",
        }),
        publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: "decimals",
        }),
        publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: "totalSupply",
        }),
      ])

      setTokenInfo({
        name: name as string,
        symbol: symbol as string,
        decimals: decimals as number,
        totalSupply: totalSupply as bigint,
      })
    } catch (error) {
      console.error("Error fetching token info:", error)
    }
  }

  const fetchBalance = async (address: string) => {
    try {
      const balance = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "balanceOf",
        args: [address],
      })

      setBalance(balance as bigint)
    } catch (error) {
      console.error("Error fetching balance:", error)
    }
  }

  const transferTokens = async (to: string, amount: string) => {
    if (!account) return

    try {
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      })

      const parsedAmount = parseEther(amount)

      const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "transfer",
        args: [to, parsedAmount],
        account,
      })

      toast({
        title: "Transaction Submitted",
        description: `Transfer of ${amount} tokens initiated.`,
      })

      // Add to transaction history
      setTransactions((prev) => [{ hash, type: "Transfer", to, amount, timestamp: Date.now() }, ...prev])

      // Wait for transaction to be mined
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === "success") {
        toast({
          title: "Transfer Successful",
          description: `Successfully transferred ${amount} tokens to ${to.substring(0, 6)}...${to.substring(to.length - 4)}`,
        })

        // Refresh balance
        fetchBalance(account)
      } else {
        toast({
          variant: "destructive",
          title: "Transfer Failed",
          description: "The transfer transaction failed.",
        })
      }
    } catch (error) {
      console.error("Error transferring tokens:", error)
      toast({
        variant: "destructive",
        title: "Transfer Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    }
  }

  const approveTokens = async (spender: string, amount: string) => {
    if (!account) return

    try {
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      })

      const parsedAmount = parseEther(amount)

      const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "approve",
        args: [spender, parsedAmount],
        account,
      })

      toast({
        title: "Approval Submitted",
        description: `Approval of ${amount} tokens initiated.`,
      })

      // Add to transaction history
      setTransactions((prev) => [{ hash, type: "Approve", spender, amount, timestamp: Date.now() }, ...prev])

      // Wait for transaction to be mined
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === "success") {
        toast({
          title: "Approval Successful",
          description: `Successfully approved ${amount} tokens to ${spender.substring(0, 6)}...${spender.substring(spender.length - 4)}`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Approval Failed",
          description: "The approval transaction failed.",
        })
      }
    } catch (error) {
      console.error("Error approving tokens:", error)
      toast({
        variant: "destructive",
        title: "Approval Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    }
  }

  useEffect(() => {
    fetchTokenInfo()

    // Check if already connected
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0])
            fetchBalance(accounts[0])

            // Check if connected account is the owner
            publicClient
              .readContract({
                address: CONTRACT_ADDRESS,
                abi,
                functionName: "owner",
              })
              .then((owner) => {
                setIsOwner(accounts[0].toLowerCase() === (owner as string).toLowerCase())
              })
          }
        })
        .catch(console.error)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <TokenInfo
              name={tokenInfo.name}
              symbol={tokenInfo.symbol}
              decimals={tokenInfo.decimals}
              totalSupply={tokenInfo.totalSupply}
            />
          </div>
          <div>
            <ConnectWallet account={account} balance={balance} onConnect={connectWallet} />
          </div>
        </div>

        {account ? (
          <Tabs defaultValue="transfer" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
              <TabsTrigger value="approve">Approve</TabsTrigger>
              {isOwner && <TabsTrigger value="admin">Admin</TabsTrigger>}
            </TabsList>
            <TabsContent value="transfer">
              <TransferForm onTransfer={transferTokens} />
            </TabsContent>
            <TabsContent value="approve">
              <ApproveForm onApprove={approveTokens} />
            </TabsContent>
            {isOwner && (
              <TabsContent value="admin">
                <AdminPanel
                  contractAddress={CONTRACT_ADDRESS}
                  account={account}
                  onActionComplete={() => {
                    fetchTokenInfo()
                    fetchBalance(account)
                  }}
                />
              </TabsContent>
            )}
          </Tabs>
        ) : (
          <div className="text-center p-8 bg-gray-800 rounded-lg">
            <p className="text-xl">Connect your wallet to interact with the token</p>
          </div>
        )}

        {account && transactions.length > 0 && (
          <div className="mt-8">
            <TransactionHistory transactions={transactions} />
          </div>
        )}
      </main>

      <Toaster />
    </div>
  )
}

export default App
