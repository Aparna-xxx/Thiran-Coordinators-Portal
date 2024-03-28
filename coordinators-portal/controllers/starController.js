const {Winners} = require('../models/winnerSchema')


exports.starHome = async(req,res) => {
    try {
        const eventNameVal = req.query.eventName;
        // console.log(eventNameVal);

        const winnersAndRunners = await Winners.find({}).sort({ eventName: 1 });
        // console.log(winnersAndRunners)

        res.render("starDetails", { eventName: eventNameVal, winners : winnersAndRunners});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

exports.starAttendance = async (req,res) => {
    try {
        const eventName = req.query.eventName;
        // console.log(eventNameVal)

        res.render('starAttendance' , {eventName})
        // console.log(eventName);
    } catch (error) {
        console.log(error)
    }
}

exports.updateStarAttendance = async (req,res) => {
    try {
        const { digit1, digit2, digit3, digit4 } = req.body;
        const Id = digit1 + digit2 + digit3 + digit4;
        const eventName = req.body.eventNameVal;
        console.log(Id)
        // console.log(eventName);

        const candidate = await Winners.findOne({_id : Id})

        if(candidate){
            candidate.attended = true;
            await candidate.save();

            res.render('starAttendance', { eventName });
        } else {
            res.send("No user found with this registration ID");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

exports.starWinner = async (req,res) => {
    try {
        const eventName = req.query.eventName;
        // console.log(eventName)

        const winningCandidate = await Winners.findOne({ eventName: eventName, place : "winner" });

        if(winningCandidate){
            res.render("starWinnerLocked", {eventName, winningCandidate});
        } else{
            res.render("starWinner", {eventName})
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

exports.updateStarWinner = async (req,res) => {
    try {
        const{ digit1, digit2, digit3, digit4, eventName} = req.body;
        const winnerId = digit1 + digit2 + digit3 + digit4;

        const winningCandidate = await Winners.findOne({ _id : winnerId })
        newID =  winnerId + 0; //to skip duplicate value error , adding 0 to the end of _id.
        // console.log(newID)


        if(winningCandidate){

            const newWinner = new Winners({
                _id: newID,
                name: winningCandidate.name,
                dept: winningCandidate.dept,
                programme: winningCandidate.programme,
                eventName: eventName,
                phone: winningCandidate.phone,
                place: "winner"
                });
                    console.log(newWinner);
                    await newWinner.save();

            res.render("starWinnerLocked", {eventName, winningCandidate});
        }
        else{
            res.send("winner not found");
        }        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}