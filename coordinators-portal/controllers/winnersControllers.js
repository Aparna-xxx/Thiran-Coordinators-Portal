exports.winners= async(req,res)=>{
    try {
        const eventName = req.query.eventName;
        res.render('winner', {eventName})
    } catch (error) {
        console.log(error)
    }
}