const clean = require('obj-clean');
module.exports = {
    ok: (req, res, next,{
        status = 200
    }) => {
        res.status(status).send({
            status: true,
            data: clean(res.locals),
        })
    },
    error: (req, res, next,{
        status=400,
        err={},
        message=[]
    }) => {
        res.status(status).send({
            status: false,
            data: err,
            messages:message
        })
    }
}