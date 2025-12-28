import * as express from 'express';
import * as mongodb from 'mongodb';
import { collections } from './database';
import { Employee } from './employee';

export const employeeRouter = express.Router();

employeeRouter.use(express.json());

// GET /employees - Get all employees
employeeRouter.get('/', async (_req, res) => {
    try {
        const employees = await collections.employees?.find({}).toArray();
        res.status(200).send(employees);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// GET /employees/:id - Get a single employee by ID
employeeRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await collections.employees?.findOne({ 
            _id: new mongodb.ObjectId(id) 
        });
        
        if (employee) {
            res.status(200).send(employee);
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// POST /employees - Create a new employee
employeeRouter.post('/', async (req, res) => {
    try {
        const employee: Employee = req.body;
        const result = await collections.employees?.insertOne(employee);

        if (result?.acknowledged) {
            res.status(201).send({
                message: 'Employee created successfully',
                id: result.insertedId
            });
        } else {
            res.status(500).send('Failed to create employee');
        }
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT /employees/:id - Update an employee by ID
employeeRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee: Employee = req.body;
        
        const result = await collections.employees?.updateOne(
            { _id: new mongodb.ObjectId(id) },
            { $set: employee }
        );

        if (result && result.matchedCount) {
            res.status(200).send({
                message: 'Employee updated successfully'
            });
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// DELETE /employees/:id - Delete an employee by ID
employeeRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await collections.employees?.deleteOne({ _id: new mongodb.ObjectId(id) });

        if (result && result.deletedCount) {
            res.status(200).send({
                message: 'Employee deleted successfully'
            });
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message);
    }
});