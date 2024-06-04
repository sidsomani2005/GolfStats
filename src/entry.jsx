import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Entry.css";

export default function Entry() {
  const params = useParams();

  const clubs = [
    "Driver",
    "3 Wood",
    "5 Wood",
    "Hybrid",
    "Iron 3",
    "Iron 4",
    "Iron 5",
    "Iron 6",
    "Iron 7",
    "Iron 8",
    "Iron 9",
    "Pitching Wedge",
    "Sand Wedge",
    "Lob Wedge",
    "Putter",
  ];
  const lies = ["FW", "Bunker", "Rough"];
  const pars = [3, 4, 5];
  const scores = [1,2,3,4,5,6,7,8,9,10];
  const penalties = ["None", "OB", "Hazard", "Unplayable"];

  const [stats, setStats] = useState(
    Array(18)
      .fill()
      .map(() => ({
        par: 4,
        score: 0,
        shots: [{ club: "", yardage: "", lie: "" }],
        putts: [],
        fw: false,
        gir: false,
        upAndDown: false,
        penalty: "None",
      })),
  );

  const navigate = useNavigate();

  const handleStatChange = (holeIndex, key, value) => {
    const newStats = [...stats];
    newStats[holeIndex][key] = value;
    setStats(newStats);
  };

  const handleShotChange = (holeIndex, shotIndex, key, value) => {
    const newStats = [...stats];
    newStats[holeIndex].shots[shotIndex][key] = value;
    setStats(newStats);
  };

  const handleAddShot = (holeIndex) => {
    const newStats = [...stats];
    newStats[holeIndex].shots.push({ club: "", yardage: "", lie: "" });
    setStats(newStats);
  };

  const handlePuttChange = (holeIndex, puttIndex, value) => {
    const newStats = [...stats];
    newStats[holeIndex].putts[puttIndex] = value;
    setStats(newStats);
  };

  const handleAddPutt = (holeIndex) => {
    const newStats = [...stats];
    newStats[holeIndex].putts.push("");
    setStats(newStats);
  };

  const handleSubmit = () => {
    let totalPar = 0;
    let totalScore = 0;
    let fairwaysHit = 0;

    let shortShots = 0;
    let twenty30 = 0;
    let thirty40 = 0;
    let forty50 = 0;
    let fifty60 = 0;
    let sixty70 = 0;
    let seventy80 = 0;
    let eighty90 = 0;
    let ninety100 = 0;

    let lessTwenty = 0;

    let longPutts = 0;
    let shortPutts = 0;
    let totalGSBunker = 0;
    let totalFWBunker = 0;
    let totalPutts = 0;
    let totalPenaltyShots = 0;
    let totalGIR = 0;
    let totalFW = 0;
    let threePuttCount = 0;

    let eagleCount = 0;
    let birdieCount = 0;
    let parCount = 0;
    let bogeyCount = 0;
    let doubleBogeyOrMoreCount = 0;

    stats.forEach((hole) => {
      const difference = hole.par - hole.score;

      if (difference > 0) {
        if (difference === -2) {
          eagleCount++;
        } else if (difference === -1) {
          birdieCount++;
        } else if (difference === 0) {
          parCount++;
        } else if (difference === 1) {
          bogeyCount++;
        } else if (difference >= 2) {
          doubleBogeyOrMoreCount++;
        }
      }

      if (hole.penalty !== "None") {
        totalPenaltyShots++;
      }

      totalPar += hole.par;
      totalScore += hole.score;

      if (hole.gir) {
        totalGIR++;
      }

      if (hole.fw && hole.par !== 3) {
        fairwaysHit++;
      }

      if (hole.par !== 3) {
        totalFW++;
      }

      hole.shots.forEach((shot) => {
        const yardage = parseInt(shot.yardage);
        const lie = shot.lie;

        if (!isNaN(yardage)) {
          if (yardage <= 100 && yardage > 20) {
            shortShots++;

            if (yardage >= 50) {
              if (yardage < 60) {
                fifty60++;
              } else if (yardage >= 60 && yardage < 70) {
                sixty70++;
              } else if (yardage >= 70 && yardage < 80) {
                seventy80++;
              } else if (yardage >= 80 && yardage < 90) {
                eighty90++;
              } else if (yardage >= 90 && yardage < 100) {
                ninety100++;
              }
            } else {
              if (yardage > 40) {
                forty50++;
              } else if (yardage >= 30 && yardage < 40) {
                thirty40++;
              } else if (yardage >= 20 && yardage < 30) {
                twenty30++;
              }
            }
          } else if (yardage <= 20) {
            lessTwenty++;
          }
        }

        if (lie === "Bunker") {
          if (yardage <= 30) {
            totalGSBunker++;
          } else {
            totalFWBunker++;
          }
        }
      });

      hole.putts.forEach((putt) => {
        const length = parseInt(putt.length);
        if (!isNaN(length)) {
          if (length > 25) {
            longPutts++;
          } else if (length < 15) {
            shortPutts++;
          }
          totalPutts++;
        }
      });
    });


    //THIS IS AN EXTREMELY LONG NAVIGATION LINE - INCLUDES NEARLY 30 INPUT PARAMETERS FOR ROUTING TO NEXT PAGE
    navigate(
      `/summary/${params.courseName}/${fairwaysHit}/${lessTwenty}/${twenty30}/${thirty40}/${forty50}/${fifty60}/${sixty70}/${seventy80}/${eighty90}/${ninety100}/${totalPutts}/${totalPenaltyShots}/${totalGIR}/${totalFW}/${threePuttCount}/${longPutts}/${shortPutts}/${totalGSBunker}/${totalFWBunker}/${totalPar}/${totalScore}/${parCount}/${birdieCount}/${eagleCount}/${bogeyCount}/${doubleBogeyOrMoreCount}`, 
    );
    //27 parameters

  };


  return (
    <div>
      <h2>Enter Your Stats</h2>

      {stats.map((hole, holeIndex) => (
        <section key={holeIndex}>
          <div className="hole-section">
            <h3>Hole {holeIndex + 1}</h3>
            <div>
              <label>Par: </label>
              <select
                value={hole.par}
                onChange={(e) =>
                  handleStatChange(holeIndex, "par", parseInt(e.target.value))
                }
              >
                {pars.map((par) => (
                  <option key={par} value={par}>
                    {par}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Score: </label>
              <input
                type="number"
                value={hole.score}
                onChange={(e) =>
                  handleStatChange(holeIndex, "score", parseInt(e.target.value))
                }
              />
            </div>
            {hole.shots.map((shot, shotIndex) => (
              <div key={shotIndex} className="shot-section">
                <label>Shot {shotIndex + 1}: </label>
                <select
                  className="club-select"
                  value={shot.club}
                  onChange={(e) =>
                    handleShotChange(
                      holeIndex,
                      shotIndex,
                      "club",
                      e.target.value,
                    )
                  }
                >
                  {clubs.map((club) => (
                    <option key={club} value={club}>
                      {club}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Yardage"
                  value={shot.yardage}
                  onChange={(e) =>
                    handleShotChange(
                      holeIndex,
                      shotIndex,
                      "yardage",
                      e.target.value,
                    )
                  }
                />{" "}
                <select
                  value={shot.lie}
                  onChange={(e) =>
                    handleShotChange(
                      holeIndex,
                      shotIndex,
                      "lie",
                      e.target.value,
                    )
                  }
                >
                  {lies.map((lie) => (
                    <option key={lie} value={lie}>
                      {lie}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button onClick={() => handleAddShot(holeIndex)}>Add Shot</button>
            {hole.putts.map((length, puttIndex) => (
              <div key={puttIndex} className="putt-section">
                <label>Putt {puttIndex + 1}: </label>
                <input
                  type="number"
                  placeholder="Length"
                  value={length}
                  onChange={(e) =>
                    handlePuttChange(holeIndex, puttIndex, e.target.value)
                  }
                />
              </div>
            ))}
            <button onClick={() => handleAddPutt(holeIndex)}>Add Putt</button>
            <label>FW Hit: </label>
            <div>
              <input
                type="checkbox"
                checked={hole.fw}
                onChange={(e) =>
                  handleStatChange(holeIndex, "fw", e.target.checked)
                }
              />
            </div>
            <label>GIR: </label>
            <div>
              <input
                type="checkbox"
                checked={hole.gir}
                onChange={(e) =>
                  handleStatChange(holeIndex, "gir", e.target.checked)
                }
              />
            </div>
            <label>Up and Down: </label>
            <div>
              <input
                type="checkbox"
                checked={hole.upAndDown}
                onChange={(e) =>
                  handleStatChange(holeIndex, "upAndDown", e.target.checked)
                }
              />
            </div>
            <div>
              <label>Penalty: </label>
              <select
                value={hole.penalty}
                onChange={(e) =>
                  handleStatChange(holeIndex, "penalty", e.target.value)
                }
              >
                {penalties.map((penalty) => (
                  <option key={penalty} value={penalty}>
                    {penalty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      ))}

      <div className="button-container" id="bottom-button">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
