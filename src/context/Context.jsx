import { createContext, useState } from "react";
import run from "../config/gemini"

export const Context=createContext();

const ContextProvider=(props)=>{
  
  const [input , setInput]=useState("")
  const[recentPromt, setRecentPromt]=useState("");
  const [prevPromt, setPrevPromt]=useState([])
  const [showResult, setShowResult]=useState(false)
  const[loading, setLoading]=useState(false)
  const [result, setResult]=useState("")
  
const delayPara=(index, nextWord)=>{
     setTimeout(() => {
      setResult(prev=>prev+nextWord)
     }, 75*index);
}

const newChat=()=>{
  setLoading(false)
  setShowResult(false)
}



const onSent=async (prompt)=>{
  setResult("") // before sending the new data on ui delete older data(RESPONSE)
  setLoading(true)
  setShowResult(true)
  let data=""
  if(prompt!==undefined){
        data=await run(prompt)
        setRecentPromt(prompt)
  }
  else{
    setRecentPromt(input)
  setPrevPromt(prev=>[...prev , input])
    data = await run(input)
  }
 
  let resArray=data.split("**")
  let newArray="";
  for(let i =0; i<resArray.length; i++){
    if(i===0 || i%2 !==1){
      newArray+=resArray[i]
    }
    else{
      newArray+="<b>"+resArray[i]+"</b>"
    }
  }
  let newArray2=newArray.split("*").join("</br>")
  let newArray3=newArray2.split(" ");
  for(let i=0; i<newArray3.length; i++){
    const nextWord=newArray3[i];
    delayPara(i, nextWord+" ")
  }
  // setResult(newArray)
  setLoading(false)
  setInput("")

  
}
//  onSent("what is react js")
  
    const contextValue={
        prevPromt,
  setPrevPromt,
  onSent,
  setRecentPromt,
  recentPromt,
  showResult,
  loading,
  result,
  input,
  setInput,
  newChat

    }
  
    return(
        <Context.Provider value={contextValue}>
             {props.children}
            </Context.Provider>

    )
  
}
export default ContextProvider






