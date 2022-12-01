import "styled-components";
import { ColorTypes, DeviceTypes, StyleTypes } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    color: ColorTypes;
    device: DeviceTypes;
    style: StyleTypes;
  }
}
