(function () {
class Nave extends Component {
  _velocidadeNave = 0.5;
  _scale = 3;
  _state = 'IDLE';

  start() {
    Object.keys(SPRITES.NAVE).forEach((key) => {
      const { width, height, matrix } = SPRITES.NAVE[key];
      this.sprites.set(key, new Sprite(width, height, this._scale, matrix));
    });

    this.transform.position.x = 400 - (this.sprites.get(this._state).width / 2);
    this.transform.position.y = 520 - this.sprites.get(this._state).height;
  }

  getSprite() {
    return this.sprites.get(this._state);
  }

  getBoxColider() {
    return {
      x: this.transform.position.x ,
      y: this.transform.position.y,
      width: this.sprites.get('IDLE')?.width || 0,
      height: this.sprites.get('IDLE')?.height || 0
    };
  }

  onCollision(novo) {
     console.log('collision', novo);
      var telaGameOver = document.getElementById("riverRaid");
      telaGameOver.style.background = "url('./img/Game-Over.png') no-repeat center";
      this.stop();
  }

  update() {
    const directionX = Input.keyState[Input.keyCode.LEFT] ? -1 : Input.keyState[Input.keyCode.RIGHT] ? 1 : 0;
    switch (directionX) {
      case -1:
        this._state = 'TURNING_LEFT';
        break;
      case 1:
        this._state = 'TURNING_RIGHT';
        break;
      default:
        this._state = 'IDLE';
    }

    this.transform.position.x = Utils.interpolate(
      this.transform.position.x,
      this.transform.position.x + (directionX * this._velocidadeNave),
      Time.deltaTime * 0.5
    );
  }
}

/* Criando Obstáculos*/

const barreiraSprite = new Sprite(1, 1, TILE_SIZE, [11]);

class barreira extends Component {
  start() {
    this.sprites.set('default', barreiraSprite);
  }

  getSprite() {
    return this.sprites.get('default');
  }
}

class Helicoptero extends Component {
  start() {
    const { width, height, matrix } = SPRITES.HELICOPTERO.IDLE;
    this.sprites.set('default', new Sprite(width, height, 4, matrix));
  }

  getSprite() {
    return this.sprites.get('default');
  }
}

class Navio extends Component {
  start() {
    const { width, height, matrix } = SPRITES.NAVIO.IDLE;
    this.sprites.set('default', new Sprite(width, height, 6, matrix));
  }

  getSprite() {
    return this.sprites.get('default');
  }
}

class Recarga  extends Component {
  start() {
    const { width, height, matrix } = SPRITES.Recarga.IDLE;
    this.sprites.set('default', new Sprite(width, height, 6, matrix));
  }

  getSprite() {
    return this.sprites.get('default');
  }
}

class pontoExtra  extends Component {
  start() {
    const { width, height, matrix } = SPRITES.pontoExtra.IDLE;
    this.sprites.set('default', new Sprite(width, height, 6, matrix));
  }

  getSprite() {
    return this.sprites.get('default');
  }
}

class ParteMapa extends Component {
  _quantidadebarreira = 0;
  _quantidadeInimigos = 0;
  _quantidadeAliados = 0;

  _mapSize = {
    width: 800 / TILE_SIZE,
    height: 800 / TILE_SIZE
  };
  
  constructor(position) {
    super(position);
    this.name = `ParteMapa:${mapLevel}`;
    this._build();
  }

  _gerarDegraubarreira(position, ruidoWidth = 0) {
    const componentebarreira = new barreira(position);
    componentebarreira.transform.parent = this;
    componentebarreira.transform.scale.x = ruidoWidth;
    Registry.register(`barreira:${this.name}:${this._quantidadebarreira }`,componentebarreira);
    this._quantidadebarreira++;
  }

   _inimigo(position) {
    const _tipoInimigo = Random.range(0, 1);
    let ComponenteInimigo;

    switch (_tipoInimigo) {
      case 0:
        ComponenteInimigo = new Helicoptero(position);
        break;
      case 1:
        ComponenteInimigo = new Navio(position);
        break;
      }

      ComponenteInimigo.transform.parent = this;
      Registry.register(`Inimigo:${this.name}:${this._quantidadeInimigos}`, ComponenteInimigo);
      this._quantidadeInimigos++;
  } 

  _aliado(position) {
    const _tipoAliado = Random.range(0, 1);
    let ComponenteAliado;

    switch (_tipoAliado) {
      case 0:
        ComponenteAliado = new Recarga(position);
        break;
      case 1:
        ComponenteAliado= new pontoExtra(position);
        break;
      }

      ComponenteAliado.transform.parent = this;
      Registry.register(`Aliado:${this.name}:${this._quantidadeAliados}`, ComponenteAliado);
      this._quantidadeAliados++;
  }


  // construção do cenário
  _build() {
    const frequencia = 0.068;
    const seed = Random.range(-50, this._mapSize.width);
    const halfMapWidth = this._mapSize.width/5;
    
    for (let y = 0; y < this._mapSize.height; y++) {
      const ruido = 0.5 + Math.abs(0.5 * (seed * frequencia, (y + seed) * frequencia));
      const ruidoWidth = Math.floor(ruido * halfMapWidth); // Math.floor : retorna o menor número
      //barreira esquerda
      this._gerarDegraubarreira(new Coordenada(0, y * TILE_SIZE), ruidoWidth);
      //  barreira meio and  inimigos and aliados
      if (ruidoWidth < halfMapWidth && y < this._mapSize.height) {
        this._gerarDegraubarreira(new Coordenada((ruidoWidth) * TILE_SIZE, y * TILE_SIZE), (halfMapWidth - ruidoWidth));
        if (y % 4 == 0) {
            this._inimigo(new Coordenada((3* halfMapWidth + (halfMapWidth - ruidoWidth)) * TILE_SIZE, y * TILE_SIZE));
        }
        if (y % 6 == 0) {
            this._aliado(new Coordenada((halfMapWidth + (halfMapWidth - ruidoWidth)) * TILE_SIZE, y * TILE_SIZE));
        }
      }else {
        this._gerarDegraubarreira(new Coordenada(0,0));
      }

      // barreira a direita
      this._gerarDegraubarreira(new Coordenada((this._mapSize.width * TILE_SIZE) - (ruidoWidth * TILE_SIZE), y * TILE_SIZE), ruidoWidth);
    }
  }

  update() {
    this.transform.position.y -= 0.16 * Time.deltaTime;
    if (this.transform.position.y < -790) {
      mapManager.gerarParteMapa();
      Registry.remove(this.name);
    }
  }
}


// O game possui 5 niveis

let mapLevel = 0;

class MapManager {
  constructor() {
    Random.seed = 123459876;
    for (let i = mapLevel; i < 5; i++) {
        this.gerarParteMapa();
    }
  }

  gerarParteMapa() {
    const posicaoAnteriorBlocoMapaY = Registry.get(`ParteMapa:${mapLevel -1}`)?.transform.position.y || -790;
    const newMapChunk = new ParteMapa(new Coordenada(0, posicaoAnteriorBlocoMapaY + 800));
    Registry.register(`ParteMapa:${mapLevel}`, newMapChunk);
   // console.log("nivel")
    let niveis = document.getElementById("nivel");
    niveis = mapLevel;
   // let form = document.querySelector("nivel");
   // var totalnivel = document.createElement("p");
  //  span.appendChild(totalnivel);
  //  totalnivel.textContent = nivel;
    console.log("Nivel Game");
    console.log(niveis);
    //console.log("testando");
  //  console.log(mapLevel);
    mapLevel++;
  }
}



const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const engineLayers = {context};
const mapManager = new MapManager();

Registry.register('Nave', new Nave());

const engine = new Engine(engineLayers);

document.querySelector('.startGame').onclick = () => engine.start();
document.querySelector('.pause-game').onclick = () => engine.pause();
document.querySelector('.resume-game').onclick = () => engine.resume();
} ) ();
