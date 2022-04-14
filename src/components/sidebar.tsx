import { useEffect, useState } from "react"
import { BiSearch, BiMenu } from "react-icons/bi"
import ReactMarkdown from "react-markdown"
import style from "styles/Sidebar.module.scss"
import Messages from "message.json"

type propType = {
    className?: string,
    currentMessageToDisplay: boolean[]
}

export default function Sidebar(props:propType) {
    const [currentMessage, setcurrentMessage] = useState<string>("")
    
    useEffect(() => {
        setTimeout(() => {
            setcurrentMessage(Messages.textMessages[props.currentMessageToDisplay.length-1])
        }, 3000);
    }, [props.currentMessageToDisplay])
    

  return (
    <div className={`${style.container} ${props.className}`}>
        <div className={style.searchBar}>
            <span className={style.emoteContainer}>
                <BiMenu size={"1.5rem"}/>
            </span>
            <div className={style.inputBar}>
                <BiSearch 
                    size={"1.75rem"} 
                    className={style.emote} 
                    style={{alignSelf: "center"}}
                />
                <div className={style.typingBar}>
                    <span>Contacts</span>
                </div>
            </div>
        </div>
        <div className={style.contact}>
            <div className={style.profile}>SV</div>
            <div className={style.status}>
                <h3>Santiago Vrancovich</h3>
                <ReactMarkdown className={ props.currentMessageToDisplay[0] ? style.currentMessage : style.currentMessageHidden }>
                    { currentMessage }
                </ReactMarkdown>
            </div>
        </div>
    </div>
  )
}
