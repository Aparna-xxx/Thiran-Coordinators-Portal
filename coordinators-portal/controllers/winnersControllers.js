// const { Participant } = require('../models/participantSchema');
const { Students } = require('../models/studentSchema')
const { Registrations } = require('../models/registrationsSchema')
const { Winners } = require('../models/winnerSchema');

exports.updateWinners = async(req,res) => {
    try {
        const{digit1, digit2, digit3, digit4, digit5, digit6, digit7, digit8, eventName} = req.body;
        const winnerId = digit1 + digit2 + digit3 + digit4;
        const runnerId = digit5 + digit6 + digit7 + digit8;

        const winningCandidate = await Registrations.findOne({ _id : winnerId });
        // console.log(winningCandidate);

        const winnersEmails = winningCandidate.participants; // Mails from registrations
        // console.log(winnersEmails);

        const winningStudents = await Students.find({ email: { $in: winnersEmails } }); // Mapping mail from reg and stu collections
        // console.log("from students : ", winningStudents);

        if(winningStudents && winningStudents.length > 0) {
            // Combine data from students belonging to the same team
            const combinedDataWinner = winningStudents.reduce((acc, student) => {
                if (!acc.name) {
                    acc.name = student.name;
                    acc.prog = student.programme;
                    acc.dept = student.department;
                    acc.phone = student.phone;
                } else {
            // Combine names and departments of students belonging to the same team
                    acc.name += `, ${student.name}`;
                    acc.prog += `, ${student.programme}`;
                    acc.dept += `, ${student.department}`;
                    acc.phone += `, ${student.phone}`;
                }
            return acc;
        }, {});

        // console.log(combinedDataWinner)

        const newWinner = new Winners({
        _id: winningCandidate._id,
        name: combinedDataWinner.name,
        dept: combinedDataWinner.dept,
        programme: combinedDataWinner.prog,
        eventName: winningCandidate.event_name,
        phone: combinedDataWinner.phone,
        place: "winner"
        });
            // console.log(newWinner);
            await newWinner.save();
        } else {
            res.send("Candidates not found in database");
        }



        const runnerCandidate = await Registrations.findOne({ _id : runnerId})
        // console.log(runnerCandidate)

        const runnersEmails = runnerCandidate.participants;

        const runningStudents = await Students.find({ email: { $in: runnersEmails } });

        
        if(runningStudents && runningStudents.length > 0) {
            // Combine data from students belonging to the same team
            const combinedDataRunner = runningStudents.reduce((acc, student) => {
                if (!acc.name) {
                    acc.name = student.name;
                    acc.prog = student.programme;
                    acc.dept = student.department;
                    acc.phone = student.phone;
                } else {
            // Combine names and departments of students belonging to the same team
                    acc.name += `, ${student.name}`;
                    acc.prog += `, ${student.programme}`;
                    acc.dept += `, ${student.department}`;
                    acc.phone += `, ${student.phone}`;
                }
            return acc;
        }, {});

        // console.log(combinedDataRunner)

        const newRunner = new Winners({
        _id: runnerCandidate._id,
        name: combinedDataRunner.name,
        dept: combinedDataRunner.dept,
        programme: combinedDataRunner.prog,
        eventName: runnerCandidate.event_name,
        phone: combinedDataRunner.phone,
        place: "runner"
        });
        // console.log(newRunner);
        await newRunner.save();
        } else {
            res.send("Candidates not found in database");
        }


        //to render updated winner Page
        const winningC = await Winners.findOne({ eventName: eventName, place : "winner" });
        const runnerC = await Winners.findOne({ eventName: eventName, place : "runner" });


        res.render('winnersLocked', {eventName, winningCandidate : winningC, runnerCandidate : runnerC})
        } catch (error) {
            console.error(error)
        }
    }

exports.winners = async (req, res) => {
    try {
        const eventName = req.query.eventName;
        console.log(eventName)

        const winningCandidate = await Winners.findOne({ eventName: eventName, place : "winner" });
        const runnerCandidate = await Winners.findOne({ eventName: eventName, place : "runner" });

        if (winningCandidate && runnerCandidate) {
            res.render('winnersLocked', { eventName, winningCandidate, runnerCandidate });
        } else {
            res.render('winner', { eventName });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
