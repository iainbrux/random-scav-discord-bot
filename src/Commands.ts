import { Command } from "./Command";
import { Join } from "./commands/Join";
import { Leave } from "./commands/Leave";
import { Upachki } from "./commands/Upachki";

export const Commands: Command[] = [Join, Upachki, Leave];
