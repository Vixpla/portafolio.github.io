let estados = [0,0,0];

function desplegar(a,selector,elemento) {
    var des = document.querySelector(a);
    if (estados[selector] == 0) {
        des.style.display = "block";
        estados[selector] = 1;
    } else {
        des.style.display = "none";
        estados[selector] = 0;
    }
	var icon = elemento.querySelector('.flecha');
    icon.classList.toggle('rotar');
}