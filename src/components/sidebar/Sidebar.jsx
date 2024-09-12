import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
export default function Sidebar() {
  const [extend, setExtend] = useState(false);
  const {onSent , prevPromt , setRecentPromt , newChat}=useContext(Context)
   const loadPromt=async (prompt)=>{
    setRecentPromt(prompt)
    await onSent(prompt)

   }
  return (
    <div className="sidebar">
      <div className="top">
        <img className="menu" src={assets.menu_icon} alt="" onClick={()=>{
          setExtend(!extend);
        }}/>
        <div onClick={
          ()=>{
            newChat()
          }
        } className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extend ? <p>New Chat</p> : null}
        </div>
        {extend ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {
              !prevPromt? null : prevPromt.map((item)=>{
                return(
                  <div onClick={()=>{
                    loadPromt(item)
                  }} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,18)}...</p>
                </div>
                )
            })
            }
           
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extend ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extend ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extend ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
}
