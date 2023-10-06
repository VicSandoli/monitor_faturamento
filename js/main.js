import { atualizarTabelaProcessos } from './processos.js';
import { atualizarTabelaFiliais } from './filiais.js';

/**
 * Retrieves data from a REST service.
 *
 * @return {Promise} A Promise that resolves with the data obtained from the service, or rejects with an error.
 */
function obterDadosDoServico() {
    var url = 'http://serv-dev2:8972/abavct/monitor/getMonitorFat#'; // URL do seu serviço REST

    return new Promise(function (resolve, reject) {
        // Fazer uma chamada AJAX para buscar os dados do serviço REST
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Resolve a Promise com os dados obtidos
                resolve(data);
            },
            error: function (error) {
                // Rejeita a Promise em caso de erro
                reject(error);
            }
        });
    });
}

/**
 * Updates the data in the DataTables by retrieving new data from the service.
 * Sets a timeout to update the data again in 2 seconds.
 *
 * @return {undefined} No return value.
 */
function atualizarDados() {
    obterDadosDoServico()
        .then(function (dados) {
            // Atualize os dados nas DataTables
            atualizarTabelaProcessos(dados);
            atualizarTabelaFiliais(dados);

            // Defina um novo timeout para atualizar novamente em 2 segundos
            setTimeout(atualizarDados, 2000); // 2000 milissegundos = 2 segundos
        })
        .catch(function (error) {
            console.error('Erro ao obter dados do serviço REST:', error);

            // Exiba uma mensagem de erro ao usuário
            alert('Ocorreu um erro ao obter os dados do serviço REST. Por favor, tente novamente mais tarde.');

            // Em caso de erro, tente novamente após 2 segundos
            setTimeout(atualizarDados, 2000); // 2000 milissegundos = 2 segundos
        });
}

// Inicialize a função de atualização quando a página estiver pronta
$(document).ready(function () {
    // Inicie a atualização dos dados
    atualizarDados();
});
