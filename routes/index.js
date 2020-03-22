module.exports = function (app) {
    require('./auth.route')(app);
    require('./project.route')(app);
    require('./admin/admin.route')(app);
    require('./admin/ingredient.route')(app);
    require('./admin/accessory.route')(app);
};
