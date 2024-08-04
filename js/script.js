document.addEventListener('DOMContentLoaded', function() {
    let totalVagas = 30; // Definindo o total de vagas

    // Função para carregar registros do servidor ao inicializar a página
    async function carregarRegistros() {
        try {
            const response = await fetch('http://localhost:3000/api/registros');
            const registros = await response.json();
            for (const registro of registros) {
                adicionarLinhaNaTabela(registro);
            }
            atualizarVagasDisponiveis(registros);
        } catch (error) {
            console.error('Erro ao carregar registros:', error);
        }
    }

    // Função para adicionar uma linha na tabela
    function adicionarLinhaNaTabela(dadosLinha) {
        const corpoDaTabela = document.getElementById('corpo-da-tabela');
        if (!corpoDaTabela) {
            console.error("Elemento 'corpo-da-tabela' não encontrado.");
            return;
        }

        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${dadosLinha.placa}</td>
            <td>${dadosLinha.tipo}</td>
            <td>${dadosLinha.descricao}</td>
            <td>${new Date(dadosLinha.hora_entrada).toLocaleTimeString()}</td>
            <td>${dadosLinha.valor_hora}</td>
            <td>${dadosLinha.forma_pagamento}</td>
            <td>${dadosLinha.status}</td>
            <td class="hora-saida">${dadosLinha.hora_saida ? new Date(dadosLinha.hora_saida).toLocaleTimeString() : ''}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deletarLinha(this, '${dadosLinha.id}')">Excluir</button>
                <button class="btn btn-primary btn-sm" onclick="marcarSaida(this, '${dadosLinha.id}')">Checkout</button>
            </td>
        `;
        corpoDaTabela.appendChild(novaLinha);
    }

    // Função para adicionar os dados do formulário na tabela
    async function adicionarNaTabela() {
        // Pegar os valores dos inputs
        const placa = document.getElementById('placa').value;
        const tipo = document.getElementById('tipo').value;
        const descricao = document.getElementById('descricao').value;

        // Pega a hora atual
        const agora = new Date();
        const valorHora = 12.00;
        const formaPagamento = "Cartão";
        const status = "A pagar"; // Mantido como "A pagar"

        // Criar um objeto para os dados da linha
        const dadosLinha = {
            placa: placa,
            tipo: tipo,
            descricao: descricao,
            hora_entrada: agora,
            valor_hora: valorHora,
            forma_pagamento: formaPagamento,
            status: status
        };

        try {
            const response = await fetch('http://localhost:3000/api/registros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLinha)
            });

            if (response.ok) {
                const novoRegistro = await response.json();
                adicionarLinhaNaTabela(novoRegistro);
                atualizarVagasDisponiveis();
            } else {
                console.error('Erro ao adicionar registro');
            }
        } catch (error) {
            console.error('Erro ao adicionar registro:', error);
        }

        // Limpar os inputs após adicionar os dados
        document.getElementById('formulario-principal').reset();
    }

    // Função para marcar a saída
    window.marcarSaida = async function(button, id) {
        const confirmacao = confirm("Você realmente gostaria de registrar a saída?");
        if (confirmacao) {
            try {
                const response = await fetch(`http://localhost:3000/api/registros/${id}/saida`, {
                    method: 'PUT'
                });

                if (response.ok) {
                    const registroAtualizado = await response.json();
                    const linha = button.parentNode.parentNode;
                    const celulaHoraSaida = linha.getElementsByClassName('hora-saida')[0];
                    celulaHoraSaida.textContent = new Date(registroAtualizado.hora_saida).toLocaleTimeString();
                } else {
                    console.error('Erro ao registrar saída');
                }
            } catch (error) {
                console.error('Erro ao registrar saída:', error);
            }
        }
    };

    // Função para deletar uma linha e remover do banco de dados
    window.deletarLinha = async function(button, id) {
        try {
            const response = await fetch(`http://localhost:3000/api/registros/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                const linha = button.parentNode.parentNode;
                linha.parentNode.removeChild(linha);
                atualizarVagasDisponiveis();
            } else {
                console.error('Erro ao deletar registro');
            }
        } catch (error) {
            console.error('Erro ao deletar registro:', error);
        }
    };

    // Função para atualizar a quantidade de vagas disponíveis
    function atualizarVagasDisponiveis() {
        fetch('http://localhost:3000/api/registros')
            .then(response => response.json())
            .then(registros => {
                const vagasDisponiveis = totalVagas - registros.length;
                const vagasElement = document.getElementById('quantidade-de-vagas');
                if (vagasElement) {
                    vagasElement.textContent = `${vagasDisponiveis} vagas`;
                }
            })
            .catch(error => console.error('Erro ao atualizar vagas disponíveis:', error));
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

    // Função para relógio
    window.startTime = function() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('hora').innerHTML = h + ":" + m + ":" + s;
        setTimeout(startTime, 500);
    };

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    // Carregar os registros quando a página for carregada
    carregarRegistros();

    // Anexar eventos aos botões
    document.getElementById('botao-form').addEventListener('click', adicionarNaTabela);
    document.getElementById('search-placa').addEventListener('input', buscarPlaca);
    startTime();
});
