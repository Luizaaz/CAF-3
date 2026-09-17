# Café da Alta Sociedade --- Relatório do Projeto

## 1. Introdução

O projeto desenvolvido consiste em um site para uma cafeteria temática
inspirada na estética de Bridgerton e no estilo Regency. A proposta é
criar uma experiência digital elegante e sofisticada, permitindo que o
usuário conheça o cardápio da cafeteria, visualize produtos e realize
pedidos.

A identidade visual utiliza cores suaves, como azul-claro, rosa, lavanda
e verde-água, combinadas com detalhes dourados. Esses elementos foram
escolhidos para transmitir uma aparência romântica, clássica e
sofisticada, característica da estética Regency associada à série. A
presença de chá, doces e ambientes refinados também combina com a
representação da cultura de salões e refeições da época.

## 2. Diagrama MER lógico

O banco de dados foi planejado para armazenar informações sobre
produtos.

### Explicação da entidade

**PRODUTO:** representa todos os produtos disponíveis no cardápio da
cafeteria, como cafés, chás, bolos, tortas e doces.

-   **ID_produto (PK):** identifica cada produto de forma única.
-   **Nome:** nome do produto, como "Chá da Rainha".
-   **Descricao:** apresenta os ingredientes ou características do
    produto.
-   **Preco:** valor do produto.
-   **Categoria:** identifica o tipo do produto, como café, chá ou
    sobremesa.
-   **Imagem:** armazena o endereço/nome da imagem utilizada para
    representar o produto no site.

## 3. Funcionamento da aplicação

A página inicial apresenta a identidade visual da cafeteria, utilizando
elementos decorativos inspirados no período Regency, como molduras,
flores, detalhes dourados e uma paleta de cores pastel.

O usuário pode navegar pelo site através do menu principal e acessar as
diferentes áreas da aplicação.

### Tela inicial

A página inicial apresenta o nome da cafeteria e botões para acessar o
cardápio.

### Cardápio

O cardápio apresenta os produtos disponíveis, como cafés, bolos, tortas
e doces. Cada produto possui nome, descrição, preço e imagem.

## 4. Escolhas técnicas

Para o desenvolvimento da aplicação foram utilizadas tecnologias
voltadas para a criação de sites dinâmicos.

-   **HTML:** utilizado para estruturar as páginas e organizar os
    elementos apresentados ao usuário.
-   **CSS:** utilizado para desenvolver a identidade visual da
    cafeteria. Foram escolhidas cores pastel e detalhes dourados para
    criar uma aparência elegante e inspirada no estilo Regency.
-   **JavaScript:** utilizado para adicionar interatividade à aplicação,
    como atualização de quantidades, interação com o carrinho e
    validações de formulários.
-   **PHP:** utilizado para desenvolver a parte do servidor e realizar a
    comunicação entre a aplicação e o banco de dados.
-   **MySQL:** utilizado para armazenar os dados dos clientes, produtos
    e pedidos. A utilização de um banco de dados relacional facilita a
    organização das informações e permite relacionar clientes aos
    pedidos e pedidos aos respectivos produtos.

A divisão entre frontend, backend e banco de dados foi escolhida para
deixar o projeto organizado e facilitar futuras alterações e melhorias.

## 5. Código comentado

``` php
// Busca os produtos cadastrados no banco
// para exibir o cardápio da cafeteria.
$sql = "SELECT * FROM produtos";
```

## 6. Conclusão

O desenvolvimento do site da cafeteria teve como objetivo unir uma
aplicação funcional a uma identidade visual temática. A inspiração na
estética Regency permitiu criar uma experiência diferenciada, utilizando
cores suaves, elementos florais, detalhes dourados e referências ao
universo de cafés e chás.

Além da parte visual, o projeto possibilitou trabalhar conceitos de
desenvolvimento web, banco de dados, relacionamento entre tabelas,
formulários e gerenciamento de pedidos.
