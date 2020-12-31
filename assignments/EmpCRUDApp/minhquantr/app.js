function render_data_table(employee_list) {
    document.getElementById('Main').innerHTML =
        `
    <table id='data_table' class='styled-table'>
    <tbody>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Years of Experience</th>
            <th>Phone number</th>
            <th>Email ID</th>
            <th>Date of Joining</th>
        </tr>
    </tbody>
    </table>
    `;
    for (temp_emp of employee_list) {
        //tạo cột emp_row
        var emp_row = document.createElement("tr");
        for (emp_attri in temp_emp) {
            var temp_emp_attri = document.createElement("td");
            temp_emp_attri.innerHTML = temp_emp[emp_attri];
            emp_row.appendChild(temp_emp_attri);
        }
        //thêm cột emprow vào bảng
        var newRow = document.getElementById('data_table').insertRow(document.getElementById('data_table').rows.length);
        newRow.innerHTML = emp_row.innerHTML;
    }
}

function render_select_table(employee_list, action, type_of_action_class) {
    document.getElementById('Main').innerHTML =
        `
    <table id='select_table' class='styled-table ${type_of_action_class}'>
    <tbody>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Years of Experience</th>
            <th>Phone number</th>
            <th>Email ID</th>
            <th>Date of Joining</th>
        </tr>
    </tbody>
    </table>
    `;

    for (temp_emp of employee_list) {
        //tạo cột emp_row
        var emp_row = document.createElement("tr");
        for (emp_attri in temp_emp) {
            var temp_emp_attri = document.createElement("td");
            temp_emp_attri.innerHTML = temp_emp[emp_attri];
            emp_row.appendChild(temp_emp_attri);
        }
        //thêm cột emprow vào bảng
        var newRow = document.getElementById('select_table').insertRow(document.getElementById('select_table').rows.length);
        newRow.innerHTML = emp_row.innerHTML;
        newRow.addEventListener("click", action);
    }
}

function find_by_name(emp_name, employee_list) {
    //tim emp_name trong employee_list va trả về cái index để dùng sau này :/
    let i = 0;
    for (emp of employee_list) {
        if (emp.Name === emp_name)
            return i;
        else i++;
    }
    if (i === emp_name.length)
        return -1;
}

function checkphone(phone) {
    var phoneno = /^\d{10}$/;
    if (phone.value.match(phoneno)) {
        return true;
    } else {
        return false;
    }
}
//ADD
function add_emp() {
    //Hiển thị bảng nhập nhân viên mới
    document.getElementById('Message').innerHTML = 'Enter new employee\'s infomation';
    document.getElementById('Main').innerHTML = `
    <div id='add_employee_div' class='styled_form'>
    <div>
        <label for='name'>Name: </label>
        <input type='text' id='name'><br>

        <label for='age'>Age: </label>
        <input type='number' id='age'><br>

        <label for='address'>Address: </label>
        <input type='text' id='address'><br>

        <label for='ex'>Years of Experience: </label>
        <select name="ex" id="ex">
          <option value="0">0</option>
          <option value="0.5">0.5</option>
          <option value="1">1</option>
          <option value="1.5">1.5</option>
          <option value="2">2</option>
        </select><br>

        <label for='phone'>Phone Number: </label>
        <input type='text' id="phone"><br>

        <label for='email'>Email: </label>
        <input type='text' id='email'><br>

        <label for='join_date'>Date of joining: </label>
        <input type='date' id='join_date'><br><br>

        <button onclick='submit_add()'>Add new employee</button>
    </div>
</div>`;

}

function submit_add() {
    //Nhap lieu du lieu, kiem tra va bao loi
    var valid = true;
    if (document.getElementById('name').value === '') {
        alert('Name can\'t be blank');
        valid = false;
    }
    if (document.getElementById('age').value < 0 || document.getElementById('age').value > 80) {
        alert('Age must be > 0 and < 80');
        valid = false;
    }
    if (document.getElementById('phone').value)
        if (!checkphone(document.getElementById('phone'))) {
            alert('Phone number must be 10 digits or empty!');
            valid = false;
        }
    if (valid) {
        //chuyển dữ liệu vào biến employee
        var employee = {
                Name: document.getElementById('name').value,
                Age: document.getElementById('age').value,
                Address: document.getElementById('address').value,
                Ex: document.getElementById('ex').value,
                Phone: document.getElementById('phone').value,
                Email: document.getElementById('email').value,
                Join_date: document.getElementById('join_date').value
            }
            //đẩy vào employeelist
        var employee_list = JSON.parse(localStorage.getItem('myList'));
        employee_list.push(employee);
        localStorage.setItem('myList', JSON.stringify(employee_list));
        // -------------------------------------------------------------
        document.getElementById('Message').innerHTML = `
    Employee <span style='font-size:1.1em; color:red'>${employee.Name}</span> has been added. Here's the employee list
    `;
        render_data_table(employee_list);
    }
}
//UPDATE
function update_emp() {
    document.getElementById('Message').innerHTML = "Choose one in the table below to <span style='color:red; font-weight:bold;'>UPDATE</span> !!";

    var employee_list = JSON.parse(localStorage.getItem('myList'));
    // -------------------------------------------------------------
    render_select_table(employee_list, update_row_employee, 'update-table');

}

