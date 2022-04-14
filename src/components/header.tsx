import { useRef } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { BsArrowLeft, BsThreeDotsVertical } from "react-icons/bs"
import style from "styles/Header.module.scss"

type propTypes = {
  online: boolean,
  className?: string
}

export default function Header(props:propTypes) {
  //It's not necessary to have the DOM element Ref, but it's better to use it anyways because CSSTransition
  //uses the deprecated findDOMNode method, this way we can avoid using the method by directly giving it the element.
  //If it causes any trouble it can be deleted but it's gonna give a warning
  const nodes = useRef(null)

  return (
    <div className={`${style.container} ${props.className}`}>
        <BsArrowLeft className={style.emote} size={"1.5rem"}/>
        <div className={style.profile}>SV</div>
        <div className={style.status}>
            <h3>Santiago Vrancovich</h3>
            <SwitchTransition>
              <CSSTransition 
                in={props.online} 
                timeout={200} 
                classNames={{...style}} 
                key={props.online ? "online" : "offline"}
                nodeRef={nodes}
              > 
                { props.online ? <p className={style.greenDot} ref={nodes}>Online</p> : <p ref={nodes}>Last seen: Recently</p> }
              </CSSTransition>
            </SwitchTransition>
        </div>
        <BsThreeDotsVertical className={style.emote} size={"1.5rem"}/>
    </div>
  )
}
