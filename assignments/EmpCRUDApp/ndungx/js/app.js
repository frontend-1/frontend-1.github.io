//add
function createEmployeeInfo() {
    var keys = ['full_name', 'age', 'address', 'y_o_e', 'phone_number', 'email', 'd_o_j'];
    var obj = {};
    var employees = getEmployees();

    keys.forEach(function(item, index) {
        var result = document.getElementById(item).value;
        if (result) {
            obj[item] = result;
        }
    })


    if (!employees.length) {
        $('.show-table-info').addClass('hide');
    }

    if (Object.keys(obj).length) {
        employees.push(obj);
        var data = JSON.stringify(employees);
        localStorage.setItem("employees", data);
        clearFields();
        insertIntoTable(obj, getTotalRowOfTable());
        $('#addnewModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
    location.reload();
}

function getEmployees() {
    var employeeRecord = localStorage.getItem("employees");
    var employees = [];
    if (!employeeRecord) {
        return employees;
    } else {
        employees = JSON.parse(employeeRecord);
        return employees;
    }
}

function insertIntoTable(item, tableIndex) {
    var table = document.getElementById('employee_table');
    var row = table.insertRow();
    var idCell = row.insertCell(0);
    var fulltNameCell = row.insertCell(1);
    var ageCell = row.insertCell(2);
    var addressCell = row.insertCell(3);
    var yearsOfExperienceCell = row.insertCell(4);
    var phoneNumberCell = row.insertCell(5);
    var emailCell = row.insertCell(6);
    var dateOfJoiningCell = row.insertCell(7);

    idCell.innerHTML = tableIndex;
    fulltNameCell.innerHTML = item.full_name;
    ageCell.innerHTML = item.age;
    addressCell.innerHTML = item.address;
    yearsOfExperienceCell.innerHTML = item.y_o_e;
    phoneNumberCell.innerHTML = item.phone_number;
    emailCell.innerHTML = item.email;
    dateOfJoiningCell.innerHTML = item.d_o_j;
}

function getTotalRowOfTable() {
    var table = document.getElementById('employee_table');
    return table.rows.length;
}

function clearFields() {
    $('#input_form')[0].reset();
}

function getTableData() {
    $("#employee_table").find("tr:not(:first)").remove();

    var searchKeyword = $('#employee_table').val();
    var employees = getEmployees();

    var filteredEmployees = employees.filter(function(item, index) {
        return item.full_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.age.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.address.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.y_o_e.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.phone_number.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.d_o_j.toLowerCase().includes(searchKeyword.toLowerCase())
    });

    if (!filteredEmployees.length) {
        $('.show-table-info').removeClass('hide');
    } else {
        $('.show-table-info').addClass('hide');
    }

    filteredEmployees.forEach(function(item, index) {
        insertIntoTable(item, index + 1);
    })
}

//search
function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("employee_search");
    filter = input.value.toUpperCase();
    table = document.getElementById("employee_table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

(function mounted() {
    getTableData();
    $("#d_o_j").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1960:2020',
    });
    $("#edit_d_o_j").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1960:2020',
    })
})();

// edit
var table = document.getElementById("employee_table"),
    rIndex;

for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function() {
        rIndex = this.rowIndex;
        console.log(rIndex);

        document.getElementById("edit_full_name").value = this.cells[1].innerHTML;
        document.getElementById("edit_age").value = this.cells[2].innerHTML;
        document.getElementById("edit_address").value = this.cells[3].innerHTML;
        document.getElementById("edit_y_o_e").value = this.cells[4].innerHTML;
        document.getElementById("edit_phone_number").value = this.cells[5].innerHTML;
        document.getElementById("edit_email").value = this.cells[6].innerHTML;
        document.getElementById("edit_d_o_j").value = this.cells[7].innerHTML;
    };
}

function updateEmployeeData() {
    var users = [],
        dataInLocalStorage = localStorage.getItem('employees');

    users = JSON.parse(dataInLocalStorage);

    var employee = {
        full_name,
        age,
        address,
        y_o_e,
        phone_number,
        email,
        d_o_j
    };

    employee.full_name = $('#edit_full_name').val();
    employee.age = $('#edit_age').val();
    employee.address = $('#edit_address').val();
    employee.y_o_e = $('#edit_y_o_e').val();
    employee.phone_number = $('#edit_phone_number').val();
    employee.email = $('#edit_email').val();
    employee.d_o_j = $('#edit_d_o_j').val();

    users[rIndex] = employee;
    localStorage.setItem('employees', JSON.stringify(users));
    $("#member_table").find("tr:not(:first)").remove();
    $('.modal-backdrop').remove();
    getTableData();
    deleteRow();
}


// update
function editRow() {
    table.rows[rIndex].cells[1].innerHTML = document.getElementById("edit_full_name").value;
    table.rows[rIndex].cells[2].innerHTML = document.getElementById("edit_age").value;
    table.rows[rIndex].cells[3].innerHTML = document.getElementById("edit_address").value;
    table.rows[rIndex].cells[4].innerHTML = document.getElementById("edit_y_o_e").value;
    table.rows[rIndex].cells[5].innerHTML = document.getElementById("edit_phone_number").value;
    table.rows[rIndex].cells[6].innerHTML = document.getElementById("edit_email").value;
    table.rows[rIndex].cells[7].innerHTML = document.getElementById("edit_d_o_j").value;
    updateEmployeeData();
}

//delete
function deleteEmployeeData() {
    if (rIndex != null) {
        swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    deleteRow();
                    swal("Employee has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Employee safe!");
                }
            });
    } else {
        swal("Select by click on a row you want to delete!");
    }
    $('.swal-button--danger').click(function() {
        setTimeout(reload, 2000);
    })
}

function reload() {
    location.reload();
}

function deleteRow() {
    var users = [],
        dataInLocalStorage = localStorage.getItem('employees');

    users = JSON.parse(dataInLocalStorage);

    users.splice(rIndex - 1, 1);

    localStorage.setItem('employees', JSON.stringify(users));

    $("#employee_table").find("tr:not(:first)").remove();
    $('.modal-backdrop').remove();
    getTableData();
    rIndex + 1;
}

//select and highlight row
highlight_row();

function highlight_row() {
    var table = document.getElementById('employee_table');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function() {
            // Get the row id where the cell exists
            var rowId = this.parentNode.rowIndex;
            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "#D9EAFF";
            rowSelected.className += " selected";
        }
    }
}