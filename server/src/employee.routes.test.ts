import request from 'supertest';
import express from 'express';
import { employeeRouter } from './employee.routes';
import { collections } from './database';

// Mock the database module
jest.mock('./database', () => ({
    collections: {
        employees: {
            find: jest.fn(),
            findOne: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
        }
    }
}));

// Create a test Express app
const app = express();
app.use(express.json());
app.use('/employees', employeeRouter);

describe('Employee Routes', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    describe('GET /employees', () => {
        it('should return all employees', async () => {
            const mockEmployees = [
                { _id: '123', name: 'John Doe', position: 'Developer', level: 'mid' },
                { _id: '456', name: 'Jane Smith', position: 'Designer', level: 'senior' }
            ];

            // Mock the database response
            const mockToArray = jest.fn().mockResolvedValue(mockEmployees);
            (collections.employees?.find as jest.Mock).mockReturnValue({
                toArray: mockToArray
            });

            const response = await request(app)
                .get('/employees')
                .expect(200);

            expect(response.body).toEqual(mockEmployees);
            expect(collections.employees?.find).toHaveBeenCalledWith({});
        });

        it('should handle database errors', async () => {
            const mockToArray = jest.fn().mockRejectedValue(new Error('Database error'));
            (collections.employees?.find as jest.Mock).mockReturnValue({
                toArray: mockToArray
            });

            const response = await request(app)
                .get('/employees')
                .expect(500);

            expect(response.text).toBe('Database error');
        });
    });

    describe('GET /employees/:id', () => {
        it('should return a single employee by ID', async () => {
            const mockEmployee = {
                _id: '507f1f77bcf86cd799439011',
                name: 'John Doe',
                position: 'Developer',
                level: 'mid'
            };

            (collections.employees?.findOne as jest.Mock).mockResolvedValue(mockEmployee);

            const response = await request(app)
                .get('/employees/507f1f77bcf86cd799439011')
                .expect(200);

            expect(response.body).toEqual(mockEmployee);
        });

        it('should return 404 if employee not found', async () => {
            (collections.employees?.findOne as jest.Mock).mockResolvedValue(null);

            const response = await request(app)
                .get('/employees/507f1f77bcf86cd799439012')
                .expect(404);

            expect(response.text).toBe('Employee not found');
        });
    });

    describe('POST /employees', () => {
        it('should create a new employee', async () => {
            const newEmployee = {
                name: 'New Employee',
                position: 'Tester',
                level: 'junior'
            };

            const mockResult = {
                acknowledged: true,
                insertedId: 'new-id-123'
            };

            (collections.employees?.insertOne as jest.Mock).mockResolvedValue(mockResult);

            const response = await request(app)
                .post('/employees')
                .send(newEmployee)
                .expect(201);

            expect(response.body).toEqual({
                message: 'Employee created successfully',
                id: 'new-id-123'
            });
            expect(collections.employees?.insertOne).toHaveBeenCalledWith(newEmployee);
        });

        it('should handle validation errors', async () => {
            (collections.employees?.insertOne as jest.Mock).mockRejectedValue(
                new Error('Document failed validation')
            );

            const response = await request(app)
                .post('/employees')
                .send({ name: 'Incomplete' })
                .expect(400);

            expect(response.text).toBe('Document failed validation');
        });
    });

    describe('PUT /employees/:id', () => {
        it('should update an existing employee', async () => {
            const updateData = {
                name: 'Updated Name',
                position: 'Senior Developer',
                level: 'senior'
            };

            const mockResult = {
                matchedCount: 1,
                modifiedCount: 1
            };

            (collections.employees?.updateOne as jest.Mock).mockResolvedValue(mockResult);

            const response = await request(app)
                .put('/employees/507f1f77bcf86cd799439013')
                .send(updateData)
                .expect(200);

            expect(response.body).toEqual({
                message: 'Employee updated successfully'
            });
        });

        it('should return 404 if employee not found', async () => {
            const mockResult = {
                matchedCount: 0,
                modifiedCount: 0
            };

            (collections.employees?.updateOne as jest.Mock).mockResolvedValue(mockResult);

            const response = await request(app)
                .put('/employees/507f1f77bcf86cd799439014')
                .send({ name: 'Test' })
                .expect(404);

            expect(response.text).toBe('Employee not found');
        });
    });

    describe('DELETE /employees/:id', () => {
        it('should delete an existing employee', async () => {
            const mockResult = {
                deletedCount: 1
            };

            (collections.employees?.deleteOne as jest.Mock).mockResolvedValue(mockResult);

            const response = await request(app)
                .delete('/employees/507f1f77bcf86cd799439015')
                .expect(200);

            expect(response.body).toEqual({
                message: 'Employee deleted successfully'
            });
        });

        it('should return 404 if employee not found', async () => {
            const mockResult = {
                deletedCount: 0
            };

            (collections.employees?.deleteOne as jest.Mock).mockResolvedValue(mockResult);

            const response = await request(app)
                .delete('/employees/507f1f77bcf86cd799439016')
                .expect(404);

            expect(response.text).toBe('Employee not found');
        });
    });
});
