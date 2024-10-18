import multer from 'multer'

const storage=multer.memoryStorage();

 const singlestorage=multer({storage}).single("resume");
 const uploadProfilePicture = multer({ storage }).single('profilephoto');
 const uploadcompanylogo=multer({ storage }).single('file');

 export  {singlestorage,uploadProfilePicture,uploadcompanylogo};