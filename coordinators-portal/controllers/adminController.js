const { Registrations } = require('../models/registrationsSchema')
const { Students } = require('../models/studentSchema')
const {Winners} = require('../models/winnerSchema')


exports.adminHome = async (req,res) => {
    try {

        const eventName = req.query.eventName;


        

        res.render("adminDetails" , {eventName : eventName});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

exports.event = async (req,res) => {
    try {
        const eventName = req.query.eventName;
        console.log(eventName);
        const registrations = await Registrations.find({ event_name: eventName });

        const participants = registrations.flatMap(participant => participant.participants);//mail from registrations
        console.log(participants)

        const students = await Students.find({ email: { $in: participants } });//mapping mail from reg and stu collections
        console.log("from students : ", students);
        
        // merging data of reg and stu collection
        const mergedData = registrations.map(registration => {
            const matchingStudents = students.filter(student => registration.participants.includes(student.email));
            return matchingStudents.map(student => ({
                _id: registration._id,
                attended: registration.attended,
                name: student.name,
                email: student.email,
                prog: student.programme,
                dept: student.department,
                phone: student.phone,
                year: student.year
            }));
        }).flat();

        console.log("Merged Data: ", mergedData);

        res.render("adminDetails", { eventName: eventName, participants: mergedData });


    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


exports.star = async (req,res) => {
    try {
        const eventName = req.query.eventName;
        console.log(eventName);

        const winnersAndRunners = await Winners.find({}).sort({ eventName: 1 });
        console.log(winnersAndRunners)

        res.render("adminDetails", { eventName: eventName, winners : winnersAndRunners});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}