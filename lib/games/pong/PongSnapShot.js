module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , SnapShot = require(pathsList.games_SnapShot)(_s)
        ;


    /**
     * take game snapshot at a certain interval
     *
     * @param {Object} opts
     *  - `SnapEvery` {Number} How often to take a snapshot
     *  -
     *
     * @param {Game} game ref object
     * @extends SnapShot
     * @api public
     */
    function PongSnapShot(game , opts){
        SnapShot.apply(this,arguments);
    }

    PongSnapShot.prototype = Object.create(SnapShot.prototype);
    PongSnapShot.prototype.constructor = PongSnapShot;


    /**
     * Take games snapshot
     *
     * @api public
     */
    PongSnapShot.prototype.snapshot = function(){
        var i,l,entities, entity;
        entities = this.game.mainLoop.get();
        i = 0;
        l = entities.length;

        var snapshot = {
            i : this.snapShots,
            t : Date.now(),
            u : []
        };

        for(i; i<l;i++){
            entity = entities[i].ref;
            if(entity.attributes) snapshot.u[i] = {id:entity.id, p:{x:entity.position.x,y:entity.position.y},s:entity.attributes.score};
            else snapshot.u[i] = {id:entity.id, p:{x:entity.position.x,y:entity.position.y}};
        }

        this.snapShots++;
        if(this.snapShots > 1000) this.snapShots = 0;


        this.transferSnapshot(snapshot);
    };


    /**
     * Send snapshot to clients
     *
     * @api public
     */
    PongSnapShot.prototype.transferSnapshot = function(snapshot){
        this.game.outRouter.ss(snapshot);
    };

    return PongSnapShot;
};