const theaterService = require("../services/theater");

module.exports = () => {
    return (req, res, next) => {
        req.storage = {
            create: theaterService.create,
            getAll: theaterService.getAll,
            getById: theaterService.getById,
            like: theaterService.like,
            edit: theaterService.edit,
            del: theaterService.del
        };


        next();
    };
}