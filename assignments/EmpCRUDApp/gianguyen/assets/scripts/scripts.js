class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static hideEle(containerId, queryEle) {
    document
      .getElementById(`${containerId}`)
      .querySelector(`${queryEle}`).style.display = 'none';
  }
}

class Employee {
  constructor(name, age, addr, yearExp, phoneNum, email, joinDate) {
    this.name = name;
    this.age = age;
    this.addr = addr;
    this.yearExp = yearExp;
    this.phoneNum = phoneNum;
    this.email = email;
    this.joinDate = joinDate;
  }
}

class Component {
  connectBtn(containerId, btnFunc) {
    const container = document.getElementById(`${containerId}`);
    let btn = container.querySelector('button');
    btn = DOMHelper.clearEventListeners(btn);
    btn.addEventListener('click', btnFunc);
  }

  getInputs(containerId, queryEle, retArr = false) {
    const inputContainer = document.getElementById(`${containerId}`);
    const inputs = retArr
      ? inputContainer.querySelectorAll(`${queryEle}`)
      : inputContainer.querySelector(`${queryEle}`);
    return inputs;
  }

  toggleDisplay(containerId, queryEle, additEle = '') {
    document
      .getElementById(`${containerId}`)
      .querySelector(`${queryEle}`).style.display =
      document.getElementById(`${containerId}`).querySelector(`${queryEle}`)
        .style.display === 'none'
        ? 'block'
        : 'none';
    document
      .getElementById(`${containerId}`)
      .querySelector(`${additEle}`).style.display = document
      .getElementById(`${containerId}`)
      .querySelector(`${queryEle}`).style.display;
  }

  connectToggle(containerId, queryEle, toggleFn) {
    document
      .getElementById(`${containerId}`)
      .querySelector(`${queryEle}`)
      .addEventListener('click', toggleFn);
  }
}

class TupleList {}

class EmployeeList extends Component {
  regexList = [
    /^[a-zA-Z]+(\s?[a-zA-Z]+)*\s*$/,
    /^0*([1][8-9]|[2-5][0-9]|60)$/,
    /^[a-zA-Z0-9,]+(\s?[a-zA-Z0-9,]+)*\s*$/,
    /^0*[0-2]$/,
    /[0-9]{10,12}/,
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
  ];

  constructor() {
    super();
    this.employees = new Map();
    document
      .getElementById('dropdown-up')
      .addEventListener('mouseup', this.updateIntf.bind(this));
  }

  connectAddDisplay() {
    super.connectToggle(
      'user-input',
      'h1',
      super.toggleDisplay.bind(this, 'user-input', '.control', 'button')
    );
  }

  connectDelDisplay() {
    super.connectToggle(
      'user-delete',
      'h1',
      super.toggleDisplay.bind(this, 'user-delete', '.control', 'button')
    );
  }

  connectUpdDisplay() {
    super.connectToggle(
      'user-update',
      'h1',
      super.toggleDisplay.bind(this, 'user-update', '.control', 'button')
    );
  }

  connectAddEmployeeBtn() {
    super.connectBtn('user-input', this.addEmployee.bind(this));
  }

  connectDelEmployeeBtn() {
    super.connectBtn('user-delete', this.removeEmployee.bind(this));
  }

  connectSrcEmployeeBtn() {
    super.connectBtn('search', this.searchEmployee.bind(this));
  }

  connectSavEmployeeBtn() {
    super.connectBtn('save', this.saveLocal.bind(this));
  }

  connectUpdEmployeeBtn() {
    super.connectBtn('user-update', this.updateEmployee.bind(this));
  }

  loadLocal() {
    const localDataJS = localStorage.getItem('database');
    const localData = JSON.parse(localDataJS) || [];

    for (let i = 0; i < localData.length; i++) {
      localData[i];

      let localEmployee = new Employee(
        localData[i].name,
        localData[i].age,
        localData[i].addr,
        localData[i].yearExp,
        localData[i].phoneNum,
        localData[i].email,
        localData[i].joinDate
      );

      this.employees.set(
        { name: localData[i].name, email: localData[i].email },
        localEmployee
      );
    }

    this.render();
    this.renderDropdown('user-delete', '#dropdown-del');
    this.renderDropdown('user-update', '#dropdown-up');
    this.updateIntf();
  }

