# 🎓 Aula 3: **JavaScript para Web3**

📅 **Data:** 30/04  
👨‍🏫 **Professor:** Lucas Oliveira  
📍 **Plataforma:** YouTube  
⏱ **Duração:** 1 hora

---

## 🎬 **[00:00 – 05:00] – Abertura e visão geral**

- Relembrar aula anterior (Solidity/Foundry)
- Explicar a ponte frontend ↔ smart contract: o que é necessário?
- Objetivo da aula: conectar um projeto React com um contrato via Metamask, fazer transações e exibir dados on-chain
- Mostrar roadmap da aula

---

## 🔌 **[05:00 – 15:00] – Fundamentos da conexão Web3 com JavaScript**

- O que são **providers** (ex: Metamask, Alchemy, Infura)
- O que são **signers** e transações
- Diferença entre **leitura** (call) e **escrita** (send)
- Introdução a **ethers.js** (ou opcionalmente viem)

```bash
npm install ethers
```

- Exemplo básico:

```js
import { ethers } from "ethers";
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
```

> Mostrar no console como conectar e pegar o `signer.address`

---

## 🦊 **[15:00 – 25:00] – Autenticação via Metamask**

- Como funciona a conexão com Metamask
- Como pedir permissão de uso da carteira:

```js
await window.ethereum.request({ method: "eth_requestAccounts" });
```

- Como assinar uma mensagem (autenticação Web3):

```js
const signature = await signer.signMessage("Login via Web3");
```

- Explicar a importância da assinatura: "prova de que você controla a wallet"

> Mostrar isso no navegador ao vivo

---

## 💻 **[25:00 – 40:00] – Projeto React com contrato existente**

- Setup básico de React + ethers:

```bash
npx create-react-app web3-dapp
cd web3-dapp
npm install ethers
```

- Integrar com um contrato ERC20 existente (exibir saldo):

```js
const contract = new ethers.Contract(contractAddress, abi, signer);
const balance = await contract.balanceOf(userAddress);
```

> Exibir dados na tela com hooks: `useEffect`, `useState`

- Mostrar como separar lógica Web3 em um `web3.js` ou `hooks/useWeb3`

---

## 📡 **[40:00 – 50:00] – Exibindo dados on-chain e enviando transações**

- Exibir nome, símbolo e saldo de token
- Enviar uma transferência:

```js
await contract.transfer(recipient, amount);
```

- Tratar erros (sem saldo, Metamask rejeitada etc.)
- Como lidar com o loading / estado de transação

---

## 🔐 **[50:00 – 55:00] – Boas práticas e segurança**

- Nunca expor a private key no frontend
- Usar `.env` para endpoints e configurações
- Trabalhar com redes de teste (Goerli, Sepolia)
- Usar block explorers para ver transações (Etherscan)

---

## 📣 **[55:00 – 60:00] – Encerramento e desafios**

- Recapitular: conexão Metamask, leitura e escrita com ethers.js, React
- Desafio: conectar ao contrato da aula anterior e mostrar o saldo
- Próxima aula: Criptografia para Blockchain (01/05)
- CTA: Suba seu projeto, compartilhe no Discord/Telegram
