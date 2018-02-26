class ShelfRegistry  {
  // to hold inputs by their types. All inputs are self registering using
  // registerInput method
  static shelves = {}

  static register(type, shelf, classNamePrefix) {
    ShelfRegistry.shelves[type] = {class:shelf, classNamePrefix:classNamePrefix}
  }
}

export default ShelfRegistry;
