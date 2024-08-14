# [Sistema de estacionamento Smart Park]

<img src="/assets/img/teladecadastro.png">

> Descrição do projeto "Este sistema trata-se de uma aplicação desktop feita utilizando JavaScript, HTML ,CSS e framework Electron. para a construção do servidor foi utilizado o Express. e o SGBD utilizado foi o postgreSQL. Com o sistema nesta primeira versão é possível cadastrar entrada e saída de veículos, gestão de vagas e gerir o pagamento".

[![Autor](https://img.shields.io/badge/SusanMarques-SusanMarques-ff9000?style=flat-square)](https://github.com/SusanMarques)
[![Languages](https://img.shields.io/github/languages/count/SusanMarquesprojeto-sistema-de-estacionamento?color=%23ff9000&style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/SusanMarques/projeto-sistema-de-estacionamento?color=ff9000&style=flat-square)](https://github.com/SusanMarques/projeto-sistema-de-estacionamento/stargazers)
[![Forks](https://img.shields.io/github/forks/SusanMarques/projeto-sistema-de-estacionamento?color=%23ff9000&style=flat-square)](https://github.com/SusanMarques/projeto-sistema-de-estacionamento/network/members)
[![Contributors](https://img.shields.io/github/contributors/SusanMarques/projeto-sistema-de-estacionamento?color=ff9000&style=flat-square)](https://github.com/SusanMarques/projeto-sistema-de-estacionamento/graphs/contributors)

# :pushpin: Sumario deste projeto

- [Título e Imagem de capa](#Sistema-de-estacionamento-Smart-Park)
- [Descrição do Projeto](#Sistema-de-estacionamento-Smart-Park)
- [Badge](#Sistema-de-estacionamento-Smart-Park)
- [Índice](#sumario-deste-projeto)
- [Features](#rocket-features)
- [Encontrou algum bug?](#bug-bugs)
- [Contribuição](#tada-contribuição)
- [Licença](#closed_book-licença)
- [Documento de Requisitos](#documento-de-requisitos)

<br />

# :rocket: Features

- Este sistema possui algumas funcionalidades que permitem realizar operações básicas no estacionamento.
Abaixo estão detalhadas as principais funcionalidades implementadas:

RF1 - Cadastro de Dados de Veículos (Placa, Cor, Tipo, Descrição): Registro de informações do veículo (ID, placa, cor, tipo: carro, moto ou caminhão, descrição: como modelo). 

RF2 - Controle de Entrada e Saída de veículos: Registro de entrada e saída de veículos com data e hora.

RF3 - Botão de Checkout com Registro da Hora de Saída: Ao clicar em checkout é capturado a hora de saída do veículo que é atualizada no banco de dados, anteriormente o estado dela é null.

RF4 - Relógio com hora atual: captura a hora atual e exibe na interface do usuário em todas as páginas do sistema.

RF5 - Gestão de vagas, atualização da Quantidade de Vagas Disponíveis: O sistema deve monitorar em tempo real a ocupação das vagas de estacionamento. Manter um controle preciso das vagas disponíveis na página inicial do sistema.

RF6 - Tarifação e Pagamento: Cálculo automático de tarifas baseado no tempo de permanência. Integração com diversos métodos de pagamento (cartão de crédito, débito, Pix e dinheiro).

RF7 - Registro de a pagar: na página de pagamento existe uma tabela com registros atualizados dos valores a pagar baseado no tempo de permanência. Os dados presentes na tabela são: a placa, hora de entrada, hora de saída, valor total a pagar, tempo total em minutos, status exemplo: a pagar ou pago, e um botão pagar.

RF8 - Atualização do Status de Pagamento (de "A Pagar" para "Pago"): ao efetuar o pagamento o status é alterado de “a pagar” para “pago” na página de index e é atualizado nos registros da página de pagamento.

RF9 - Atualização do botão de pagamento: Remoção do Botão de Pagamento após Conclusão do Pagamento.

RF10 - Persistência das Informações no Banco de Dados: Armazenar as informações no banco de dados.

RF11 - Busca de Veículos pela Placa: O sistema deve permitir que o usuário faça buscas pelo número da placa.

- Funcionalidades futuras:

RF12 - Integração com Formas de Pagamento (PIX, Cartão de Crédito, Débito)

RF13 - Cadastro de clientes: Registro de informações do motorista (código, nome, Data, CPF/CNPJ, Nascimento, Sexo, Endereço, Bairro, Cidade, UF, CEP, Telefone, Celular). possibilidades de inserir, alterar, excluir, consultar mensalidade no caso do cliente ser mensalista.

RF14 -Entrada no sistema: O usuário deve ser capaz de realizar o login utilizando os dados cadastrados (usuário e senha)exemplo: o usuário administrador. O sistema deve validar as credenciais do usuário antes de conceder acesso.

RF15 - Gestão de caixa:  O sistema deve registrar todos os pagamentos efetuados. código, data de entrada, hora de entrada, data de saída, hora de saída, valor, forma de pagamento, usuário. 

RF16 - Mapeamento do estacionamento: 
O sistema deve designar vagas específicas, como vagas para deficientes, idosos, etc.
O sistema deve fornecer uma visualização da ocupação das vagas para os administradores.
O sistema deve alertar quando o estacionamento estiver com a capacidade máxima ou próxima da máxima.

RF17- Tabela de preços flexível: O sistema deve permitir cadastrar os preços em uma tabela que atualiza o valor dos preços no sistema.

RF18 - Cadastro de mensalistas: O sistema deve permitir cadastrar os mensalistas, com nome do cliente, dados do cliente da tabela de clientes, código, categoria, CPF/CNPJ, Contrato, valor, valor mensal, dia de pagamento, limite de vagas, ID / Placas.

RF19 - Emissão de tickets com QR codes ou códigos de barras. O sistema deve emitir tickets com código de barras.

RF20 - Emissão de cupom fiscal

FR21 - alteração da quantidade de vagas: terá uma funcionalidade que possibilita o usuário alterar a quantidade de vagas disponíveis.


# :framed_picture: UI Interface do Usuário

<p align="left">
    <img src="/assets/img/home.png" /> 
    <img src="/assets/img/tela-de-pagamento.png">
    <img src="/assets/img/teladecadastro.png">
</p>

# :construction_worker: Guia de instalação

**Voce precisa instalar [Node.js](https://nodejs.org/pt) primeiro, para clonar este repositorio via HTTPS**

Este guia explica como configurar o sistema Smart Park em seu ambiente local.

## Passos para a configuração

### 1. Clonar o repositório
Clone o repositório no seu diretório local usando o seguinte comando no terminal:
```bash
git clone https://github.com/SusanMarques/projeto-sistema-de-estacionamento.git
```

### 2. Abrir o arquivo no editor de códigos
Abra o diretório clonado no seu editor de códigos preferido.

### 3. Mudar para a branch desejada
Escolha a branch que deseja utilizar. A branch mais atualizada é `bancodedadosmelhorias`. Para mudar para esta branch, utilize o comando:
```bash
git checkout bancodedadosmelhorias
```

### 4. Instalar as dependências
Instale todas as dependências necessárias com o comando:
```bash
npm install
```

### 5. Criar o banco de dados
Crie o banco de dados `sistemaSmartPark` com o seguinte comando SQL:
```sql
CREATE DATABASE sistemaSmartPark;
```

### 6. Criar a tabela `registros`
Dentro do banco `SistemaSmartPark`, crie a tabela `registros` usando o comando SQL a seguir:
```sql
CREATE TABLE registros(
    id SERIAL PRIMARY KEY,
    placa VARCHAR(10) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    tipo VARCHAR(50),
    descricao TEXT,
    hora_entrada TIMESTAMP NOT NULL,
    hora_saida TIMESTAMP,
    valor_hora NUMERIC(10,2),
    forma_pagamento VARCHAR(20),
    status VARCHAR(20)
);
```

### 7. Modificar o arquivo `db.js` com as configurações do banco
Altere o arquivo `db.js` com as configurações necessárias para conectar ao seu banco PostgreSQL:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',  // usuário do banco
    host: 'localhost',  // endereço do banco
    database: 'sistemaSmartPark',  // nome do banco
    password: '******',  // senha do banco
    port: 5432,  // porta do banco
});

module.exports = pool;
```

# :runner: Vamos começar

Execute o seguinte comando para iniciar o app em um ambiente de desenvolvimento:

`npm start`

# :postbox: FAQ

**Pergunta:** Quais tecnologias foram utilizadas neste projeto?

**Resposta:** As tecnologias utilizadas são: [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript), [electron](https://www.electronjs.org/), [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML) and [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), [express](https://expressjs.com/pt-br/) e para o SGBD [postgreSQL](https://www.postgresql.org/).

# :bug: Bugs

Sinta-se à vontade para **registrar um novo problema** com o respectivo título e descrição no repositorio [projeto-sistema-de-estacionamento](https://github.com/SusanMarques/projeto-sistema-de-estacionamento/issues). Se você já encontrou uma solução para o seu problema, **adoraria revisar sua solicitação de pull request**! Dê uma olhada em nosso **gia de contribuição abaixo**.

# :tada: Contribuição

### Se você quiser contribuir para este projeto, siga estas etapas:

1. Faça um fork do projeto.
2. Crie uma branch para a sua feature `git checkout -b feat/NomeDaSuaFeature`.
3. Faça commit das suas alterações `git commit -am "[add/edit/del]/feat: Descrição da feature"`.
4. Faça push para a branch `git push origin feat/NomeDaSuaFeature`.
5. Crie um novo Pull Request.

# :closed_book: Licença

Lançado em 2024.
Este projeto esta sob a licença [MIT license](https://github.com/SusanMarques/projeto-sistema-de-estacionamento/blob/master/LICENSE).


# [Documento de requisitos]

Para abrir o documento de requisitos do sistema Smart Park clique aqui: [documento](https://drive.google.com/file/d/1obUWX7tYoqZhJQtIW-nYMeGNBOjqfFsU/view?usp=sharing).
