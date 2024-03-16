exports.attendance= async(req,res)=>{
    try {
        res.render('attendance')
    } catch (error) {
        console.log(error)
    }
}