import "styled-components";

export interface Colors {
  "primary-grey-600": string;
  "primary-grey-500": string;
  "primary-grey-400": string;
  "primary-grey-300": string;
  "primary-grey-200": string;
  "primary-grey-100": string;
  "secondary-black": string;
  "secondary-white": string;
  "ppp-bright-red": string;
  "ppp-light-red": string;
  "ppp-medium-red": string;
  "ppp-dark-red": string;
  "ppp-sdr": string;
  "ppp-bright-green": string;
  "ppp-light-green": string;
  "ppp-medium-green": string;
  "ppp-sdg": string;
  "ppp-bright-blue": string;
  "ppp-light-blue": string;
  "ppp-medium-blue": string;
  "ppp-dark-blue": string;
  "ppp-sdb": string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
  }
}
