document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contacto__formulario");
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const mensajeInput = document.getElementById("mensaje");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        borrarErrores();

        let valid = true;

        valid = validarCampo(nombreInput, "El nombre es obligatorio", valor => valor !== "") && valid;
        valid = validarCampo(emailInput, "El correo electrónico no es válido", validarEmail) && valid;
        valid = validarCampo(mensajeInput, "El mensaje es obligatorio", valor => valor !== "") && valid;

        if (valid) {
            mostrarMensajeExito();
            form.reset();
        }
    });

    function validarCampo(input, mensajeError, criterio) {
        if (!criterio(input.value.trim())) {
            mostrarError(input, mensajeError);
            return false;
        }
        return true;
    }

    function mostrarError(input, mensaje) {
        let error = input.nextElementSibling;

        if (!error || !error.classList.contains("error")) {
            error = document.createElement("p");
            error.classList.add("error");
            input.parentNode.insertBefore(error, input.nextSibling);
        }

        error.textContent = mensaje;
    }

    function borrarErrores() {
        const errores = document.querySelectorAll(".error");
        errores.forEach(error => error.remove());
    }

    function mostrarMensajeExito() {
        const exito = document.createElement("p");
        exito.classList.add("exito");
        exito.textContent = "Formulario enviado exitosamente";
        form.appendChild(exito);

        setTimeout(() => exito.remove(), 5000);
    }

    function validarEmail(email) {
        const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return re.test(email);
    }
})   