let produtos = [];

const produtosEl = document.getElementById("produtos");
const mensagemEl = document.getElementById("msg");
const buscaEl = document.getElementById("busca");


/* =========================================
   CARREGAR PRODUTOS DO MYSQL
========================================= */

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


    } catch (erro) {

        console.error(erro);


        if (mensagemEl) {

            mensagemEl.textContent =
                "Não foi possível carregar o cardápio.";

        }

    }

}


/* =========================================
   MOSTRAR PRODUTOS
========================================= */

function renderizarProdutos() {

    if (!produtosEl) {
        return;
    }


    const busca =
        buscaEl.value
            .toLowerCase()
            .trim();


    const filtrados =
        produtos.filter(produto =>

            produto.nome
                .toLowerCase()
                .includes(busca)

            ||

            (produto.descricao || "")
                .toLowerCase()
                .includes(busca)

        );


    if (mensagemEl) {

        mensagemEl.textContent =
            filtrados.length
                ? ""
                : "Nenhum produto encontrado.";

    }


    produtosEl.innerHTML =
        filtrados.map(produto => `

            <article class="produto">

                <img
                    src="${produto.imagem_url}"
                    alt="${produto.nome}"

                    onerror="
                        this.src='https://placehold.co/600x400/3f486f/ffffff?text=Royal+Garden'
                    "
                >

                <div class="info">

                    <h3>
                        ${produto.nome}
                    </h3>


                    <p>
                        ${produto.descricao || ""}
                    </p>


                    <div class="preco">

                        R$
                        ${Number(produto.preco)
                            .toFixed(2)
                            .replace(".", ",")}

                    </div>

                </div>

            </article>

        `).join("");

}


/* =========================================
   PESQUISA
========================================= */

if (buscaEl) {

    buscaEl.addEventListener(
        "input",
        renderizarProdutos
    );

}


/* =========================================
   SÓ CARREGA SE ESTIVER NO CARDÁPIO
========================================= */

if (produtosEl) {

    carregarProdutos();

}