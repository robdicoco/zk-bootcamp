---
marp: true
theme: gaia
---

# **Aula 3: JavaScript & Web3**

- data: 30/04
- prof: Lucas Oliveira

## **1. Abertura**

**Hello World!**

Sejam todos bem-vindos ao GRANDE CÓDIGO.

Bootcamp/Hackathon/Incubação da NearX

Sua porta de entrada para o ecossistema blockchain/web3 e provas ZK.

Hoje vamos conectar o mundo web2 ao web3.

---

## **2. Programação**

1. **Setup Inicial**: Node.js v20+, Viem, Vite e React
2. **Fundamentos de SDK Web3**: Providers, Signers e RPC
3. **Autenticação**: Conexão com MetaMask
4. **Smartcontracts**: ABI + Address, leitura e escrita
5. **Hands-on**: DApp completo com React + Viem

---

## **3. Setup inicial Web3**

- node@v20+
- viem@v2+
- vite
- react
- metamask
- chromium/firefox

---

## **4. Fundamentos de SDK Web3 (Nodejs)**

- **Provider:** O provider é configurado com uma URL-RPC da blockchain e serve como ponto de acesso à rede.
- **Signer:** O signer é usado para assinar transações e escrever na blockchain.
- **Network/RPC:** A blockchain com a qual o dApp se conecta seja a rede principal ou de teste

---

### Provider

- Viem

```js
// 1. Instale e importe a biblioteca Viem
import { createPublicClient, http } from "viem";

// 2. Configure o client
export const provider = createPublicClient({
  transport: http("http://127.0.0.1:8545"),
});

// 3. Verifique a conexão
const blockNumber = await provider.getBlockNumber();
console.log("Conexão estabelecida");
console.log(`Block number ${blockNumber}`);
```

---

### Signer

```js
// 1. Instale e importe a biblioteca Viem
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { anvil } from "viem/chains";

// 2. Cria chave privada
const PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// 3. Inicialize a conta com a chave privada
const account = privateKeyToAccount(PRIVATE_KEY);

// 4. Cria o signer com a conta
const signer = createWalletClient({
  chain: anvil,
  transport: http(),
  account,
});
```

---

### Network

```js
// 1. Importe a chain que quer usar
import { mainnet, sepolia, anvil } from "viem/chains";
import { createPublicClient, http } from "viem";

// 2. Configure o client
export const provider = createPublicClient({
  transport: http("http://127.0.0.1:8545"),

  chain: mainnet // Rede Ethereum Principal (prod)
  chain: sepolia // Rede Ethereum de Testes
  chain: anvil // Rede Ethereum Local
});
```

---

## **5. Autenticação com MetaMask (Browser)**

### **1. Inicializar Provider**

```js
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const provider = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!)
})
```

### **2. Configurar RPC e Conta**

```js
const [address] = await provider.getAddresses();
// or: const [ address ] = await client.requestAddresses()
```

### **3. Criar transações**

```js
const hash = await provider.sendTransaction({
  account: address,
  to: "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
  value: parseEther("0.001"),
});
```

### **4. Provider + Signer**

```js
import { createWalletClient, http, parseEther } from 'viem'
import { mainnet } from 'viem/chains'

const [ account ] = await window.ethereum!.request({ method: 'eth_requestAccounts' })

const provider = createWalletClient({
  account, // <----
  chain: mainnet,
  transport: http()
})

const hash = await provider.sendTransaction({
  // account: address,
  to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  value: parseEther('0.001')
})
```

---

## **6. Smartcontracts (Browser/Nodejs)**

- **Configurar integração (ABI + Contrato)**
- **Buscar dados do contrato (read)**
- **Enviar transações (write)**

---

### Configurar integração (ABI + Contrato)

```js
export const wagmiAbi = [
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
] as const;


const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

// Cria uma instância do contrato
const contract = getContract({
  address: CONTRACT_ADDRESS,
  abi: abi,
  client: provider,
});
```

---

### Buscar dados do contrato (read)

```js
const balance = await contract.read.balanceOf([address]);
const name = await contract.read.name();

console.table({
  tokenName: name,
  conta: address,
  balance: formatUnits(balance, 18),
});
```

---

### Enviar transações (write)

```js
const receiver = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const amount = parseEther("10");

const hash = await contract.write.transfer([receiver, amount]);
```

---

## **7. Hands-on**

```js
// PROGRAMMING, MOTHERF****
```

---

## **8. Recapitulação:**

1. Conexão Web3 com viem
2. Autenticação via MetaMask
3. Leitura/Escrita em contratos

---

## **9. Lição de Casa**

- Coloque sua cara no projeto
- Faça deploy usando vercel
- Post no Linkedin #zknearx (3/10)
- 🎧 Poste a sua música mais ouvida/favorita de 2024 (discord)

**Recursos:**

- [Documentação Viem](https://viem.sh)
- [ABI ERC-20](https://ethereum.org/pt/developers/docs/standards/tokens/erc-20/)

---

## **9. Próxima Aula**

**01/05 – Solidity Avançado**

- Vamos mergulhar fundo no Solidity.

_"Não esqueça: Aula ao vivo amanhã, 19h, no YouTube. Traga suas dúvidas!"_
