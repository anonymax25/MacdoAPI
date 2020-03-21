module.exports = function (app) {
    require('./auth.route')(app); // on passe directement app en paramètres
    require('./project.route')(app);
};
