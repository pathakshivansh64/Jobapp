import {Router} from "express"
import { googlelogin, login, logout, signup, updateprofile } from "../controllers/user.controllers.js"
import isAuthenticated from "../../middlewares/authentication.js"
import { singlestorage, uploadProfilePicture } from "../../middlewares/multer.js"


const router =Router()

router.route('/signup').post(uploadProfilePicture,signup)
router.route('/login').post(login)
router.route('/logout').post(isAuthenticated,logout)
router.route('/updateprofile').post(isAuthenticated,singlestorage,updateprofile)
router.route('/google').post(googlelogin)

export default router