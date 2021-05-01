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
}