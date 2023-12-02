# react-simple-terminal-ui

> A simple react component to display an interactive terminal. You can define commands yourself, customize the styling and choose between different window frames.

[![NPM](https://img.shields.io/npm/v/react-simple-terminal-ui.svg)](https://www.npmjs.com/package/react-animated-text-builders)


### Checkout the [Demo](https://www.movcmpret.com/demo/simple-terminal-ui/index.html)


<img src="https://www.movcmpret.com/demo/simple-terminal-ui/borderless.gif" alt="image" width="350" height="auto"> <img src="https://www.movcmpret.com/demo/simple-terminal-ui/macos.png" alt="image" width="350" height="auto">


<img src="https://www.movcmpret.com/demo/simple-terminal-ui/windows.png" alt="image" width="350" height="auto"> <img src="https://www.movcmpret.com/demo/simple-terminal-ui/ubuntu.png" alt="image" width="350" height="auto">


## Usage

```jsx
import { TerminalUi } from 'react-simple-terminal-ui';
import "react-simple-terminal-ui/dist/styles.css"

const commands = [{
  command: "help", print: <div>
      <b>print</b> print something<br />
      <b>alert</b> show an alert<br />
      <br/>
  </div>
},
{ command: "print", print: "Hello world!"},
{ command: "alert", callback: () => alert("this is an alert triggered by a callback.") }]

const initialFeed =  ["Please type help for a list of commands."]

const Example = () => {

    return <TerminalUi
            initialFeed={initialFeed}
            prompt='[visitor@my-desktop]$ '
            commands={commands}
            blinkerChar={"_"}
            frame={"Win98"}
            commandNotFoundMessage={cmd => `Sorry, I can't find '${cmd}'`}
           />
}
```


## Props

### TerminalUi
Name | Type | Function | Default | Optional
------------ | ------------- | -------------| ------------- | ------------
`commands` | Array<Command> | Array of commands (see below) | - | 
`style` | object | style for the root component | - | ✓
`title` | string | a title that is shown in the title section of the window frames | - |  ✓
`initialFeed` | Array<string|ReactNode> | Initial records that are shown before the first prompt | ✓
`className` | string | className for the root component | - |  ✓
`recordClassName` | string | className for each record component | - |  ✓
`prompt` | string | The prompt string that is shown in the beginning of each new line | - |  ✓
`commandNotFoundMessage` | (cmd: string) => string | custom message if the command was not found | - |  ✓
`blinkerComponent` | ReactNode | define your own blinking-component | - |  ✓
`blinkerChar` | string | the char that blinks (e.g. '_') | - |  ✓
`frame` | "None", "Win98", "MacOs", "GnomeUbuntu" | The window frame that is going to be used | - |  ✓

### Command
Name | Type | Function | Default | Optional
------------ | ------------- | -------------| ------------- | ------------
`command` | string | the command that needs to be typed in the terminal | 
`print` | string | ReactNode | the content that is rendered when the command matches. |  ✓
`callback` | Function | a callback that is executed when the command matches. |  ✓

## License

MIT © [movcmpret](https://github.com/movcmpret)
