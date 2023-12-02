
import React, { ReactNode, useEffect, useMemo, useState } from "react"
import Blinker from "./Blinker"
import "98.css";

const Frames = {
    None: 'None',
    Win98: 'Win98',
    MacOs: 'MacOs',
    GnomeUbuntu: 'GnomeUbuntu',
} as const

type Frames = typeof Frames[keyof typeof Frames]

type Command = {
    command: string,
    print?: string | ReactNode,
    callback?: Function,
}

type TerminalUiProps = {
    style?: object,
    title?: string,
    initialFeed?: Array<string|ReactNode>,
    className?: string,
    recordClassName?: string,
    commands: Array<Command>,
    prompt?: string,
    commandNotFoundMessage?: (cmd: string) => string,
    blinkerComponent?: ReactNode,
    blinkerChar?: string,
    frame?: Frames
}

const TerminalUi = ({ style,
    initialFeed = [],
    className,
    title,
    commands = [],
    prompt,
    recordClassName,
    commandNotFoundMessage = (cmd) => `command '${cmd}' not found.`,
    blinkerComponent,
    blinkerChar,
    frame = Frames.None
}: TerminalUiProps) => {

    const [focused, setFocused] = useState(true)
    const [feed, setFeed] = useState<Array<string|ReactNode>>([])
    const [currentLine, setCurrentLine] = useState<string>("")

    const uid = useMemo(() => Math.random().toString(16).slice(2), []) // need a uid for auto scroll
    const hiddenInputId = uid + "_hidden_input" //need a hidden input for mobile compatibility

    useEffect(() => {
        setFeed(initialFeed)
    }, [])

    useEffect(() => {
        const element = document.getElementById(uid);
        if (element)
            element.scrollTop = element.scrollHeight;
    }, [feed])



    /** 
 * Called when the user hits Enter. 
*/
    const interpretCommand = () => {
        const newFeed = [...feed, createdPrompt + currentLine]
        let originalCommand = (currentLine ?? "")
        let command = originalCommand.replaceAll(" ", "")
        let foundCommand = commands?.find(cmd => ("" + cmd?.command).replaceAll(" ", "") == command)
        if (!foundCommand)
            newFeed.push(commandNotFoundMessage(originalCommand))
        else {
            if (foundCommand.print)
                newFeed.push(foundCommand.print)
            if (typeof foundCommand.callback == "function")
                foundCommand.callback()
        }
        setCurrentLine("")
        setFeed(newFeed)
    }

    const onKeyDownHandler = ({ key, keyCode }: React.KeyboardEvent<HTMLDivElement>) => {
        // allow alphanumeric values, as well as 
        if ((keyCode >= 48 && keyCode <= 57)  // digits
            || (keyCode >= 65 && keyCode <= 90)  // alphabet
            || (keyCode >= 106 && keyCode <= 111) // decimal points, subtract, etc.
            || (keyCode >= 186 && keyCode <= 222) // colon, semi-colon, etc.
            || keyCode == 173 // dash
            || key == " ")
            return setCurrentLine(currentLine + key)
        if (key == "Backspace")
            return setCurrentLine(currentLine.substring(0, currentLine?.length - 1))
        if (key == "Enter")
            return interpretCommand()
    }


    const onFocusHandler = (): void => {
        setFocused(true)
        const element = document.getElementById(hiddenInputId);
        if (element)
            element.focus()
    }

    const wrapFrame = (content: JSX.Element): JSX.Element => {
        if (!frame || frame == Frames.None)
            return <>{content}</>

        if (frame == Frames.Win98)
            return <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">{title ?? "cmd.exe"}</div>
                </div>
                {content}
            </div>

        if (frame == Frames.GnomeUbuntu)
            return <div style={{ height: "100%" }}>
                <div className="ubuntu-gnome-title-bar">
                    <div className="ubuntu-gnome-title">{title ?? ""}</div>
                </div>
                {content}
            </div>
        if(frame == Frames.MacOs)
            return <div className="mac-window">
            <div className="mac-titlebar">
              <div className="mac-buttons">
                <div className="mac-close">
                </div>
                <div className="mac-minimize">
                </div>
                <div className="mac-zoom">
                </div>
              </div>
              <div className="mac-title">{title}</div>
            </div>
            <div className="content">
              {content}
            </div>
          </div>


        return content
    }

    const getRootClassName = () => {
        if (className)
            return className
        if (!frame || frame == Frames.None)
            return "terminal-ui-root"
        if (frame == Frames.Win98)
            return "terminal-ui-root-win98"
        if (frame == Frames.GnomeUbuntu)
            return "terminal-ui-root-gnome-ubuntu"
        return "terminal-ui-root"
    }

    const getBlinkerChar = () => {
        if (blinkerChar)
            return blinkerChar
        if (frame == Frames.Win98)
            return "_"
    }

    const getPrompt = () => {
        if (prompt)
            return prompt
        if (frame == Frames.Win98)
            return "C:\>"
        return "$"
    }

    const createdPrompt = getPrompt()
    const blinker = blinkerComponent ?? <Blinker char={getBlinkerChar()} />

    return wrapFrame(<div tabIndex={0}
        id={uid}
        className={getRootClassName()}
        style={style}
        onFocus={onFocusHandler}
        onBlur={() => setFocused(false)}
    >
        <input style={{ position: "fixed", zIndex: -1, width: "0px", height: "0px", opacity: 0 }} id={hiddenInputId} value={currentLine} onKeyDown={onKeyDownHandler} onChange={() => { }} />
        {feed?.map((record, i) => {
            return <div className={recordClassName ?? "terminal-ui-record"} key={i}>{record}</div>
        })}
        <div className={recordClassName ?? "terminal-ui-record"}>{createdPrompt}{currentLine}{focused ? blinker : null}</div>
    </div>)
}

export default TerminalUi