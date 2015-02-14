module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , PongCollision = require(pathsList.games_PongCollision)(_s)
        , Vector = require(pathsList.games_Vector)(_s)
        ;

    /**
     *
     * @param {Game} game
     * @param {Entity} entity
     * @extends PongCollision
     * @api public
     */
    function PongBallCollision(game, entity){
        PongCollision.apply(this, arguments);
    }
    PongBallCollision.prototype = Object.create(PongCollision.prototype);
    PongBallCollision.prototype.constructor = PongBallCollision;


    /**
     * Moves entity in the left direction
     *
     * @api public
     */
    PongBallCollision.prototype.check = function(nextPoint, moveDist, movDir){
        var part,ballPosition,difference,newY, distance, scale, rPlayer,lPlayer;
        distance = this.entity.position.distance(nextPoint);
        scale = this.entity.moveDistanceScale / distance ;
        lPlayer = this.game.scoreBoard.players.list.left.player;
        rPlayer = this.game.scoreBoard.players.list.right.player;


        if(scale == 'Infinity'){
            this.entity.velocity = new Vector(0,0);
        }else{
            this.entity.velocity = this.entity.position.relative(nextPoint).scale(scale);
        }

        if (this.entity.position.y < 0) {
            this.entity.position.y = 0;
            this.entity.ai.changeDirection( {x:this.entity.velocity.x, y:-this.entity.velocity.y});
            this.entity.velocity.y = -this.entity.velocity.y;
        }else if(this.entity.position.y > this.game.canvas.height - this.entity.dimensions.height){
            this.entity.position.y = this.game.canvas.height - this.entity.dimensions.height;
            this.entity.ai.changeDirection({x:this.entity.velocity.x, y:-this.entity.velocity.y});
            this.entity.velocity.y = -this.entity.velocity.y;
        }



        if (this.entity.position.x < 0) {
            rPlayer.attributes.score++;
            if(this.game.roles.check()){
                return;
            }
            this.entity.ai.side = 2;//right side
            this.entity.acceleration = 0;
            this.entity.ai.reset();
            return false;
        }else if(this.entity.position.x > this.game.canvas.width - this.entity.dimensions.width){
            lPlayer.attributes.score++;
            if(this.game.roles.check()){
                return;
            }
            this.entity.ai.side = 1;//right side
            this.entity.acceleration = 0;
            this.entity.ai.reset();
            return false;
        }

        // collision detection
        if (this.entity.position.x < lPlayer.position.x + lPlayer.dimensions.width
            && this.entity.position.x > lPlayer.position.x + lPlayer.dimensions.width-5)
        {
            if(this.entity.position.y > lPlayer.position.y
                && this.entity.position.y < lPlayer.position.y + lPlayer.dimensions.height)
            {
                part = 1/(lPlayer.dimensions.height/2);
                ballPosition = this.entity.position.y+this.entity.dimensions.height/2;
                difference = ballPosition - lPlayer.position.y;
                if(difference < (lPlayer.dimensions.height /2) ){
                    newY = difference*part-1;
                }else{
                    difference = difference - lPlayer.dimensions.height /2;
                    newY = difference*part;
                }
                this.entity.acceleration += 0.05;
                this.entity.position.x = lPlayer.position.x + lPlayer.dimensions.width;
                this.entity.ai.changeDirection({x : -this.entity.velocity.x, y:newY});
                this.entity.velocity.x = -this.entity.velocity.x;

            }
        }

        if (this.entity.position.x+this.entity.dimensions.width > rPlayer.position.x
            && this.entity.position.x+this.entity.dimensions.width < rPlayer.position.x + 5)
        {

            if(this.entity.position.y > rPlayer.position.y
                && this.entity.position.y < rPlayer.position.y + rPlayer.dimensions.height)
            {
                part = 1/(rPlayer.dimensions.height/2);
                ballPosition = this.entity.position.y+this.entity.dimensions.height/2;
                difference = ballPosition - rPlayer.position.y;
                if(difference < (rPlayer.dimensions.height /2) ){
                    newY = difference*part-1;
                }else{
                    difference = difference - rPlayer.dimensions.height /2;
                    newY = difference*part;
                }

                this.entity.acceleration += 0.05;
                this.entity.position.x = rPlayer.position.x - this.entity.dimensions.width;
                this.entity.ai.changeDirection( {x : -this.entity.velocity.x, y : newY});
                this.entity.velocity.x = -this.entity.velocity.x;

            }
        }
        //SPEED += ACCELERATION;
        return {
            x:(this.entity.velocity.x * (moveDist+this.entity.acceleration)),
            y:(this.entity.velocity.y * (moveDist+this.entity.acceleration))
        }
    };

    return PongBallCollision;
};