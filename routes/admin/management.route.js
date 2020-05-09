const bodyParser = require('body-parser');
const AuthMiddleware = require('../../middleware').AuthMiddleware;

const IngredientController = require('../../controller').IngredientsController;
const AccessoryController = require('../../controller').AccessoryController;
const SupplementController = require('../../controller').SupplementController;

module.exports = function (app) {

    app.put('/admin/stock', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {

        if (req.body.accessories && req.body.ingredients && req.body.supplements) {
            try {
                let success = true;

                //ingredients
                req.body.ingredients.forEach(ingredient => {
                    if(!IngredientController.updateRealtiveIngredientCount(ingredient.id,ingredient.count)){
                        success = false;
                    }
                })
                //accessoires
                req.body.accessories.forEach(accessory => {
                    if(!AccessoryController.updateRealtiveCount(accessory.id,accessory.count)){
                        success = false;
                    }
                })
                //supplements
                req.body.supplements.forEach(supplement => {
                    if(!SupplementController.updateRealtiveCount(supplement.id,supplement.count)){
                        success = false;
                    }
                })

                if (success) {
                    res.status(204).end();
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).end();
            }

        } else {
            res.status(400).end();
        }
    });
}

