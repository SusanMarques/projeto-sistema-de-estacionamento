
// função para adicionar os dados do formulário na tabela

function adicionarNaTabela() {
    // Pegar os valores dos inputs
    const placa = document.getElementById('placa').value;
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;

    // pega a hora atual
    const agora = new Date();
    const horaAtual  = agora.toLocaleTimeString();

    //valores padrões 
    const valorHora = "R$ 10,00";
    const formaPagamento = "Cartão";
    const status = "Pago";

    // Criar uma nova linha e adicionar os valores
    const corpoDaTabela = document.getElementById('corpo-da-tabela');
    const novaLinha = document.createElement('tr');

    novaLinha.innerHTML = `
        <td>${placa}</td>
        <td>${tipo}</td>
        <td>${descricao}</td>
        <td>${horaAtual}</td>
        <td>${valorHora}</td>
        <td>${formaPagamento}</td>
        <td>${status}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deletarLinha(this)">Excluir</button></td>
    `;

    // Adicionar a nova linha à corpoDaTabela
    corpoDaTabela.appendChild(novaLinha);

    // Limpar os inputs após adicionar os dados
    document.getElementById('formulario-principal').reset();
}

    function deletarLinha(button){
        const linha = button.parentNode.parentNode;
        linha.parentNode.removeChild(linha);
    }