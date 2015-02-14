module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Attributes
        ;

    Attributes = require(pathsList.games_Attributes)(_s);


    /**
     * Holds player attributes
     *
     * @extends Attributes
     * @api public
     */
    function PongAttributes(){
        Attributes.apply(this,arguments);

        /**
         * Holds player score
         *
         * @type {Number}
         * @api public
         */
        this.score = 0;
    }

    PongAttributes.prototype = Object.create(Attributes.prototype);
    PongAttributes.prototype.constructor = PongAttributes;

    return PongAttributes;
};