  saveLocal() {
    localStorage.setItem(
      'database',
      JSON.stringify(Array.from(this.employees.values()))
    );
  }

  checkUserInput(userInputs, containerId = 'user-input') {
    const error = super.getInputs(`${containerId}`, '.errortext', true);
    let errorDetect = false;
    for (let i = 0; i < 7; i++) {
      error[i].style.display = this.checkError(userInputs, i, this.regexList[i])
        ? 'none'
        : 'block';
      if (error[i].style.display === 'block') {
        errorDetect = true;
      }
    }
    return errorDetect;
  }

  checkError(userInputs, errorType, errorRegex) {
    const errorCheck = userInputs[errorType].value.match(errorRegex)
      ? true
      : false;
    return errorCheck;
  }

  addEmployee() {
    const userInputs = super.getInputs('user-input', 'input', true);

    if (this.checkUserInput(userInputs)) {
      return;
    }

    let newEmployee = new Employee(
      userInputs[0].value,
      userInputs[1].value,
      userInputs[2].value,
      userInputs[3].value,
      userInputs[4].value,
      userInputs[5].value,
      userInputs[6].value
    );

    const existed = this.checkExist(this.employees, newEmployee);

    if (!existed) {
      this.employees.set(
        { name: newEmployee.name, email: newEmployee.email },
        newEmployee
      );
    } else {
      alert('This employee already exists! (Email must be unique)');
    }

    this.employees = new Map(
      [...this.employees].sort((a, b) => {
        return +(a[0].name > b[0].name) || -(a[0].name < b[0].name);
      })
    );

    console.log(this.employees);
    this.render();
    this.renderDropdown('user-delete', '#dropdown-del');
    this.renderDropdown('user-update', '#dropdown-up');
    this.updateIntf();
  }

  createTupleData(data) {
    const newData = document.createElement('td');
    newData.textContent = data;
    return newData;
  }

  checkExist(employees, newEmployee) {
    for (const [key, value] of employees.entries()) {
      if (key.email === newEmployee.email) {
        return true;
      }
    }
    return false;
  }

  render() {
    let tuple = super.getInputs('relation', 'tr', true);
    for (let i = 1; i < tuple.length; i++) {
      tuple[i].remove();
    }

    this.employees.forEach((employee) => {
      const employeeTuple = document.createElement('tr');
      employeeTuple.classList.add('tuple');
      employeeTuple.setAttribute('data-email', employee.email);
      for (const key in employee) {
        if (employee.hasOwnProperty(key)) {
          employeeTuple.append(this.createTupleData(employee[key]));
        }
      }
      document
        .getElementById('relation')
        .insertAdjacentElement('beforeend', employeeTuple);
    });
  }

  renderDropdown(containerId, queryEle) {
    const dropdownList = super.getInputs(`${containerId}`, `${queryEle}`);
    const dropdownItems = dropdownList.querySelectorAll('option');
    for (let i = 0; i < dropdownItems.length; i++) {
      dropdownItems[i].remove();
    }

    this.employees.forEach((employee) => {
      const employeeOpt = document.createElement('option');
      employeeOpt.textContent = `${employee.name} ► ${employee.email}`;
      employeeOpt.setAttribute('data-email', employee.email);
      dropdownList.insertAdjacentElement('beforeend', employeeOpt);
    });
  }

  removeEmployee() {
    const dropdownList = super.getInputs('user-delete', '#dropdown-del');
    const selectedEmp = dropdownList[dropdownList.selectedIndex];
    
    const dropdownListUp = super.getInputs('user-update', '#dropdown-up');
    const selectedEmpUp = dropdownListUp[dropdownList.selectedIndex];

    const tuples = super.getInputs('relation', '.tuples', true);

    for (let i = 0; i < tuples.length; i++) {
      if (tuples[i].dataset.email === selectedEmp.dataset.email) {
        tuples[i].remove();
      }
    }

    for (const [key, value] of this.employees.entries()) {
      if (key.email === selectedEmp.dataset.email) {
        this.employees.delete(key);
      }
    }

    selectedEmp.remove();
    selectedEmpUp.remove();
    this.render();
  }

