import jwt from 'jsonwebtoken';

// Authenticates the user based on the JWT token
export const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Not authorized, please login again' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user info to request
        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

// Authorization middleware factory
// Pass in allowed roles, e.g., requireRole('HOD', 'INVENTORY_TO')
export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: Requires one of ${allowedRoles.join(', ')}`
            });
        }

        next();
    };
};

export default requireAuth;