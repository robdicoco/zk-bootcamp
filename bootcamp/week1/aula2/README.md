---
marp: true
theme: gaia
---

# **Aula 2: Introdução ao Solidity**

_(Bootcamp ZkVerify | 29/04 - Fundamentos Web3)_

## **1. Abertura**

**"Hello World, builders!"**

Hoje vamos dar nosso primeiro passo no desenvolvimento de **smart contracts** com Solidity.

---

### **Programação:**

1. **EVM e Solidity**: O ambiente de execução
2. **Foundry**: Configuração do ambiente
3. **Fundamentos**: Tipos, variáveis e funções
4. **ERC-20 na Prática**: Criando seu primeiro token
5. **Segurança Básica**: Padrões essenciais

---

## **1. EVM e o Papel do Solidity**

### **Por que Solidity?**

- Linguagem mais adotada para smart contracts (Ethereum, Polygon, Arbitrum, etc)
- Compila para **bytecode** executado na EVM (Ethereum Virtual Machine)

### **Smart Contracts = Lógica Autônoma**

- Código que:
  - Roda em blockchain
  - Não pode ser alterado após deploy
  - Executa transações sem intermediários

> **Slide:** Diagrama Solidity → Bytecode → EVM → Blockchain

---

## **3. Fundamentos do Solidity**

### **Estrutura Básica**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloWorld {
    string public message = "Hello NearX!";

    function updateMessage(string memory _newMsg) public {
        message = _newMsg;
    }
}
```

### **Conceitos-Chave:**

- **Tipos de dados**: `uint`, `address`, `bool`
- **Visibilidade**: `public` vs `private`
- **Funções**: `view` (leitura) vs `pure` (cálculos)
- **Gerenciamento de memória**: `storage` (persistente) vs `memory` (temporário)

> **Demo Rápida:** Execute no Remix IDE para mostrar a interação.

---

## **4. Configurando o Ambiente com Foundry**

### **Por que Foundry?**

- Ferramenta moderna para testes e deploy (escrita em Rust)
- Mais rápido que Hardhat/Truffle

### **Comandos Essenciais:**

```bash
# Iniciar projeto
forge init meu_token

# Compilar
forge build

# Testar
forge test
```

> **Ao Vivo:** Mostre a estrutura de pastas gerada e um teste básico.

---

## **5. Criando um Token ERC-20**

### **Padrão ERC-20**

Interface mínima para tokens fungíveis:

- `balanceOf()`
- `transfer()`
- `approve()` + `transferFrom()`

### **Código Completo:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NearXToken is ERC20 {
    constructor() ERC20("NearXCoin", "NXC") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

> **Demo:** Faça deploy na testnet Sepolia via Foundry.

---

## **6. Segurança Básica**

### **Padrões Críticos:**

1. **Validação**:
   ```solidity
   require(amount > 0, "Amount must be positive");
   ```
2. **Controle de Acesso**:

   ```solidity
   address owner;

   modifier onlyOwner() {
       require(msg.sender == owner, "Not authorized");
       _;
   }
   ```

3. **Proteção contra overflow**: Use OpenZeppelin's `SafeMath`.

> **Alerta:** Mostre um hack real (ex.: DAO Hack) e como prevenir.

---

## **7. Conclusão**

**Recapitulação:**

1. Solidity = linguagem para smart contracts na EVM
2. Foundry = ferramenta essencial para desenvolvimento
3. ERC-20 = padrão para tokens fungíveis
4. Segurança = prioridade absoluta

---

## **📌 Lição de Casa**

1. **Implemente** um contrato com:
   - Uma variável `uint public counter`
   - Função para incrementar (`function increment() public`)
2. **Explore** a documentação do [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/).

---

## **⏭ Próxima Aula**

**30/04 – JavaScript & Web3**

- Como conectar seu frontend a smart contracts
- Uso do Ethers.js e MetaMask

> **CTA Final:**  
> _"Poste seu contrato no Discord #web3-dev para feedback!"_

---

### **Diferenciais:**

- **Foco na prática**: 80% código, 20% teoria
- **Recursos visuais**: Diagramas EVM + código destacado
- **Preparação para o hackathon**: ERC-20 será usado em projetos
- **Checkpoints interativos**: Demos ao vivo a cada 15min

Precisa de mais detalhes em algum tópico específico?
