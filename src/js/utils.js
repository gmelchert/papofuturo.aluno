var FILE_VERSION = new Date().getTime().toString()

function loadPage(page) {
    const element = $(`#main-content`)

    fetch(`src/pages/${page}.html`)
        .then(result => result.text())
        .then(result => element.empty().append(result))
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