# Employee Management - Frontend

Angular frontend application for the employee management system.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

```bash
npm install
```

## Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to the source files.

## Available Scripts

- `npm start` - Start development server on port 4200
- `npm run build` - Build the project for production
- `npm run watch` - Build in watch mode for development
- `npm test` - Run unit tests with Karma

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── employee-form/      # Form component for creating/editing employees
│   │   └── employee-list/      # List component for displaying employees
│   ├── models/
│   │   └── employee.model.ts   # Employee interface
│   ├── services/
│   │   └── employee.service.ts # HTTP service for API calls
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
├── assets/
├── index.html
├── main.ts
└── styles.css
```

## Environment Configuration

The application connects to the backend API. To configure the API URL:

1. The default API URL is configured in the employee service
2. For production, update the API URL in `src/app/services/employee.service.ts`

## Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

Run unit tests:

```bash
npm test
```

## Technologies Used

- **Angular 15** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **Jasmine & Karma** - Testing framework

## Features

- View all employees in a responsive list
- Create new employee records
- Edit existing employee information
- Delete employee records
- Form validation
- Reactive forms with RxJS

## Deployment

This application is configured to be deployed on **Netlify**.

### Netlify Configuration

- **Base directory:** `client`
- **Build command:** `npm run build`
- **Publish directory:** `dist/client`

Make sure to set environment variables in Netlify for the production API URL if needed.

## Angular CLI Reference

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

For more help on the Angular CLI use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
