type JSCode = string;

type Class = {
  update?: JSCode;
};

type Object = Class & {
  x?: number;
  y?: number;
};

type Scene = {
  objects?: Record<string, Object>;
  update?: JSCode;
};

type DebugOptions = {
  throttle_on_blur?: boolean | { fps: number }; // true: 6fps
  show_physics_debugger?: boolean;
};

export type Game = {
  title?: string;
  width?: number;
  height?: number;
  debug?: boolean | DebugOptions; // If true, enable all debug options
  scenes?: Record<string, Scene>;
  update?: JSCode;
};
