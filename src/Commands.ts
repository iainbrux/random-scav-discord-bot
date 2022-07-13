import { Command } from "./Command";
import { Bye } from "./commands/Bye";
import { Hello } from "./commands/Hello";
import { Join } from "./commands/Join";
import { Upachki } from "./commands/Upachki";

export const Commands: Command[] = [Hello, Bye, Join, Upachki];
