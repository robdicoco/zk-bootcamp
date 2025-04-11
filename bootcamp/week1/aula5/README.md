# 🚀 Aula 5: **Projeto FullStack 1**

📅 **Data:** 02/05  
👨‍🏫 **Professor:** Lucas Oliveira  
📍 **YouTube**  
⏱ **Duração:** 1 hora

---

## 🎬 **[00:00 – 05:00] – Boas-vindas e visão geral**

- Relembrar o que foi feito até agora: Solidity, Token ERC20, testes
- Apresentar o objetivo da aula: **ligar o contrato inteligente com o front-end**
- Mostrar o fluxo completo:  
  `Smart Contract` → `Frontend (React/Vite)` → `Carteira (Metamask)` → `Testnet`

---

## 🧱 **[05:00 – 15:00] – Interface com o Token**

- Apresentar um front-end simples (HTML ou React) com botão de `Transfer` e `BalanceOf`
- Mostrar como conectar com o contrato via Ethers.js ou Viem:

```ts
const token = new ethers.Contract(tokenAddress, abi, signer);
await token.transfer(to, amount);
```

- Ler dados (ex: saldo):

```ts
const balance = await token.balanceOf(userAddress);
```

> 💡 Dica: Usar Vite + Tailwind para agilidade no front

---

## 🔌 **[15:00 – 25:00] – Integração front + contrato**

- Como pegar o `contractAddress` do deploy anterior
- Como carregar o ABI gerado pelo Foundry
- Como assinar transações com a Metamask no navegador

> Demonstração:

1. Conectar carteira
2. Transferir tokens via UI
3. Atualizar saldo ao vivo

---

## 🌐 **[25:00 – 35:00] – Deploy na testnet**

- Escolher uma testnet (Goerli, Sepolia, Base Sepolia)
- Como subir o contrato com Foundry:

```bash
forge create --rpc-url $RPC --private-key $KEY src/MeuToken.sol:MeuToken
```

- Alternativas: usar Remix ou deploy via script
- Obter faucet + configurar Metamask

> Mostrar hash da transação no block explorer

---

## 🧾 **[35:00 – 45:00] – Leitura e escrita de transações reais**

- Explicar diferença entre `call` e `sendTransaction`
- Como tratar erros de transações
- Logar eventos (ex: `Transfer`) e exibir no frontend com `ethers.Contract.on`

```ts
token.on("Transfer", (from, to, amount) => {
  console.log("Transfer:", from, to, amount.toString());
});
```

---

## 🛠️ **[45:00 – 55:00] – Projeto prático**

### 🚧 Desafio: mini-dApp

- Criar uma interface para:
  - Ver saldo de tokens
  - Transferir tokens
  - Exibir histórico (bônus)
- Individual ou em grupo
- Liberdade para usar React, HTML puro, ou frameworks visuais (ex: V0, no-code)

> Mostrar um exemplo pronto e explicar onde customizar

---

## 🔚 **[55:00 – 60:00] – Encerramento e próximos passos**

- Recapitular:
  - Conectar contrato com front
  - Deploy real
  - Enviar transações com carteiras reais
- Incentivar: suba seu projeto no GitHub + envie no Discord para feedback
- Preparar para a próxima aula: Criptografia e fundamentos técnicos
- Deixar template/repo base (se quiser, posso criar isso rapidinho!)
