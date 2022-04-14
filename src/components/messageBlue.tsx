import { CSSTransition } from "react-transition-group"
import { ReactChild, useRef } from "react"
import { BsCheckAll } from "react-icons/bs"
import style from "styles/Message.module.scss"

interface propTypes {
  display: boolean,
  children: ReactChild
}

export default function MessageBlue(props:propTypes) { 
  const node = useRef<HTMLDivElement>(null)
  const date = new Date()

  const i18nDate = date.toLocaleString('en-US', { 
    hour: "numeric", 
    hour12: true, 
    minute: "2-digit" 
  })

  return (
    <CSSTransition
      in={ props.display } 
      timeout={ 1000 } 
      classNames={{...style}} 
      nodeRef={ node }
      mountOnEnter={ true }
      onEnter={()=> node.current?.scrollIntoView({behavior:"smooth"})}
    >
      <div className={style.messageBlue} ref={node}>
        <p className={style.dateTime}>
          { i18nDate }
          <BsCheckAll size={"1.25rem"}/>
        </p>
        <div className={style.messageBubble}>{ props.children }</div>
      </div>
    </CSSTransition>
  )
}
