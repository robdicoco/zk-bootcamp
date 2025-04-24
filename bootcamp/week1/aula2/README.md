---
marp: true
theme: gaia
---

# **Aula 2: Introdução ao Solidity**

- data: 29/04
- prof: Lucas Oliveira

## **1. Abertura**

**Hello World!**

Sejam todos bem-vindos ao GRANDE CÓDIGO.

Bootcamp/Hackathon/Incubação da NearX

Sua porta de entrada para o ecossistema blockchain/web3 e provas ZK.

Hoje vamos dar nosso primeiro passo no desenvolvimento de **smart contracts** com Solidity.

---

## **2. Programação**

1. **Configuração do Ambiente**: Ferramentas do Foundry
2. **EVM & Solidity**: Arquitetura e ecossistema
3. **Fundamentos de Solidity**: Tipos de dados, funções e memória
4. **Segurança Básica**: Validação e controle de acesso
5. **ERC-20 na Prática**: Implementação de um token

---

## **3. Configurando o Ambiente com Foundry**

### **Por que Solidity? (2025)**

- EVM é a plataforma mais usada para smart contracts (Ethereum, Polygon, Arbitrum, etc).
- Solidiyt é a linguagem mais madura para EVM.

---

### Foundry

- cast: Ferramenta para interagir com contratos e enviar transações.
- anvil: Simulador de rede local para testes de contratos.
- forge: Compilador e ferramenta de construção para contratos Solidity.
- chisel: REPL de solidity.

---

### EVM & Solidity

- Solidity → EVM → Blockchain (como Java → JVM → CPU).
- **Smart Contracts ≈ Classes**:
  - `Contract` → `Class`
  - `Functions` → `Methods`
  - `Storage` → `Attributes`

---

## **4. Fundamentos de Solidity**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}

```

---

## **5. Solidity: Conceitos-Chave:**

| Conceito                     | Exemplos                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------- |
| **Tipos de dados**           | `(u)int8/16/32/64/128/256`, `address`, `bool`, `string`, `array`, `mapping`, ... |
| **Visibilidade**             | `public`, `private`                                                              |
| **Funções**                  | `view`, `pure`, `external`, `internal`                                           |
| **Gerenciamento de memória** | `storage`, `memory`                                                              |

---

## **6. Segurança Básica**

### **Padrões Críticos:**

1. **Validação**:

```solidity
if(amount < 0) {
    revert("Amount must be positive");
}
```

2. **Controle de Acesso**:

```solidity
address owner;

modifier onlyOwner() {
    if(msg.sender != owner) {
        revert("Not authorized");
    }
    _;
}
```

---

## **7. Criando um Token ERC-20**

### **Padrão ERC-20**

#### READ

- `name()`
- `symbol()`
- `decimals()`
- `balanceOf()`

#### WRITE

- `transferFrom()`
- `transfer()`
- `approve()`
- `allowance()`

---

## **8. Hands-on**

```js
// PROGRAMMING, MOTHERF****
```

---

## **9. Recapitulação:**

1. Foundry = ferramenta essencial para desenvolvimento
2. Solidity = linguagem para smart contracts na EVM
3. Segurança = cuidado com detalhes
4. ERC-20 = padrão para tokens fungíveis

---

## **10. Lição de Casa**

### Desafio de Aprendizagem

1. Implemente o seu Token e faça deploy na Testnet
2. Instale o node@v20+, metamask e chrome ou firefox

### Desafio de Carreira

3. Post no Linkedin #zknearx (2/10)

### Desafio de Comunidade

4. ☕️ Poste uma foto da sua caneca favorita! (discord)

---

## **11. Próxima Aula**

**30/04 – JavaScript & Web3**

- Vamos conectar o mundo web2 ao web3.

_"Não esqueça: Aula ao vivo amanhã, 19h, no YouTube. Traga suas dúvidas!"_
