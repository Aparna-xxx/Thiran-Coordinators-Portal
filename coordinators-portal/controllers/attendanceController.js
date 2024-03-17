exports.attendance= async(req,res)=>{
    try {
        const eventNameVal = req.query.eventName;
        console.log(eventNameVal)

        res.render('attendance')
    } catch (error) {
        console.log(error)
    }
}


