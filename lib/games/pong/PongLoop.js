module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Loop = require(pathsList.games_Loop)(_s)
        ;


    /**
     * Loop through collection and invoke function within it
     *
     * @param {Object} opts
     *  - `cycleEvery` {Number} How often cycle will be executed in mili-seconds
     *  -
     *
     * @param {Game} game ref object
     * @extends Loop
     * @api public
     */
    function PongLoop(game , opts){
        Loop.apply(this,arguments);
    }

    PongLoop.prototype = Object.create(Loop.prototype);
    PongLoop.prototype.constructor = PongLoop;

    return PongLoop;
};