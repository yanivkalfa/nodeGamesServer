module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Entity = require(pathsList.games_Entity)(_s)
        ;


    /**
     *
     * @param {Object} opts
     *  - `id` {Number} entity id
     *  - `node` {Node} DOM node.
     *  - `position` {Point} entity position
     *  - `dimensions` {Object} entity dimensions
     *  - `moveDistance` {Number} move distance
     *  - `velocityModifier` {Number} velocity modifier
     *  - `acceleration` {Number} acceleration modifier
     *  - `type` {String} Player type
     *
     * @param {Game} game ref
     * @extends Entity
     * @api public
     */
    function PongEntity(opts, game){
        Entity.apply(this,arguments);
    }

    PongEntity.prototype = Object.create(Entity.prototype);
    PongEntity.prototype.constructor = PongEntity;


    /**
     * initiates entity
     *
     * @api public
     */
    PongEntity.prototype.init = function(){};


    /**
     * renders entity
     *
     * @api public
     */
    PongEntity.prototype.render = function(){};


    /**
     * loads entity
     *
     * @api public
     */
    PongEntity.prototype.load = function(){};

    return PongEntity;
};