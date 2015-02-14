module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , KeyBinds = require(pathsList.games_KeyBinds)(_s)
        ;


    /**
     *
     * @extends KeyBinds
     * @api public
     */
    function PongKeyBinds(){
        KeyBinds.apply(this,arguments);
    }

    PongKeyBinds.prototype = Object.create(KeyBinds.prototype);
    PongKeyBinds.prototype.constructor = PongKeyBinds;


    PongKeyBinds.prototype.init = function(){
        var moveUp
            , MoveDown
            ;

        moveUp = function(entity){
            if(entity.keysPressed[87] || entity.keysPressed[38]) return 'moveUp';
            return false;
        };

        MoveDown = function(entity){
            if(entity.keysPressed[83] || entity.keysPressed[40]) return 'moveDown';
            return false;
        };

        this.add(moveUp);
        this.add(MoveDown);
    };

    return PongKeyBinds;
};