document.addEventListener("DOMContentLoaded", () => 
    {
        //Selecciona todos los div que son hijos directos de .container-fluid
        let divs = document.querySelectorAll(".contenedor-team > div");
    
        divs.forEach(function(div)
        {
            let texto = div.querySelector(".texto-oculto");
    
            div.addEventListener("mouseover", () =>
            {
                texto.style.visibility = "visible";
            });
    
            div.addEventListener("mouseout", () => 
            {
                texto.style.visibility = "hidden";
            });
        });
    });