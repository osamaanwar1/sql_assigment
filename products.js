const { Router } = require("express");
const { pool } = require("./db.js");

const router = Router();



router.get("/never_Sold", async (req, res) => {
    try {
        let [result] = await pool.execute(`
            SELECT p.*
            FROM Products p
            LEFT JOIN Sales s ON p.ID = s.Product_ID
            WHERE s.Product_ID IS NULL
        `);

        res.status(200).json({
            message: 'products never sold',
            count: result.length,
            result
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
router.get('/highest', async (req, res) => {
    try {
        let [result] = await pool.execute(
            `SELECT * FROM Products ORDER BY StockQuantity DESC LIMIT 1`
        );
        res.status(200).json({
            message: 'highest stock product',
            result: result|| null
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
router.get("/total_quantity", async (req, res) => {
    let [result]=await pool.execute(`SELECT p.product_name ,sum(s.QuantitySold) as totalQuantity FROM Products p
join Sales s on p.id= s.product_id group by p.product_name ,p.id;
    `)
    res.status(200).json({
        message:'total quantity'
        ,result
    })
})
router.post("/", async (req, res) => {
    let { product_name, price, StockQuantity, supplier_id }= req.body;
    await pool.execute(
        `INSERT INTO Products
            ( product_name, price, StockQuantity, supplier_id)
            VALUES ( ?, ?, ?, ?)`,
        [ product_name, price, StockQuantity, supplier_id]
    );
    res.status(201).json({
        message:'product was added successfully'
    })
});
router.get("/", async (req, res) => {
    let [prod]=await pool.execute(
        `select * from products`,
    );
    res.status(200).json({
        message:'this is prods',
        prod
    })
});
router.get("/:id", async (req, res) => {
    let [prod]=await pool.execute(
        `select * from products where id=?`,[req.params.id]
    );
    res.status(200).json({
        message:'this is prod',
        prod
    })
});
// // ● Update a product.
router.patch("/:id", async (req, res) => {
    let [products]= await pool.execute(`select * from  Products  where id=?`,[req.params.id])
    if (products.length === 0) {
        return res.status(404).json({
            message: "Product not found"
        });

    }
    let product=products[0]
    Object.assign(product,req.body)

    await pool.execute(
        `UPDATE Products
             SET product_name = ?,
                 price = ?,
                 StockQuantity = ?,
                 supplier_id = ?
             WHERE id = ?`,
        [
            product.product_name,
            product.price,
            product.StockQuantity,
            product.supplier_id,
            req.params.id,
        ]
    );
    res.status(200).json({
        message:'products updated'
    })
})
// ● Delete a product.
router.delete("/{:id}", async (req, res) => {
    let {product_name}=req.body
    await pool.execute(`DELETE FROM Products WHERE product_name=?`,[product_name])
    if(!!req.params.id){
    await pool.execute(`DELETE FROM Products WHERE id=?`,[req.params.id])
    }
    res.status(200).json({
        message:'products deleted'
    })
})



module.exports = router;