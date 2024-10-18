import { Router } from "express";
import { getcompany, getcompanybyID, registercompany, updatecompany } from "../controllers/company.controllers.js";
import isAuthenticated from "../../middlewares/authentication.js";
import { uploadcompanylogo } from "../../middlewares/multer.js";

const router=Router();

router.route('/register').post(isAuthenticated,registercompany)
router.route('/getcompany').post(isAuthenticated,getcompany)
router.route('/getcompanybyID/:id').post(isAuthenticated,getcompanybyID)
router.route('/updatecompany/:id').post(isAuthenticated,uploadcompanylogo,updatecompany)

export default router
