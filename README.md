# Loja Simples

Aplicação de controle de produtos feita com **HTML, CSS e JavaScript puro**, desenvolvida para a disciplina de Fundamentos Web.

## Funcionalidades

- Cadastro de produtos com nome, preço e quantidade
- Botão **Remover** em cada produto
- Botão **Editar**: carrega os dados no formulário e atualiza o item existente (sem duplicar)
- Botão do formulário alterna entre "Adicionar produto" e "Salvar alterações"
- Contador de produtos cadastrados
- Mensagem "Nenhum produto cadastrado." quando a lista está vazia
- Validação: a quantidade deve ser maior que zero
- Footer e ajustes visuais na lista (área de ações, hover, destaque do item em edição)

## Conceitos praticados

`querySelector`, `createElement`, `addEventListener`, eventos de clique, `.value`, `.textContent`, `.appendChild()`, `.remove()` e manipulação do DOM.

## Como rodar

Não precisa instalar nada. Basta abrir o arquivo `index.html` no navegador.

Os produtos existem apenas enquanto a página estiver aberta (sem banco de dados ou armazenamento permanente), conforme pedido na atividade.

## Estrutura

```
index.html   -> estrutura da página
style.css    -> estilos
script.js    -> lógica (adicionar, editar, remover, contador, validação)
```

## Autor

**Gabriel** - Análise e Desenvolvimento de Sistemas

---

P.S.: nenhuma batata foi cadastrada, renomeada ou maltratada durante o desenvolvimento deste projeto.
