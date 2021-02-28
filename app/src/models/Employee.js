export default class Employee {
    constructor( {name, pos, reporting, department}) {

        this.name = name;
        this.title = pos;
        this.reporting = reporting;
        this.department = department;
        this.children = [];
    }

    get eployeeDetails() {
        return this;
    }
}