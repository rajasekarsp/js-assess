// Write Javascript Here
const baseUrl = "http://localhost:3000/users";
const headers = {
    'Content-type': 'application/json; charset=UTF-8'
};
refreshUI();

function refreshUI() {
    getUsersRequest().then(users =>{
        //This function has been implemented already for you
        const tableEl = document.getElementById("table");
        for (const user of users) {
            tableEl.appendChild(createTableRow(user))
        }
    })
}

function addNewUser(){
    //TODO: Implement me
    var userName = window.prompt("Add User");
    if(!userName) return;
    var user =  {
        name: userName
    };
    createUserRequest(user).then( (data)=> {
        clearTableRows();
        refreshUI();
    });
}

function editUser(id, userName){
    //TODO: implement me
    var updatedUserName = window.prompt("Edit User", userName);
    if(!updatedUserName || (updatedUserName === userName)) return;
    var user =  {
        id: id,
        name: updatedUserName
    };
    updateUserRequest(user).then( (data)=> {
        clearTableRows();
        refreshUI();
    });
}

function deleteUser(id){
    //TODO: implement me
    deleteUserRequest(id).then( (data)=> {
        clearTableRows();
        refreshUI();
    });
}

function clearTableRows() {
    let tableEl = document.getElementById("table");
    var tableRows = tableEl.getElementsByTagName('tr');
    var rowCount = tableRows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        tableEl.removeChild(tableRows[x]);
    }
}

//CRUD HELPER METHODS
function createUserRequest(user){
    return fetch(baseUrl, {
        method: 'POST',
        headers: headers,
        body:JSON.stringify(user),
    }).then(response => response.json())
}

function  getUsersRequest()  {
    return fetch(baseUrl, {
        method: 'GET',
    }).then(response => response.json())
}

function  deleteUserRequest(id)  {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    }).then(response => response.json())
}

function updateUserRequest(user){
    return fetch(`${baseUrl}/${user.id}`, {
        method: 'PATCH',
        headers: headers,
        body:JSON.stringify(user),
    }).then(response => response.json())
}

//HELPER METHODS
function createTableRow(user){
    var tr = document.createElement("tr");
    tr.innerHTML = `<td>${user.name}</td> <td><a href="#" onclick="editUser(${user.id}, '${user.name}')">Edit</a> / <a href="#" onclick="deleteUser(${user.id})">Delete</a></td>`;
    return tr;
}
