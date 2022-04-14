import { BsEmojiSmile, BsPaperclip } from "react-icons/bs"
import { IoPaperPlane } from "react-icons/io5"
import { useRef } from "react"
import style from "styles/MessageBar.module.scss"

interface propTypes {
    text: string,
    startTyping: boolean,
    className?: string
}

export default function MessageBar(props:propTypes) {
    const typingElement = useRef<HTMLSpanElement>(null)
    
 return (
    <div className={`${style.container} ${props.className}`}>
        <div className={style.inputBar}>
            <BsEmojiSmile 
                size={"1.75rem"} 
                className={style.emote} 
                style={{alignSelf: "center"}}
            />
            <div className={style.typingBar}>
                <span className={props.startTyping ? style.typedText : ""} ref={typingElement}>Message</span>
            </div>
            <BsPaperclip  
                className={style.emote} 
                size={"1.75rem"} 
                style={{transform: "rotate(45deg)", alignSelf: "center"}}
            />
        </div>
        <span className={style.emoteContainer}>
            <IoPaperPlane size={"1.5rem"} style={{transform: "rotate(45deg)"}}/>
        </span>
    </div>
  )
}
