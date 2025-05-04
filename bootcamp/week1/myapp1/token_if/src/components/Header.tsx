import { Shield, Lock } from "lucide-react"

export function Header() {
  return (
    <header className="py-6 mb-8 border-b border-dark-border">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 font-semibold flex items-center justify-center" >
              <h1 className="text-2xl font-semibold text-text-primary">Token Management <Shield className="w-6 h-6 text-primary" /></h1>
              {/* <p className="text-sm text-text-secondary">Secure Token Operations</p> */}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              <span className="status-badge secure">
                <Lock className="w-4 h-4 mr-2" />
                Secure Connection
              </span>
              <span className="text-text-secondary text-sm">Sepolia Network</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
