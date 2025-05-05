"use client"

import { useState, useEffect, useCallback, useRef } from "react"
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

const CONTRACT_ADDRESS = "0x1949b0d792ed35dd04eb540b5571d20fb698d566"
const rpcUrl = import.meta.env.VITE_RPC_URL;
const CACHE_DURATION = 60000; // 1 minute cache
const DEBOUNCE_DELAY = 1000; // 1 second debounce

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

  // Cache and debounce refs
  const tokenInfoCache = useRef<{ data: any; timestamp: number } | null>(null)
  const balanceTimeoutRef = useRef<NodeJS.Timeout>()
  const lastBalanceUpdate = useRef<number>(0)

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
  })

  // Debounced balance fetch
  const debouncedFetchBalance = useCallback((address: string) => {
    const now = Date.now()
    if (now - lastBalanceUpdate.current < DEBOUNCE_DELAY) {
      if (balanceTimeoutRef.current) {
        clearTimeout(balanceTimeoutRef.current)
      }
      balanceTimeoutRef.current = setTimeout(() => {
        fetchBalance(address)
      }, DEBOUNCE_DELAY)
      return
    }
    fetchBalance(address)
    lastBalanceUpdate.current = now
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const userAccount = accounts[0] as `0x${string}`
        setAccount(userAccount)

        // Batch owner check and balance fetch
        const [owner, balance] = await Promise.all([
          publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "owner",
          }) as Promise<`0x${string}`>,
          publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "balanceOf",
            args: [userAccount],
          })
        ])

        setIsOwner(userAccount.toLowerCase() === owner.toLowerCase())
        setBalance(balance as bigint)
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

  const disconnectWallet = async () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      try {
        // Optional: Revoke permissions for this dApp
        await window.ethereum.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }], // Revoke account access
        })
      } catch (error) {
        console.warn("Failed to revoke wallet permissions:", error)
        // Non-critical failure; continue with local state cleanup
      }
    }
  
    // Clear frontend state
    setAccount(null)
    setIsOwner(false)
    setBalance(BigInt(0))
  
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected. You may need to re-authorize access when reconnecting.",
    })
  }

  const fetchTokenInfo = async () => {
    // Check cache first
    const now = Date.now()
    if (tokenInfoCache.current && now - tokenInfoCache.current.timestamp < CACHE_DURATION) {
      setTokenInfo(tokenInfoCache.current.data)
      return
    }

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

      const newTokenInfo = {
        name: name as string,
        symbol: symbol as string,
        decimals: decimals as number,
        totalSupply: totalSupply as bigint,
      }

      // Update cache
      tokenInfoCache.current = {
        data: newTokenInfo,
        timestamp: now,
      }

      setTokenInfo(newTokenInfo)
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
        account: account as `0x${string}`,
      })

      toast({
        title: "Transaction Submitted",
        description: `Transfer of ${amount} tokens initiated.`,
      })

      setTransactions((prev) => [{ hash, type: "Transfer", to, amount, timestamp: Date.now() }, ...prev])

      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status === "success") {
        toast({
          title: "Transfer Successful",
          description: `Successfully transferred ${amount} tokens to ${to.substring(0, 6)}...${to.substring(to.length - 4)}`,
        })

        // Use debounced balance update
        debouncedFetchBalance(account)
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
        account: account as `0x${string}`,
      })

      toast({
        title: "Approval Submitted",
        description: `Approval of ${amount} tokens initiated.`,
      })

      setTransactions((prev) => [{ hash, type: "Approve", spender, amount, timestamp: Date.now() }, ...prev])

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

    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0])
            // Use debounced balance fetch
            debouncedFetchBalance(accounts[0])

            // Check if connected account is the owner
            publicClient
              .readContract({
                address: CONTRACT_ADDRESS,
                abi,
                functionName: "owner",
              })
              .then((owner) => {
                setIsOwner(accounts[0].toLowerCase() === (owner as `0x${string}`).toLowerCase())
              })
          }
        })
    }

    // Cleanup
    return () => {
      if (balanceTimeoutRef.current) {
        clearTimeout(balanceTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="secure-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Token Information</h2>
                <span className="status-badge secure">Verified Contract</span>
              </div>
              <TokenInfo
                name={tokenInfo.name}
                symbol={tokenInfo.symbol}
                decimals={tokenInfo.decimals}
                totalSupply={tokenInfo.totalSupply}
              />
            </div>
          </div>
          <div>
            <div className="secure-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Wallet Status</h2>
                {account && <span className="status-badge secure">Connected</span>}
              </div>
              <ConnectWallet 
                account={account} 
                balance={balance} 
                onConnect={connectWallet}
                onDisconnect={disconnectWallet}
              />
            </div>
          </div>
        </div>

        {account ? (
          <div className="secure-card p-8">
            <Tabs defaultValue="transfer" className="w-full">
              <TabsList className="flex space-x-4 border-b border-dark-border mb-8">
                <TabsTrigger value="transfer" className="secure-tab">
                  Transfer
                </TabsTrigger>
                <TabsTrigger value="approve" className="secure-tab">
                  Approve
                </TabsTrigger>
                {isOwner && (
                  <TabsTrigger value="admin" className="secure-tab">
                    Admin
                  </TabsTrigger>
                )}
              </TabsList>
              <div className="mt-8">
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
              </div>
            </Tabs>
          </div>
        ) : (
          <div className="secure-card p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center max-w-[48px] max-h-[48px]" >
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" width="36x" height="36px" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Secure Token Management</h2>
              <p className="text-text-secondary mb-8">Connect your wallet to access secure token management features</p>
              <button
                onClick={connectWallet}
                className="secure-button"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}

        {account && transactions.length > 0 && (
          <div className="mt-12">
            <div className="secure-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Transaction History</h2>
                <span className="text-text-secondary text-sm">Last 24 hours</span>
              </div>
              <TransactionHistory transactions={transactions} />
            </div>
          </div>
        )}
      </main>

      <Toaster />
    </div>
  )
}

export default App
