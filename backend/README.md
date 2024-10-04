# Grace & Garments - Node.js Server

This server provides the backend functionality for the **Grace & Garments** Angular Storefront, allowing users to perform CRUD (Create, Read, Update, Delete) operations on product data. The server is built using **Express.js** and interacts with a JSON file for data management.

## Table of Contents

- [Grace \& Garments - Node.js Server](#grace--garments---nodejs-server)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Custom JSON Structure](#custom-json-structure)

## Features

- **Express.js Server:** A robust and scalable backend built with Express.js.
- **CRUD Operations:** Supports Create, Read, Update and Delete operations on product data.
- **JSON Data Storage:** Product data is stored and manipulated within a JSON file.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```zsh
   git clone https://github.com/jediahjireh/grace-garments.git
   ```

2. Install dependencies:

   ```zsh
   npm install
   ```

## Usage

1. Run the server:

   ```zsh
   npm start
   ```

2. The server will be running on the [default localhost](http://localhost:3000/).

3. The Angular frontend will interact with these API endpoints to perform CRUD operations on products.

## Custom JSON Structure

Here is the structure of the custom JSON file used for managing product data:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Sample Product",
      "image": "images/products/sample.png",
      "price": "99.99",
      "rating": 4
    }
  ]
}
```

---
