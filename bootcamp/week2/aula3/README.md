# ⚙️ Aula 3: **Linguagens e Frameworks**

📅 **05/05**  
👨‍🏫 **Professor:** Lucas Oliveira  
📍 **YouTube**  
⏱ **Duração:** 1 hora

---

## 🎬 **[00:00 – 05:00] – Boas-vindas e Introdução**

- Apresentar o tema: **"Entendendo a Stack por trás do ZkVerify"**
- Conectar com a aula anterior:  
  → “Ontem vimos como o ZkVerify funciona. Hoje vamos entender _com o que ele é construído_.”
- Objetivo da aula:  
  → Conhecer o ecossistema técnico: **Polkadot, Substrate, Rust, Solidity**  
  → Entender o que é o **SDK da ZkVerify**

---

## 🌐 **[05:00 – 15:00] – Stack ZkVerify: Substrate, Polkadot, Solidity**

### 🔁 Por que essa stack?

- **Interoperabilidade** → Polkadot permite comunicação entre blockchains
- **Customização de runtime** → Substrate permite criar blockchains com lógica própria
- **Smart contracts** → Pode interagir com Solidity via bridges/parachains

### 🧱 Visão geral:

- **Polkadot** = rede principal (Layer 0)
- **Parachains** = blockchains independentes conectadas ao relay chain
- **Substrate** = framework para criar essas parachains
- **Solidity** = linguagem mais comum para smart contracts (EVM compatível)

---

## 🦀 **[15:00 – 25:00] – Fundamentos de Rust**

- Por que Rust?

  - Performance, segurança, zero-cost abstractions
  - Usado no Substrate, Solana, Near…

- Sintaxe básica:

  - `let`, tipos primitivos, funções
  - `struct`, `impl`, `enum`
  - Ownership & Borrowing (explicar o básico conceitual)

- Exemplo simples:

```rust
struct Pessoa {
    nome: String,
    idade: u8,
}

impl Pessoa {
    fn nova(nome: String, idade: u8) -> Pessoa {
        Pessoa { nome, idade }
    }
}
```

> 🚨 Dica: Não se preocupe em dominar Rust agora — entenda os conceitos para acompanhar a lógica dos pallets Substrate.

---

## 🔩 **[25:00 – 35:00] – Substrate Pallets**

- O que são **Pallets**?

  - Módulos reutilizáveis que compõem a lógica de uma blockchain Substrate
  - Cada pallet adiciona funcionalidades específicas: identidade, tokens, staking, etc.

- Pallet do ZkVerify:

  - Gerencia o ciclo de vida de atestados
  - Lida com provas ZK off-chain que são verificadas e registradas on-chain

- Mostrar a estrutura de um pallet:
  - `Config`, `Call`, `Event`, `Storage`, `Error`
  - Fluxo básico de chamadas

---

## 🧰 **[35:00 – 50:00] – SDK ZkVerify**

- Para que serve o SDK:

  - Conectar seu app ao ZkVerify
  - Gerar e enviar provas
  - Verificar provas e consumir atestados

- Componentes do SDK:

  - APIs para leitura/escrita
  - Helpers para montar chamadas
  - Ferramentas CLI e scripts em JavaScript ou Rust

- Exemplo de uso:

  - `verifyProof(proofData)` → resposta: true/false + atestado

- Como instalar e testar (guia rápido):
  ```bash
  npm install zkverify-sdk
  ```

---

## 📌 **[50:00 – 60:00] – Encerramento e call-to-action**

- Recapitular a stack:

  - Polkadot → Infraestrutura de rede
  - Substrate → Ferramenta de construção
  - Rust → Linguagem base
  - Solidity → Contratos externos
  - SDK → Ponte de integração

- Próximos passos:
  - “Amanhã começamos o _ZkVerify na prática_ com exemplos reais”
  - Preparem suas wallets e IDEs (Node.js, VSCode, etc.)
  - Leiam os exemplos no GitHub da ZkVerify (link no chat/descrição)
