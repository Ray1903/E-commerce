var clave="usuarioAutenticado"
var usuarioAutenticado = false 


if(clave in localStorage)
{
    usuarioAutenticado = localStorage.getItem(clave)
}

else 
{
    localStorage.setItem("usuarioAutenticado", usuarioAutenticado)
}

function verificarUsuario() {
   
     usuarioAutenticado = JSON.parse(localStorage.getItem(clave));
    if (usuarioAutenticado == false) {
        window.location.href = "Assets/html/login.html";
    } else {
       
        window.location.href = "Assets/html/carrito.html";
    }
}

function validarUsuario(event) {
    event.preventDefault(); 

    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    
    fetch('https://fakestoreapi.com/users')
        .then(res => res.json())
        .then(usuarios => {
           
            var usuarioValido = usuarios.find(function(usuario) {
                return usuario.username === username && usuario.password === password;
            });

            if (usuarioValido) {
        
                alert("Inicio de sesión exitoso");
                usuarioAutenticado = true
                localStorage.setItem("usuarioAutenticado", usuarioAutenticado)
                window.location.href = "carrito.html";
            } else {
               
                alert("Nombre de usuario o contraseña incorrectos");
            }
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
            alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.");
        });
}