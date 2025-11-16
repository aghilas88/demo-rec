# Balance Explorer

This project is an Angular application designed to explore and visualize balance and reconciliation data from a specified API. It provides a user-friendly interface to view EE and EI balances, as well as reconciliation reports.

## Project Structure

The project is organized as follows:

```
balance-explorer
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── dashboard          # Main dashboard component
│   │   │   ├── ee-list           # Component for displaying EE balances
│   │   │   ├── ei-list           # Component for displaying EI balances
│   │   │   └── reconciliation     # Component for displaying reconciliation data
│   │   ├── services               # Service for API interactions
│   │   ├── models                 # Data models for balances and reconciliation
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
├── angular.json                   # Angular CLI configuration
├── package.json                   # npm configuration
├── tsconfig.json                  # TypeScript configuration
├── .gitignore                     # Git ignore file
└── README.md                      # Project documentation
```

## Features

- **Dashboard**: Overview of balances and reconciliation status.
- **EE List**: Displays a list of EE balances fetched from the API.
- **EI List**: Displays a list of EI balances fetched from the API.
- **Reconciliation**: Shows reconciliation data and status.
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

4. Run the application:
   ```
   ng serve
   ```

5. Open your browser and navigate to `http://localhost:4200`.

## API Endpoints

The application interacts with the following API endpoints:

- **EE Balances**: `/balance/ee/{configName}?balanceDate={date}`
- **EI Balances**: `/balance/ei/{configName}?balanceDate={date}`
- **Reconciliation**: `/reconciliation/{configName}?balanceDate={date}`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.