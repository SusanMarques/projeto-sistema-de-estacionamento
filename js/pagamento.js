document.addEventListener('DOMContentLoaded', function() {
    function carregarRegistrosAPagar() {
        const registrosSalvos = localStorage.getItem('registros');
        const cupomPagamentoDiv = document.getElementById('cupom-pagamento');

        if (registrosSalvos) {
            const registros = JSON.parse(registrosSalvos);
            let detalhesHTML = '<h2>Registros a Pagar</h2><table class="table"><thead><tr><th>Placa</th><th>Hora de Entrada</th><th>Hora de Saída</th><th>Tempo Total (Minutos)</th><th>Valor a Pagar</th><th>Ações</th></tr></thead><tbody>';

            for (const placa in registros) {
                const registro = registros[placa];
                if (registro.status === 'A pagar') {
                    const horaEntrada = new Date('1970-01-01T' + registro.horaAtual);
                    const horaSaida = new Date('1970-01-01T' + registro.horaSaida);

                    if (horaSaida > horaEntrada) {
                        const tempoTotalMinutos = Math.ceil((horaSaida - horaEntrada) / (1000 * 60));
                        const valorAPagar = (tempoTotalMinutos * 0.20).toFixed(2);

                        detalhesHTML += `<tr>
                            <td>${registro.placa}</td>
                            <td>${registro.horaAtual}</td>
                            <td>${registro.horaSaida}</td>
                            <td>${tempoTotalMinutos}</td>
                            <td>R$ ${valorAPagar}</td>
                            <td><button class="btn btn-success" onclick="pagar('${placa}')">Pagar</button></td>
                        </tr>`;
                    }
                }
            }

            detalhesHTML += '</tbody></table>';
            cupomPagamentoDiv.innerHTML = detalhesHTML;
        }
    }

    function pagar(placa) {
        const registrosSalvos = localStorage.getItem('registros');
        if (registrosSalvos) {
            const registros = JSON.parse(registrosSalvos);
            registros[placa].status = 'Pago';

            localStorage.setItem('registros', JSON.stringify(registros));

            // Recarregar a página para atualizar a lista de registros a pagar
            carregarRegistrosAPagar();
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

    // Função para relógio
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
