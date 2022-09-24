$('.cpf').mask("999.999.999-99")
$('.rg').mask("99.999.999-9")

function formInputComponent({ label, id, placeholder, className = [''] }) {

    const component = 
        `<div class="col-sm-12 col-md-6 col-lg-3 mb-3">`+
        `<form class="">`+
        `<label for="${id}" class="form-label text-white">*${label}</label>`+
        `<input type="text" class="form-control form-control validar ${className.join(' ')}" id="${id}" validar="${id}" placeholder="${placeholder}">`+

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
    label: "Email",
    id: "email",
    placeholder: "exemplo@mail.com"
})
formInputComponent({
    label: "Idade",
    id: "idade",
    placeholder: "18"
})