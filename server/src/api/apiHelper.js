'use strict'

export function sendErrorResponse(res, err) {
    return res.status(400).send({
        msg: err
    })
}