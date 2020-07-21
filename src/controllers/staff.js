const {staffModel, validate } = require('../model/staff');
const { inboxMailModel } = require('../model/inboxMail')


async function getAllStaff(req,res) {
    const staffs = await staffModel.find()
    res.json(staffs)

}

async function getStaff(req,res) {
    const staff = await staffModel.findById(req.params.id)
    if(!staff) return res.status(404).json('The Staff with given ID not found');
    return res.json(staff)
}

async function addStaff(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {name, username, phone, password} = req.body
    const newStaff = new staffModel({
        name,
        username,
        password,
        phone
    })
    const result = await newStaff.save()
    res.json(result)
}

async function updateStaff(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, username, phone, password} = req.body;
    const staff = await staffModel.findByIdAndUpdate(req.params.id, {
        name,
        username,
        password,
        phone
    },{new: true});

    if (!staff) {
        return res.status(404).json("Staff ID not found")
    };

    return res.json(staff);
}

async function deleteStaff(req,res) {
    const staff = await staffModel.findByIdAndDelete(req.params.id)
    if(!staff) return res.status(404).json('The Staff with given ID not found')
    return res.json(staff)
}

async function createInboxMail(req, res) {
    const staff = await staffModel.findById(req.params.id);
    if(!staff) return res.status(404).json('The staff not found');
    const { sender, title, message } = req.body;
    const newInboxMail = new inboxMailModel({
        sender,
        title,
        message
    });
    staff.inboxMails.push(newInboxMail);
    staff.save();
    return res.json(newInboxMail)
}

async function removeInboxMail(req, res) {
    const { id, mailId } = req.params 
    const staff = await staffModel.findById(id);
    if(!staff) return res.status(404).json('The staff not found');
    const mail = staff.inboxMails.id(mailId)
    mail.remove();
    staff.save();
    return res.json(mail)
}

async function updateAvatar(req, res) {
    const { id } = req.params;
    const { avatar } = req.body;
    const staff = await staffModel.findByIdAndUpdate(id, {
        avatar
    });
    if(!staff) {
        return res.status(404).json('Image missing'); 
    }

    return res.json(staff)
}



module.exports = {
    getStaff,
    getAllStaff,
    addStaff,
    updateStaff,
    deleteStaff,
    createInboxMail,
    removeInboxMail,
    updateAvatar,
}