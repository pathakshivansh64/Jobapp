import { Router } from "express";
import { applyjob, getapplicants, getappliedjobs, updatestatus } from "../controllers/application.controllers.js";
import isAuthenticated from "../../middlewares/authentication.js";


const router=Router();

router.route('/applyjob/:id').post(isAuthenticated,applyjob)
router.route('/getappliedjobs').post(isAuthenticated,getappliedjobs)
router.route('/getapplicants/:id').post(isAuthenticated,getapplicants)
router.route('/updatestatus/:id').post(isAuthenticated,updatestatus)

export default router