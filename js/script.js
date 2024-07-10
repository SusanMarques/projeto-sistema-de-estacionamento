let registros = {};

// Função para carregar registros do localStorage ao inicializar a página
function carregarRegistros() {
    const registrosSalvos = localStorage.getItem('registros');
    if (registrosSalvos) {
        registros = JSON.parse(registrosSalvos);
        for (const placa in registros) {
            adicionarLinhaNaTabela(registros[placa]);
        }
    }
}

// Função para adicionar uma linha na tabela
function adicionarLinhaNaTabela(dadosLinha) {
    const corpoDaTabela = document.getElementById('corpo-da-tabela');
    const novaLinha = document.createElement('tr');

    novaLinha.innerHTML = `
        <td>${dadosLinha.placa}</td>
        <td>${dadosLinha.tipo}</td>
        <td>${dadosLinha.descricao}</td>
        <td>${dadosLinha.horaAtual}</td>
        <td>${dadosLinha.valorHora}</td>
        <td>${dadosLinha.formaPagamento}</td>
        <td>${dadosLinha.status}</td>
        <td class="hora-saida">${dadosLinha.horaSaida || ''}</td> <!-- Campo de hora de saída -->
        <td>
            <button class="btn btn-danger btn-sm" onclick="deletarLinha(this, '${dadosLinha.placa}')">Excluir</button>
            <button class="btn btn-primary btn-sm" onclick="marcarSaida(this, '${dadosLinha.placa}')">Saída</button> <!-- Botão de saída -->
        </td>
    `;

    // Adicionar a nova linha ao corpoDaTabela
    corpoDaTabela.appendChild(novaLinha);
}

// Função para adicionar os dados do formulário na tabela
function adicionarNaTabela() {
    // Pegar os valores dos inputs
    const placa = document.getElementById('placa').value;
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;

    // Pega a hora atual
    const agora = new Date();
    const horaAtual = agora.toLocaleTimeString();

    // Valores padrões 
    const valorHora = "R$ 12,00";
    const formaPagamento = "Cartão";
    const status = "A pagar"; // Mantido como "A pagar"

    // Criar um objeto para os dados da linha
    const dadosLinha = {
        placa: placa,
        tipo: tipo,
        descricao: descricao,
        horaAtual: horaAtual,
        valorHora: valorHora,
        formaPagamento: formaPagamento,
        status: status,
        horaSaida: '' // Inicialmente vazio
    };

    // Adicionar os dados ao dicionário de registros
    registros[placa] = dadosLinha;

    // Salvar os registros no localStorage
    localStorage.setItem('registros', JSON.stringify(registros));

    // Adicionar a linha na tabela
    adicionarLinhaNaTabela(dadosLinha);

    // Limpar os inputs após adicionar os dados
    document.getElementById('formulario-principal').reset();
}

// Função para marcar a saída
function marcarSaida(button, placa) {
    const confirmacao = confirm("Você realmente gostaria de registrar a saída?");
    if (confirmacao) {
        const linha = button.parentNode.parentNode;
        const agora = new Date();
        const horaSaida = agora.toLocaleTimeString();

        // Atualizar a hora de saída no dicionário de registros
        registros[placa].horaSaida = horaSaida;

        // Salvar os registros atualizados no localStorage
        localStorage.setItem('registros', JSON.stringify(registros));

        // Atualizar a hora de saída na tabela
        const celulaHoraSaida = linha.getElementsByClassName('hora-saida')[0];
        celulaHoraSaida.textContent = horaSaida;
    }
}

// Função para deletar uma linha e remover do dicionário
function deletarLinha(button, placa) {
    const linha = button.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
    delete registros[placa]; // Remover a entrada do dicionário
    localStorage.setItem('registros', JSON.stringify(registros)); // Atualizar o localStorage
}

// Função para relógio
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // Adicione um zero na frente de números < 10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('hora').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout('startTime()', 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// Função para buscar por placa
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

// Carregar os registros quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarRegistros);
