class CmsComponentRegistry  {
  // to hold inputs by their types. All inputs are self registering using
  // registerInput method
  static components = {};

  static register(type, component, classNamePrefix, variant, layout, site = null) {
    if(site) {
      if(site == global.contentStore.site) {
        CmsComponentRegistry.components[type] = {
          class:component,
          classNamePrefix:classNamePrefix,
          variant: variant,
          layout: layout
        }
      }
    } else {
      CmsComponentRegistry.components[type] = {
        class:component,
        classNamePrefix:classNamePrefix,
        variant: variant,
        layout: layout
      }
    }
  }
}

export default CmsComponentRegistry;