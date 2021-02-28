const {
    response
} = require('express');

// const ss = require('mongoose').model('');
const employee = {};

employee.create = async (req, res) => {

    const data = req.body;
    console.log(data);

    res.send({
        success: true
    });

}

employee.delete = async (req, res) => {
    const Employee = req.rootConn.model('Employee');
    const deletedEmployees = await Employee.deleteMany();

    res.json({
        status: true,
        data: deletedEmployees
    })


}

employee.all = async (req, res) => {

    try {
        const Employee = req.rootConn.model('Employee');

        //             from: "employees",
        //             startWith: "$department",
        //             connectFromField: "department",
        //             connectToField: "reporting",
        //             maxDepth: 0,
        //             as: "children"

        const emps = await Employee.aggregate([{
                $match: {
                    reporting: "default"
                }
            },
            {
                $graphLookup: {
                    from: "employees",
                    startWith: "$department",
                    connectFromField: "department",
                    connectToField: "reporting",
                    as: "children",
                    depthField: "level"
                }
            },
            {
                $project: {
                    "department": 1,
                    "reporting": 1,
                    "name": 1,
                    "pos": 1,
                    "children.department": 1,
                    "children.name": 1,
                    "children.pos": 1,
                    "children.reporting": 1,
                    "children.level": 1
                }
            },
            {
                $unwind: "$children"
            },
            {
                $sort: {
                    "children.level": -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: {
                        $first: "$name"
                    },
                    pos: {
                        $first: "$pos"
                    },
                    department: {
                        $first: "$department"
                    },
                    reporting: {
                        $first: "$reporting"
                    },
                    children: {
                        $push: "$children"
                    }
                }
            },
            {
                $addFields: {
                    children: {
                        $reduce: {
                            input: "$children",
                            initialValue: {
                                currentLevel: -1,
                                currentLevelEmployees: [],
                                previousLevelEmployees: []
                            },
                            in: {
                                $let: {
                                    vars: {
                                        prev: {
                                            $cond: [{
                                                    $eq: ["$$value.currentLevel", "$$this.level"]
                                                },
                                                "$$value.previousLevelEmployees",
                                                "$$value.currentLevelEmployees"
                                            ]
                                        },
                                        current: {
                                            $cond: [{
                                                    $eq: ["$$value.currentLevel", "$$this.level"]
                                                },
                                                "$$value.currentLevelEmployees",
                                                []
                                            ]
                                        }
                                    },
                                    in: {
                                        currentLevel: "$$this.level",
                                        previousLevelEmployees: "$$prev",
                                        currentLevelEmployees: {
                                            $concatArrays: [
                                                "$$current",
                                                [{
                                                    $mergeObjects: [
                                                        "$$this",
                                                        {
                                                            children: {
                                                                $filter: {
                                                                    input: "$$prev",
                                                                    as: "e",
                                                                    cond: {
                                                                        $eq: ["$$e.reporting", "$$this.department"]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }]
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    children: "$children.currentLevelEmployees"
                }
            }
        ])






        // const emps = await Employee.aggregate([
        //     {
        //         $match: {
        //             reporting: "default"
        //         }
        //     },
        //     {
        //         $graphLookup: {
        //             from: "employees",
        //             startWith: "$department",
        //             connectFromField: "department",
        //             connectToField: "reporting",
        //             maxDepth: 0,
        //             as: "children"
        //         }
        //     },
        //     {
        //         $unwind: "$children"
        //     },
        //     {
        //         $addFields: {
        //             "children.level": 0
        //         }
        //     },
        //     {
        //         $graphLookup: {
        //             from: "employees",
        //             startWith: "$children.department",
        //             connectFromField: "children.department",
        //             connectToField: "reporting",
        //             maxDepth: 0,
        //             as: "children.children"
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: "$_id",
        //             department: { $first: "$department" },
        //             reporting: { $first: "$reporting" },
        //             name: { $first: "$name" },
        //             pos: { $first: "$pos" },
        //             children: { $push: "$children" }
        //         }
        //     }
        // ])

        // console.log(emps);

        res.json({
            status: true,
            result: emps
        })


    } catch (error) {

        res.json({
            status: false,
            error
        })
    }

    // const employees = await Employee.find({}).lean()

}

module.exports = employee;