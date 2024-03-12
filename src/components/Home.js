import React from "react";
import Notes from "./Notes";



const Home = (props) => {
  const showAlert = (message, type) => {
    props.showAlert(message, type);
  }
  return (
    <div>
      
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
