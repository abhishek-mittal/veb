import orgdata from './../fixtures/orgData.json'
import Employee from './Employee';
import axios from 'axios';

class OrgData {

    constructor() {
        
        // this._orgHeirarchy = orgdata || [];
        

    }


    async getOrgHeirarchy() {
        const data = await axios.get("http://localhost:3000/api/v1/employee");
        return data.data.result[0];
    }



    getOrgHeirarchySync() {


        const _orgH = this._orgHeirarchy.map( emp => new Employee(emp));
        const rootParentIndex = _orgH.findIndex( employee => employee.reporting === "default" );
        _orgH.forEach( (emp, i, _) => {
            if(emp.reporting === "default") {
                return;
            }   
            if (emp.reporting) {
                const index = _.findIndex( em => em.department === emp.reporting );
                _orgH[index].children.push(emp);
            }
        })
        return _orgH[rootParentIndex];
    }
}

export default new OrgData();