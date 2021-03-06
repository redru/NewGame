import KeyCodes             from "./engine/various/KeyCodes"
import Color                from "./engine/various/Color"
import Logger               from "./engine/modules/Logger"
import Chrono               from "./engine/modules/Chrono"
import {Vec2, Util2D}       from "./engine/modules/Geometry2D"
import GameObjectLoader     from "./engine/modules/GameObjectLoader"
import AssetsLoader         from "./engine/modules/AssetsLoader"
import PositionalBox        from "./engine/interface/PositionalBox"
import CollisionSystem      from "./engine/collisions/CollisionSystem"
import BoundingBox          from "./engine/collisions/BoundingBox"
import GameObject           from "./engine/objects/GameObject"
import RectangleGameObject  from "./engine/objects/RectangleGameObject"
import Core                 from "./engine/Core"

window.KeyCodes             = KeyCodes;
window.Color                = Color;
window.Logger               = Logger;
window.Chrono               = Chrono;
window.Vec2                 = Vec2;
window.Util2D               = Util2D;
window.GameObjectLoader     = GameObjectLoader;
window.AssetsLoader         = AssetsLoader;
window.PositionalBox        = PositionalBox;
window.BoundingBox          = BoundingBox;
window.CollisionSystem      = CollisionSystem;
window.GameObject           = GameObject;
window.RectangleGameObject  = RectangleGameObject;
window.Core                 = Core;
