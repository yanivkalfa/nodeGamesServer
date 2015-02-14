module.exports = function(_s){
  return {
      connections : require('./connections.js'),
      session : require('./session.js'),
      pathsList : require('./pathsList.js')(_s),
      gameList : require('./gameList.js')(_s)
  }
};