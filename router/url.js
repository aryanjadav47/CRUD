let express=require("express");
let router=express.Router();
let multer=require("multer");
let user=require("../model/model");

let storage= multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null, "./uploads");
    },
    filename : function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

let upload=multer({ storage });

router.get("/", async (req, res) => {
    try {
        const users = await user.find().exec();
        res.render('home', { user: users });
    } catch (err) {
        res.status(500).send(err);
    }
});


router.post("/add",upload.single('image'),async (req,res)=>{
    let {name,email,number, image}=req.body;
    await user.create({
        name,
        email,
        number,
        image:req.file.filename,
    });

    return res.redirect("/");
});

router.post("/:id",async (req,res)=>{
    let id=req.params.id;
    let {name,email,number}=req.body;
    await user.findByIdAndUpdate(id,{
        name,
        email,
        number,
    });
    return res.redirect("/");
});

router.get("/add",(req,res)=>{
    return res.render("add");
});

router.get("/update/:id",async (req,res)=>{
    let id=req.params.id;
    let result=await user.findById(id);
    if(!result) return res.redirect("/");
    return res.render("update",{
        user : result,
    });
});

router.get("/delete/:id",async (req,res)=>{
    let id=req.params.id;
    await user.findByIdAndDelete(id);
    return res.redirect("/");
});

module.exports=router;