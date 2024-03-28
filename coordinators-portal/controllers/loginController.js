const { admin } = require('../models/adminSchema');
// const { Participant } = require('../models/participantSchema');
const { Registrations } = require('../models/registrationsSchema');
const {Students} = require('../models/studentSchema')

exports.login = async (req, res) => {
    const { name, pwd } = req.body;

    try {
        const valid = await admin.findOne({ name: name });

        if (valid) {
            if (valid.pwd == pwd) {
                const eventName = valid.event;

                if(eventName == "STAR OF THIRAN"){
                    res.redirect(`/starHome?eventName=${eventName}`);
                }
                else if(eventName == "Secretary"){
                    res.redirect(`/adminHome?eventName=${eventName}`);
                }
                 else{
                    res.redirect(`/home?eventName=${eventName}`);
                }

            } else {
                res.send("Incorrect Password");
            }
        } else {
            res.send("User not found in db");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};



exports.home = async (req, res) => {
    try {
        const eventNameVal = req.query.eventName;
        console.log(eventNameVal);

        const registrations = await Registrations.find({ event_name: eventNameVal });

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

        res.render("details", { eventName: eventNameVal, participants: mergedData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
