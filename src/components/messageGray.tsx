import { CSSTransition, SwitchTransition } from "react-transition-group"
import { useRef, useState, useEffect } from "react"
import ReactMakdown from "react-markdown"
import { BsCheckAll } from "react-icons/bs"
import style from "styles/Message.module.scss"

interface propTypes {
    display: boolean,
    children: string
  }

export default function MessageGray(props:propTypes) {
    const [showMessage, setshowMessage] = useState(false)
    const node = useRef<HTMLDivElement>(null)
    const date = new Date()

    // Formated date

    const i18nDate = date.toLocaleString('en-US', { 
        hour: "numeric", 
        hour12: true, 
        minute: "2-digit" 
    })

    // Return Fuction of the content to be displayed

    const message = () =>{
        if (showMessage) {
            return (
                <div className={style.messageGray} ref={node}>
                    <div className={style.messageBubble}>
                        <ReactMakdown>
                            {props.children}    
                        </ReactMakdown>
                    </div>
                    <p className={style.dateTime}>
                        { i18nDate }
                        <BsCheckAll size={"1.25rem"}/>
                    </p>
                </div>
            )
        } else {
            return (
                <div className={style.messageGray} ref={node}>
                    <div className={style.messageBubble}>
                        <div className={style.waitDot}/>
                        <div className={style.waitDot}/>
                        <div className={style.waitDot}/>
                    </div>
                </div>
            )
        }
    }

    // After the display prop value is switched, 
    // it waits from 4-5s if the display value is true 
    // then displays the message when the bubble animation finishes

    useEffect(() => {
        if (props.display) {
            setTimeout(() => {
                setshowMessage(!showMessage)
            }, (Math.floor(Math.random() * (2000 - 3000)) + 2000));
        }
    }, [props.display])
    
    // The double CSSTransition component it's because the first one manages the mounting and unmounting of the component
    // and the other manages the switch between the dots and the message

    return (
        <CSSTransition
            in={ props.display }
            timeout={ 1000 } 
            classNames={{...style}} 
            nodeRef={ node }
            mountOnEnter={ true }
            unmountOnExit={ true }
            onEnter={()=> node.current?.scrollIntoView({behavior:"smooth"})}
            >
            <SwitchTransition>
                <CSSTransition
                    timeout={ 1000 } 
                    classNames={{...style}} 
                    nodeRef={ node }
                    mountOnEnter={ true }
                    unmountOnExit={ true }
                    key={ showMessage ? "message" : "dots" }
                    onEnter={()=> node.current?.scrollIntoView({behavior:"smooth"})}
                >
                { message }
                </CSSTransition>
            </SwitchTransition>
        </CSSTransition>
    )
}
