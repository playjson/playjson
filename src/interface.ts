type Vector2 = { x?: number; y?: number };
type Script = string | Function;

type RuntimeBehavior = {
  update?: Script;
  onkeydown?: Script;
  onkeyup?: Script;
  onclick?: Script;
};

type Class = Vector2 & {
  scale?: number | Vector2;
  anchor?: Vector2;
  rotation?: number;
  alpha?: number;
  oncollide?: Script;
} & RuntimeBehavior;

type Object =
  Class |
  ({ class?: string; } & Class);

type Scene = {
  preload?: string[];
  objects?: Record<string, Object>;
} & RuntimeBehavior;

type DebugOptions = {
  show_fps?: boolean;
  throttle_on_blur?: boolean | { fps: number }; // true: 6fps
  show_physics_debugger?: boolean;
};

export type Game = {
  title?: string;
  width?: number;
  height?: number;
  background?: number | string;
  debug?: boolean | DebugOptions; // If true, enable all debug options
  classes?: Record<string, Class>;
  scenes?: Record<string, Scene>;
} & Scene;
