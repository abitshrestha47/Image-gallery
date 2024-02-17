import express from 'express';
import { checkUser, createUser, getAllAuthor, getAuthor, updateAuthor } from '../controllers/authController.js';
import { requiresSignIn } from '../middleware/authMiddleware.js';

export const authRouter=express.Router();

authRouter.post('/signup',createUser);
authRouter.post('/login',checkUser);

//protected route
authRouter.get("/user-auth", requiresSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

authRouter.get('/authors/:id',getAuthor);
authRouter.get('/authors',getAllAuthor);
authRouter.put('/authors/:username',updateAuthor)

// authRouter.get("/admin-auth", requiresSignIn,isAdmin, (req, res) => {
//     res.status(200).send({ ok: true });
// });