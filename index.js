const express = require('express');
const path = require('path');
const { usuario, pessoa } = require('./models');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// rotas
app.get('/', async function(req, res){
  var pessoas = await pessoa.findAll();
  res.render('index', {pessoas});
})

// lista de pessoas e usuarios criados e apagados
app.get('/pessoas', async function(req, res){
  var pessoas = await pessoa.findAll();
  res.render('index', {pessoas});
})


// criando pessoas e usuários
app.get('/pessoas/criar', async function(req,res){
  var pessoas = await pessoa.findAll();
  res.render('pessoas/criar',{pessoas})
}
)

//enviar formulario
app.post('/pessoas/criar', async function(req, res){
  try {
      await pessoa.create(req.body);
      res.redirect('/pessoas')
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ocorreu um erro ao criar o usuário.' });
  }
})  








// apagando pessoas e usuarios
app.get('/pessoas/apagar', async function(req,res){
  var pessoas = await pessoa.findAll();
  res.render('pessoas',{pessoas})
}
)

app.get('/pessoas/apagar', async function(req, res){
  try {
      await pessoa.destroy(req.body);
      res.redirect('/pessoas')
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ocorreu um erro ao apagar o usuário.' });
  }
})












//escutando a porta do server
app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});