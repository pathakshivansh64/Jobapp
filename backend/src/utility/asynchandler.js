const asynchandler=(requesthandler)=>async (req,res,next)=>{
    try {
      return   await requesthandler(req,res,next);
    } catch (error) {
       return res.status(error.code||500).json({
            success:false,
            message:error.message
        })
    }
}
export {asynchandler}

