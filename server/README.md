# Employee Management - Backend

Node.js/Express REST API for the employee management system.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the server directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/employeeDB
```

**Environment Variables:**

- `PORT` - The port the server will run on (default: 3000)
- `MONGODB_URI` - MongoDB connection string

## Running the Server

### Development Mode

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Available Scripts

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Get All Employees
```
GET /api/employees
```

**Response:** Array of employee objects

#### Get Employee by ID
```
GET /api/employees/:id
```

**Response:** Single employee object

#### Create Employee
```
POST /api/employees
```

**Body:**
```json
{
  "name": "John Doe",
  "position": "Developer",
  "office": "New York",
  "salary": 75000
}
```

**Response:** Created employee object with `_id`

#### Update Employee
```
PUT /api/employees/:id
```

**Body:** Same as create (any fields to update)

**Response:** Updated employee object

#### Delete Employee
```
DELETE /api/employees/:id
```

**Response:** Success message

## Project Structure

```
src/
├── server.ts           # Main application entry point
├── database.ts         # MongoDB connection configuration
├── employee.ts         # Employee model/interface
├── employee.routes.ts  # API route handlers
└── employee.routes.test.ts  # API tests
```

## Database Schema

### Employee Model

```typescript
{
  _id: ObjectId,
  name: string,
  position: string,
  office: string,
  salary: number
}
```

## Testing

The backend includes comprehensive tests using Jest and Supertest.

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Programming language
- **MongoDB** - Database
- **Jest** - Testing framework
- **Supertest** - HTTP assertions

## CORS Configuration

The server is configured with CORS to allow requests from the frontend application. Update the CORS configuration in `server.ts` if needed.

## Deployment

This application is configured to be deployed on **Render**.

### Render Configuration

- **Root directory:** `server`
- **Build command:** `npm install`
- **Start command:** `npm start`

**Environment Variables (Render):**
- Set `MONGODB_URI` to your MongoDB Atlas connection string
- Set `PORT` (Render will provide this automatically)

## Error Handling

The API includes error handling for:
- Invalid MongoDB ObjectIds
- Database connection errors
- Not found resources (404)
- Server errors (500)

## Development Notes

- All routes are prefixed with `/api`
- The server uses JSON for request/response bodies
- MongoDB connection is established before the server starts
- Graceful shutdown handling is implemented
