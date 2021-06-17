/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import React from "react";
import "./App.css";
import { ProjectList } from "./screens/project-list/index";
import { LoginScreens } from "./screens/login/index";

function App() {
  return (
    <div className="App">
      <LoginScreens />
    </div>
  );
}

export default App;
