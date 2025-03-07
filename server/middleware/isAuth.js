import jwt, { decode } from 'jsonwebtoken';
export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("Unauthorized Access");
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access , Please verify your email"
            })
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            console.log("Unauthorized access , Jwt token is not valid")
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access,Invalid Token"
            })
        }
        req.id = decode.user_id;
        next();
    } catch (err) {
        console.log(err);
    }
}