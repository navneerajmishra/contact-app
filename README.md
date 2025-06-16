# contact-app

This allows users to efficiently manage their contacts

## Deployed app
- [Contact app](https://navneerajmishra.github.io/contact-app/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli) (optional, for local development)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd contact-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the development server:

```sh
npm start
```
or
```sh
ng serve
```

The app will be available at [http://localhost:4200](http://localhost:4200).

### Running Tests

To execute unit tests:

```sh
ng test
```

### Formatting HTML with Angular Control Flow

To format HTML files (including Angular control flow blocks like `@if`, `@for`), use Prettier v3.2.0 or newer:

```sh
npx prettier --write "src/**/*.html"
```

### Project Structure

- `src/app/` - Main application source code
- `src/app/shared/` - Shared modules, components, directives, and services
- `src/app/store/` - State management (NgRx Signals)
- `src/app/features/` - Feature modules

### Features

- Manage contacts (create, update, delete)
- Optimistic UI updates
- Toast notifications
- Confirmation dialogs

---