function registerRequired(req,res,next){
    const email = req.body.email;

    const reg = /^\S+@\S+\.\S+$/i;
	if(!reg.test(email)){
        res.status(400).json({
            status: 400,
            message: '이메일 형식이 올바르지 않습니다.',
          })
        return;
    }
    else{
        next();
    }
}

export { registerRequired };