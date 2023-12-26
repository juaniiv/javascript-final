let usuarios = obtenerUsuarios();

function obtenerUsuarios() {
    const usuariosGuardados = localStorage.getItem("usuarios");
    return usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
}

function validarInicioSesion(event) {
    event.preventDefault();

    const email = $("#exampleInputEmail1").val();
    const contrasena = $("#exampleInputPassword1").val();

    const usuarioEncontrado = usuarios.find(user => user.email === email && user.contrasena === contrasena);
    const mensajeInicioSesion = $("#mensajeInicioSesion");

    if (usuarioEncontrado) {
        $("#exampleInputEmail1").val("");
        $("#exampleInputPassword1").val("");

        
        mensajeInicioSesion.text("");

        
        mensajeInicioSesion.removeClass("error").text(`Inicio de sesión exitoso. Bienvenido, ${usuarioEncontrado.nombre} (${usuarioEncontrado.email}).`);

        
        window.location.href = "inicio.html";
    } else {
        
        mensajeInicioSesion.addClass("error").text("Inicio de sesión fallido. Verifica tu email y contraseña.");
    }
}

const botonIniciarSesion = $("button.btn-primary");
botonIniciarSesion.on("click", validarInicioSesion);

function mostrarFormularioRegistro() {
    const formularioInicioSesion = $(".formulario form");
    formularioInicioSesion.css("display", "none");

    const formularioRegistro = $("<form>").html(`
        <h1>Registro</h1>
        <div class="mb-3">
            <label for="nombreRegistro" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombreRegistro" placeholder="Ingrese su nombre">
        </div>
        <div class="mb-3">
            <label for="edadRegistro" class="form-label">Edad</label>
            <input type="number" class="form-control" id="edadRegistro" placeholder="Ingrese su edad">
        </div>
        <div class="mb-3">
            <label for="emailRegistro" class="form-label">Email</label>
            <input type="email" class="form-control" id="emailRegistro" placeholder="Ingrese su email">
        </div>
        <div class="mb-3">
            <label for="contrasenaRegistro" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="contrasenaRegistro" placeholder="Ingrese su contraseña">
        </div>
        <button type="submit" class="btn btn-primary">Registrarse</button>
    `);

    const formularioContainer = $(".formulario");
    formularioContainer.append(formularioRegistro);

    const botonRegistrarse = formularioRegistro.find("button.btn-primary");
    botonRegistrarse.on("click", guardarUsuarioRegistro);
}

const enlaceRegistro = $("a[href='#']");
enlaceRegistro.on("click", mostrarFormularioRegistro);

function guardarUsuarioRegistro(event) {
    event.preventDefault();

    const nombre = $("#nombreRegistro").val();
    const edad = $("#edadRegistro").val();
    const email = $("#emailRegistro").val();
    const contrasena = $("#contrasenaRegistro").val();

    if (!nombre || !email || !edad || !contrasena) {
        console.error("Por favor, complete todos los campos.");
        return;
    }

    const nuevoUsuario = { nombre, edad, email, contrasena };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    $("#nombreRegistro").val("");
    $("#edadRegistro").val("");
    $("#emailRegistro").val("");
    $("#contrasenaRegistro").val("");

    console.log("Usuario registrado con éxito.", nuevoUsuario);
    console.log("Usuarios actuales:", usuarios);

    // Redirigir a la página de inicio
    window.location.href = "inicio.html";
}

function obtenerYMostrarUsuarios() {
    console.log('Usuarios locales registrados:', usuarios);
}

obtenerYMostrarUsuarios();
