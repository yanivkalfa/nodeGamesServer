module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Entity
        ;

    Entity = require(pathsList.games_Entity)(_s);

    /**
     *
     * @param {Object} opts
     *  - `name` {String} Player name
     *  - `local` {Boolean} is local player or remote.
     *
     * @extends Entity
     * @api public
     */
    function Player(opts){
        Entity.apply(this,arguments);


        /**
         * Holds player name.
         *
         * @type {String}
         * @api public
         */
        this.name = opts.name || undefined;


        /**
         * Holds player type
         *
         * @type {String}
         * @api public
         */
        this.type = opts.type || undefined;

        /**
         * Holds local
         *
         * @type {Boolean}
         * @api public
         */
        this.local = opts.local || undefined;


        /**
         * Holds control
         *
         * @type {KeyBinds}
         * @api public
         */
        this.keyBinds = undefined;


        /**
         * Holds attributes
         *
         * @type {Attributes}
         * @api public
         */
        this.attributes = undefined;

        /**
         * Holds moves
         *
         * @type {Moves}
         * @api public
         */
        this.moves = undefined;


        /**
         * Holds collision
         *
         * @type {Collision}
         * @api public
         */
        this.collision = undefined;
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;


    /**
     * move player
     *
     * @override
     * @api public
     */
    Player.prototype.move = function(){
        var keyBinds = this.keyBinds.get()
            , i, l, m
            ;

        i = 0;
        l = keyBinds.length;

        for(i;i<l;i++){
            m = keyBinds[i](this.game);
            this.moves[m] && this.moves[m]();
        }
    };

    return Player;

};