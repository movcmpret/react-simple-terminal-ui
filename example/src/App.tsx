import './App.css';
import { TerminalUi } from 'react-simple-terminal-ui';
import "react-simple-terminal-ui/dist/styles.css"


const commands = [{
  command: "help", print: <div>
      <b>help</b> print this message<br />
      <b>whoami</b> print effective username<br />
      <b>ls</b> list files<br />
      <b>lsb_release -a </b> show distribution info<br />
      <b>alert</b> show an alert<br />
      <br/>
  </div>
},
{ command: "whoami", print: "visitor" },
{ command: "ls", print: <div><div style={{color : "#03b1fc", marginRight : "5px"}}>bin</div><div style={{color : "#03b1fc", marginRight : "5px"}}>docs</div><div style={{color : "#03b1fc", marginRight : "5px"}}>src</div><div style={{color : "white", marginRight : "5px"}}>README</div></div> },
{ command: "lsb_release -a", print: <div>LSB Version:	n/a<br/>Distributor ID:	Ubuntu<br/>Description:	Ubuntu<br/></div>, },
{ command: "alert", callback: () => alert("this is an alert triggered by a callback.") }]


const initialFeed =  ["Please type help for a list of commands."]

function App() {
  return (
    <div className="App">
      <h2>react-simple-terminal-ui</h2>
      <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>

      <div style={{ display: "flex", flexDirection : "column" }}>

      <div style={{width : "350px", height : "350px", marginTop : "5px"}}>
      <b>Borderless</b>
          <TerminalUi
            initialFeed={initialFeed}
            prompt='[root@movcmpret]$ '
            commands={commands}
           />
        </div>

      <div style={{width : "350px", height : "350px", marginTop : "30px"}}>
      <b>Ubuntu</b>
          <TerminalUi
            initialFeed={initialFeed}
            title={"[visitor@movcmpret]$ "}
            frame='GnomeUbuntu'
            recordClassName='terminal-ui-record-custom'
            prompt='[visitor@movcmpret]$ '
            commands={commands} />
        </div>

        <div style={{width : "350px", height : "350px", marginTop : "70px"}}>
        <b>Mac OS</b>
          <TerminalUi
            initialFeed={initialFeed}
            frame='MacOs'
            style={{height : "350px"}}
            commands={commands} />
        </div>

        <div style={{ marginTop : "60px"}}>
        <b>Windows 98</b>
          <TerminalUi
            initialFeed={initialFeed}
            frame='Win98'
            style={{height : "350px"}}
            commands={commands} />
        </div>

      </div>

    </div>
    </div>
  );
}

export default App;
