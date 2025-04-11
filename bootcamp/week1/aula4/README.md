# 🎓 Aula 4: **Solidity Avançado**

📅 **Data:** 01/05  
👨‍🏫 **Professor:** Lucas Oliveira  
📍 **YouTube**  
⏱ **Duração:** 1 hora

---

## 🎬 **[00:00 – 05:00] – Abertura e contexto**

- Relembrar o que vimos até agora: contratos simples, Foundry, ERC20
- Explicar o objetivo da aula: construir contratos mais robustos e seguros
- Mostrar a agenda e onde os alunos vão aplicar esse conteúdo no Hackathon
- Incentivo: “Agora é a hora de deixar seu contrato pronto pro mundo real”

---

## 🧠 **[05:00 – 15:00] – Funções complexas, modificadores, herança**

### ✅ **Modificadores**

- Usados para validar condições antes de executar funções:

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

### 🧩 **Funções mais complexas**

- Operações em arrays, structs, mappings encadeados
- Uso de `require`, `revert`, `try/catch`

### 🧬 **Herança**

- Criar contratos base e estender funcionalidades

```solidity
contract Parent { /* ... */ }
contract Child is Parent { /* ... */ }
```

> Demonstração: contrato com `Ownable` + modificador `onlyOwner` aplicado

---

## 🛠 **[15:00 – 25:00] – Bibliotecas e otimização de gas**

- Como usar bibliotecas para reaproveitar código (`library SafeMath`, etc.)
- Reduzir `storage` desnecessário, usar `calldata` e `memory` corretamente
- Quando usar `unchecked` para pular checagens (com cuidado!)

```solidity
unchecked {
    counter += 1;
}
```

> Mostrar comparação de uso de gas com/sem otimizações no Foundry

---

## 🛡 **[25:00 – 35:00] – Padrões de segurança**

### 🔁 Reentrancy

- Explicar o ataque clássico (ex: DAO Hack)
- Mostrar vulnerável vs protegido:

```solidity
// Proteção
bool internal locked;

modifier noReentrancy() {
    require(!locked, "No reentrancy");
    locked = true;
    _;
    locked = false;
}
```

### 🔒 Access control

- `Ownable`, `AccessControl`, controle por roles
- Exemplo com `onlyRole(keccak256("MINTER_ROLE"))`

> Demonstrar uma função de mint com controle de acesso

---

## 💸 **[35:00 – 45:00] – Criando um ERC20 customizado**

- Começar de um ERC20 da OpenZeppelin
- Adicionar:
  - Taxa de transferência
  - Pause/unpause
  - Lista de bloqueados (blacklist)

```solidity
mapping(address => bool) public isBlocked;

function transfer(address to, uint256 amount) public override returns (bool) {
    require(!isBlocked[msg.sender], "Sender blocked");
    // lógica de taxa
}
```

> Mostrar deploy local + interação com o contrato via Foundry/Remix

---

## 🧪 **[45:00 – 55:00] – Testes automatizados com Foundry**

- O poder dos testes locais: `forge test`
- Criar contrato de teste:

```solidity
function testTransfer() public {
    token.transfer(user, 100);
    assertEq(token.balanceOf(user), 100);
}
```

- Como testar falhas esperadas com `vm.expectRevert`

> Mostrar teste passando e falhando

---

## 📣 **[55:00 – 60:00] – Encerramento e desafios**

- Recapitular: modificadores, herança, segurança, gas, testes
- Propor desafio: escrever um token ERC20 com:

  - Modificador de pause
  - Blacklist
  - Taxa de 1% nas transações
  - Testes cobrindo os principais fluxos

- Preparar para a próxima aula: Criptografia para blockchain (02/05)
- CTA: compartilhe seu repositório no Discord para receber feedback
