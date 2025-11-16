# Balance Explorer

This project is an Angular application designed to explore and visualize balance and reconciliation data from a specified API. It provides a user-friendly interface to view EE and EI balances, as well as reconciliation reports.

## Project Structure

The project is organized as follows:

```
balance-explorer
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── dashboard                  # Main dashboard component
│   │   │   ├── ee-balance-explorer        # Component for displaying EE balances
│   │   │   ├── ei-balance-explorer        # Component for displaying EI balances
│   │   │   ├── reconciliation-explorer    # Component for displaying reconciliation data
│   │   │   ├── filter-bar.component.*     # Filter bar component for Kibana-style filtering
│   │   │   └── edit-filter-dialog.component.* # Dialog component for editing filters
│   │   ├── services               # Service for API interactions
│   │   ├── models                 # Data models for balances, reconciliation, and filters
│   │   ├── app.module.ts          # Root module of the application
│   │   ├── app.component.ts       # Root component of the application
│   │   ├── app.component.html     # Template for the root component
│   │   └── app.component.css      # Styles for the root component
│   ├── assets                      # Static assets (images, fonts, etc.)
│   ├── environments                # Environment-specific settings
│   ├── index.html                 # Main HTML file
│   ├── main.ts                    # Entry point of the application
│   ├── polyfills.ts               # Polyfills for browser compatibility
│   └── styles.css                 # Global styles
├── server.js                      # Backend server with mock data
├── angular.json                   # Angular CLI configuration
├── package.json                   # npm configuration
├── tsconfig.json                  # TypeScript configuration
├── .gitignore                     # Git ignore file
├── README.md                      # Project documentation
├── FILTERS.md                     # Filtering system documentation
└── SERVER.md                      # Backend server documentation
```

## Features

- **Dashboard**: Overview of balances and reconciliation status.
- **EE Balance Explorer**: Displays and filters EE balance data fetched from the API.
- **EI Balance Explorer**: Displays and filters EI balance data fetched from the API.
- **Reconciliation Explorer**: Shows reconciliation data and status with filtering capabilities.
- **Advanced Filtering**: Kibana-style filtering system with support for:
  - Quick filter addition from any table value
  - Filter editing with customizable fields, operators, and values
  - Filter negation (NOT mode)
  - Multiple operators (equals, contains, greater than, less than, etc.)
  - See [FILTERS.md](FILTERS.md) for detailed documentation

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd balance-explorer
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the backend server (provides mock data):
   ```
   node server.js
   ```

5. In a separate terminal, run the Angular application:
   ```
   ng serve
   ```

6. Open your browser and navigate to `http://localhost:4200`.

## API Endpoints

The application interacts with the following API endpoints (provided by server.js):

### GET Endpoints (legacy)
- **EE Balances**: `GET /balance/ee/{configName}?balanceDate={date}`
- **EI Balances**: `GET /balance/ei/{configName}?balanceDate={date}`
- **Reconciliation**: `GET /balance/reconciliation/{configName}?balanceDate={date}`

### POST Endpoints (with filtering support)
- **EE Balances Search**: `POST /balance/ee/{configName}/search`
- **EI Balances Search**: `POST /balance/ei/{configName}/search`
- **Reconciliation Search**: `POST /balance/reconciliation/{configName}/search`

See [FILTERS.md](FILTERS.md) for details on the search request format.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.