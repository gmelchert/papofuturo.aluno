

function searchCpf() {
    const cpf = !$('#cpfBuscaLg:visible').length ? $("#cpfBuscaSm").val() : $('#cpfBuscaLg').val()
    if (!cpf) return alerta('Campo CPF obrigatório.', 'alerta')

    api(`cpf/${cpf}`).then(res => {
        const { success, rows, message } = res
        if (!success) return alerta(res.error || message, 'erro')
        if (!rows) return $("#mensagemSemCadastro").show()


        console.log(res)
    })
}