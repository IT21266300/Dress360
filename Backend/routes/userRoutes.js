import express from 'express';
import {addNewUser,getUser} from '../controllers/userController.js';

const router = express.Router();

router.post('/addUser', addNewUser);
router.get('/getUsers', getUser);


export default router;
