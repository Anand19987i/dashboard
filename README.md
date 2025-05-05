# React + Vite
MVP Dashboard for Admin Use.

```
Check it On :- https://mvp-dashboard-j4l9.onrender.com

For Login to Dashboard

Email = admin@example.com
Password = password123

```
## File Structure

The project follows a modular structure to ensure scalability and maintainability. Below is the file structure:

```
/src
├── /assets           # Static assets (images, fonts, etc.)
├── /charts           # Reusable chart components (Area, Pie, Bar, etc.)
│   ├── MyAreaChart.jsx
│   ├── MyPieChart.jsx
│   ├── MyBarChart.jsx
│   ├── MyCardinalChart.jsx
│   └── MyLineChart.jsx
├── /components       # Shared UI components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Layout.jsx
│   └── StatsCard.jsx
├── /context          # Global state using React Context API
├── /pages            # Page-level components
│   ├── Overview.jsx
│   ├── UsersList.jsx
│   └── Settings.jsx
├── App.jsx           # Root component
└── main.jsx          # Entry point

```
## Dark Mode Feature
Dark mode was added to the dashboard to reduce eye strain during prolonged periods of analysis, as it is frequently used by administrators.

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
