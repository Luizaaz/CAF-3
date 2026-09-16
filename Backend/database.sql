CREATE DATABASE IF NOT EXISTS royal_garden_db;
USE royal_garden_db;
DROP TABLE IF EXISTS produtos;
CREATE TABLE produtos (id INT AUTO_INCREMENT PRIMARY KEY,nome VARCHAR(100) NOT NULL,preco DECIMAL(10,2) NOT NULL,imagem_url VARCHAR(500) NOT NULL,descricao TEXT);
INSERT INTO produtos (nome,preco,imagem_url,descricao) VALUES
('Quiche Tradicional de Queijo',12.90,'https://images.unsplash.com/photo-1554321580-0a253a6bc4e1?auto=format&fit=crop&w=600&q=80','Quiche artesanal recheado com queijo emmental e ervas finas'),
('Torre de Macarons Royal',18.90,'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80','Seleção de macarons delicados nos sabores baunilha, framboesa e mirtilo'),
('Cupcakes Red Velvet',22.90,'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=600&q=80','Massa aveludada de cacau com cobertura suave de cream cheese'),
('Chocolate Quente Cremoso',26.90,'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80','Chocolate belga 70% derretido com chantilly, canela e especiarias'),
('Croissant de Amêndoas',15.50,'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80','Massa folhada amanteigada recheada com creme de amêndoas e lascas tostadas'),
('Torta de Frutas Vermelhas',24.00,'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80','Base crocante com creme patissière e topo de morangos, amoras e mirtilos frescos'),
('Café Espresso Especial',8.50,'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80','Grãos selecionados 100% Arábica de torra média-escura'),
('Cheesecake de Frutas Amarelas',21.90,'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80','Cheesecake no estilo nova-iorquino com calda artesanal de maracujá e manga');
