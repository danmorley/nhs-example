class CmsComponentRegistry  {
  // to hold inputs by their types. All inputs are self registering using
  // registerInput method
  static components = {}

  static register(type, component, classNamePrefix) {
    CmsComponentRegistry.components[type] = {class:component, classNamePrefix:classNamePrefix}
  }
}

export default CmsComponentRegistry;
