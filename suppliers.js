const { Router } = require("express");
const { pool } = require("./db.js");

const router = Router();
// 11. Create a reporting endpoint to retrieve suppliers whose names start with 'F'
router.get('/startwith', async (req, res) => {
    try {
        const { name } = req.query;
        let [result] = await pool.execute(
            `SELECT * FROM Suppliers WHERE name LIKE ?`,
            [`${name}%`]
        );
        res.status(200).json({ message: 'suppliers', result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
router.post("/", async (req, res) => {
    let {name,ContactNumber}= req.body;
    await pool.execute(
        `INSERT INTO Suppliers
            (name, ContactNumber)
            VALUES ( ?, ?)`,
        [name,ContactNumber]
    );
    res.status(201).json({
        message:'supplier was added successfully'
    })
});
router.get("/", async (req, res) => {
    let [data]= await pool.execute(
        `SELECT * FROM Suppliers`
    )

    res.status(200).json({data})

})
router.patch("/:id", async (req, res) => {
    let [x]=await pool.execute(`select * from suppliers where id=?`, [req.params.id])
    let supplier=x[0]
    Object.assign(supplier,req.body)
    await pool.execute(
        `UPDATE Suppliers
         SET name = ?, ContactNumber = ?
         WHERE id = ?`,
        [
            supplier.name,
            supplier.ContactNumber,
            req.params.id
        ]
    );
    res.status(200).json({
        message:'supplier was updated successfully'
    })
})
router.delete("/:id", async (req, res) => {
    await pool.execute(`DELETE FROM Suppliers where id=?`, [req.params.id])
    res.status(200).json({
        message:'supplier was deleted successfully'
    })
})

module.exports = router;