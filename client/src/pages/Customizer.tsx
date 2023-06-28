import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download, logoShirt } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../components";


interface activeFilter {
  logoShirt : true,
  stylishShirt : false
}

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file,setFile] = useState<string>('')
  const [prompt, setPrompt] = useState<string>('')
  const [generatingImg, setGeneratingImg] = useState<boolean>(false)
  const [activeEditorTab, setActiveEditorTrab] = useState<string>("")
  const [activeFilterTab, setActiveFilterTab] = useState<activeFilter>({
    logoShirt : true,
    stylishShirt : false
  })
  //Show tab content depending on the active tab

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
          return <ColorPicker />
      case 'filepicker':
          return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case 'aipicker':
          return <AIPicker 
            prompt = {prompt}
            setPrompt = {setPrompt}
            generatingImg = {generatingImg}
            handleSubmit = {handleSubmit}
          />
      default:
          return null;
    }
  }

  const handleSubmit = async (type : string) => {
    if (!prompt)  return alert("Please enter a prompt")
    try {
      // Call Balckend
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTrab("")
    }
  }

  const handleDecals = (type : any,result:any) => {
    const decaltype = DecalTypes[type]
    state[decaltype.stateProperty] = result

    if(!activeEditorTab[decaltype.filterTab]){
      handleActiveFilterTab(decaltype.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName : string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]
      case "stylishShirt" : 
        state.isFulltexture = !activeFilterTab[tabName]  
      default:
        state.isLogoTexture=true
        state.isFulltexture=false
    }
    // After Setting the state activeFilterTab 
    setActiveFilterTab((prevState)=> {
      return {
        ...prevState,
        [tabName] : !prevState[tabName]
      }
    })
  }

  const readFile = (type : any) => {
    reader(file)
    .then((result)=> {
      handleDecals(type,result)
      setActiveEditorTrab('')
    })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((el) => (
                  <Tab key={el.name} tab={el} handleClick={() => {setActiveEditorTrab(el.name)}} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton type="filled" title="Go Back" handleClick={() => (state.intro = true)} customStyle="w-fit px-4 py-2.5 font-bold text-sm" />
          </motion.div>
          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((el) => (
              <Tab key={el.name} tab={el} isFilterTab isActiveTab={activeFilterTab[el.name]} handleClick={() => {handleActiveFilterTab(el.name)}} />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
