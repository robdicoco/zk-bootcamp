# Token Management dApp

Welcome to the **Token Management dApp** – a project built as part of a blockchain bootcamp/hackathon! This application lets you interact with an ERC-20 token on the Sepolia testnet, manage your wallet, transfer tokens, approve spenders, and perform admin actions if you are the contract owner.

## 🚀 Project Overview
This dApp demonstrates secure, modern, and user-friendly token management. It is designed for learning, experimentation, and as a foundation for more advanced blockchain projects.

## ✨ Features
- **Wallet Connect/Disconnect**: Connect your Ethereum wallet (MetaMask or compatible) and manage your session securely.
- **Token Info**: View token name, symbol, decimals, and total supply.
- **Balance Display**: See your current token balance instantly.
- **Transfer Tokens**: Send tokens to other addresses.
- **Approve Spenders**: Allow others to spend tokens on your behalf.
- **Admin Panel**: (Owner only) Mint, burn, blacklist, whitelist, pause/unpause the contract.
- **Transaction History**: Track your recent actions.
- **Modern UI/UX**: High-contrast dark theme, glassmorphism, and responsive design.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Vite
- **Blockchain**: viem, Sepolia testnet
- **UI**: Tailwind CSS, Lucide Icons

## 🏗️ Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MetaMask or another Ethereum wallet extension

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/zk-bootcamp.git
   cd zk-bootcamp/bootcamp/week1/myapp1/token_if
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment:**
   - Copy `.env.example` to `.env` and set your Sepolia RPC URL:
     ```env
     VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
     ```
4. **Run the app:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## 🧑‍💻 Usage
- Connect your wallet using the button.
- View your balance and token info.
- Transfer or approve tokens.
- If you are the contract owner, use the Admin Panel for advanced actions.
- Disconnect your wallet at any time for security.

## 🤝 Contributing
Contributions are welcome! Feel free to fork, submit issues, or open pull requests to improve the project or add new features.

## 📄 License
This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---
Happy hacking and learning! 🚀 