import jwt from 'jsonwebtoken';

export const auth = {
    verifyToken,
    createAccessToken
}

function verifyToken(req) {
    const token = req.headers.get('authorization');
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decoded.id;
    return id;
}
  
function createAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};
  