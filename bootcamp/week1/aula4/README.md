---
marp: true
theme: gaia
---

# **Aula 4: Solidity Avançado**

- data: 01/05
- prof: Lucas Oliveira

## **1. Abertura**

**"Hello World, Devs!"**

Hoje vamos aprofundar no Solidity.

---

## **2. Programação**

1. **Instalando Bibliotecas**: Openzepplin
2. **Padrão Ownable, Pausable**: Implementando Heranças
3. **Segurança**: Boas práticas
4. **ERC20**: Customizações
5. **TDD**: Adicionando testes nos noss on

---

## **3. - Instalando Bibliotecas**

- Openzepplin
- Solady
- Solmate

---

## **4. Padrão Ownable, Pausable**

- Ownable: Permite que um contrato tenha um único proprietário com controle total sobre suas funções.
- Pausable: Permite que o proprietário pause a execução de funções críticas em situações de emergência.
- ReentrancyGuard: Protege contra ataques de reentrância, garantindo que uma função não possa ser chamada novamente antes de sua execução ser concluída.

```js
// PROGRAMMING !
```

---

## **5. Segurança**

### Reentrancy

```solidity
// Proteção
bool internal locked;

modifier noReentrancy() {
    if(locked == true) {
        revert("No reentrancy");
    }
    locked = true;
    _;
    locked = false;
}
```

---

### Access control

- `Ownable`, `AccessControl`, controle por roles
- Exemplo com `onlyRole(keccak256("MINTER_ROLE"))`

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

## **6. ERC20**: Customizações

- Adicionar:
  - Função balance retorna sempre 10 Tokens
  - Apenas transferir 1 token por vez

```js
// PROGRAMMING !
```

---

## **7. Testes automatizados com Foundry**

- O poder dos testes locais: `forge test`
- Como testar falhas esperadas com `vm.expectRevert`
- Testes simulando outras contas com `vm.prank`
- Criar contrato base de teste:

```js
// PROGRAMMING !
```

---

## **8. Recapitulação**

- Modificadores e herança para reutilização de código.
- Estratégias de otimização de gas.
- Padrões críticos de segurança.
- ERC20 customizado com testes automatizados.

---

## **9. Lição de Casa**

- Implementar um token ERC20 com:
- Sistema de pause.
- Blacklist.
- Testes cobrindo fluxos críticos.
- Compartilhar o repositório no Discord para feedback.
- Post no Linkedin #zknearx (4/10)

---

## **10. Próxima Aula**

**02/05 – Projeto FullStack**

- Integrar com as novas funcionalidades

- "Poste seu token no #showcase do Discord e marque a NearX no LinkedIn!"
