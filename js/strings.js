class Strings {
  constructor() {
    this._type = 'SingletonDefaultExportInstance';
  }
  static staticMethod() {
    return 'staticMethod';
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }
}

export default new Strings();
