class Coordenada {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static zero() {
    return new Coordenada(0, 0);
  }
} 

class Random {
  static seed = 0;
  static range(min, max) {
    const x = Math.abs(Math.sin(Random.seed++) * 10000);
    return Math.floor((x % (max - min + 1)) + min);
  }
}

Random.seed = 100;

class Trasform {
  position = Coordenada.zero();
  scale = Coordenada.zero();
  parent = null;

  constructor(position) {
    this.position = position || Coordenada.zero();
    this.scale = new Coordenada(1, 1);
    this.parent = null;
  }
}

class Time {
  static deltaTime = 0;
  static lastTime = 0;

  static now() {
    return performance.now();
  }

  static update() {
    const now = Time.now();
    Time.deltaTime = now - Time.lastTime;
    Time.lastTime = now;
  }
}


class Utils {
  static interpolate(a0, a1, w) {
    return (a1 - a0) * w + a0;
  }
}

class Registry {
  static components = new Map();

  static register(name, component) {
    component.start();
    Registry.components.set(name, component);
  }

  static get(name) {
    return Registry.components.get(name);
  }

  static getComponents() {
    return Registry.components;
  }

  static remove(name) {
    const currentComponent = Registry.get(name);

    Registry.getComponents().forEach((childComponent, childName) => {
      if (childComponent.transform.parent?.name === currentComponent.name) {
        Registry.components.delete(childName);
      }
    });
    
    Registry.components.delete(name);
  }
}

class Input {
  static keyCode = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN',
    32: 'SPACE',
  };

  static keyState = {
    [Input.keyCode.LEFT]: false,
    [Input.keyCode.UP]: false,
    [Input.keyCode.RIGHT]: false,
    [Input.keyCode.DOWN]: false,
    [Input.keyCode.SPACE]: false,
  };

  static handler = (e) => {
    if (Input.keyCode[e.keyCode]) {
      Input.keyState[e.keyCode] = e.type == 'keydown';
    }
  }

  static listen() {
    document.addEventListener('keydown', Input.handler);
    document.addEventListener('keyup', Input.handler);
  }

  static unlisten() {
    document.removeEventListener('keydown', Input.handler);
    document.removeEventListener('keyup', Input.handler);
  }
}

class Sprite {
  image = null;
  width = 0;
  height = 0;
  
  constructor(width, height, scale, matrix) {
    const tmpCanvas = document.createElement('canvas');
    const tmpContext = tmpCanvas.getContext('2d');

    this.width = width * scale;
    this.height = height * scale;
    tmpCanvas.width = width * scale;
    tmpCanvas.height = height * scale;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        tmpContext.fillStyle = PALETTE[matrix[y * width + x]];
        tmpContext.fillRect(x * scale - 1, y * scale - 1, scale + 1, scale + 1);
      }
    }

    this.image = new Image();
    this.image.src = tmpCanvas.toDataURL();
  }
}

class Component {
  transform = new Trasform();
  sprites = new Map();
  skipColision = false;

  constructor(position) {
    this.transform = new Trasform(position);
  }

  getSprite() {
  }

  getBoxColider() {
    const parentTransform = this.transform.parent?.transform || new Trasform();
    return {
      x: this.transform.position.x - parentTransform.position.x,
      y: this.transform.position.y - parentTransform.position.y,
      width: this.sprites.get('default')?.width * this.transform.scale.x || 0,
      height: this.sprites.get('default')?.height * this.transform.scale.y || 0
    };
  }

  onCollision() {
  }

  start() {
  }

  update() {
  }
}

class Engine {
 // fps = 0;
  paused = false;
  /**
   * @type {CanvasRenderingContext2D}
   */
  context = null;

  bordacontext = null;
  /**
   * @type {CanvasRenderingContext2D}
   */
  constructor({ context,bordacontext}) {
    this.context = context;
    this.bordacontext = bordacontext;
  }

  reset() {
    this.paused = false;
  }

  start() {
    if (!this.paused) {
      Input.listen();
      this._executeUpdateLoop();
    }
  }

  stop() {
    this.pause();
    this.reset();
  }

  pause() {
    if (!this.paused) {
      Input.unlisten();
      this.paused = true;
    }
  }

  resume() {
    if (this.paused) {
      Input.listen();
      this.paused = false;
      this.start();
    }
  }
  
  
  _executeUpdateLoop() {
    const loop = () => {
      if (this.paused) return;
      Time.update();
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); 
      
      Registry.getComponents().forEach((component) => {
        const filteredComponents = new Map(
          Array.from(Registry.getComponents()).filter(([key, value]) => {
            return value !== component && !value.skipColision;
          })
        );
        filteredComponents.forEach((otherComponent) => {
          if (component === otherComponent) return;
          const a = component.getBoxColider();
          const b = otherComponent.getBoxColider();

          if (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.height + a.y > b.y
          ) {
            component.onCollision(otherComponent);
            otherComponent.onCollision(component);
          }
        });
      });
     
     
     
      Registry.getComponents().forEach((component) => {
        component.update();
        const sprite = component.getSprite();
        if (sprite?.image) {
          const parentPosition = component.transform.parent?.transform.position || Coordenada.zero();
          this.context.drawImage(
            sprite.image,
            component.transform.position.x - parentPosition.x,
            component.transform.position.y - parentPosition.y,
            sprite.width * component.transform.scale.x,
            sprite.height * component.transform.scale.y
          );}
      });

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}






