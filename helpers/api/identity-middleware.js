import joi from 'joi';

import User from "models/User";
import db from "lib/db";

async function identityMiddleware(req, identity) {
    if (!identity || identity === 'user') return;
    
    const userId = req.headers.get('userId');
    db.connect();
    const user = await User.findOne({ _id: userId });
    db.disconnect();

    if (identity === 'admin' && user.role !== 'admin') {
        throw '无权操作';
    }

    if (identity === 'root' && !user.root) {
        throw '无权操作，仅超级管理可操作';
    }

    req.headers.set('userRole', user.role);
    req.headers.set('userRoot', user.root);  
}

export { identityMiddleware };
