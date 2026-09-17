/* =====================================================
   THE ROYAL GARDEN CAFÉ
   SCRIPT.JS
===================================================== */


/* =====================================================
   PRODUTOS
===================================================== */

let produtos = [];


/* =====================================================
   PEDIDO
===================================================== */

let pedido =
    JSON.parse(
        localStorage.getItem(
            "pedidoRoyalGarden"
        )
    ) || [];


/* =====================================================
   ELEMENTOS DO CARDÁPIO
===================================================== */

const produtosEl =
    document.getElementById("produtos");

const mensagemEl =
    document.getElementById("msg");

const buscaEl =
    document.getElementById("busca");


/* =====================================================
   ELEMENTOS DO PEDIDO
===================================================== */

const abrirPedidoEl =
    document.getElementById("abrirPedido");

const fecharPedidoEl =
    document.getElementById("fecharPedido");

const areaPedidoEl =
    document.getElementById("areaPedido");

const itensPedidoEl =
    document.getElementById("itensPedido");

const contadorPedidoEl =
    document.getElementById("contadorPedido");

const totalPedidoEl =
    document.getElementById("totalPedido");

const limparPedidoEl =
    document.getElementById("limparPedido");

const finalizarPedidoEl =
    document.getElementById("finalizarPedido");


/* =====================================================
   CARREGAR PRODUTOS DO BANCO
===================================================== */

async function carregarProdutos() {

    try {

        const resposta =
            await fetch("/api/produtos");


        if (!resposta.ok) {

            throw new Error(
                "Erro ao acessar a API"
            );

        }


        produtos =
            await resposta.json();


        renderizarProdutos();

        atualizarPedido();


    } catch (erro) {

        console.error(erro);


        if (mensagemEl) {

            mensagemEl.textContent =
                "Não foi possível carregar o cardápio.";

        }

    }

}


/* =====================================================
   MOSTRAR PRODUTOS
===================================================== */

function renderizarProdutos() {

    if (!produtosEl) {
        return;
    }


    const busca =
        buscaEl
            ? buscaEl.value
                .toLowerCase()
                .trim()
            : "";


    const filtrados =
        produtos.filter(produto => {

            const nome =
                String(
                    produto.nome || ""
                ).toLowerCase();


            const descricao =
                String(
                    produto.descricao || ""
                ).toLowerCase();


            return (
                nome.includes(busca) ||
                descricao.includes(busca)
            );

        });


    /* ---------------------------------------------
       MENSAGEM
    --------------------------------------------- */

    if (mensagemEl) {

        mensagemEl.textContent =
            filtrados.length > 0
                ? ""
                : "Nenhum produto encontrado.";

    }


    /* ---------------------------------------------
       PRODUTOS
    --------------------------------------------- */

    produtosEl.innerHTML =
        filtrados.map(produto => {


            const preco =
                Number(produto.preco)
                    .toFixed(2)
                    .replace(".", ",");


            return `

                <article class="produto">


                    <img
                        src="${produto.imagem_url}"
                        alt="${produto.nome}"

                        onerror="
                            this.src='https://placehold.co/600x400/3f486f/ffffff?text=Royal+Garden'
                        "
                    >


                    <div class="produto-conteudo">


                        <h3>
                            ${produto.nome}
                        </h3>


                        <p>
                            ${produto.descricao || ""}
                        </p>


                        <div class="preco">

                            R$ ${preco}

                        </div>


                        <button
                            type="button"
                            class="botao-adicionar"
                            data-id="${produto.id}">

                            ＋ Adicionar pedido

                        </button>


                    </div>


                </article>

            `;

        }).join("");

}


/* =====================================================
   CLIQUE EM ADICIONAR PEDIDO
===================================================== */

