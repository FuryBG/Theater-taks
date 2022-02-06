const router = require("express").Router();
const { isGuest, isUser } = require("../middlewares/guards");


    router.get("/register", isGuest(), (req, res) => {
        res.render("register.hbs");
    });

    router.post("/register", isGuest(), async(req, res) => {
        try{
            await req.auth.register(req.body.username, req.body.password);
        res.redirect("/");
        }catch(err) {
            console.log(err);
            res.render("register.hbs");
        }
    });

    router.get("/login", isGuest(), (req, res) => {
        res.render("login.hbs");
    });

    router.post("/login", isGuest(), async(req, res) => {
        try{
            await req.auth.login(req.body.username, req.body.password);
        res.redirect("/");
        }catch(err) {
            console.log(err);
            res.render("login.hbs");
        }
    });


    router.get("/logout", isUser(), (req, res) => {
        req.auth.logout();
        res.redirect("/");
    });


module.exports = router;