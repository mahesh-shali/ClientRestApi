// src/utils/menuTypes.ts

export interface NestedSubmenu {
  id: string;
  name: string;
  route: string;
}

export interface Submenu {
  id: string;
  name: string;
  route: string;
  submenus?: NestedSubmenu[];
}

export interface Menu {
  id: string;
  name: string;
  logo?: string; // Make 'logo' optional for submenus
  route?: string;
  submenus?: Menu[];
}
