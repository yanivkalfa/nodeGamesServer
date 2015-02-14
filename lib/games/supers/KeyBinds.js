module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Collection
        ;

    Collection = require(pathsList.games_Collection)(_s);


    /**
     *
     * @extends Collection
     * @api public
     */
    function KeyBinds(){
        Collection.apply(this,arguments);

        this.init();
    }

    KeyBinds.prototype = Object.create(Collection.prototype);
    KeyBinds.prototype.constructor = KeyBinds;


    KeyBinds.prototype.init = function(){ };


    return KeyBinds;
};