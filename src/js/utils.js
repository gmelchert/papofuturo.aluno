var FILE_VERSION = new Date().getTime().toString()

function loadPage(page) {
    const element = $(`#main-content`)

    fetch(`src/pages/${page}.html`)
        .then(result => result.text())
        .then(result => 
            element.empty().append(result)
        )
        .catch(() => alerta(`Falha ao carregar página: ${page}`, 'erro'))
}

function alerta(message, type='sucesso') {
    let backgroundColor

    const text = typeof message === 'string' ? message : message.sqlMessage

    switch (type) {
        case 'sucesso':
            backgroundColor = '#40e331d9'
            break;

        case 'erro':
            backgroundColor = 'red'
            break;
            
        case 'alerta':
            backgroundColor = 'orange'
            break;
    
        default:
            break;
    }

    return Toastify({
        backgroundColor,
        text,
        close: true,
        duration: 3000
    }).showToast()
}

function api(url, method = 'GET', body = {}) {
    return new Promise((resolve, reject) => {
        if (!url) return resolve({ success: false, message: 'Sem URL' })

        if (self.fetch) {
            const apiurl = `http://localhost:3000/${url}`

            let headers = new Headers()
            headers.append("Content-Type", "application/json")

            let init = {
                method,
                headers,
                mode: 'cors',
                cache: 'default'
            }

            if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
                Object.keys(body).length
                    ? init.body = JSON.stringify(body)
                    : init.body = body
            }

            fetch(apiurl, init)
                .then(response => {
                    if (!response) {
                        response = { success: true, message: "OK" };
                    }

                    return response.json()
                })
                .then(json => 
                    resolve(json)
                ).catch(error => 
                    resolve({
                        "message": "Houve um problema com sua requisição",
                        "error": error.message
                    })
                )

        } else {
            reject({
                "message": "A API Fetch não está disponível no seu dispositivo!"
            })
        }
    })
}

function validaCpfCnpj(val) {
    if (val.length == 11 || val.length == 14) {
        let cpf = val.trim();
     
        cpf = cpf.replace(/\./g, '');
        cpf = cpf.replace('-', '');
        cpf = cpf.split('');
        
        let v1 = 0;
        let v2 = 0;
        let aux = false;
        
        for (let i = 1; cpf.length > i; i++) {
            if (cpf[i - 1] != cpf[i]) {
                aux = true;   
            }
        } 
        
        if (aux == false) {
            return false; 
        } 
        
        for (let i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
            v1 += cpf[i] * p; 
        } 
        
        v1 = ((v1 * 10) % 11);
        
        if (v1 == 10) {
            v1 = 0; 
        }
        
        if (v1 != cpf[9]) {
            return false; 
        } 
        
        for (let i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
            v2 += cpf[i] * p; 
        } 
        
        v2 = ((v2 * 10) % 11);
        
        if (v2 == 10) {
            v2 = 0; 
        }
        
        if (v2 != cpf[10]) {
            return false; 
        } else {   
            return true; 
        }
    } else {
        return false;
    }
}

function loadComponent(page, id) {
    const element = $(`#${id}`)

    fetch(`src/pages/components/${page}.html`)
        .then(result => result.text())
        .then(result => 
            element.empty().append(result)
        )
        .catch(() => alerta(`Falha ao carregar página: ${page}`, 'erro'))
}

function capsFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function logout() {
    loadPage('home')
}