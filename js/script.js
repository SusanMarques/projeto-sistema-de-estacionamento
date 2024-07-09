
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


// função para relógio

    function startTime()
    {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    // adicione um zero na frente de números<10
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('hora').innerHTML=h+":"+m+":"+s;
    t=setTimeout('startTime()',500);
    }
    function checkTime(i)
    {
    if (i<10)
    {
    i="0" + i;
    }
    return i;
}

//buscar por placa

function buscarPlaca() {
    const input = document.getElementById("search-placa").value.toLowerCase();
    const linhas = document.getElementById("corpo-da-tabela").getElementsByTagName("tr");

    for (let i = 0; i < linhas.length; i++) {
        const celulaPlaca = linhas[i].getElementsByTagName("td")[0];
        if (celulaPlaca) {
            const placa = celulaPlaca.textContent || celulaPlaca.innerText;
            if (placa.toLowerCase().indexOf(input) > -1) {
                linhas[i].style.display = "";
            } else {
                linhas[i].style.display = "none";
            }
        }
    }
}
