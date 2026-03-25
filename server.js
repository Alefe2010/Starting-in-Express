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
    return `<p>${index + 1} - ${user[0]} (${user[1]})  
      <a href="/editar/${index}">
          <button>Atualizar</button>
        </a>
      <a href="/deletar/${index}">
        <button type="button">
          Deletar
        </button>
        </a></p>
       `
  }).join(" ")

  res.send(`
    <h1>Lista de Usuários</h1>
    ${lista}
    <br>
    <a href="/">Voltar</a>
  `)
})
app.get("/editar/:id", (req, res) => {
  const id = req.params.id
  const usuario = array[id]

  res.send(`
    <h1>Editar Usuário</h1>
    <form id="formEditar">
      <input 
        type="text" 
        name="nome"
        value="${usuario[0]}"
      >
      <input 
        type="text"
        name="gmail"
        value="${usuario[1]}"
      >
      <button type="submit">
        Atualizar
      </button> 

    </form>
    <a href="/usuarios">Voltar</a>
    <script>
      document
      .getElementById("formEditar")
      .addEventListener("submit", async (e) => {
        e.preventDefault()
        const form = e.target

        const nome = form.nome.value
        const gmail = form.gmail.value

        await fetch("/usuarios/${id}", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome,
            gmail
          })
        })
        window.location.href = "/usuarios"
      })
    </script>
  `)
})
app.patch("/usuarios/:id", (req, res) => {
  const id = req.params.id
  const { nome, gmail } = req.body
  if (nome) {
    array[id][0] = nome
  }
  if (gmail) {
    array[id][1] = gmail
  }
  res.json(array[id])
})
app.get("/deletar/:id", (req, res) => {
  const id = req.params.id

  console.log("Deletando:", array[id])
  array.splice(id, 1)
  res.redirect("/usuarios")
})

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:3000");
})