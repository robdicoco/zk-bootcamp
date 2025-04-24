---
marp: true
theme: gaia
---

# **Aula 2: Introdução ao Solidity**

- data: 29/04
- prof: Lucas Oliveira

## **1. Abertura**

**"Hello World!"**

Hoje vamos dar nosso primeiro passo no desenvolvimento de **smart contracts** com Solidity.

---

## **2. Programação:**

1. **Foundry**: Configuração do ambiente
2. **EVM & Solidity**: O ambiente de execução
3. **Fundamentos**: Tipos, variáveis e funções
4. **ERC-20 na Prática**: Criando seu primeiro token
5. **Segurança Básica**: Padrões essenciais

---

## **3. Configurando o Ambiente com Foundry**

- Node.js -> npm
- Python -> Poetry
- Rust -> Cargo
- Solidity -> ???

---

### Foundry

- cast: Ferramenta para interagir com contratos e enviar transações.
- anvil: Simulador de rede local para testes de contratos.
- forge: Compilador e ferramenta de construção para contratos Solidity.
- chisel: REPL de solidity.

---

## **4. EVM & Solidity**

- Java/Kotlin/... -> JVM -> CPU
- Solidity/Vyper/... -> EVM -> Blockchain

---

### **Por que Solidity? (2025)**

- EVM é a plataforma mais usada para smart contracts (Ethereum, Polygon, Arbitrum, etc).
- Solidiyt é a linguagem mais madura para EVM.

---

### **Smart Contracts == Class**

- Class -> Contract
- Methods -> Functions
- Attributes -> Storage

---

## **5. Fundamentos do Solidity**

```js
contract HelloWorld {
    string message;

    constructo() {
        message = "Hello NearX!";
    }

    function set(string memory msg) external {
        message = msg;
    }

    function get() external view {
        return message;
    }
}
```

---

### **Conceitos-Chave:**

- **Tipos de dados**: `(u)int8/16/32/64/128/256`, `address`, `bool`, `string`, `array`, `mapping`, ...
- **Visibilidade**: `public`, `private`
- **Funções**: `view`, `pure`, `external` e `internal`
- **Gerenciamento de memória**: `storage`, `memory`

---

## **6. Criando um Token ERC-20**

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

### **Hands-on**

```js
// PROGRAMMING, MOTHERF****
```

---

## **7. Segurança Básica**

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

## **8. Recapitulação:**

1. Foundry = ferramenta essencial para desenvolvimento
2. Solidity = linguagem para smart contracts na EVM
3. ERC-20 = padrão para tokens fungíveis
4. Segurança = cuidado com detalhes

---

## **9. Lição de Casa**

1. Implemente o seu Token e faça deploy na Testnet
2. Post no Linkedin #zknearx (2/10)

---

## **10. Próxima Aula**

**30/04 – JavaScript & Web3**

- Como conectar seu frontend com smart contracts
- Uso do Viem e MetaMask
