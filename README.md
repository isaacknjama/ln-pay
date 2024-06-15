# LN-PAY with IBEX API

This project is a Node.js application built with Express, aimed at consuming the IBEX API to perform the following tasks:

- Get account details
- Create a Lightning Network (LN) invoice
- Pay a Lightning Network (LN) invoice

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Express**: A minimal and flexible Node.js web application framework.
- **IBEX API**: Integrates with the IBEX API to manage account details and Lightning Network invoices.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:isaacknjama/ln-pay.git
   cd ln-pay
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` file in the root directory and add your IBEX API credentials:**

   ```env
    PORT=<PORT>
    ACCOUNT_ID=<IBEX-ACCOUNT-ID>
    AUTH_TOKEN=<IBEX-AUTH-TOKEN>
    BASE_URL=<IBEX-API-BASE-URL>
   ```

## Running the App

1. **Start the Express server:**

   ```bash
   npm start
   ```

2. **Open your browser or API client:**

   The server will be running on [http://localhost:3001](http://localhost:3001).

## API Endpoints

### Get Account Details

- **Endpoint**: `GET /get-account-details`
- **Description**: Retrieves account details from IBEX API.
- **Response**:

  ```json
  {
    "id": "83...",
    "userId": "9c6...",
    "name": "ln-pay",
    "currencyId": 0,
    "balance": 1000
  }
  ```

### Create LN Invoice

- **Endpoint**: `POST /create-ln-invoice`
- **Description**: Creates a Lightning Network invoice.
- **Request Body**:

    ```json
    {
        amountMsat: 1000,
        accountId: accountId,
        expiration: 900,
    }
    ```

- **Response**:

  ```json
  {
    "bolt11": "lnbc1...",
    "hash": "7505...",
    "expirationUtc": 171...
  }
  ```

### Pay LN Invoice

- **Endpoint**: `POST /api/pay`
- **Description**: Pays a Lightning Network invoice.
- **Request Body**:

  ```json
    accountId: accountId,
    bolt11: "lnbc1pnx4lwgpp52e6u0wvnwp8y7lu4nprnfh6jynwhu9n2c0tsd8aveex4w5aawndsdqqcqzzsxqyz5vqsp5l4ll6mnvmfna2nrmkw7u7q4wr2rktcqywy7x4a7lkwkfq8m4cjss9qyyssqzqacwjj0dg79djx2004gzmkph82q4vzthjfda4yyk2j72wn9c7y3xp3csvdjh3wcr50kpl7dwdwv823m98c2qy8cxmm8ngck4yg9x8sp4fk0dr",
    amount: 1000,
  ```

- **Response**:

  ```json
  {
    "paymentId": "def456",
    "status": "paid",
    "amount": 100,
    "currency": "USD"
  }
  ```

## Folder Structure

```plaintext
ln-pay/
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── index.js              # Server definition file
├── LICENSE               # License info file
├── package.json          # Project configuration and scripts
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
