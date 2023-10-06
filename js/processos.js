export function atualizarTabelaProcessos(data) {
    // Atualize a DataTable de Processos com os novos dados
    var tabelaProcessos = $('#tabelaProcessos').DataTable();

    // Limpe os dados existentes na tabela
    tabelaProcessos.clear().draw();

    // Preencha a tabela com os novos dados
    if (data.listaProcessos) {
        data.listaProcessos.forEach(function (processo) {
            tabelaProcessos.row.add([
                processo.idProcesso,
                processo.proprietario,
                processo.ultimaNotaFaturada,
                processo.detalheLock,
                processo.estaEmLock ? 'Sim' : 'Não'
            ]).draw(false);
        });
    }
}