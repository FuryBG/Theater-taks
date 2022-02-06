const Theater = require("../models/Theater");


async function getAll(date, likes) {
    let options = {};
    if(date) {
        options = {date: -1};
    }
    if(likes) {
        options = {allLikes: -1};
    }
    const allTheaters = await Theater.find({}).sort(options).lean();
    return allTheaters;
};

async function getById(id) {
    let currTheater = await Theater.findById(id).populate("likes").populate("owner").lean();
    return currTheater;
};

async function create(data) {
    let newItem = new Theater(data);
    await newItem.save();
    return newItem;
};

async function edit(id, data) {
    let oldItem = await Theater.findById(id);
    let newItem = Object.assign(oldItem, data);
    await newItem.save();
    return newItem;
};

async function del(id) {
    await Theater.deleteOne({_id: id});
};

async function getByTitle(title) {
    let titleRegEx = new RegExp(`^${title}$`, "i");
    let existing = await Theater.find({title: {$regex: titleRegEx}});
    return existing;
};

async function like(userId, productId) {
    let currItem = await Theater.findById(productId);
    currItem.likes.push(userId);
    currItem.allLikes += 1;
    await currItem.save();
};



module.exports = {
    getAll,
    getById,
    create,
    edit,
    del,
    getByTitle,
    like
};