function formInputComponent({ label, id, placeholder, className = [''], type = 'text'}) {

    const component = 
        `<div class="col-sm-12 col-md-6 col-lg-3 mb-3">`+
        `<form class="">`+
        `<label for="${id}" class="form-label text-white">*${label}</label>`+
        `<input type="${type}" class="form-control form-control validar ${className.join(' ')}" id="${id}" validar="${id}" placeholder="${placeholder}">`+

        `<div id="valida${id}" class="invalid-feedback">`+
        `Campo obrigatório*`+
        `</div>`+

        `</form>`+
        `</div>`

    $("#formulario").append(component)
}

formInputComponent({
    label: "CPF",
    id: "cpf",
    placeholder: "12345678910",
    className: ['cpf']
})

formInputComponent({
    label: "Senha",
    id: "senha",
    placeholder: "*",
    className: ['senha'],
    type: 'password'
})

formInputComponent({
    label: "Confirmar Senha",
    id: "confirmarsenha",
    placeholder: "*",
    className: ['senha'],
    type: 'password'
})

formInputComponent({
    label: "RG",
    id: "rg",
    placeholder: "123456789",
    className: ['rg']
})

formInputComponent({
    label: "Nome",
    id: "nome",
    placeholder: "Gabriel"
})

formInputComponent({
    label: "Sobrenome",
    id: "sobrenome",
    placeholder: "da Silva Cruz"
})

formInputComponent({
    label: "Idade",
    id: "idade",
    placeholder: "18"
})

formInputComponent({
    label: "Email",
    id: "email",
    placeholder: "exemplo@mail.com"
})

formInputComponent({
    label: "Telefone",
    id: "fone",
    placeholder: "(11) 98765-4321",
    className: ['telefone']
})

$('.cpf').mask("999.999.999-99")
$('.rg').mask("99.999.999-9")
$('.telefone').mask("(99) 99999-9999")

async function postRegister() {
    const cpf = $("#cpf").val();
    if (!validaCpfCnpj(cpf)) return alerta('CPF inválido.', 'erro')

    const
        rg = $("#rg").val(),
        fone = $("#fone").val(),
        email = $("#email").val(),
        idade = $("#idade").val(),
        sobrenome = $("#sobrenome").val(),
        nome = $("#nome").val(),
        senha = $("#senha").val().trim(),
        confirmarSenha = $("#confirmarsenha").val().trim()

    const body = {
        cpf,
        rg,
        fone,
        email,
        idade,
        sobrenome,
        nome,
        confirmarSenha,
        senha
    }
    if (Object.values(body).some(val => !val)) return alerta('Falta de campos obrigatórios.', 'erro')

    return await api(`cpf`, 'POST', body).then(res => {
        if (!res.success) return alerta(res.error || res.message, 'erro')

        alerta(res.message)
        loadPage('home')
    })
}