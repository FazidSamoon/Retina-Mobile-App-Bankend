import userModel from '../models/user.js';

export const createUser = async (user, member) => {
    try {
        const userObj = (await userModel.create(user)).toObject();
        return userObj;
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (filters) => {
    try {
        const user = await userModel.findOne(filters);
        return user;
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (filters, update) => {
    try {
        const user = await userModel.findOneAndUpdate(filters, update, { new: true });
        return user;
    } catch (error) {
        console.log(error);
    }
};