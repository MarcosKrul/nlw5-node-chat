const socket = io();
let list_connections = [];

socket.on("admin_list_all_users", (connections) => {
    
    list_connections = connections;
    document.getElementById("list_users").innerHTML = "";
    const template = document.getElementById("template").innerHTML;

    connections.forEach(connection => {
        const rendered = Mustache.render(template, {
            id: connection.socket_id,
            email: connection.user.email
        });
        document.getElementById("list_users").innerHTML += rendered;
    });

});

function call(id) {

    const connection = list_connections.find(connection => connection.socket_id === id);

    const template = document.getElementById("admin_template").innerHTML;
    const rendered = Mustache.render(template, {
        id: connection.user_id,
        email: connection.user.email
    });

    document.getElementById("supports").innerHTML += rendered;


    const params = { user_id: connection.user_id };
    socket.emit("admin_list_messages_by_user", params, (messages) => {
        
        const divMessages = document.getElementById(`allMessages${connection.user_id}`);

        messages.forEach(message => {
            const createDiv = document.createElement("div");
            
            if (message.admin_id === null) {
                createDiv.className = "admin_message_client";
                createDiv.innerHTML = `<span>${connection.user.email} - ${message.text}</span>`
                createDiv.innerHTML += `<span className="admin_date">${dayjs(message.created_at).format("DD/MM/YYY HH:mm:ss")}</span>`
            } else {
                createDiv.className = "admin_message_admin";
                createDiv.innerHTML = `Atendente: <span>${message.text}</span>`
                createDiv.innerHTML += `<span className="admin_date">${dayjs(message.created_at).format("DD/MM/YYY HH:mm:ss")}</span>`
            }

            divMessages.appendChild(createDiv);
        }); 
    });
}


function sendMessage(id) {
    const text = document.getElementById(`send_message_${id}`);
    
    const params = {
        user_id: id,
        text: text.value
    };

    socket.emit("admin_send_message", params); 

    const divMessages = document.getElementById(`allMessages${id}`);
    const createDiv = document.createElement("div");
    createDiv.className = "admin_message_admin";
    createDiv.innerHTML = `Atendente: <span>${params.text}</span>`
    createDiv.innerHTML += `<span className="admin_date">${dayjs().format("DD/MM/YYY HH:mm:ss")}</span>`

    text.value = "";
    divMessages.appendChild(createDiv);
}

socket.on("admin_receive_message", data => {
        
    const connection = list_connections.find(connection => connection.socket_id === data.socket_id);

    const createDiv = document.createElement("div");
    const divMessages = document.getElementById(`allMessages${connection.user_id}`);
            
    createDiv.className = "admin_message_client";
    createDiv.innerHTML = `<span>${connection.user.email} - ${data.message.text}</span>`
    createDiv.innerHTML += `<span className="admin_date">${dayjs(data.message.created_at).format("DD/MM/YYY HH:mm:ss")}</span>`
    divMessages.appendChild(createDiv);
    
});