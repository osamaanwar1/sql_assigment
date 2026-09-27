const sql = require("mysql2/promise");

const pool = sql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10
});

async function setupDatabase() {
    try {
        console.log("1 - Creating database...");

        await pool.query(`
            CREATE DATABASE IF NOT EXISTS store
        `);

        console.log("2 - Database created");

        await pool.query(`
            USE store
        `);

        console.log("3 - Using store");

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS Suppliers
            (
                id            INT PRIMARY KEY AUTO_INCREMENT,
                name          VARCHAR(255),
                ContactNumber VARCHAR(255)
            )
        `);

        console.log("4 - Suppliers created");

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS Products
            (
                id            INT PRIMARY KEY AUTO_INCREMENT,
                product_name  VARCHAR(255),
                price         DECIMAL(10, 2),
                StockQuantity INT,
                supplier_id   INT,
                FOREIGN KEY (supplier_id)
                    REFERENCES Suppliers (id)
            )
        `);

        console.log("5 - Products created");

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS Sales
            (
                sale_id           INT PRIMARY KEY AUTO_INCREMENT,
                product_id   INT,
                QuantitySold INT,
                SaleDate     DATE,
                FOREIGN KEY (product_id)
                    REFERENCES Products (id)
            )
        `);

        console.log("6 - Sales created");

        console.log("Database and tables are ready");

    } catch (error) {
        console.log("ERROR:");
        console.log(error);
    }
}

module.exports = { pool, setupDatabase };