---
marp: true
theme: gaia
---

# **Aula 4: Solidity Avançado**

- data: 01/05
- prof: Lucas Oliveira

## **1. Abertura**

**Hello World!**

Sejam todos bem-vindos ao GRANDE CÓDIGO.

Bootcamp/Hackathon/Incubação da NearX

Sua porta de entrada para o ecossistema blockchain/web3 e provas ZK.

Hoje vamos mergulhar fundo no Solidity.

---

## **2. Programação**

1. **Bibliotecas**: OpenZeppelin, Solady e Solmate
2. **Padrões de Contratos**: Ownable, Pausable e ReentrancyGuard
3. **Segurança**: Controle de acesso e proteção contra reentrância
4. **ERC-20 Customizado**: Restrições e lógicas personalizadas
5. **Testes Automatizados**: Foundry e simulação de cenários

---

## **3. - Instalando Bibliotecas**

```bash
forge install transmissions11/solmate
forge install OpenZeppelin/openzeppelin-contracts
forge install vectorized/solady
```

---

#### **OpenZeppelin**

📌 _O padrão ouro para desenvolvimento seguro_

- Fornece implementações auditadas dos principais padrões ERC (ERC-20, ERC-721)
- Inclui módulos prontos para:
  - Controle de acesso (`Ownable`, `AccessControl`)
  - Segurança (`ReentrancyGuard`, `Pausable`)
  - Utilidades (`SafeERC20`, `Counters`)
- Ideal para: Projetos em produção que exigem máxima segurança

---

#### **Solady**

⚡ _O turbo da eficiência em gas_

- Foco extremo em otimização de custos de transação
- Implementações "gas-optimized" de padrões comuns
- Recursos exclusivos:
  - Assinaturas EIP-712
  - Helpers para ECDSA e merkle proofs
- Ideal para: Projetos que priorizam economia de gas

---

#### **Solmate**

🛠️ _O kit de ferramentas minimalista_

- Versões leves e simplificadas dos contratos OpenZeppelin
- Filosofia "menos abstrações, mais controle"
- Destaques:
  - Sem dependências externas
  - Código altamente legível
  - Fácil customização
- Ideal para: Desenvolvedores que querem entender cada linha de código

---

## **4. Padrão Ownable, Pausable**

- **Ownable**: Permite que um contrato tenha um único proprietário com controle total sobre suas funções.
- **Pausable**: Permite que o proprietário pause a execução de funções críticas em situações de emergência.
- **ReentrancyGuard**: Protege contra ataques de reentrância, garantindo que uma função não possa ser chamada novamente antes de sua execução ser concluída.

---

### Ownable

```solidity
// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;
abstract contract Ownable {
    address public owner;

    modifier onlyOwner() virtual {
        if (msg.sender != owner) {
            revert("UNAUTHORIZED");
        }
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }
}
```

---

### Pausable

```solidity
// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;
abstract contract Pausable {
    bool public paused;

    modifier whenNotPaused() {
        if (paused) {
            revert("PAUSED");
        }
        _;
    }

    function pause() public virtual onlyOwner {
        paused = true;
    }

    function unpause() public virtual onlyOwner {
        paused = false;
    }
}
```

---

### ReentrancyGuard

```solidity
// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;
abstract contract ReentrancyGuard {
    uint256 private locked = 1;

    modifier nonReentrant() virtual {
        if (locked != 1) {
            revert("REENTRANCY");
        }

        locked = 2;
        _;
        locked = 1;
    }
}
```

---

## **6. Hands-on**

```js
// PROGRAMMING, MOTHERF****
```

---

## **7. Testes automatizados e Attacks**

```js
// PROGRAMMING, MOTHERF****
```

---

## **8. Recapitulação**

- Modificadores e herança para reutilização de código.
- Padrões críticos de segurança.
- ERC20 customizado
- Testes automatizados.

---

## **9. Lição de Casa**

### Desafio de Aprendizagem

- Implementar um token ERC20 com: Sistema de pausa e Blacklist.
- Testes cobrindo fluxos críticos.

### Desafio de Carreira

- Post no Linkedin #zknearx (4/10)

### Desafio de Comunidade

- 📚 Poste o livro que vc está lendo agora (vai ler). (discord)

---

## **10. Próxima Aula**

**02/05 – Projeto FullStack**

- Vamos fazer o deploy do projeto

_"Não esqueça: Aula ao vivo amanhã, 19h, no YouTube. Traga suas dúvidas!"_
