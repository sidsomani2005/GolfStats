// summary.jsx

import React from "react";
import { useParams } from "react-router-dom";
import "./Summary.css";
import AreaChart from "./components/AreaChart";
import RadarChart from "./components/RadarChart";
import { BarChart } from "recharts";

export default function Summary() {
  const params = useParams();

  const fwData = [
    {
      name: "FW Hit",
      uv: Number(params.fwHit),
    },
    {
      name: "FW Hit",
      uv: Number(11),
    },
  ];

  const puttData = [
    {
      name: "Putts",
      uv: Number(params.putts),
    },
    {
      name: "Putts",
      uv: Number(25),
    },
  ];

  

  const penaltyData = [
    {
      name: "Penalties",
      uv: Number(params.penalties),
    },
    {
      name: "Penalties",
      uv: Number(Math.pow(1.5, 0.5)),
    },
  ];

  const girData = [
    {
      name: "GIR",
      uv: Number(params.gir),
    },
    {
      name: "GIR",
      uv: Number(15),
    },
  ];

  const morePuttData = [
    {
      name: ">25ft",
      uv: Number(params.longPutts),
    },
    {
      name: "<15ft",
      uv: Number(params.shortPutts),
    },
  ];

  const specificPitchData = [
    {
      name: "20-29",
      uv: Number(params.twenty30),
    },
    {
      name: "30-39",
      uv: Number(params.thirty40),
    },
    {
      name: "40-49",
      uv: Number(params.forty50),
    },
    {
      name: "50-59",
      uv: Number(params.fifty60),
    },
    {
      name: "60-69",
      uv: Number(params.sixty70),
    },
    {
      name: "70-79",
      uv: Number(params.seventy80),
    },
    {
      name: "80-89",
      uv: Number(params.eighty90),
    },
    {
      name: "90-99",
      uv: Number(params.ninety100),
    },
  ]

  const radarData = [
    { subject: "Pars", A: Number(params.parCount), B: 13, fullMark: 18 },
    { subject: "Bogeys", A: Number(params.bogeyCount), B: 2, fullMark: 18 },
    { subject: "Doubles Bogeys+", A: Number(params.doubleBogeyOrMoreCount), B: 0, fullMark: 18 },
    { subject: "Birdies", A: Number(params.birdieCount), B: 3, fullMark: 18 },
    { subject: "Eagles", A: Number(params.eagleCount), B: 0, fullMark: 18 },
  ];

  return (
    <div>
      <h2>
        Summary: <span>{params.courseName}</span>
      </h2>
      <div className="grid-container">
        <div className="column" id="col1">
          <div className="card">Par: <span>72</span></div>
          <div className="card">Score: <span>{params.totalScore}</span></div>
          <div className="card">Score to Par: <span>{params.totalScore - 72}</span></div>
          <RadarChart data={radarData} />
        </div>
        <div className="column">
          <AreaChart data={fwData} title={"Fairway Data"} />
          <AreaChart data={penaltyData} title={"Penalty Data"}/>
          <AreaChart data={specificPitchData} title={"Pitching Data"}/>
        </div>
        <div className="column">
          <AreaChart data={girData} title={"GIR Data"}/>
          <AreaChart data={puttData} title={"Putting Data"}/>
          <AreaChart data={morePuttData} title={"Putting Length Data"}/>
        </div>
      </div>
    </div>
  );
}
