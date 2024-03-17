exports.updateattendance = async (req, res) => {
    const id = req.body;
    const id_string = JSON.stringify(id);
    console.log(id_string)

    try {
        res.redirect("/attendance");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

};

exports.attendance= async(req,res)=>{
    try {
        res.render('attendance')
    } catch (error) {
        console.log(error)
    }
}