(function () {
class Player extends Component {
  _acceleration = 0.5;
  _scale = 3;
  _state = 'IDLE';

  start() {
    Object.keys(SPRITES.PLAYER).forEach((key) => {
      const { width, height, matrix } = SPRITES.PLAYER[key];
      this.sprites.set(key, new Sprite(width, height, this._scale, matrix));
    });

    this.transform.position.x = 400 - (this.sprites.get(this._state).width / 2);
    this.transform.position.y = 520 - this.sprites.get(this._state).height;
  }

  getSprite() {
    return this.sprites.get(this._state);
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
      this.transform.position.x + (directionX * this._acceleration),
      Time.deltaTime * 0.5
    );
  }
}

const gramaSprite = new Sprite(1, 1, TILE_SIZE, [11]);


class Grama extends Component {
  skipColision = true;

  start() {
    this.sprites.set('default', gramaSprite);
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

class ParteMapa extends Component {
  _quantidadeGrama = 0;
  _quantidadeInimigos = 0;

  _mapSize = {
    width: 800 / TILE_SIZE,
    height: 800 / TILE_SIZE
  };
  
  constructor(position) {
    super(position);
    this.name = `ParteMapa:${mapLevel}`;
    this._build();
  }

  _gerarDegrauGrama(position, noiseWidth = 1) {
    const componenteGrama = new Grama(position);
    componenteGrama.transform.parent = this;
    componenteGrama.transform.scale.x = noiseWidth;
    Registry.register(`Grama:${this.name}:${this._quantidadeGrama }`,componenteGrama);
    this._quantidadeGrama++;
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


  // construção do cenário
  _build() {
    const frequencia = 0.068;
    const seed = Random.range(-20, this._mapSize.width);
    const halfMapWidth = this._mapSize.width/ 3;
    
    for (let y = 0; y < this._mapSize.height; y++) {
      const ruido = Math.abs(0.7 * (seed * frequencia, (y + seed) * frequencia));
      const noiseWidth = 2 + Math.floor(ruido * halfMapWidth); // Math.floor : retorna o menor número

      //grama esquerda
      this._gerarDegrauGrama(new Coordenada(0, y * TILE_SIZE), noiseWidth);
      
      // inimigos
      if (y % 4 == 0) {
        this._inimigo(new Coordenada((halfMapWidth + (halfMapWidth - noiseWidth - 6) * 2) * TILE_SIZE, y * TILE_SIZE));
      }
      
      //  grama meio
      if (noiseWidth + 3 < halfMapWidth && y < this._mapSize.height - 3) {
        this._gerarDegrauGrama(new Coordenada((noiseWidth) * TILE_SIZE, y * TILE_SIZE), (halfMapWidth - noiseWidth - 20) * 2);
      }

      // grama a direita
      this._gerarDegrauGrama(new Coordenada((this._mapSize.width * TILE_SIZE) - (noiseWidth * TILE_SIZE), y * TILE_SIZE), noiseWidth);
    }
  }

  update() {
    this.transform.position.y -= 0.16 * Time.deltaTime;
    if (this.transform.position.y < -780) {
      mapManager.gerarParteMapa();
      Registry.remove(this.name);
    }
  }
}

let mapLevel = 0;

class MapManager {
  constructor() {
    Random.seed = 12345;
    for (let i = mapLevel; i < 2; i++) {
        this.gerarParteMapa();
    }
  }

  gerarParteMapa() {
    const previousMapChunkPositionY = Registry.get(`ParteMapa:${mapLevel - 1}`)?.transform.position.y || -790;
    const newMapChunk = new ParteMapa(new Coordenada(0, previousMapChunkPositionY + 800));
    Registry.register(`ParteMapa:${mapLevel}`, newMapChunk);
    mapLevel++;
  }
}

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const engineLayers = {context};

const mapManager = new MapManager();
Registry.register('Player', new Player());

const engine = new Engine(engineLayers);
engine.start();

document.querySelector('.pause-game').onclick = () => engine.pause();
document.querySelector('.resume-game').onclick = () => engine.resume();
} ) ();
