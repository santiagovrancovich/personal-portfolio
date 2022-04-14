import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useState, useEffect, useRef } from 'react'
import Header from 'src/components/header'
import MessageGray from 'src/components/messageGray'
import MessageBlue from 'src/components/messageBlue'
import MessageBar from 'src/components/messageBar'
import Sidebar from 'src/components/sidebar'
import messageConfig from "message.json"
import style from "styles/Home.module.scss"

export const getStaticProps: GetStaticProps = async () => {
  const textMessages:string[] = messageConfig.textMessages
  const isBlue:boolean[] = messageConfig.isBlue

  return {
    props:{
      textMessages,
      isBlue
    }
  }
}

const Home:NextPage = ({ textMessages, isBlue }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [appState, setappState] = useState<boolean[]>([])
  const [online, setonline] = useState<boolean>(false)
  const messageContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      setonline(!online)
    }, 3000);

    // Loop for message scripting, it sets a timeout to every message for when it should be displayed,
    // the times varies according to the color of the message, it's not perfect timming but it works well enough
    
    for (let i = 0; i < textMessages.length; i++) {
      setTimeout(() => {
        setappState(prevState => [...prevState, true])
      }, ( isBlue[i] ? ( 3500 * ( i - 1 )) + 4500  : 3500 * i ));
    }
  }, [])
 
  return (
    <div className={style.container}>
      <Sidebar className={style.sideBar} currentMessageToDisplay={appState}/>
      <Header online={online} className={style.alignment}/>
        <div className={`${style.messages} ${style.alignment}`} ref={messageContainer}>
            {textMessages.map(( text:string, interator:number )=>{
                if (isBlue[interator]) {
                  return (
                    <MessageBlue display={appState[interator]} key={interator}>{ text }</MessageBlue>
                  )
                } else {
                  return (
                    <MessageGray display={appState[interator]} key={interator}>{ text }</MessageGray>
                  )
                }
            })}
        </div>
      <MessageBar startTyping={false} text={""} className={style.alignment}/>
    </div>
  )
}

export default Home
