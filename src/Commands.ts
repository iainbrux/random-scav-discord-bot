import { Command } from "./Command";
import { Bye } from "./commands/Bye";
import { Hello } from "./commands/Hello";
import { Join } from "./commands/Join";

export const Commands: Command[] = [Hello, Bye, Join];
