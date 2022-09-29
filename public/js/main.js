const socket = io.connect();

socket.on("mensajes", (data) =>{
    render(data);
});

//chat
function render(data) {
    const fecha = new Date();
    const html = data.map((elemento)=>{
        return `<div>
                <strong>${elemento.author}</strong>
                <em>[${fecha.toLocaleString()}]</em>:
                <em>${elemento.text}</em></div>
        `;
        })
        .join(" ");
    document.getElementById("mensajes").innerHTML = html;
};

function addMessage(e){
    const mensaje = {
        author: document.getElementById("username").value,
        text: document.getElementById("texto").value,
    };
    socket.emit("new-mensaje", mensaje);
    return false
}

//productos