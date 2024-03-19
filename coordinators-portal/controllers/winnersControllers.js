const { Participant } = require('../models/participantSchema');
const { Winners } = require('../models/winnerSchema');

exports.updateWinners = async(req,res) => {
    try {
        const{digit1, digit2, digit3, digit4, digit5, digit6, digit7, digit8, eventName} = req.body;
        const winnerId = digit1 + digit2 + digit3 + digit4;
        const runnerId = digit5 + digit6 + digit7 + digit8;

        const winningCandidate = await Participant.findOne({regId : winnerId})
        if(winningCandidate){
            const newWinner = new Winners({
                regId: winningCandidate.regId,
                name: winningCandidate.name,
                dept: winningCandidate.dept,
                eventName: winningCandidate.eventName,
                place:"winner"
            })
            console.log(newWinner)
            await newWinner.save();
        }
        else{
            res.send("candidate not found in db")
        }

        const runnerCandidate = await Participant.findOne({regId : runnerId})
        if(runnerCandidate){
            const newRunner = new Winners({
                regId: runnerCandidate.regId,
                name: runnerCandidate.name,
                dept: runnerCandidate.dept,
                eventName: runnerCandidate.eventName,
                place:"runner"
            })
            console.log(newRunner)
            await newRunner.save();
        }
        else{
            res.send("candidate not found in db")
        }
    res.render('winner', {eventName})
    } catch (error) {
        console.error(error)
    }
}

exports.winners= async(req,res)=>{
    try {
        const eventName = req.query.eventName;
        console.log(eventName)
        res.render('winner', {eventName})
    } catch (error) {
        console.log(error)
    }
}