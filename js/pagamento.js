document.addEventListener('DOMContentLoaded', function() {
    async function carregarRegistrosAPagar() {
        try {
            const response = await fetch('http://localhost:3001/api/registros/apagar');
            const registros = await response.json();
            const cupomPagamentoDiv = document.getElementById('cupom-pagamento');
            let detalhesHTML = '<h2>Registros a Pagar</h2><table class="table"><thead><tr><th>Placa</th><th>Hora de Entrada</th><th>Hora de Saída</th><th>Tempo Total (Minutos)</th><th>Valor a Pagar</th><th>Ações</th></tr></thead><tbody>';

            registros.forEach(registro => {
                const horaEntrada = new Date(registro.hora_entrada);
                const horaSaida = new Date(registro.hora_saida);
            
                if (horaSaida > horaEntrada) {
                    const tempoTotalMinutos = Math.ceil((horaSaida - horaEntrada) / (1000 * 60));
                    const valorAPagar = (tempoTotalMinutos * 0.20).toFixed(2);
            
                    detalhesHTML += `<tr>
                        <td>${registro.placa}</td>
                        <td>${horaEntrada.toLocaleTimeString()}</td>
                        <td>${horaSaida ? horaSaida.toLocaleTimeString() : ''}</td>
                        <td>${tempoTotalMinutos}</td>
                        <td>R$ ${valorAPagar}</td>
                        <td>${registro.status === 'Pago' ? 'Pago' : `<button class="btn btn-success" onclick="pagar(${registro.id})">Pagar</button>`}</td>
                    </tr>`;
                }
            });

            detalhesHTML += '</tbody></table>';
            cupomPagamentoDiv.innerHTML = detalhesHTML;
        } catch (error) {
            console.error('Erro ao carregar registros:', error);
        }
    }

    window.pagar = async function(id) {
        try {
            const response = await fetch(`http://localhost:3001/api/registros/${id}/pagar`, {
                method: 'PUT'
            });
    
            if (response.ok) {
                carregarRegistrosAPagar(); // Atualiza a lista de registros a pagar
                alert('Pagamento realizado com sucesso!');
            } else {
                console.error('Erro ao pagar registro');
            }
        } catch (error) {
            console.error('Erro ao pagar registro:', error);
        }
    }

    function buscarPlaca() {
        const input = document.getElementById("search-placa").value.toLowerCase();
        const linhas = document.querySelector("#cupom-pagamento tbody").getElementsByTagName("tr");

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

    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('hora').innerHTML = h + ":" + m + ":" + s;
        setTimeout(startTime, 500);
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    carregarRegistrosAPagar();
    document.getElementById('search-placa').addEventListener('input', buscarPlaca);
    startTime();
});
