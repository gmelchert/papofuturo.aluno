function formInputComponent({ label, id, placeholder, className = [''], type = 'text', validar = true}) {

    const component = 
        `<div class="col-sm-12 col-md-6 col-lg-3 mb-3">`+
        `<form class="">`+
        `<label for="${id}" class="form-label text-white">${validar ? '*' : ''}${label}</label>`+
        `<input type="${type}" onfocus="clearAlertMessage('${id}')" class="form-control form-control ${validar ? 'validar' : ''} ${className.join(' ')}" id="${id}" validar="${id}" placeholder="${placeholder}">`+

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
    placeholder: "123.456.789-10",
    className: ['cpf']
})

formInputComponent({
    label: "RG",
    id: "rg",
    placeholder: "12.345.678-9",
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
    label: "Data de Nasc.",
    id: "dt_nasc",
    type: 'date',
    placeholder: "DD/MM/AAAA",
})

formInputComponent({
    label: "Email",
    id: "email",
    placeholder: "exemplo@mail.com"
})

formInputComponent({
    label: "Senha",
    id: "senha",
    placeholder: "********",
    className: ['senha'],
    type: 'password'
})

formInputComponent({
    label: "Confirmar Senha",
    id: "confirmarsenha",
    placeholder: "********",
    className: ['senha'],
    type: 'password'
})

formInputComponent({
    label: "Logradouro",
    id: "logradouro",
    placeholder: "ex: Rua, Av, Jd etc.",
})

formInputComponent({
    label: "Bairro",
    id: "bairro",
    placeholder: "ex: Vila Regente Feijó",
    validar: false
})

formInputComponent({
    label: "Número",
    id: "numero",
    placeholder: "ex: 99",
    type: 'number'
})

formInputComponent({
    label: "Complemento",
    id: "complemento",
    placeholder: "ex: Apto, Casa, Bloco",
    validar: false
})

formInputComponent({
    label: "Telefone",
    id: "fone",
    placeholder: "(11)98765-4321",
    className: ['telefone']
})

$('.cpf').mask("999.999.999-99")
$('.rg').mask("99.999.999-9")
$(".data").mask('31')
$('.telefone').mask("(99)99999-9999")

async function postRegister() {
    const cpf = $("#cpf").val();

    const
        rg = $("#rg").val(),
        fone = $("#fone").val(),
        email = $("#email").val(),
        idade = $("#idade").val(),
        sobrenome = $("#sobrenome").val(),
        nome = $("#nome").val(),
        senha = $("#senha").val().trim(),
        confirmarsenha = $("#confirmarsenha").val().trim(),
        numero = $("#numero").val(),
        bairro = $("#bairro").val(),
        logradouro = $("#logradouro").val(),
        complemento = $("#complemento").val(),
        dt_nasc = $("#dt_nasc").val()

    const body = {
        cpf,
        rg,
        fone,
        email,
        idade,
        sobrenome,
        nome,
        confirmarsenha,
        senha,
        numero,
        bairro,
        logradouro,
        complemento,
        dt_nasc
    }

    const 
        keys = Object.keys(body),
        values = Object.values(body)

    const missingFields = values.map((val, index) => 
        $(`#${keys[index]}`).hasClass('validar')
            ? val
            : 1
    ).map((val, i) => 
        !val 
            ? `#valida${keys[i]}`
            : ''
    ).filter(k => k !== '')

    if (missingFields.length) {
        alerta('Falta de campos obrigatórios.', 'erro')
        return missingFields.forEach(field => $(field).show())
    }

    if (!validaCpfCnpj(cpf)) return alerta('CPF inválido.', 'erro')

    return await api(`cpf`, 'POST', body).then(res => {
        if (!res.success) return alerta(res.error || res.message, 'erro')

        alerta(res.message)
        loadPage('home')
    })
}

function clearAlertMessage(id) {
    $(`#valida${id}`).hide()
}