import axios from "axios";
import React, { useEffect, useState } from "react";

const Interview1 = () => {
  const [theGuess, setTheGuess] = useState("");
  const [recentTrial, setRecentTrial] = useState("");
  const [theTrials, setTrials] = useState(Array(6).fill(null));
  console.log(recentTrial);
  console.log(theTrials);
  const fetchData = async () => {
    const res = await axios.get("https://random-word-api.herokuapp.com/all");
    res.data = res.data.filter((item) => item.length === 5);
    return res.data;
  };
  useEffect(() => {
    const handleType = (event) => {
      if (event.key === "Enter") {
        if (recentTrial.length <= 4) {
          alert("complete recent trial");
          return;
        } else {
          let thetrialls = theTrials;
          var index = theTrials.indexOf(null);
          thetrialls[index] = recentTrial;
          setTrials(thetrialls);
          setRecentTrial("");
          if (index == 5) alert(`the word was ${theGuess}`);
        }
      } else {
        if (recentTrial.length <= 4) {
          setRecentTrial(recentTrial + event.key);
          //or remove recentTrial in dependecies and
          //use setRecentTrial(oldguess=>oldguess+event.key)
        } else {
          let thetrialls = theTrials;
          var index = theTrials.indexOf(null);
          thetrialls[index] = recentTrial;
          setTrials(thetrialls);
          setRecentTrial("");
          if (index == 5) alert(`the word was ${theGuess}`);
        }
      }
    };
    window.addEventListener("keypress", handleType);

    return () => {
      window.removeEventListener("keypress", handleType);
    };
  }, [recentTrial, theTrials]);

  useEffect(() => {
    fetchData().then((words) => {
      setTheGuess(words[Math.floor(Math.random() * words.length)]);
    });
  }, []);

  const makeSqrs = () => {
    var arr = theGuess.split("");
    var row = -1;

    return theTrials.map((trial) => {
      var col = -1;
      row++;
      var indexo = theTrials.indexOf(null);

      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 100px 100px 100px 100px",
            gridGap: "10px",
          }}
        >
          {arr.map((char) => {
            col++;
            var tobetyped = theTrials[row] ? theTrials[row][col] : recentTrial[col] && indexo == row ? recentTrial[col] : "";
            var color = "red";
            var backgroundcolor = "white";
            if (tobetyped == char) {
              color = "black";
              backgroundcolor = "green";
            } else if (arr.includes(tobetyped)) {
              color = "black";
              backgroundcolor = "yellow";
            }
            return (
              <div
                style={{
                  border: "2px solid black",
                  height: "100px",
                  width: "100px",
                  fontSize: "2rem",
                  color: color,
                  backgroundColor: backgroundcolor,
                }}
              >
                {theTrials[row] ? theTrials[row][col] : recentTrial[col] && indexo == row ? recentTrial[col] : ""}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "15% 15% 15% 15% 15% 15%",
          gridGap: "10px",
        }}
      >
        {makeSqrs()}
      </div>
    </div>
  );
};

export default Interview1;
