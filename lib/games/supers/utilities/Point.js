module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Vector = require(pathsList.games_Vector)(_s)
        ;

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype = {
        relative: function(to) {
            return new Vector(to.x - this.x, to.y - this.y);
        },
        distance: function(to) {
            return Math.sqrt(Math.pow(this.x - to.x, 2) + Math.pow(this.y - to.y, 2));
        }
    };

    return Point;
};