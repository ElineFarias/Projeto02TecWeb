(function (exports) {
exports.SPRITES = {};
//Desenho  nave
exports.SPRITES.NAVE = {
  IDLE: {
    width: 20,
    height: 15,
    matrix: [
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,
      10,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,10,0,0,    //nave espacial
      10,0,10,0,0,0,1,1,1,1,1,1,0,0,0,10,0,10,0,0,
      10,0,10,0,0,0,1,1,10,10,1,1,0,0,0,10,0,10,0,0,
      10,0,10,0,0,0,1,1,10,10,1,1,0,0,0,10,0,10,0,0,
      10,0,10,0,1,1,1,1,10,10,1,1,1,1,0,10,0,10,0,0,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
      10,0,0,0,0,0,12,7,7,7,7,12,0,0,0,0,0,10,0,0,
      10,0,0,0,0,0,0,12,7,7,12,0,0,0,0,0,0,10,0,0,
      0,0,0,0,0,0,0,0,12,12,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ]
  },
  TURNING_LEFT: {
    width: 20,
    height: 15,
    matrix: [
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,
      10,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,10,0,0,    //nave espacial esquerda
      10,0,10,0,0,0,1,1,1,1,1,1,0,0,0,10,0,10,0,0,
      10,0,10,0,0,0,1,1,10,10,1,1,0,0,0,10,0,10,0,0,
      10,0,10,0,0,0,1,1,10,10,1,1,0,0,0,10,0,10,0,0,
      10,0,10,0,1,1,1,1,10,10,1,1,1,1,0,10,0,10,0,0,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
      10,0,0,0,0,0,2,7,7,7,7,2,0,0,0,0,0,10,0,0,
      10,0,0,0,0,0,0,2,7,7,2,0,0,0,0,0,0,10,0,0,
      0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ]
  },
  TURNING_RIGHT: {
    width: 20,
    height: 15,
    matrix: [
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,
      10,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,10,0,0,    //nave espacial direita
      10,0,10,0,0,0,1,1,1,1,1,1,0,0,0,10,0,10,0,0,
      10,0,10,0,0,0,1,1,10,10,1,1,0,0,0,10,0,10,0,0,
      10,0,10,0,0,0,1,1,10,10,1,1,0,0,0,10,0,10,0,0,
      10,0,10,0,1,1,1,1,10,10,1,1,1,1,0,10,0,10,0,0,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
      10,0,0,0,0,0,2,7,7,7,7,2,0,0,0,0,0,10,0,0,
      10,0,0,0,0,0,0,2,7,7,2,0,0,0,0,0,0,10,0,0,
      0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ]
  }
};

//Desenho do Helicoptero
exports.SPRITES.HELICOPTERO = {
  IDLE: {
    width: 14,
    height: 10,
    matrix: [
      0,0,0,0,0,0,0,0,0,5,5,5,5,0,
      0,0,0,0,5,5,5,5,5,0,0,0,0,0,
      0,0,0,0,0,0,0,0,5,5,0,0,0,0,
      10,10,0,0,0,0,10,10,10,10,10,10,0,0,
      10,10,0,0,10,10,10,10,10,10,10,10,10,0,                      
      5,5,5,5,5,5,5,5,5,5,5,5,5,5,
      10,10,0,0,0,0,5,5,5,5,5,5,0,0,
      10,10,0,0,0,0,10,10,10,10,10,10,0,0,
      0,0,0,0,0,0,0,0,10,10,10,0,0,0,
      0,0,0,0,0,0,10,10,10,10,10,10,0,0,
    ]
  }
};

//Desenho do Navio
exports.SPRITES.NAVIO = {
  IDLE: {
    width: 14,
    height: 6,
    matrix: [
      0,0,0,0,0,6,6,0,0,0,0,0,0,0,
      0,0,0,0,6,6,6,0,0,0,0,0,0,0,
      0,0,6,6,6,6,6,6,6,0,0,0,0,0,    
      7,7,7,7,7,7,7,7,7,7,7,7,7,7,
      0,7,7,7,7,7,7,7,7,7,7,7,0,0,
      0,0,8,8,8,8,8,8,8,8,0,0,0,0,
    ]
  }
};

//Desenho do Posto de combustível
exports.SPRITES.Recarga = {
  IDLE: {
    width: 14,
    height: 9,
    matrix: [
      0,0,0,10,10,10,10,10,10,10,10,0,0,0,
      0,0,0,10,3,3,3,3,3,3,10,0,0,0,
      0,7,7,10,7,7,7,7,7,7,10,0,0,0,
      0,7,0,10,7,7,7,7,7,7,10,0,0,0,              
      0,6,0,10,10,10,10,10,10,10,10,0,0,0,
      0,6,0,0,0,10,10,10,10,0,0,0,0,0,
      0,6,6,6,6,10,10,10,10,0,0,0,0,0,
      0,0,0,0,0,10,10,10,10,0,0,0,0,0,
      0,0,0,0,0,10,10,10,10,0,0,0,0,0,
    ]
  }
};

//Desenho do Ponto Extra
exports.SPRITES.pontoExtra = {
  IDLE: {
    width: 10,
    height: 7,
    matrix: [
      0,5,0,0,5,0,0,5,0,0,
      0,0,5,0,5,0,5,0,0,0,              
      0,0,0,5,5,5,0,0,0,0,
      5,5,5,5,5,5,5,5,5,0,
      0,0,0,5,5,5,0,0,0,0,
      0,0,5,0,5,0,5,0,0,0,
      0,5,0,0,5,0,0,5,0,0,
    ]
  }
};

})(window);
