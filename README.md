# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## File Structure

The project follows a modular structure to ensure scalability and maintainability. Below is the file structure:

```
/src
    ├── /assets         # Static assets like images, fonts, etc.
    ├── /components     # Reusable React components
    ├── /pages          # Page-level components
    ├── /context        # Context API providers and consumers
    ├── main.jsx        # Entry point for the React application
    └── App.jsx         # Root component of the application
```

## Modular Functions

### Components
- **Reusable Components**: All UI components are placed in the `/components` directory. These include buttons, modals, and other shared elements.
- **Page Components**: Each page has its own component in the `/pages` directory, which organizes the application into distinct views.

### Context
- **State Management**: The `/context` directory is used for managing global state using React's Context API.

## Getting Started

### Installation
1. Clone the repository:
     ```bash
     git clone https://github.com/Anand19987i/dashboard.git
     ```
2. Navigate to the project directory:
     ```bash
     cd dashboard
     ```
3. Install dependencies:
     ```bash
     npm install
     ```

### Development
To start the development server with hot module replacement (HMR):
```bash
npm run dev
```

### Build
To create a production build:
```bash
npm run build
```

## Features
- **Fast Refresh**: Enabled by Vite for a seamless development experience.
- **ESLint Rules**: Pre-configured linting for consistent code quality.
- **Modular Architecture**: Ensures scalability and maintainability.

## Contributing
1. Fork the repository.
2. Create a new branch:
     ```bash
     git checkout -b feature/your-feature-name
     ```
3. Commit your changes:
     ```bash
     git commit -m "Add your message here"
     ```
4. Push to the branch:
     ```bash
     git push origin feature/your-feature-name
     ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.