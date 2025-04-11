# 🧩 Aula 5: **Projeto FullStack 2 – Integração Completa**

📅 **07/05**  
👨‍🏫 **Professor:** Lucas Oliveira  
📍 **YouTube**  
⏱ **Duração:** 1 hora

---

## 🎬 **[00:00 – 05:00] – Abertura e objetivo do dia**

- Recapitulação da aula anterior (provas ZK, fluxo de verificação)
- Objetivo de hoje:
  - Finalizar o dApp completo
  - Garantir a **integração entre frontend, smart contract e ZkVerify**
  - Preparar para **entrega e mentoria**

> 🧠 “Hoje a gente fecha a base do projeto que vocês vão evoluir no Hackathon.”

---

## 🧱 **[05:00 – 20:00] – Estrutura do Projeto FullStack**

### 1. Frontend

- Interface amigável (Next.js / Vite + React)
- Formulário de entrada de dados → geração de prova
- Exibição do atestado após validação

### 2. Smart Contract

- Solidity + Foundry
- Função `validateProof(address user, string calldata proof)` que registra a verificação
- Evento `ProofValidated(address user, string proof)`

```solidity
function validateProof(address user, string calldata proof) external {
    require(msg.sender == verifier, "Not authorized");
    validatedProofs[user] = proof;
    emit ProofValidated(user, proof);
}
```

### 3. Backend / SDK

- Comunicação com ZkVerify SDK ou API REST
- Backend opcional: apenas para autenticar e intermediar requests

---

## 🔄 **[20:00 – 40:00] – Integração Completa (Live Coding)**

### ✅ Passo a passo:

1. Usuário envia dado → Geração de Prova
2. Front envia para ZkVerify
3. ZkVerify retorna atestado
4. Front envia atestado ao contrato
5. Contrato registra a verificação
6. Front lê evento e exibe sucesso

### Demonstração no VSCode:

- Mostrar `App.tsx`, `zk.ts`, `contract.sol`
- Executar `forge script` e `cast send` para deploy e interação

> Mostrar logs ao vivo no terminal e console do navegador

---

## 🧑‍🔧 **[40:00 – 50:00] – Suporte técnico e boas práticas**

- Checklist de entrega:

  - [ ] Frontend funcional com UI amigável
  - [ ] ZkVerify integrado com prova real
  - [ ] Smart contract no testnet com interação registrada
  - [ ] Repositório no GitHub atualizado

- Dicas:
  - Teste com `--fork` usando Foundry
  - Valide provas manualmente no início
  - Use `event logs` para debug

> 🧰 “Se der bug, olhe os logs. Eles contam tudo.”

---

## 🎓 **[50:00 – 60:00] – Preparação para a Mentoria**

- Mostrar como submeter o projeto:

  - Repositório + vídeo curto explicando
  - Link do deploy/testnet se possível

- Explicar como funcionará a mentoria:
  - Feedback técnico
  - Ideias para evolução do dApp
  - Acompanhamento para quem quiser **participar do Hackathon com o projeto**

### 📌 Call-to-action:

- Envie até amanhã às 12h
- Use o canal do Discord #entregas-fullstack
- Prepare-se para o desafio oficial 💪
