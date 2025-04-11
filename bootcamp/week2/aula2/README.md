# 🧩 Aula 2: **Arquitetura ZkVerify**

📅 **04/05**  
👨‍🏫 **Professor:** Lucas Oliveira  
📍 **YouTube**  
⏱ **Duração:** 1 hora

---

## 🎬 **[00:00 – 05:00] – Abertura**

- Objetivo da aula: entender o **ZkVerify como infraestrutura crítica de provas ZK**
- Como isso se conecta com o que já vimos: segurança, autenticação, assinatura e agora... _verificação com privacidade!_

---

## 🌐 **[05:00 – 15:00] – ZkVerify no ecossistema Web3**

- O que é a **ZkVerify**:

  - Infraestrutura para verificação de provas ZK
  - Protocolo modular, interoperável e focado em _escalar a verificação_

- Motivação do projeto:

  - Verificar provas on-chain é **caro**
  - ZkVerify reduz custos, melhora UX e viabiliza aplicações reais

- Onde ela se encaixa:
  - dApps que usam identidades, KYC, votação, reputação
  - Rollups, pontes, dApps com privacidade e segurança avançada

---

## ⚙️ **[15:00 – 25:00] – Sistema de verificação e atestados descentralizados**

- Como funciona o **modelo de atestados**:

  - Usuário envia uma prova para verificação
  - ZkVerify valida e **publica um atestado on-chain**
  - Esse atestado é reutilizável (sem precisar repetir o cálculo)

- Componentes principais:

  - ZK Circuits
  - ZK Provers (off-chain)
  - Verificadores (on-chain)
  - Atestados (state commitments verificados)

- Segurança e descentralização:
  - Modelo de múltiplos provedores
  - Criptografia + blockchain = confiança sem intermediários

---

## 📖 **[25:00 – 35:00] – Leitura guiada do whitepaper e documentação**

- Apresentar os pontos principais do whitepaper:

  - Arquitetura modular
  - Protocolo de atestados
  - Incentivos e descentralização da rede

- Mostrar como navegar na documentação:
  - SDK
  - Exemplos de uso
  - Como integrar em um dApp

> 🔗 [Deixe um link para o whitepaper e a doc oficial no chat/descrição do vídeo]

---

## 🧪 **[35:00 – 45:00] – Casos de uso**

- Rollups (zk-rollups):  
  → Validam lotes de transações com uma única prova

- dApps com reputação:  
  → Login com ZK, sem expor dados sensíveis

- Hackathons e votações:  
  → Participantes provam que têm direito sem revelar identidade

- Integrações futuras:
  - ZK-KYC, verificações financeiras, modelos de credenciais

---

## 🚀 **[45:00 – 55:00] – Envio conceitual de provas ZK**

- Passo a passo conceitual:

  1. Gerar uma prova ZK com um circuito
  2. Enviar a prova para o verificador da ZkVerify
  3. ZkVerify gera um atestado
  4. Outro contrato consome esse atestado para dar acesso, validar ou liberar algo

- Mostrar o fluxo visualmente (slide ou diagrama):
  - 🧠 Usuário → 🧪 ZK Prova → ✅ ZkVerify → 🔐 Atestado → 📲 dApp

---

## 📢 **[55:00 – 60:00] – Encerramento**

- Conectar com o que vem a seguir:

  - “Amanhã entraremos na stack de desenvolvimento com ZkVerify”
  - “Hoje entendemos o que ela é, amanhã vamos entender como **codar com ela**”

- Chamada para ação:
  - Leiam o whitepaper
  - Entrem no Discord/Telegram da ZkVerify se disponível
  - Preparem dúvidas para trazer amanhã
