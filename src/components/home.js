$('.cpf').mask("999.999.999-99")

function searchCpf() {
    const cpf = $('.cpf').val()
    if (!cpf) return alerta('Campo CPF obrigatório.', 'alerta')

    api(`cpf/${cpf}`).then(res => {
        const { success, rows, message } = res

        if (!success) alerta(res.error || message, 'erro')
        if (!rows)
        console.log(res)
    })
}