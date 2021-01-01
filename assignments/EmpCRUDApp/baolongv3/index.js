

internalStorage = window.localStorage;

window.onload = () => {
    if(internalStorage.getItem('currentList') === null){
        internalStorage.setItem('currentList','[]');
    } 
    loadTable();

}

const AlertTemplate = swal.mixin({
    customClass : {
        confirmButton : 'btn btn-success mr-2',
        cancelButton : 'btn btn-danger mr-2'
    },
    buttonsStyling : false
})

function addData(){

    let data = formToJSON();
    var employee = new Employee(data.name,data.age,data.address,data.yoe,data.phoneNumber,data.email,data.joinDate);
    let currentSession = internalStorage.getItem('currentList');
    if(currentSession === null){
        let currentSession = new Array();
        currentSession.push(employee);
        internalStorage.setItem('currentList',JSON.stringify(currentSession));
    }
    else {
        let currentSession = JSON.parse(internalStorage.getItem('currentList'));
        currentSession.push(employee);
        internalStorage.setItem('currentList',JSON.stringify(currentSession));

    }

}

function formToJSON(){   
    let formData = new FormData(document.querySelector('#add-form'))
    let JSON = {};
    for(var pair of formData){
        JSON[pair[0]] = pair[1];
    }
    return JSON;
}



function loadTable(){
    var currentSession = JSON.parse(internalStorage.getItem('currentList'));
    var bodyref = document.getElementById('emp-table').getElementsByTagName('tbody')[0];
    var i = 0;
    if(Array.isArray()){
        return;
    } else{
        for(item of currentSession){
            var row = bodyref.insertRow();
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);
            var cell6 = row.insertCell(6);
            var cell7 = row.insertCell(7);
            cell0.innerHTML = ++i;
            cell1.innerHTML = item.name;
            cell2.innerHTML = item.age;
            cell3.innerHTML = item.address;
            cell4.innerHTML = item.YOE;
            cell5.innerHTML = item.phoneNumber;
            cell6.innerHTML = item.email;
            cell7.innerHTML = item.joinDate;

            
        }
    }
}


function updateEmployee(){
    var currentSession = JSON.parse(internalStorage.getItem('currentList'));
    let form = document.getElementById('update-form');
    let index = form.childNodes[1].childNodes[3].value - 1;
    currentSession[index].name = form.childNodes[3].childNodes[3].value;
    currentSession[index].age = form.childNodes[5].childNodes[3].value ;
    currentSession[index].address = form.childNodes[7].childNodes[3].value ;
    currentSession[index].YOE = form.childNodes[9].childNodes[3].value ;
    currentSession[index].phoneNumber = form.childNodes[11].childNodes[3].value ;
    currentSession[index].email = form.childNodes[13].childNodes[3].value ;
    currentSession[index].joinDate = form.childNodes[15].childNodes[3].value ;
    
    internalStorage.setItem('currentList',JSON.stringify(currentSession));



}

function currentSessionLength(){
    return JSON.parse(internalStorage.getItem('currentList')).length;
}

function setMaxIndex(formTarget){
    var indexInput = formTarget.childNodes[1].childNodes[3];
    indexInput.setAttribute("max",currentSessionLength());
}

function reloadDeleteForm(){
    let form = document.getElementById('delete-form');
    let index = form.childNodes[1].childNodes[3].value - 1;
    let currentSession = JSON.parse(internalStorage.getItem('currentList'));
    let tbodyref = form.getElementsByTagName('tbody')[0];
    if(document.querySelectorAll('#delete-table tbody tr').length == 0){
        var row = tbodyref.insertRow();
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);
        var cell7 = row.insertCell(7);
        cell0.innerHTML = index+1;
        cell1.innerHTML = currentSession[index].name;
        cell2.innerHTML = currentSession[index].age;
        cell3.innerHTML = currentSession[index].address;
        cell4.innerHTML = currentSession[index].YOE;
        cell5.innerHTML = currentSession[index].phoneNumber;
        cell6.innerHTML = currentSession[index].email;
        cell7.innerHTML = currentSession[index].joinDate;
    } else{
        document.querySelectorAll('#delete-table tbody tr')[0].remove();
        var row = tbodyref.insertRow();
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);
        var cell7 = row.insertCell(7);
        cell0.innerHTML = index+1;
        cell1.innerHTML = currentSession[index].name;
        cell2.innerHTML = currentSession[index].age;
        cell3.innerHTML = currentSession[index].address;
        cell4.innerHTML = currentSession[index].YOE;
        cell5.innerHTML = currentSession[index].phoneNumber;
        cell6.innerHTML = currentSession[index].email;
        cell7.innerHTML = currentSession[index].joinDate;
    }

}

function reloadUpdateForm(){
    let form = document.getElementById('update-form');
    let currentSession = JSON.parse(internalStorage.getItem('currentList'));
    let index = form.childNodes[1].childNodes[3].value;
    form.childNodes[3].childNodes[3].value = currentSession[index - 1].name;
    form.childNodes[5].childNodes[3].value = currentSession[index - 1].age;
    form.childNodes[7].childNodes[3].value = currentSession[index - 1].address;
    form.childNodes[9].childNodes[3].value = currentSession[index - 1].YOE;
    form.childNodes[11].childNodes[3].value = currentSession[index - 1].phoneNumber;
    form.childNodes[13].childNodes[3].value = currentSession[index - 1].email;
    form.childNodes[15].childNodes[3].value = currentSession[index - 1].joinDate;
    
}

function promptAddAlert(){
    AlertTemplate.fire({
        icon : 'warning',
        title : 'Confirmation',
        text : 'Do you want to add this employee?',
        confirmButtonText : 'Yes',
        showCancelButton: true,
        cancelButtonText: 'No'

    }).then((result) =>{
        if(result.isConfirmed){
            addData();
            swal.fire({
                icon : 'success',
                title : "Success!",
                text : 'Successfully Added Employee!'
            }).then(() => location.reload());
            
        } else{
            location.reload();
        }
    });
}

function promptUpdateAlert(){
    AlertTemplate.fire({
        icon : 'info',
        title : 'Confirmation',
        text : 'Do you want to update this employee?',
        confirmButtonText : 'Yes',
        showCancelButton: true,
        cancelButtonText: 'No'

    }).then((result) =>{
        if(result.isConfirmed){
            updateEmployee();
            swal.fire({
                icon : 'success',
                title : "Success!",
                text : 'Successfully Updated Employee!'
            }).then(() => location.reload());
            
        } else{
            location.reload();
        }
    });
}

function promptDeleteAlert(){
    AlertTemplate.fire({
        icon : 'error',
        title : 'Confirmation',
        text : 'Do you want to delete this employee?',
        confirmButtonText : 'Yes',
        showCancelButton: true,
        cancelButtonText: 'No'

    }).then((result) =>{
        if(result.isConfirmed){
            removeEmployee();
            swal.fire({
                icon : 'success',
                title : "Success!",
                text : 'Successfully Deleted Employee!'
            }).then(() => location.reload());
            
            
        }else{
            location.reload();
        }
    });
}

function removeEmployee(){
        let form = document.getElementById('delete-form');
        let currentSession = JSON.parse(internalStorage.getItem('currentList'));
        let index = form.childNodes[1].childNodes[3].value;
        currentSession = currentSession.splice(index,1);
        internalStorage.setItem('currentList',JSON.stringify(currentSession));
        location.reload;
}
//Model 
class Employee{
    constructor(name,age,address,YOE,phoneNumber,email,joinDate){
        this.name = name;
        this.age = age;
        this.address = address;
        this.YOE = YOE;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.joinDate = joinDate;
    }
    
}