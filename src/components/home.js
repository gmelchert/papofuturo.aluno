$('.cpf').mask("999.999.999-99")
$('.rg').mask("99.999.999-9")

$("#cpfBuscaLg").on('keypress', e => {
    if (e.which == 13) {
        e.preventDefault()
        searchCpf()
    }
})

$("#cpfBuscaSm").on('keypress', e => {
    if (e.which == 13) {
        e.preventDefault()
        searchCpf()
    }
})

function searchCpf() {
    const cpf = !$('#cpfBuscaLg:visible').length ? $("#cpfBuscaSm").val() : $('#cpfBuscaLg').val()
    if (!cpf) return alerta('Campo CPF obrigatório.', 'alerta')

    api(`cpf/${cpf}`).then(res => {
        const { success, rows, message } = res
        if (!success) return alerta(res.error || message, 'erro')
        if (!rows.length) {
            alerta('Usuário não encontrado.', 'alerta')
            return $("#mensagemSemCadastro").show()
        }


        console.log(res)
    })
}