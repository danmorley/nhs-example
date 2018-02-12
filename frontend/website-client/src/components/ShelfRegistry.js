class ShelfRegistry  {
  // to hold inputs by their types. All inputs are self registering using
  // registerInput method
  static shelves = {}

  static register(shelf, type) {
    ShelfRegistry.shelves[type] = shelf
  }
}

export default ShelfRegistry;
