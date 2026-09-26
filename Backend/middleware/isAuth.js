import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        console.log("TOKEN RECEIVED:", !!token);

        if (!token) {
            return res.status(401).json({
                message: "User token not found"
            });
        }

        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (!verifyToken?.userId) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.userId = verifyToken.userId;

        console.log("TOKEN VERIFIED");

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default isAuth;