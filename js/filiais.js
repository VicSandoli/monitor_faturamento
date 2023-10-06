export function atualizarTabelaFiliais(data) {
    // Atualize a DataTable de Filiais com os novos dados
    var tabelaFiliais = $('#tabelaFiliais').DataTable();

    // Limpe os dados existentes na tabela
    tabelaFiliais.clear().draw();

    // Preencha a tabela com os novos dados
    if (data.listaFiliais) {
        data.listaFiliais.forEach(function (filial) {
            tabelaFiliais.row.add([
                filial.filialCodigo,
                filial.filialNome,
                filial.itensNaFilaFaturamento,
                filial.detalheLock,
                filial.possuiTarefa ? 'Sim' : 'Não',
                filial.estaEmLock ? 'Sim' : 'Não'
            ]).draw(false);
        });
    }
}