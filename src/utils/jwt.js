import Jwt from 'jsonwebtoken';

export const generateAccessToken = async (data) => {
    const token = Jwt.sign(data, "secret", { expiresIn: '365d' });
    return token;
};

export const decodeToken = async (token) => {
    return Jwt.verify(token, "secret");
};
