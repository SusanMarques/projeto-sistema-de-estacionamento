# Tutorial de Download do Sistema Smart Park

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
Escolha a branch que deseja utilizar. A branch mais atual é `bancodedadosmelhorias`. Para mudar para esta branch, utilize o comando:
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
