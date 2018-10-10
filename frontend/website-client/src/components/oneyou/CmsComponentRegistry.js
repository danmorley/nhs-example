class CmsComponentRegistry  {
  // to hold inputs by their types. All inputs are self registering using
  // registerInput method
  static components = {};

  static register(type, component, classNamePrefix, variant, layout) {
    CmsComponentRegistry.components[type] = {
      class:component,
      classNamePrefix:classNamePrefix,
      variant: variant,
      layout: layout
    }
  }
}

export default CmsComponentRegistry;