if (produtosEl) {

    produtosEl.addEventListener(
        "click",
        function (event) {


            const botao =
                event.target.closest(
                    ".botao-adicionar"
                );


            if (!botao) {
                return;
            }


            const id =
                Number(
                    botao.dataset.id
                );


            const produto =
                produtos.find(
                    item =>
                        Number(item.id) === id
                );


            if (!produto) {
                return;
            }


            adicionarPedido(
                produto,
                botao
            );

        }
    );

}


/* =====================================================
   ADICIONAR PRODUTO
===================================================== */

function adicionarPedido(
    produto,
    botao
) {


    const itemExistente =
        pedido.find(
            item =>
                Number(item.id) ===
                Number(produto.id)
        );


    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        pedido.push({

            id:
                Number(produto.id),

            nome:
                produto.nome,

            preco:
                Number(produto.preco),

            quantidade:
                1

        });

    }


    salvarPedido();

    atualizarPedido();

    abrirPedido();


    /* ---------------------------------------------
       ANIMAÇÃO DO BOTÃO
    --------------------------------------------- */

    if (botao) {

        const textoOriginal =
            botao.innerHTML;


        botao.innerHTML =
            "✓ Adicionado!";


        botao.classList.add(
            "adicionado"
        );


        setTimeout(
            function () {

                botao.innerHTML =
                    textoOriginal;


                botao.classList.remove(
                    "adicionado"
                );

            },
            900
        );

    }

}


/* =====================================================
   ATUALIZAR PEDIDO
===================================================== */

function atualizarPedido() {

    if (!itensPedidoEl) {
        return;
    }


    /* ---------------------------------------------
       QUANTIDADE TOTAL
    --------------------------------------------- */

    let quantidadeTotal = 0;

    let total = 0;


    pedido.forEach(item => {

        quantidadeTotal +=
            item.quantidade;


        total +=
            item.preco *
            item.quantidade;

    });


    /* ---------------------------------------------
       CONTADOR
    --------------------------------------------- */

    if (contadorPedidoEl) {

        contadorPedidoEl.textContent =
            quantidadeTotal;

    }


    /* ---------------------------------------------
       TOTAL
    --------------------------------------------- */

    if (totalPedidoEl) {

        totalPedidoEl.textContent =
            formatarPreco(total);

    }


    /* ---------------------------------------------
       PEDIDO VAZIO
    --------------------------------------------- */

    if (pedido.length === 0) {

        itensPedidoEl.innerHTML = `

            <div class="pedido-vazio">

                <div class="pedido-vazio-icone">
                    🛍️
                </div>

                <p>
                    Seu pedido está vazio.
                </p>

                <span>
                    Escolha uma delícia
                    do nosso cardápio.
                </span>

            </div>

        `;

        return;

    }


    /* ---------------------------------------------
       MOSTRAR ITENS
    --------------------------------------------- */

    itensPedidoEl.innerHTML =
        pedido.map(item => {


            const subtotal =
                item.preco *
                item.quantidade;


            return `

                <div class="item-pedido">


                    <div class="item-pedido-info">

                        <h3>
                            ${item.nome}
                        </h3>

                        <span>
                            ${formatarPreco(item.preco)}
                            cada
                        </span>

                    </div>


                    <div class="item-pedido-linha">


                        <div
                            class="item-pedido-controle">


                            <button
                                type="button"
                                data-acao="diminuir"
                                data-id="${item.id}">

                                −

                            </button>


                            <span>
                                ${item.quantidade}
                            </span>


                            <button
                                type="button"
                                data-acao="aumentar"
                                data-id="${item.id}">

                                +

                            </button>


                        </div>


                        <strong
                            class="item-subtotal">

                            ${formatarPreco(
                                subtotal
                            )}

                        </strong>


                        <button
                            type="button"
                            class="remover-item"
                            data-acao="remover"
                            data-id="${item.id}">

                            ×

                        </button>


                    </div>


                </div>

            `;

        }).join("");

}


/* =====================================================
   BOTÕES DO PEDIDO
===================================================== */

