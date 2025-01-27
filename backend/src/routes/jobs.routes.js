import { Router } from "express";
import { createjobs, getadminjobs, getalljobs, getjobsbyID, updatejob,sendJobEmails } from "../controllers/jobs.controllers.js";
import isAuthenticated from "../../middlewares/authentication.js";

const router=Router();

router.route('/createjobs').post(isAuthenticated,createjobs)
router.route('/getalljobs').post(getalljobs)
router.route('/getjobsbyID/:id').post(getjobsbyID)
router.route('/getadminjobs').post(isAuthenticated,getadminjobs)
router.route('/updatejob/:id').post(isAuthenticated,updatejob)
router.route('/sendemail/:id').post(sendJobEmails)

export default router