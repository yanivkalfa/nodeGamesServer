module.exports = function(_s){


    /**
     *
     * @param {Game} game
     * @api public
     */
    function Roles(game){

        /**
         * Holds ref to game object
         *
         * @type {Game}
         * @api public
         */
        this.game = game || {};
    }

    /**
     * go through Rules and invoke rule functions
     *
     * @api public
     */
    Roles.prototype.check = function(){};

    return Roles;
};