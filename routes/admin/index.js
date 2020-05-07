module.exports = function(app){
    require('./admin.route')(app);
    require('./ingredient.route')(app);
    require('./accessory.route')(app);
    require('./supplement.route')(app);
    require('./product.route')(app);
    require('./menu.route')(app);
};
