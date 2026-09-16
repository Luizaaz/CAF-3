const express=require("express");
const mysql=require("mysql2/promise");
const path=require("path");
const app=express(),PORT=3000;
const DB={host:"localhost",port:3306,user:"root",password:""},NAME="royal_garden_db";

const seed=[
["Quiche Tradicional de Queijo",12.90,"https://images.unsplash.com/photo-1554321580-0a253a6bc4e1?auto=format&fit=crop&w=600&q=80","Quiche artesanal recheado com queijo emmental e ervas finas"],
["Torre de Macarons Royal",18.90,"https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80","Seleção de macarons delicados nos sabores baunilha, framboesa e mirtilo"],
["Cupcakes Red Velvet",22.90,"https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=600&q=80","Massa aveludada de cacau com cobertura suave de cream cheese"],
["Chocolate Quente Cremoso",26.90,"https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80","Chocolate belga 70% derretido com chantilly, canela e especiarias"],
["Croissant de Amêndoas",15.50,"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80","Massa folhada amanteigada recheada com creme de amêndoas e lascas tostadas"],
["Torta de Frutas Vermelhas",24.00,"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80","Base crocante com creme patissière e topo de morangos, amoras e mirtilos frescos"],
["Café Espresso Especial",8.50,"https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80","Grãos selecionados 100% Arábica de torra média-escura"],
["Cheesecake de Frutas Amarelas",21.90,"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80","Cheesecake no estilo nova-iorquino com calda artesanal de maracujá e manga"]
];

async function init(){
 let c;
 try{
  c=await mysql.createConnection(DB);
  await c.query(`CREATE DATABASE IF NOT EXISTS \`${NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await c.changeUser({database:NAME});
  await c.query(`CREATE TABLE IF NOT EXISTS produtos(id INT AUTO_INCREMENT PRIMARY KEY,nome VARCHAR(100) NOT NULL,preco DECIMAL(10,2) NOT NULL,imagem_url VARCHAR(500) NOT NULL,descricao TEXT)`);
  const [r]=await c.query("SELECT COUNT(*) total FROM produtos");
  if(r[0].total===0) await c.query("INSERT INTO produtos(nome,preco,imagem_url,descricao) VALUES ?",[seed]);
  await c.end();
 }catch(e){console.error("\nERRO NO MYSQL:",e.message,"\nLigue o MySQL no XAMPP.");process.exit(1)}
}
const conn=()=>mysql.createConnection({...DB,database:NAME});
app.use(express.json());
app.get("/api/produtos",async(req,res)=>{let c;try{c=await conn();const [r]=await c.query("SELECT * FROM produtos ORDER BY id");res.json(r)}catch(e){res.status(500).json({error:e.message})}finally{if(c)await c.end()}});
app.post("/api/produtos",async(req,res)=>{let c;try{const{nome,preco,imagem_url,descricao}=req.body;c=await conn();const[r]=await c.query("INSERT INTO produtos(nome,preco,imagem_url,descricao) VALUES(?,?,?,?)",[nome,preco,imagem_url,descricao||""]);res.status(201).json({id:r.insertId,nome,preco,imagem_url,descricao})}catch(e){res.status(500).json({error:e.message})}finally{if(c)await c.end()}});
app.delete("/api/produtos/:id",async(req,res)=>{let c;try{c=await conn();await c.query("DELETE FROM produtos WHERE id=?",[req.params.id]);res.json({ok:true})}catch(e){res.status(500).json({error:e.message})}finally{if(c)await c.end()}});
app.use(express.static(path.join(__dirname,"..","Frontend")));
app.get("*splat",(req,res)=>res.sendFile(path.join(__dirname,"..","Frontend","index.html")));
init().then(()=>app.listen(PORT,()=>console.log(`\n☕ Servidor: http://localhost:${PORT}\nMySQL conectado.\n`)));
