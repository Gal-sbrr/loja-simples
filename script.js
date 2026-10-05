const form = document.querySelector("#form-produto");
const inputNome = document.querySelector("#nome");
const inputPreco = document.querySelector("#preco");
const inputQuantidade = document.querySelector("#quantidade");
const botaoForm = document.querySelector("#botao-form");
const tituloForm = document.querySelector("#titulo-form");
const mensagemErro = document.querySelector("#mensagem-erro");
const lista = document.querySelector("#lista-produtos");
const contador = document.querySelector("#contador");
const mensagemVazia = document.querySelector("#mensagem-vazia");

// Item da lista que está sendo editado no momento (null = modo adicionar)
let itemEmEdicao = null;

function formatarPreco(preco) {
  return "R$ " + preco.toFixed(2).replace(".", ",");
}

function montarTexto(nome, preco, quantidade) {
  return nome + " - " + formatarPreco(preco) + " (" + quantidade + " un.)";
}

function atualizarResumo() {
  const total = lista.children.length;
  contador.textContent = "Produtos cadastrados: " + total;
  mensagemVazia.hidden = total > 0;
}

function sairDoModoEdicao() {
  if (itemEmEdicao) {
    itemEmEdicao.classList.remove("editando");
  }
  itemEmEdicao = null;
  form.reset();
  botaoForm.textContent = "Adicionar produto";
  tituloForm.textContent = "Novo produto";
}

function criarItem(nome, preco, quantidade) {
  const item = document.createElement("li");
  item.dataset.nome = nome;
  item.dataset.preco = preco;
  item.dataset.quantidade = quantidade;

  const texto = document.createElement("span");
  texto.classList.add("texto-produto");
  texto.textContent = montarTexto(nome, preco, quantidade);

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");

  const botaoEditar = document.createElement("button");
  botaoEditar.type = "button";
  botaoEditar.textContent = "Editar";
  botaoEditar.classList.add("btn-editar");
  botaoEditar.addEventListener("click", function () {
    if (itemEmEdicao) {
      itemEmEdicao.classList.remove("editando");
    }
    itemEmEdicao = item;
    item.classList.add("editando");

    inputNome.value = item.dataset.nome;
    inputPreco.value = item.dataset.preco;
    inputQuantidade.value = item.dataset.quantidade;

    botaoForm.textContent = "Salvar alterações";
    tituloForm.textContent = "Editar produto";
    mensagemErro.textContent = "";
    inputNome.focus();
  });

  const botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.textContent = "Remover";
  botaoRemover.classList.add("btn-remover");
  botaoRemover.addEventListener("click", function () {
    if (item === itemEmEdicao) {
      sairDoModoEdicao();
    }
    item.remove();
    atualizarResumo();
  });

  acoes.appendChild(botaoEditar);
  acoes.appendChild(botaoRemover);
  item.appendChild(texto);
  item.appendChild(acoes);

  return item;
}

function atualizarItem(item, nome, preco, quantidade) {
  item.dataset.nome = nome;
  item.dataset.preco = preco;
  item.dataset.quantidade = quantidade;
  item.querySelector(".texto-produto").textContent = montarTexto(nome, preco, quantidade);
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = inputNome.value.trim();
  const preco = parseFloat(inputPreco.value);
  const quantidade = parseInt(inputQuantidade.value, 10);

  if (nome === "" || isNaN(preco) || isNaN(quantidade)) {
    mensagemErro.textContent = "Preencha todos os campos corretamente.";
    return;
  }

  if (quantidade <= 0) {
    mensagemErro.textContent = "A quantidade deve ser maior que zero.";
    return;
  }

  mensagemErro.textContent = "";

  if (itemEmEdicao) {
    atualizarItem(itemEmEdicao, nome, preco, quantidade);
    sairDoModoEdicao();
  } else {
    lista.appendChild(criarItem(nome, preco, quantidade));
    form.reset();
  }

  atualizarResumo();
});

// Produtos iniciais (antes ficavam fixos no HTML; agora também têm os botões)
const produtosIniciais = [
  { nome: "Caderno", preco: 12.5, quantidade: 30 },
  { nome: "Caneta", preco: 2.0, quantidade: 100 },
  { nome: "Mochila", preco: 89.9, quantidade: 8 },
  { nome: "Estojo", preco: 15.0, quantidade: 20 },
];

produtosIniciais.forEach(function (p) {
  lista.appendChild(criarItem(p.nome, p.preco, p.quantidade));
});

atualizarResumo();
