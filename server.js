const express = require("express")

const app = express()
const PORT = 3000

let array = []


app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.post("/usuario", (req, res) => {
  const {nome, gmail} = req.body
  console.log("Nome:", nome)
  console.log("Gmail:", gmail)
  array.push([nome, gmail])
  console.log("Todos:", array)
  
  res.send(`
    <h2>Usuário cadastrado!</h2>
    <a href="/usuarios">Ver todos</a>
    `)
  })
app.get("/usuarios", (req, res) => {

  let lista = array.map((user, index) => {
    return `<p>${index + 1} - ${user[0]} (${user[1]})</p>`
  }).join("")

  res.send(`
    <h1>Lista de Usuários</h1>
    ${lista}
    <br>
    <a href="/">Voltar</a>
  `)
})
app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:3000");
})