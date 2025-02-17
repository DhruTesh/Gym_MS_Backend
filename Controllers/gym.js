const Gym = require('../Modals/gym');
const bcrypt = require('bcryptjs');




exports.register = async (req, res) => {
    try {
        const { userName, password, gymName, profilePic, email } = req.body;

        const isExist = await Gym.findOne({userName});

        if (isExist) {
            res.status(400).json({
                error: "Username already exists"
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            const newGym = new Gym({userName,password : hashedPassword, gymName, profilePic, email});
            await newGym.save();
            res.status(201).json({
                message: "Gym Registered Successfully", 
                success: "yes",
                data: newGym
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}



exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const gym = await Gym.findOne({userName});

        if(gym && await bcrypt.compare(password, gym.password)){
            
            res.json({message: "Login Successful",success: "true",gym });
        }else{
            res.status(400).json({error: "Invalid Credentials"});
        }
    }catch(err){
        res.status(500).json({
            error: "Server Error"
        })
    }
}