function update_row_employee() {
    //logic hỏi xem có chấp nhận confirm update không, nếu không thì quay về

    var employee_list = JSON.parse(localStorage.getItem('myList'));
    var index = find_by_name(this.firstChild.innerHTML, employee_list);
    var up_emp = employee_list[index];

    var user_confirm = confirm(`Do you want to update employee "${up_emp.Name.replace(/ /g,"\ ")}"`);
    var wtf = up_emp.Name;
    if (user_confirm) {
        document.getElementById('Main').innerHTML = ` 
    <div id='update_employee_div' class='styled_form update_form'>
    <div>
        <p>New information <span style='font-size: 0.7em'>(leave blank field if there's no change)</span></p>
        <label for='up_name'>Name: </label>
        <input type='text' id='up_name' placeholder=${up_emp.Name.replace(/ /g,"_")}><br>


        <label for='up_age'>Age: </label>
        <input type='number' id='up_age' placeholder=${up_emp.Age.replace(/ /g,"_")}><br>
     

        <label for='up_address'>Address: </label>
        <input type='text' id='up_address' placeholder=${up_emp.Address.replace(/ /g,"_")}><br>
     

        <label for='up_ex'>Years of Experience: </label>
        <select name="up_ex" id="up_ex">
          <option value="0">0</option>
          <option value="0.5">0.5</option>
          <option value="1">1</option>
          <option value="1.5">1.5</option>
          <option value="2">2</option>
        </select><br>
   

        <label for='up_phone'>Phone Number: </label>
        <input type='text' id='up_phone' placeholder=${up_emp.Phone.replace(/ /g,"_")}><br>
     

        <label for='up_email'>Email: </label>
        <input type='text' id='up_email' placeholder=${up_emp.Email.replace(/ /g,"_")}><br>
      
        
        <label for='up_join_date'>Date of joining: </label>
        <input type='date' id='up_join_date' placeholder=${up_emp.Join_date.replace(/ /g,"_")}><br>
        

        <button onclick='submit_update(${index})'>UPDATE</button>
    </div>
    </div>
    `;
    }
}

function submit_update(index) {
    var employee_list = JSON.parse(localStorage.getItem('myList'));
    //chuyển dữ liệu vào biến employee
    var new_employee = {}
    let valid = true;
    Object.assign(new_employee, employee_list[index]);
    if (document.getElementById('up_name').value !== '')
        new_employee.Name = document.getElementById('up_name').value;
    if (document.getElementById('up_age').value !== '') {
        let age = document.getElementById('up_age').value;
        if (!(age < 1) && !(age > 80)) {
            new_employee.Age = age;
        } else {
            alert(`Age must be between 0 and 80!, cant be ${age}`);
            valid = false;
        }
    }
    if (document.getElementById('up_address').value !== '')
        new_employee.Address = document.getElementById('up_address').value;
    if (document.getElementById('up_ex').value !== '')
        new_employee.Ex = document.getElementById('up_ex').value;
    if (document.getElementById('up_phone').value !== '')
        if (checkphone(document.getElementById('up_phone'))) {
            new_employee.Phone = document.getElementById('up_phone').value;
        } else {
            alert('Phone number must be 10 digits or empty!');
            valid = false;
        }
    if (document.getElementById('up_email').value !== '')
        new_employee.Email = document.getElementById('up_email').value;
    if (document.getElementById('up_join_date').value !== '')
        new_employee.Join_date = document.getElementById('up_join_date').value;
    employee_list[index] = new_employee;
    //nếu hợp lệ thì submit, không thì để nguyên để tiếp tục nhập
    if (valid) {
        localStorage.setItem('myList', JSON.stringify(employee_list));
        document.getElementById('Message').innerHTML = `
    Employee <span style='font-size:1.1em; color:red'>${new_employee.Name}</span> has been updated. Here's the new employee list
    `;

        //logic de render cai bang data, dùng employee list
        render_data_table(employee_list);
    }
}
//DELETE
function delete_emp() {
    document.getElementById('Message').innerHTML = "Choose one in the table below to <span style='color:red; font-weight:bold;'>DELETE</span> !!";

    var employee_list = JSON.parse(localStorage.getItem('myList'));
    // -------------------------------------------------------------
    render_select_table(employee_list, delete_row_employee, 'delete-table');

}

function delete_row_employee() {
    const user_confirm = confirm(`Do you want to delete employee "${this.firstChild.innerHTML}" ?`);
    if (user_confirm) {
        var employee_list = JSON.parse(localStorage.getItem('myList'));
        var index = find_by_name(this.firstChild.innerHTML, employee_list);
        var temp_Name = employee_list[index].Name;
        employee_list.splice(index, 1);
        render_data_table(employee_list);
        //submit nó vô localstorage
        localStorage.setItem('myList', JSON.stringify(employee_list));
        document.getElementById('Message').innerHTML = `
        Employee <span style='font-size:1.1em; color:red'>${temp_Name}</span> has been deleted.
        `;
    }
}
//SEARCH
function search_emp() {
    document.getElementById('Message').innerHTML = "Enter name to <span style='color:red; font-weight:bold;'>SEARCH</span>";

    document.getElementById('Main').innerHTML = `
    <div id='search_employee_div' class='styled_form find_form'>
    <p>Enter employee name to find</p>
    <input type='text' id='name_search' style='margin:20px auto'><br>
    <button onclick='submit_search()'>Find</button>
    </div>
    `;

}

function submit_search() {

    var employee_list = JSON.parse(localStorage.getItem('myList'));

    var result_list = [];
    var name_search = document.getElementById('name_search').value;
    var num_found = 0;

    for (employee of employee_list) {
        if (employee.Name.toLowerCase().search(name_search.toLowerCase()) >= 0) {
            result_list.push(employee);
            num_found++;
        }
    }
    if (name_search)
        document.getElementById('Message').innerHTML =
        `Found <span style='color:red; font-weight:bold;'>${num_found}</span> employee with <span style='color:red; font-weight:bold;'>${name_search}</span> in their name!`;
    else document.getElementById('Message').innerHTML =
        `You've entered NOTHING! I'll show you all <span style='color:red; font-weight:bold;'>${num_found}</span> employee  : `;
    render_data_table(result_list);
}