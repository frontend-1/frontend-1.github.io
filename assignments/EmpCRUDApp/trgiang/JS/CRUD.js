class Employee {
    name;
    age;
    address;
    expYear;
    phone;
    email;
    joinDay;

    constructor(name, age, address, expYear, phone, email, joinDay) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.expYear = expYear;
        this.phone = phone;
        this.email = email;
        this.joinDay = joinDay;
    }
}
/* Supporting Functions */
function load() {
    localStorage.clear();
    localStorage.setItem('myList', JSON.stringify([]));
}

function renderDataTable(empList) {
    document.getElementById('main').innerHTML =
        `
    <table id='data_table' class='styledTable'>
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
    for (temp_emp of empList) {
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

function renderSelectTable(empList, action, type_of_action_class) {
    document.getElementById('main').innerHTML =
        `
    <table id='select_table' class='styledTable ${type_of_action_class}'>
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

    for (temp_emp of empList) {
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

function findByName(emp_name, empList) {
    let i = 0;
    for (emp of empList) {
        if (emp.name === emp_name)
            return i;
        else i++;
    }
    if (i === emp_name.length)
        return -1;
}

/*************************************************************************/

/* Main Function */
function addEmp() {
    //Hiển thị bảng nhập nhân viên mới
        Message.innerHTML = 'Enter new employee\'s infomation';
        Main.innerHTML = `
        <div id="formAdd" class="form">
			<form id='#add-form'>
				<table>
					<tr>
						<th>Name <span style="color: #ff0000;">*</span> :</th>
						<th><input id="name" type="text" placeholder="Enter name..."/></th>
					</tr>
					<tr>
						<th>Age <span style="color: #ff0000;">*</span> :</th>
						<th><input id="age" type="text" placeholder="Enter age..."/></th>
					</tr>
					<tr>
						<th>Address :</th>
						<th><input id="address" type="text" placeholder="Enter address..."/></th>
					</tr>
					<tr>
						<th>Year of Experience <span style="color: #ff0000;">*</span> :</th>
						<th>
							<input id="expYear" type="range" min="0" max="2" value="0" step="0.5" 
							oninput="this.nextElementSibling.value = this.value"
							datalist="tickmarks"/>
							<output>0</output></p> year(s)</p>
						</th>
					</tr>
					<tr>
						<th>Phone Number <span style="color: #ff0000;">*</span> :</th>
						<th><input id="phone" type="text" placeholder="Enter phone Number..."/></th>
					</tr>
					<tr>
						<th>Email ID <span style="color: #ff0000;">*</span> :</th>
						<th><input id="email" type="text" placeholder="Enter email ID..."/></th>
					</tr>
					<tr>
						<th>Day of Join <span style="color: #ff0000;">*</span> :</th>
						<th><input id="joinDay" type="date" placeholder="Enter Day of Join..."/></th>
					</tr>
				</table>
			</form>
			<div>
				<button id="submitBtn" type="submit" onClick="submitAdd()">Submit</button>
			</div>
        </div>`;
}
function submitAdd() {
    //Nhap lieu du lieu, kiem tra va bao loi
    if (document.getElementById('name').value === '') {
        alert('name can\'t be blank');
    } else
    if (document.getElementById('age').value < 0 || document.getElementById('age').value > 80) {
        alert('age must be > 0 and < 80');
    } else {
        //khởi tạo Emp
        var employee = {
                name: document.getElementById('name').value,
                age: document.getElementById('age').value,
                address: document.getElementById('address').value,
                expYear: document.getElementById('expYear').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                joinDay: document.getElementById('joinDay').value
            }
        //đẩy vào employeelist
        var empList = JSON.parse(localStorage.getItem('myList'));
        empList.push(employee);
        localStorage.setItem('myList', JSON.stringify(empList));
        // -------------------------------------------------------------
        document.getElementById('message').innerHTML = `
    Employee <span style='font-size:1.2em; color:red'>${employee.name}</span> has been added. Here's the employee list
    `;
        renderDataTable(empList);
    }
}

function updateEmp() {
    document.getElementById('message').innerHTML = "Choose one in the table below to <span style='color:red; font-weight:bold;'>UPDATE</span> !!";

    var empList = JSON.parse(localStorage.getItem('myList'));
    // -------------------------------------------------------------
    renderSelectTable(empList, updateRowEmp, 'updateTable');

}
function updateRowEmp() {
    var empList = JSON.parse(localStorage.getItem('myList'));
    var index = findByName(this.firstChild.innerHTML, empList);
    var up_emp = empList[index];
    var user_confirm = confirm(`Do you want to update employee "${up_emp.name}"?`);
    if (user_confirm) {
        document.getElementById('main').innerHTML = `
        <div id="formAdd" class="form">
            <p>New information <span style='font-size: 0.7em'>(leave blank field if there's no change)</span></p>
			<form id='#add-form'>
				<table>
					<tr>
						<th>Name <span style="color: #ff0000;">*</span> :</th>
						<th><input id="name" type="text" placeholder='${up_emp.name}'/></th>
					</tr>
					<tr>
						<th>Age <span style="color: #ff0000;">*</span> :</th>
						<th><input id="age" type="text" placeholder='${up_emp.age}'/></th>
					</tr>
					<tr>
						<th>Address :</th>
						<th><input id="address" type="text" placeholder='${up_emp.address}'/></th>
					</tr>
					<tr>
						<th>Year of Experience <span style="color: #ff0000;">*</span> :</th>
						<th>
							<input id="expYear" type="range" min="0" max="2" value="0" step="0.5" 
							oninput="this.nextElementSibling.value = this.value"
							datalist="tickmarks"/>
							<output>${up_emp.expYear}</output></p> year(s)</p>
						</th>
					</tr>
					<tr>
						<th>Phone Number <span style="color: #ff0000;">*</span> :</th>
						<th><input id="phone" type="text" placeholder='${up_emp.phone}'/></th>
					</tr>
					<tr>
						<th>Email ID <span style="color: #ff0000;">*</span> :</th>
						<th><input id="email" type="text" placeholder='${up_emp.email}'/></th>
					</tr>
					<tr>
						<th>Day of Join <span style="color: #ff0000;">*</span> :</th>
						<th><input id="joinDay" type="date" placeholder='${up_emp.joinDay}'/></th>
					</tr>
				</table>
			</form>
			<div>
				<button id="submitBtn" type="submit" onClick="submitUpdate(${index})">Submit</button>
			</div>
        </div>
        `;
    }
}
function submitUpdate(index) {
    var empList = JSON.parse(localStorage.getItem('myList'));
    var employee = {};
    Object.assign(employee, empList[index]);
    //đẩy vào employeelist
    if (document.getElementById('name').value !== '')
        employee.name = document.getElementById('name').value;
    if (document.getElementById('age').value !== '')
        employee.age = document.getElementById('age').value;
    if (document.getElementById('address').value !== '')
        employee.address = document.getElementById('address').value;
    if (document.getElementById('expYear').value !== '')
        employee.expYear = document.getElementById('expYear').value;
    if (document.getElementById('phone').value !== '')
        employee.phone = document.getElementById('phone').value;
    if (document.getElementById('email').value !== '')
        employee.email = document.getElementById('email').value;
    if (document.getElementById('joinDay').value !== '')
        employee.joinDay = document.getElementById('joinDay').value;
    empList[index] = employee;

    localStorage.setItem('myList', JSON.stringify(empList));
    document.getElementById('message').innerHTML = `
    Employee <span style='font-size:1.1em; color:red'>${employee.name}</span> has been updated. Here's the new employee list
    `;

    //logic de render cai bang data, dùng employee list
    renderDataTable(empList);
}

function deleteEmp() {
    document.getElementById('message').innerHTML = "Choose one in the table below to <span style='color:red; font-weight:bold;'>DELETE</span> !!";

    var empList = JSON.parse(localStorage.getItem('myList'));
    // -------------------------------------------------------------
    renderSelectTable(empList, deleteRowEmp, 'deleteTable');

}
function deleteRowEmp() {
    const user_confirm = confirm(`Do you want to delete employee "${this.firstChild.innerHTML}" ?`);
    if (user_confirm) {
        var empList = JSON.parse(localStorage.getItem('myList'));
        var index = findByName(this.firstChild.innerHTML, empList);
        var temp_Name = empList[index].name;
        empList.splice(index, 1);
        renderDataTable(empList);
        //submit nó vô localstorage
        localStorage.setItem('myList', JSON.stringify(empList));
        document.getElementById('message').innerHTML = `
        Employee <span style='font-size:1.1em; color:red'>${temp_Name}</span> has been deleted.
        `;
    }
}

function searchEmp() {
    document.getElementById('message').innerHTML = "Enter name to <span style='color:red; font-weight:bold;'>SEARCH</span>";

    document.getElementById('main').innerHTML = `
    <style>
        .styled_form button {
            width: 100px;
            height: 40px;
            float: left;
            margin-left: 47%;
            outline: none;
            background: #6cb1e9;
            color: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 1.2em;
            border-radius: 16px;
            border: #aadce9;
        }
        button:hover {
            filter: brightness(125%);
	        box-shadow: 0 0 5px #1f374b;
        }
    </style>
    <div id='search_employee_div' class='styled_form find_form'>
        <p>Enter employee name to find</p>
        <input type='text' id='name_search' style='margin:20px auto'><br>
        <button type='button' onclick='submitSearch()'>Find</button>
    </div>
    `;
}
function submitSearch() {

    var empList = JSON.parse(localStorage.getItem('myList'));

    var result_list = [];
    var name_search = document.getElementById('name_search').value;
    console.log(`Cai can search la "${name_search}"`);
    var num_found = 0;

    for (employee of empList) {
        if (employee.name.toLowerCase().search(name_search.toLowerCase()) >= 0) {
            result_list.push(employee);
            num_found++;
        }
    }
    if (name_search)
        document.getElementById('message').innerHTML =
        `Found <span style='color:red; font-weight:bold;'>${num_found}</span> employee with <span style='color:red; font-weight:bold;'>${name_search}</span> in their name!`;
    else document.getElementById('message').innerHTML =
        `You enter NOTHING! I'll show you all <span style='color:red; font-weight:bold;'>${num_found}</span> employee  : `;
    renderDataTable(result_list);
}