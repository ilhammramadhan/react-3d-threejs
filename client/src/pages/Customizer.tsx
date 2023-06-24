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

  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((el) => (
                  <Tab key={el.name} tab={el} handleClick={() => {}} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton type="filled" title="Go Back" handleClick={() => (state.intro = true)} customStyle="w-fit px-4 py-2.5 font-bold text-sm" />
          </motion.div>
          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((el) => (
              <Tab key={el.name} tab={el} isFilterTab isActiveTab="" handleClick={() => {}} />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
