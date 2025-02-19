const Member = require('../Modals/member');
const Membership = require('../Modals/membership')


exports.getAllMembers = async (req, res) => {
    try {
        const { skip, limit } = req.query;
        const members = await Member.find({ gym: req.gym._id });
        const totalMember = members.length;

        const limitedMembers = await Member.find({ gym: req.gym._id }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.status(200).json({
            message: members.length ? "Members Retrieved Successfully" : "No Members Found",
            members: limitedMembers,
            totalMember: totalMember
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
}

function addMonthsToDate(months, joiningDate) {

    // Get current year, month, and day
    let today = joiningDate;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // Months are 0-indexed
    const currentDay = today.getDate();

    // Calculate the new month and year
    const futureMonth = currentMonth + months;
    const futureYear = currentYear + Math.floor(futureMonth / 12);

    // Calculate the correct future month (modulus for month)
    const adjustedMonth = futureMonth % 12;

    // Set the date to the first of the future month
    const futureDate = new Date(futureYear, adjustedMonth, 1);

    // Get the last day of the future month
    const lastDayOfFutureMonth = new Date(futureYear, adjustedMonth + 1, 0).getDate();

    // Adjust the day if current day exceeds the number of days in the new month
    const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);

    // Set the final adjusted day
    futureDate.setDate(adjustedDay);

    return futureDate;
}


exports.registerMember = async (req, res) => {
    try {
        const { name, mobileNo, address, gender, membership, profilePic, joiningDate } = req.body;
        const member = await Member.findOne({ gym: req.gym._id, mobileNo });
        
        if (member) {
            return res.status(409).json({ error: 'Already registered with this Mobile No' });
        }

        const memberShip = await Membership.findOne({ _id: membership, gym: req.gym._id });
        const membershipMonth = memberShip.months;
        if (memberShip) {
            let jngDate = new Date(joiningDate);
            const nextBillDate = addMonthsToDate(membershipMonth, jngDate);
            let newmember = new Member({ name, mobileNo, address, gender, membership, gym: req.gym._id, profilePic, nextBillDate });
            await newmember.save();
            res.status(200).json({ message: "Member Added Successfully", newmember });

        } else {
            return res.status(409).json({ error: "No such Membership are there" })
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}