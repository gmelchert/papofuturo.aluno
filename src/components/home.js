$('.cpf').mask("999.999.999-99")
$('.rg').mask("99.999.999-9")
$(".loginDiv").hide()
$("#senhaDiv").hide()

$("#cpfBuscaLg").on('keypress', e => {
    if (e.which == 13) {
        searchCpf()
    }
})

$("#cpfBuscaSm").on('keypress', e => {
    if (e.which == 13) {
        searchCpf()
    }
})

$("#senha").on('keypress', e => {
    if (e.which == 13) {
        login()
    }
})

function searchCpf() {
    const cpf = !$('#cpfBuscaLg:visible').length ? $("#cpfBuscaSm").val() : $('#cpfBuscaLg').val()
    if (!cpf) return alerta('Campo CPF obrigatório.', 'alerta')

    $("#cpfBuscaSm").val('')
    $("#cpfBuscaLg").val('')

    api(`cpf/${cpf}`).then(res => {
        const { success, rows, message, error } = res
        $("#nomeAluno").empty()
        if (!success) return alerta(error || message, 'erro')
        if (!rows.length) {
            alerta('Usuário não encontrado.', 'alerta')
            return $("#mensagemSemCadastro").show()
        }

        $(".searchInputDiv").hide()
        $("#mensagemSemCadastro").hide()

        $("#nomeAluno").append(`, ${capsFirstLetter(rows[0].nome)}`)
        $("#subtitle").text(`CPF: ${cpf[0]}${cpf[1]}${cpf[2]}.***.***-**`)
        $(".loginDiv").show()
        $("#senhaDiv").show()
        $("#senha").focus()
        $("#cpfHidden").val(cpf)
    })
}

function login() {
    const 
        cpf = $("#cpfHidden").val(),
        password = $("#senha").val()

    if (!password) return alerta('Campo SENHA é obrigatório.', 'alerta')

    api('auth', 'POST', { cpf, password }).then(({ success, message, error }) => {
        if (!success) return alerta(message || error, 'erro')

        alerta(message)
        loadPage('student')
    })

}