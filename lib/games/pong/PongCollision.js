module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Collision = require(pathsList.games_Collision)(_s)
        , Vector = require(pathsList.games_Vector)(_s)
        ;

    /**
     *
     * @param {Game} game
     * @param {Entity} entity
     * @extends Collision
     * @api public
     */
    function PongCollision(game, entity){
        Collision.apply(this, arguments)
    }
    PongCollision.prototype = Object.create(Collision.prototype);
    PongCollision.prototype.constructor = PongCollision;


    /**
     * Moves entity in the left direction
     *
     * @api public
     */
    PongCollision.prototype.check = function(nextPoint, moveDist, movDir){
        //var distance = this.entity.position.distance(nextPoint);
        var scale = this.entity.moveDistanceScale / 5 ;
        if(scale == 'Infinity'){
            this.entity.velocity = new Vector(0,0);
        }else{
            this.entity.velocity = this.entity.position.relative(nextPoint).scale(scale);
        }

        if (this.entity.position.y <= 0 && movDir < 0) {
            this.entity.position.y = 0;
            this.entity.velocity.x = 0;
            this.entity.velocity.y = 0;
        }else if(this.entity.position.y >= this.game.canvas.height - this.entity.dimensions.height && movDir > 0){
            this.entity.position.y = this.game.canvas.height - this.entity.dimensions.height;
            this.entity.velocity.x = 0;
            this.entity.velocity.y = 0;
        }

        //SPEED += ACCELERATION;
        return {x:this.entity.velocity.x * moveDist, y:this.entity.velocity.y * moveDist}
    };

    return PongCollision;
};