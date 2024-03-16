exports.winners= async(req,res)=>{
    try {
        res.render('winner')
    } catch (error) {
        console.log(error)
    }
}