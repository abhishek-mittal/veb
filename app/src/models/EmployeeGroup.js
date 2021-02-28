class EmployeeGroup {
    constructor( department, employeesOrGroup = [] ) {
        this.department = department;
        this.employeesOrGroup = employeesOrGroup;
    }

    get childNode() {
        return this.employeesOrGroup;
    }
}