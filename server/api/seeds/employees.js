const data = [
    {
        "name": "Lao Lao",
        "pos": "general manager",
        "department": "head",
        "reporting": "default"
    },
    {
        "name": "Bo Miao",
        "pos": "department manager",
        "department": "custom-1",
        "reporting": "head"
    },
    {
        "name": "Su Miao",
        "pos": "department manager",
        "department": "custom-2",
        "reporting": "head"
    },
    {
        "name": "Hong Miao",
        "pos": "department manager",
        "department": "custom-3",
        "reporting": "head"
    },
    {
        "name": "Chun Miao",
        "pos": "department manager",
        "department": "custom-4",
        "reporting": "head"
    },
    {
        "name": "Tie Hua",
        "pos": "senior engineer",
        "department": "custom-2-1",
        "reporting": "custom-2"
    },
    {
        "name": "Hei Hei",
        "pos": "senior engineer",
        "department": "custom-2-2",
        "reporting": "custom-2"
    },
    {
        "name": "Pang Pang",
        "pos": "senior engineer",
        "department": "custom-2-3",
        "reporting": "custom-2"
    },
    {
        "name": "Yue Yue",
        "pos": "senior engineer",
        "department": "custom-4-1",
        "reporting": "custom-4"
    },
    {
        "name": "Xiang Xiang",
        "pos": "engineer",
        "department": "custom-2-1-1",
        "reporting": "custom-2-1"
    },
    {
        "name": "Dan Dan",
        "pos": "engineer",
        "department": "custom-2-2-1",
        "reporting": "custom-2-2"
    }
]

const mongoose = require('mongoose');


const seedEmployeeData = async ( req, res ) => {
    try {

        const Employee = req.rootConn.model('Employee');
        const savedEmployees = await Employee.insertMany(data);
        if (!savedEmployees) {
           throw new Error("failed!") 
        }
    
        res.send({
            success: true,
            data: seedEmployeeData
        })
        
    } catch (error) {
        res.json({
            status: 'error'
        });
    }
}

module.exports = {
    seedEmployeeData
}