if (itensPedidoEl) {

    itensPedidoEl.addEventListener(
        "click",
        function (event) {


            const botao =
                event.target.closest(
                    "button"
                );


            if (!botao) {
                return;
            }


            const id =
                Number(
                    botao.dataset.id
                );


            const acao =
                botao.dataset.acao;


            if (acao === "aumentar") {

                alterarQuantidade(
                    id,
                    1
                );

            }


            if (acao === "diminuir") {

                alterarQuantidade(
                    id,
                    -1
                );

            }


            if (acao === "remover") {

                removerItem(id);

            }

        }
    );

}


/* =====================================================
   ALTERAR QUANTIDADE
===================================================== */

function alterarQuantidade(
    id,
    valor
) {


    const item =
        pedido.find(
            item =>
                Number(item.id) === id
        );


    if (!item) {
        return;
    }


    item.quantidade += valor;


    if (item.quantidade <= 0) {

        pedido =
            pedido.filter(
                item =>
                    Number(item.id) !== id
            );

    }


    salvarPedido();

    atualizarPedido();

}


/* =====================================================
   REMOVER ITEM
===================================================== */

function removerItem(id) {

    pedido =
        pedido.filter(
            item =>
                Number(item.id) !== id
        );


    salvarPedido();

    atualizarPedido();

}


/* =====================================================
   SALVAR PEDIDO
===================================================== */

function salvarPedido() {

    localStorage.setItem(
        "pedidoRoyalGarden",
        JSON.stringify(pedido)
    );

}


/* =====================================================
   ABRIR PEDIDO
===================================================== */

function abrirPedido() {

    if (!areaPedidoEl) {
        return;
    }


    areaPedidoEl.classList.add(
        "pedido-aberto"
    );

}


/* =====================================================
   FECHAR PEDIDO
===================================================== */

if (abrirPedidoEl) {

    abrirPedidoEl.addEventListener(
        "click",
        function () {

            abrirPedido();

        }
    );

}


if (fecharPedidoEl) {

    fecharPedidoEl.addEventListener(
        "click",
        function () {

            areaPedidoEl.classList.remove(
                "pedido-aberto"
            );

        }
    );

}


/* =====================================================
   LIMPAR PEDIDO
===================================================== */

if (limparPedidoEl) {

    limparPedidoEl.addEventListener(
        "click",
        function () {


            if (pedido.length === 0) {
                return;
            }


            pedido = [];


            salvarPedido();

            atualizarPedido();

        }
    );

}


/* =====================================================
   FINALIZAR PEDIDO
===================================================== */

if (finalizarPedidoEl) {

    finalizarPedidoEl.addEventListener(
        "click",
        function () {


            if (pedido.length === 0) {

                alert(
                    "Seu pedido está vazio!"
                );

                return;

            }


            let resumo =
                "✨ THE ROYAL GARDEN CAFÉ ✨\n\n";


            pedido.forEach(item => {

                const subtotal =
                    item.preco *
                    item.quantidade;


                resumo +=
                    `${item.quantidade}x ` +
                    `${item.nome} - ` +
                    `${formatarPreco(
                        subtotal
                    )}\n`;

            });


            const total =
                pedido.reduce(
                    (
                        soma,
                        item
                    ) =>
                        soma +
                        (
                            item.preco *
                            item.quantidade
                        ),
                    0
                );


            resumo +=
                `\nTOTAL: ${formatarPreco(
                    total
                )}`;


            alert(resumo);

        }
    );

}


/* =====================================================
   FORMATAR PREÇO
===================================================== */

function formatarPreco(valor) {

    return (
        "R$ " +
        Number(valor)
            .toFixed(2)
            .replace(".", ",")
    );

}


/* =====================================================
   BUSCA
===================================================== */

if (buscaEl) {

    buscaEl.addEventListener(
        "input",
        function () {

            renderizarProdutos();

        }
    );

}


/* =====================================================
   INICIAR
===================================================== */

if (produtosEl) {

    carregarProdutos();

}


atualizarPedido();