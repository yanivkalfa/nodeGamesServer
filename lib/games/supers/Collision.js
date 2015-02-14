module.exports = function(_s){


    /**
     *
     * @param {Game} game
     * @param {Entity} entity
     * @api public
     */
    function Collision(game, entity){


        /**
         * Holds ref to game object
         *
         * @type {Game}
         * @api public
         */
        this.game = game || {};


        /**
         * Holds entity
         *
         * @type {Entity}
         * @api public
         */
        this.entity = entity || {};
    }


    /**
     * Moves entity in the left direction
     *
     * @api public
     */
    Collision.prototype.check = function(nextPoint, moveDist, movDir){
        return {x:nextPoint.x, y:nextPoint.y}
    };

    return Collision;
};