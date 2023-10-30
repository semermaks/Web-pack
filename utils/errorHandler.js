module.exports = (res, status, error) => { 
    res.status(status).json({
        message: error.message ? error.message : 'error....'
    });
 };