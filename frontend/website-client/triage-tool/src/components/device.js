const size = {
  desktop: "992px",
  tablet: "768px",
  phone: "576px"
}

export const device = {
  desktop: `(min-width: ${size.desktop})`,
  tablet: `(min-width: ${size.tablet})`,
  phone: `(min-width: ${size.phone})`
}

export const ie11 = `screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none)`