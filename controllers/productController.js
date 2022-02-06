const router = require("express").Router();
const { isGuest, isUser } = require("../middlewares/guards");


router.get("/", async(req, res) => {
    let allItems = await req.storage.getAll(false, false);

    res.render("home.hbs", {allItems: allItems});
});

router.get("/sort/likes", isUser(), async(req, res) => {
    let theaters = await req.storage.getAll(false, true);

    res.render("home.hbs", {allItems: theaters});
});

router.get("/sort/date", isUser(), async(req, res) => {
    let theaters = await req.storage.getAll(true, false);

    res.render("home.hbs", {allItems: theaters});
});

router.get("/like/:id", isUser(), async(req, res) => {
    await req.storage.like(req.user._id, req.params.id);
    res.redirect("/");
});

router.get("/delete/:id", isUser(), async(req, res) => {
    await req.storage.del(req.params.id);
    res.redirect("/");
});

router.get("/edit/:id", isUser(), async(req, res) => {
    let currItem = await req.storage.getById(req.params.id);
    res.render("edit-theater.hbs", currItem);
});

router.post("/edit/:id", isUser(), async(req, res) => {
    try {
        if(req.body.public) {
            req.body.public = true;
        }

        await req.storage.edit(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    }catch(err) {
        console.log(err.message);
        res.render("edit-theater.hbs", {errors: err.message.split("\n")});
    }
});

router.get("/details/:id", async(req, res) => {
    let currItem = await req.storage.getById(req.params.id);
    let ifLiked = false;

    if(req.user) {
        ifLiked = currItem.likes.find(x => x._id == req.user._id);
        if(currItem.owner._id == req.user._id) {
            currItem.isOwner = true;
        }
    }

    if(ifLiked) {
        currItem.isLiked = true;
    }



    res.render("theater-details.hbs", currItem);
});

router.get("/create", isUser(), (req, res) => {
    res.render("create-theater.hbs");
});

router.post("/create", isUser(), async(req, res) => {
    try {
        if(req.body.public) {
            req.body.public = true;
        }

        req.body.owner = req.user._id;

        await req.storage.create(req.body);
        res.redirect("/");
    }catch(err) {
        console.log(err.message);
        res.render("create-theater.hbs");
    }
});



module.exports = router;