  updateIntf() {
    const dropdownList = super.getInputs('user-update', '#dropdown-up');
    const selectedEmp = dropdownList[dropdownList.selectedIndex];

    for (const [key, value] of this.employees.entries()) {
      if (key.email === selectedEmp.dataset.email) {
        const inputFields = super.getInputs('user-update', 'input', true);
        inputFields[0].value = value.name;
        inputFields[1].value = value.age;
        inputFields[2].value = value.addr;
        inputFields[3].value = value.yearExp;
        inputFields[4].value = value.phoneNum;
        inputFields[5].value = value.email;
        inputFields[6].value = value.joinDate;
      }
    }
  }

  updateEmployee() {
    const userInputs = super.getInputs('user-update', 'input', true);

    if (this.checkUserInput(userInputs, 'user-update')) {
      return;
    }

    const dropdownList = super.getInputs('user-update', '#dropdown-up');
    const selectedEmp = dropdownList[dropdownList.selectedIndex];
    const tuples = super.getInputs('relation', '.tuples', true);

    for (let i = 0; i < tuples.length; i++) {
      if (tuples[i].dataset.email === selectedEmp.dataset.email) {
        tuples[i].remove();
      }
    }

    for (const [key, value] of this.employees.entries()) {
      if (key.email === selectedEmp.dataset.email) {
        this.employees.delete(key);
      }
    }

    selectedEmp.remove();

    let newEmployee = new Employee(
      userInputs[0].value,
      userInputs[1].value,
      userInputs[2].value,
      userInputs[3].value,
      userInputs[4].value,
      userInputs[5].value,
      userInputs[6].value
    );

    const existed = this.checkExist(this.employees, newEmployee);

    if (!existed) {
      this.employees.set(
        { name: newEmployee.name, email: newEmployee.email },
        newEmployee
      );
    } else {
      alert('This employee already exists! (Email must be unique)');
    }

    this.employees = new Map(
      [...this.employees].sort((a, b) => {
        return +(a[0].name > b[0].name) || -(a[0].name < b[0].name);
      })
    );

    console.log(this.employees);
    this.render();
    this.renderDropdown('user-delete', '#dropdown-del');
    this.renderDropdown('user-update', '#dropdown-up');
    this.updateIntf();
  }

  searchEmployee() {
    const userQuery = super.getInputs('search', '#search-name').value;
    const relation = document.getElementById('src-relation');
    const srcRes = relation.querySelectorAll('tr');
    for (let i = 1; i < srcRes.length; i++) {
      srcRes[i].remove();
    }
    const regex = `.*${userQuery}.*`;
    let fnd = false;
    this.employees.forEach((employee) => {
      if (employee.name.match(regex)) {
        fnd = true;
        document.getElementById('src-table').style.display = 'block';
        const employeeTuple = document.createElement('tr');
        employeeTuple.classList.add('tuple');
        for (const key in employee) {
          if (employee.hasOwnProperty(key)) {
            employeeTuple.append(this.createTupleData(employee[key]));
          }
        }
        relation.insertAdjacentElement('beforeend', employeeTuple);
      }
    });
    super.getInputs('search', '.errortext').style.display = fnd
      ? 'none'
      : 'block';
    document.getElementById('src-table').style.display = fnd ? 'block' : 'none';
  }
}

class App {
  static init() {
    const employeeList = new EmployeeList();
    employeeList.loadLocal();
    employeeList.connectAddDisplay();
    employeeList.connectDelDisplay();
    employeeList.connectUpdDisplay();
    employeeList.connectAddEmployeeBtn();
    employeeList.connectDelEmployeeBtn();
    employeeList.connectUpdEmployeeBtn();
    employeeList.connectSrcEmployeeBtn();
    employeeList.connectSavEmployeeBtn();
  }
}

App.init();

DOMHelper.hideEle('user-input', '.control');
DOMHelper.hideEle('user-input', 'button');
DOMHelper.hideEle('user-delete', '.control');
DOMHelper.hideEle('user-delete', 'button');
DOMHelper.hideEle('user-update', '.control');
DOMHelper.hideEle('user-update', 'button');

// Credits:
// Date regex: https://stackoverflow.com/questions/51224/regular-expression-to-match-valid-dates/8768241#8768241
// Email regex: https://emailregex.com/
