import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      layout: {
        black: string;
        grey: string;
        blue: string;
        white: string;
        blueGrey: string;
      };
      feedback: {
        darken: {
          error: string;
          info: string;
          success: string;
          disabled: string;
        };
        lighten: {
          error: string;
          info: string;
          success: string;
          disabled: string;
        };
      };
    };
    spacing: {
      none: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    font: {
      main: string;
      size: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
    };
  }
}
