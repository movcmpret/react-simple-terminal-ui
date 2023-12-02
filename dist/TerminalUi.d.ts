import { ReactNode } from "react";
import "98.css";
declare const Frames: {
    readonly None: "None";
    readonly Win98: "Win98";
    readonly MacOs: "MacOs";
    readonly GnomeUbuntu: "GnomeUbuntu";
};
type Frames = typeof Frames[keyof typeof Frames];
type Command = {
    command: string;
    print?: string | ReactNode;
    callback?: Function;
};
type TerminalUiProps = {
    style?: object;
    title?: string;
    initialFeed?: Array<string>;
    className?: string;
    recordClassName?: string;
    commands: Array<Command>;
    prompt?: string;
    commandNotFoundMessage?: (cmd: string) => string;
    blinkerComponent?: ReactNode;
    blinkerChar?: string;
    frame?: Frames;
};
declare const TerminalUi: ({ style, initialFeed, className, title, commands, prompt, recordClassName, commandNotFoundMessage, blinkerComponent, blinkerChar, frame }: TerminalUiProps) => JSX.Element;
export default TerminalUi;
