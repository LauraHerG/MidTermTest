let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to model
let Employees = require('../models/employees');

//Manage routes
router.get('/', (req, res, next) => {
    Employees.find((err, employeesList) => {
        if(err){
            return console.error(err);
        }else{
            //console.log(productList);
            res.render('employees/list', {title: 'Employees Info', EmployeesList: employeesList})
        }
    });
});

// to open add product page
router.get('/add', (req, res, next) => {
    res.render('employees/add', {title: 'Add Employee'})
});

// insert product data into mongoDB collection
router.post('/add', (req, res, next) => {
    //getting data from form
    let newEmployee = Employees({
        "name": req.body.ename,
        "address": req.body.eaddress,
        "contact": req.body.contact
    });

    //insert data into the mongoDB
    Employees.create(newEmployee, (err, Employee) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/employees')
        }
    });
});

//Retrieve data from MongoDB and Open it in view (FORM)
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Employees.findById(id, (err, employeesToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            //write code to display data in view
            res.render('employees/edit', { title : 'Edit Employee', Employee: employeesToEdit})
        }
    });
});

//to delete documents from the collection
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Employees.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/employees');
        }
    });
});

module.exports = router;