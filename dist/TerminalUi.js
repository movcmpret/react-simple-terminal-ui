"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Blinker_1 = __importDefault(require("./Blinker"));
require("98.css");
const Frames = {
    None: 'None',
    Win98: 'Win98',
    MacOs: 'MacOs',
    GnomeUbuntu: 'GnomeUbuntu',
};
const TerminalUi = ({ style, initialFeed = [], className, title, commands = [], prompt, recordClassName, commandNotFoundMessage = (cmd) => `command '${cmd}' not found.`, blinkerComponent, blinkerChar, frame = Frames.None }) => {
    const [focused, setFocused] = (0, react_1.useState)(true);
    const [feed, setFeed] = (0, react_1.useState)([]);
    const [currentLine, setCurrentLine] = (0, react_1.useState)("");
    const uid = (0, react_1.useMemo)(() => Math.random().toString(16).slice(2), []); // need a uid for auto scroll
    const hiddenInputId = uid + "_hidden_input"; //need a hidden input for mobile compatibility
    (0, react_1.useEffect)(() => {
        setFeed(initialFeed);
    }, []);
    (0, react_1.useEffect)(() => {
        const element = document.getElementById(uid);
        if (element)
            element.scrollTop = element.scrollHeight;
    }, [feed]);
    /**
 * Called when the user hits Enter.
*/
    const interpretCommand = () => {
        const newFeed = [...feed, createdPrompt + currentLine];
        let originalCommand = (currentLine ?? "");
        let command = originalCommand.replaceAll(" ", "");
        let foundCommand = commands?.find(cmd => ("" + cmd?.command).replaceAll(" ", "") == command);
        if (!foundCommand)
            newFeed.push(commandNotFoundMessage(originalCommand));
        else {
            if (foundCommand.print)
                newFeed.push(foundCommand.print);
            if (typeof foundCommand.callback == "function")
                foundCommand.callback();
        }
        setCurrentLine("");
        setFeed(newFeed);
    };
    const onKeyDownHandler = ({ key, keyCode }) => {
        // allow alphanumeric values, as well as 
        if ((keyCode >= 48 && keyCode <= 57) // digits
            || (keyCode >= 65 && keyCode <= 90) // alphabet
            || (keyCode >= 106 && keyCode <= 111) // decimal points, subtract, etc.
            || (keyCode >= 186 && keyCode <= 222) // colon, semi-colon, etc.
            || keyCode == 173 // dash
            || key == " ")
            return setCurrentLine(currentLine + key);
        if (key == "Backspace")
            return setCurrentLine(currentLine.substring(0, currentLine?.length - 1));
        if (key == "Enter")
            return interpretCommand();
    };
    const onFocusHandler = () => {
        setFocused(true);
        const element = document.getElementById(hiddenInputId);
        if (element)
            element.focus();
    };
    const wrapFrame = (content) => {
        if (!frame || frame == Frames.None)
            return react_1.default.createElement(react_1.default.Fragment, null, content);
        if (frame == Frames.Win98)
            return react_1.default.createElement("div", { className: "window" },
                react_1.default.createElement("div", { className: "title-bar" },
                    react_1.default.createElement("div", { className: "title-bar-text" }, title ?? "cmd.exe")),
                content);
        if (frame == Frames.GnomeUbuntu)
            return react_1.default.createElement("div", { style: { height: "100%" } },
                react_1.default.createElement("div", { className: "ubuntu-gnome-title-bar" },
                    react_1.default.createElement("div", { className: "ubuntu-gnome-title" }, title ?? "")),
                content);
        if (frame == Frames.MacOs)
            return react_1.default.createElement("div", { className: "mac-window" },
                react_1.default.createElement("div", { className: "mac-titlebar" },
                    react_1.default.createElement("div", { className: "mac-buttons" },
                        react_1.default.createElement("div", { className: "mac-close" }),
                        react_1.default.createElement("div", { className: "mac-minimize" }),
                        react_1.default.createElement("div", { className: "mac-zoom" })),
                    react_1.default.createElement("div", { className: "mac-title" }, title)),
                react_1.default.createElement("div", { className: "content" }, content));
        return content;
    };
    const getRootClassName = () => {
        if (className)
            return className;
        if (!frame || frame == Frames.None)
            return "terminal-ui-root";
        if (frame == Frames.Win98)
            return "terminal-ui-root-win98";
        if (frame == Frames.GnomeUbuntu)
            return "terminal-ui-root-gnome-ubuntu";
        return "terminal-ui-root";
    };
    const getBlinkerChar = () => {
        if (blinkerChar)
            return blinkerChar;
        if (frame == Frames.Win98)
            return "_";
    };
    const getPrompt = () => {
        if (prompt)
            return prompt;
        if (frame == Frames.Win98)
            return "C:\>";
        return "$";
    };
    const createdPrompt = getPrompt();
    const blinker = blinkerComponent ?? react_1.default.createElement(Blinker_1.default, { char: getBlinkerChar() });
    return wrapFrame(react_1.default.createElement("div", { tabIndex: 0, id: uid, className: getRootClassName(), style: style, onFocus: onFocusHandler, onBlur: () => setFocused(false) },
        react_1.default.createElement("input", { style: { position: "fixed", zIndex: -1, width: "0px", height: "0px", opacity: 0 }, id: hiddenInputId, value: currentLine, onKeyDown: onKeyDownHandler, onChange: () => { } }),
        feed?.map((record, i) => {
            return react_1.default.createElement("div", { className: recordClassName ?? "terminal-ui-record", key: i }, record);
        }),
        react_1.default.createElement("div", { className: recordClassName ?? "terminal-ui-record" },
            createdPrompt,
            currentLine,
            focused ? blinker : null)));
};
exports.default = TerminalUi;
