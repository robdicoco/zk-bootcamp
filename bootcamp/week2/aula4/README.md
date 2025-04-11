# 🔐 Aula 4: **Casos de uso e Provas ZK**

📅 **06/05**  
👨‍🏫 **Professor:** Lucas Oliveira  
📍 **YouTube**  
⏱ **Duração:** 1 hora

---

## 🎬 **[00:00 – 05:00] – Abertura e contextualização**

- Boas-vindas e revisão rápida da aula anterior (SDK ZkVerify e stack técnica).
- Objetivo da aula:
  - Criar um mini dApp com ZK Proofs
  - Ver passo a passo: geração, envio, verificação de uma prova
  - Integrar com o **ZkVerify**
  - Mostrar **um fluxo completo funcional ao vivo**

> 🧠 “Hoje é dia de _mão na massa_ com provas ZK funcionando em tempo real.”

---

## ⚙️ **[05:00 – 20:00] – Criação de dApp com Provas ZK**

### 📍 Casos de uso possíveis:

- Acesso anônimo a um sistema com verificação de idade
- Validação de identidade sem revelar CPF/email
- Checkpoint de participação em eventos (proof-of-attendance)
- Comprovação de saldo sem mostrar carteira

### 🛠 Setup do projeto:

- Stack sugerida:
  - Frontend: Next.js ou Vite + React
  - Backend (opcional): Node.js + Express
  - Biblioteca: `zkverify-sdk`

```bash
npx create-vite@latest zk-dapp --template react
cd zk-dapp && npm install zkverify-sdk
```

---

## 🧪 **[20:00 – 35:00] – Geração e Envio de Provas ZK**

### 1. Simular geração de dados (ex: idade > 18)

```js
const input = { idade: 20 };
const prova = await zk.generateProof(input);
```

### 2. Enviar prova ao ZkVerify

```js
const resposta = await zk.sendProof(prova);
```

### 3. Verificar a resposta

```js
if (resposta.verificada) {
  console.log("Prova validada!");
}
```

> 🔍 Mostrar no console / rede os dados sendo trafegados

---

## 🔗 **[35:00 – 45:00] – Integração com ZkVerify**

- Apresentar endpoints reais de verificação
- Mostrar onde o dApp consome os atestados
- Como armazenar ou exibir os resultados para o usuário

> Ex: após verificação, liberar botão de acesso ou mostrar badge

```js
const atestado = await zk.getAttestation(userId);
```

---

## 🧑‍💻 **[45:00 – 55:00] – Demonstração ao vivo do fluxo completo**

1. Usuário entra na aplicação
2. Envia seus dados para geração da prova
3. Prova é gerada → enviada ao ZkVerify
4. Verificação retorna atestado válido
5. UI muda: “Acesso concedido” ou “Atestado gerado com sucesso”

> Mostrar isso ao vivo rodando no navegador

---

## ✅ **[55:00 – 60:00] – Encerramento e próximos passos**

- Recapitular o que foi construído
- Reforçar que _qualquer lógica sensível_ pode virar uma prova ZK
- Desafiar os alunos a imaginar e criar seus próprios fluxos:
  > “Como vocês usariam ZK para melhorar apps de saúde, educação ou identidade?”

### 📌 Call-to-action:

- Postem seu mini dApp ou ideia no Discord
- Amanhã: começamos a Semana do Hackathon → estejam prontos com seus projetos iniciais!
