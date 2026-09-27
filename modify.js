const {Router}=require('express');
const router = Router();
const { pool } = require("./db.js");
router.post('/add_category',async (req,res)=>{
    await pool.execute(`alter table Products add column category VARCHAR(100)`)
    res.status(200).json({
        message:'category was  added successfully'
    })
})
router.delete('/remove_category',async (req,res)=>{
    await pool.execute(`alter table Products drop column category`)
    res.status(200).json({
        message:'category was  deleted successfully'
    })
})
router.patch('/ContactNumber/:id',async (req,res)=>{
    let [sup]= await pool.execute(`select ContactNumber from Suppliers where id =?`,[req.params.id])
    let supplier=sup[0]
    let {ContactNumber}=req.body
    if(sup.length===0){
        res.status(404).json({
            message:'Not Found',
        })
    }
    await pool.execute(`update Suppliers set ContactNumber=? where id=?`,[ContactNumber,req.params.id])
    res.status(200).json({
        message:'suppliers updated successfully'
    })

})
router.patch('/addconstraints',async (req,res)=> {
    await pool.execute(`ALTER TABLE Products
        MODIFY COLUMN product_name VARCHAR (255) NOT NULL`)
    res.status(200).json({
        message: 'done'

    })
})
module.exports = router;