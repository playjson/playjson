# PlayJSON

```jsonc
{
  "title": "Awesome Game", // 게임의 타이틀
  "width": 720, // 게임의 가로 사이즈
  "heght": 480, // 게임의 세로 사이즈
  "scenes": {
    "scene1": {
      "objects": {
        "hero": {
        }
      },
      "update": "if (is_key_down('ArrowDown')) hero.y += delta_time"
    }
  }
}
```
