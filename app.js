// TODO: BOTONES
const btnEncrypt = document.getElementById('encrypt');
const btnDecrypt = document.getElementById('decrypt');
const btnCopy = document.getElementById('copy-message');

// TODO: CONTENEDORES
const message = document.getElementById('message');
const showMessage = document.getElementById('show-message');

// TODO: AREAS
const areaEmpy = document.querySelector('.message-empy');
const areaEncrypt = document.querySelector('.message-encrypt');
const areaAlert = document.querySelector('.info-alert');

const keyList = Object.entries({
    "a": 'ai',
    "e": 'enter',
    "i": 'imes',
    "o": 'ober',
    "u": 'ufat',
});

// Evento click al boton de copiar
btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(showMessage.textContent);
})

// Evento click al boton de encriptar
btnEncrypt.addEventListener('click', () => {
    const messageValue = message.value;
    if (messageValue == "") {
        areaAlert.innerHTML = '<p><i class="ri-alert-line"></i>Escriba un mensaje</p>';
        areaAlert.classList.add('active');
        areaEmpy.style.display = "flex";
        areaEncrypt.style.display = "none";
    } else {
        areaAlert.innerHTML = '<p id="alert"><i class="ri-information-fill"></i>Solo letras minúsculas y sin acentos.</p>';
        const msgValidated = validar(messageValue);
        if (msgValidated != null) {
            encriptar(msgValidated);
        } else {
            areaEmpy.style.display = "flex";
            areaEncrypt.style.display = "none";
        }
    }
}
);

// Evento click al boton de desencriptar
btnDecrypt.addEventListener('click', () => {
    const messageValue = message.value;
    if (messageValue == "") {
        areaAlert.innerHTML = '<p><i class="ri-alert-line"></i>Escriba un mensaje</p>';
        areaAlert.classList.add('active');
        areaEmpy.style.display = "flex";
        areaEncrypt.style.display = "none";
    } else {
        areaAlert.innerHTML = '<p id="alert"><i class="ri-information-fill"></i>Solo letras minúsculas y sin acentos.</p>';
        const msgValidated = validar(messageValue);
        if (msgValidated != null) {
            desencriptar(msgValidated);
        } else {
            areaEmpy.style.display = "flex";
            areaEncrypt.style.display = "none";
        }
    }
});

// Funcion que valida si el mensaje escrito tiene acentos o es mayuscula.
function validar(msg) {
    areaAlert.classList.remove('active');
    let regex = /[A-ZáéíóúÁÉÍÓÚ]+/g;
    if (regex.test(msg)) {
        setTimeout(() => {
            areaAlert.classList.add('active');
        }, 10);
        return null
    } else {
        areaAlert.classList.remove('active');
        return msg;
    }
}

// Funcion para encriptar y mostrar el mensaje en pantalla
function encriptar(msg) {
    let msgArr = []
    let newMsg = "";
    for (let i = 0; i < msg.length; i++) {
        msgArr[i] = msg.charAt(i);
    }
    msgArr.forEach(letra => {
        keyList.forEach(key => {
            if (letra === key[0]) {
                letra = letra.replace(key[0], key[1]);
            }
        });
        return newMsg += letra;
    });
    areaEmpy.style.display = "none";
    areaEncrypt.style.display = "flex";
    showMessage.textContent = newMsg;
}

// Funcion para desencriptar y mostrar el mensaje en pantalla
function desencriptar(msg) {
    const regex = /ai|enter|imes|ober|ufat/g;
    msg = msg.replace(regex, function (codigo) {
        if (codigo == keyList[0][1]) {
            return keyList[0][0];
        } else if (codigo == keyList[1][1]) {
            return keyList[1][0];
        } else if (codigo == keyList[2][1]) {
            return keyList[2][0];
        } else if (codigo == keyList[3][1]) {
            return keyList[3][0];
        } else if (codigo == keyList[4][1]) {
            return keyList[4][0];
        }
    });
    areaEmpy.style.display = "none";
    areaEncrypt.style.display = "flex";
    showMessage.textContent = msg;
}