import jwt from 'jsonwebtoken';

const verifyToken = (req, isJwt) => {
    try {
        const token = req.headers.get('authorization');
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const id = decoded.id;
        return id;
    } catch (error) {
        if (isJwt) {
            throw error
        }
    }
    
}
  
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

export const auth = {
  verifyToken,
  createAccessToken
}
