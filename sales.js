const { Router } = require("express");
const { pool } = require("./db.js");
const router=Router();
// all sales
router.get("/all_sales", async (req, res) => {

    let [result] = await pool.execute(`
        SELECT 
            p.product_name,
            s.QuantitySold,
            s.SaleDate
        FROM Sales s
        JOIN Products p 
            ON p.id = s.product_id
    `);

    res.status(200).json({
        message: "all sales",
        result
    });
});
router.post('/',async (req,res)=>{
    let {product_id,QuantitySold,SaleDate}= req.body;
    await pool.execute("insert into Sales set product_id=?,QuantitySold=?,SaleDate=? ",[product_id,QuantitySold,SaleDate])
    res.status(201).json({
        message:"the sale added successfully"
    })
})
router.get("/", async (req,res)=>{
    let [data]=await pool.execute (`select * from Sales`)
    if (!data){
        res.status(404).json({message:"no data"})
    }
    res.status(200).json({
        data:data
    })
})
router.get("/:id", async (req,res)=>{
    let [data]=await pool.execute (`select * from Sales where sale_id=?`,[req.params.id])
    if (data.length===0){
        res.status(404).json({message:"no data"})
    }
    res.status(200).json({
        data:data
    })
})


module.exports = router;