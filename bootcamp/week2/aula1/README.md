# 🔐 Aula 1: **Introdução à Criptografia**

📅 **03/05**  
👨‍🏫 **Professor:** Lucas Oliveira  
📍 **YouTube**  
⏱ **Duração:** 1 hora

---

## 🎬 **[00:00 – 05:00] – Abertura e contextualização**

- Boas-vindas e objetivo da aula: entender os **fundamentos da segurança em blockchain**
- Como a criptografia garante:
  - Autenticidade (assinaturas digitais)
  - Integridade (funções de hash)
  - Privacidade (criptografia de chave pública)

---

## 🧠 **[05:00 – 15:00] – Fundamentos da criptografia para blockchain**

- 🔑 **Chave pública e chave privada**

  - Como funciona a criptografia assimétrica
  - Exemplo: Metamask gera sua _chave privada_ → usa ela pra assinar

- 🧱 **Funções de hash**

  - Propriedades: determinística, unidirecional, sensível
  - Exemplo: `keccak256("hello")`
  - Uso: endereços, verificação de dados, blockchains

- ✍️ **Assinaturas digitais**
  - Como provar que foi “você” que assinou algo sem mostrar sua chave privada
  - `msg.sender` = resultado da assinatura com chave privada

---

## 🧪 **[15:00 – 35:00] – Demonstrações práticas**

### A) **Gerar e verificar um hash**

Usar script simples em JS (Node.js ou direto no navegador):

```js
const { keccak256, toUtf8Bytes } = ethers.utils;
console.log(keccak256(toUtf8Bytes("mensagem secreta")));
```

### B) **Assinar uma mensagem e verificar a assinatura**

Usando Metamask + ethers.js:

```js
const signature = await signer.signMessage("Confirma essa transação?");
const recoveredAddress = ethers.utils.verifyMessage(
  "Confirma essa transação?",
  signature
);
```

Mostrar que:

- Quem assina é a chave privada
- Qualquer um pode verificar se foi mesmo o endereço correto

---

## 🧩 **[35:00 – 45:00] – Aplicações práticas em blockchain**

- Verificação de identidade (KYC, acesso seguro)
- Assinaturas de transações (Ethereum, Bitcoin, etc.)
- Validação de blocos e consenso (proof-of-work usa hash)
- Provas ZK (Zero-Knowledge) também usam hash + assinatura

Mostrar um fluxo de transação com hash + assinatura via Foundry ou Remix:

```solidity
bytes32 hash = keccak256(abi.encodePacked(msg.sender, valor));
require(ecrecover(hash, v, r, s) == esperado);
```

---

## 🛠️ **[45:00 – 55:00] – Mini desafio ao vivo**

### Desafio:

- Gerar uma hash de uma mensagem
- Assinar a mensagem com sua carteira
- Verificar a assinatura com o endereço público

> Pode usar playgrounds como [ethers.js playground](https://replit.com/@lucasoliv/ethers-playground) ou deixar um repositório com exemplos prontos

---

## 🔚 **[55:00 – 60:00] – Encerramento e chamada para ação**

- Recapitular:
  - Criptografia é invisível, mas está **em tudo** na blockchain
  - Hash = identidade dos dados
  - Assinaturas = sua “autorização”
- Dica: todo smart contract começa com uma `require(msg.sender == dono)`
- Preparar para a próxima aula: Arquitetura ZkVerify → onde tudo isso entra com provas ZK
