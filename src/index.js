import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import * as d3 from "d3";
import "bulma/css/bulma.css";

const App = () => {
  const [data, setData] = useState([]);
  const dataPath = "./data/plot_test_data_25.json";

  useEffect(() => {
    window
      .fetch(dataPath)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          item.wordColor = "black";
        });
        d3.forceSimulation(data)
          .force(
            "collide",
            d3
              .forceCollide()
              .radius(function (d) {
                return Math.pow(d.count, 0.7) + 8;
              })

              .strength(0.01)
              .iterations(30)
          )
          .force("charge", d3.forceManyBody().strength(1))
          .force("center", d3.forceCenter())
          .on("end", () => {
            setData(data);
          });
      });
  }, []);

  if (data.length === 0) {
    return <div>loading</div>;
  } else {
    return (
      <div>
        <div className="hero is-info is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">情報科学研究 国家財政チーム</h1>
              <h2 className="subtitle">アイウエオ</h2>
            </div>
          </div>
        </div>

        <div className="App">
          <WordPlot data={data} />
        </div>

        <footer class="footer">
          <div class="content has-text-centered">
            <p>&copy; 2020 上野瑞貴 野村理沙</p>
          </div>
        </footer>
      </div>
    );
  }
};

//////////////////////////
const WordPlot = ({ data }) => {
  const [word, setWord] = useState("");
  const [wordColor, setWordColor] = useState("black");
  const contentWidth = 440;
  const contentHeight = 440;

  const margin = {
    left: 150,
    right: 150,
    top: 10,
    bottom: 10,
  };

  const width = contentWidth + margin.left + margin.right;
  const height = contentHeight + margin.top + margin.bottom;

  const color = d3.scaleOrdinal(d3.schemeAccent);
  const cicleSize = (d) => Math.pow(d.count, 0.7);

  const xScale = d3
    .scaleLinear()
    .domain([d3.min(data, (item) => item.x), d3.max(data, (item) => item.x)])
    .range([0, contentWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain([d3.max(data, (item) => item.y), d3.min(data, (item) => item.y)])
    .range([0, contentHeight])
    .nice();

  return (
    <section className="section">
      <div className="container">
        <svg viewBox={`0 0 ${width} ${height}`}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {data.map((item, i) => {
              return (
                <g
                  key={i}
                  onClick={() => {
                    setWord(item.word);
                  }}
                  transform={`translate(${xScale(item.x)}, ${yScale(item.y)})`}
                  style={{ cursor: "pointer" }}
                >
                  <title>{`word:${item.word}`}</title>
                  <circle r={cicleSize(item)} fill={color(item.color)} />
                  <text
                    onMouseEnter={() => {
                      setWordColor("black");
                      item.wordColor = wordColor;
                    }}
                    onMouseLeave={() => {
                      setWordColor("blue");
                      item.wordColor = wordColor;
                    }}
                    fontSize={`${cicleSize(item) * 0.8}px`}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={item.wordColor}
                  >
                    {item.word}
                  </text>
                </g>
              );
            })}
          </g>
          <g
            transform={`translate(${margin.left + contentWidth}, ${
              contentHeight - 20
            })`}
          >
            <text>{word}</text>
          </g>
        </svg>
      </div>
      <div>{word === "" ? null : <DrawDendrogram word={word} />}</div>
    </section>
  );
};

////////////////////////////
const DrawDendrogram = ({ word }) => {
  const [data, setData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [ministries, setMinistries] = useState([]);
  const dataPath = `./data/dendrogramData2/${word}.json`;

  useEffect(() => {
    window
      .fetch(dataPath)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [dataPath]);

  useEffect(() => {
    window
      .fetch("./data/tsne_+_clusters_list.json")
      .then((response) => response.json())
      .then((data) => {
        const ministriesSet = new Set();
        data.map((item) => {
          ministriesSet.add(item["府省庁"]);
        });
        setMinistries(Array.from(ministriesSet));

        const newData = data.filter((item) => {
          return item["公開年度"] === "2019" && item["事業名"] === projectName;
        });

        setProjectData(newData);
      });
  }, [projectName]);

  if (data.length === 0) {
    return <div></div>;
  }

  const fontSize = 10;
  const separation = 5;
  const contentWidth = (fontSize + separation) * (data.length / 2);
  const contentHeight = 400;
  const ministriesCol = d3
    .scaleLinear()
    .domain([0, 4, 8, 12, 16, 20])
    .range(["red", "orange", "yellow", "green", "blue", "purple"]);

  const margin = {
    left: 160,
    right: 200,
    top: 20,
    bottom: 200,
  };

  const ministriesList = [];
  ministries.map((item, i) => {
    return ministriesList.push({ 府省庁: item, color: ministriesCol(i) });
  });

  const fillColor = (ministryName) => {
    let color = "";
    ministriesList.forEach((ministry) => {
      if (ministry["府省庁"] === ministryName) {
        color = ministry.color;
      }
    });
    return color;
  };

  const width = contentWidth + margin.left + margin.right;
  const height = contentHeight + margin.top + margin.bottom;

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.max(data, (item) => item.height),
      d3.min(data, (item) => item.height),
    ])
    .range([0, contentHeight - 200]);

  const stratify = d3
    .stratify()
    .id((d) => d.name)
    .parentId((d) => d.parent);

  const data_stratify = stratify(data);
  const root = d3.hierarchy(data_stratify);
  const cluster = d3
    .cluster()
    .size([contentWidth, contentHeight - 200])
    .separation(() => separation);
  cluster(root);

  const testData = root.descendants();

  return (
    <div>
      <div className="columns">
        <div className="column is-2">
          <svg width={margin.left} height="600">
            {ministriesList.map((item, i) => {
              return (
                <g transform={`translate(6, ${margin.top + 30 * i})`}>
                  <circle r="6" fill={item.color} />
                  <text x="7" y="5">
                    {item["府省庁"]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="column" style={{ overflowX: "scroll" }}>
          <svg width={contentWidth + margin.right} height={height}>
            <g transform={`translate(0,${margin.top})`}>
              {testData.slice(1).map((item) => {
                return (
                  <path
                    className="link"
                    d={`M${item.x},${yScale(item.data.data.height)}
                        L${item.x},${yScale(item.parent.data.data.height)}
                        L${item.parent.x},${yScale(
                      item.parent.data.data.height
                    )}`}
                  />
                );
              })}

              {testData.map((item, i) => {
                return (
                  <g
                    key={i}
                    transform={`translate(${item.x},${yScale(
                      item.data.data.height
                    )})`}
                    onClick={() => {
                      setProjectName(item.data.data["事業名"]);
                    }}
                  >
                    <circle
                      r={item.children ? "1" : "6"}
                      fill={fillColor(item.data.data["府省庁"])}
                    ></circle>
                    <text
                      style={{ cursor: "pointer" }}
                      transform="translate(-3,10) rotate(45)"
                      y={item.children ? -10 : 2}
                      x="0"
                      fontSize={`${fontSize}px`}
                      textAnchor={item.children ? "end" : "start"}
                    >
                      {item.children ? null : item.data.data["事業名"]}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
      <div>
        {projectData.length === 0 ? null : (
          <ProjectTable projectData={projectData} />
        )}
      </div>
    </div>
  );
};

/////////////////////////////
const ProjectTable = ({ projectData }) => {
  return (
    <div className="container">
      <h1 className="title">{projectData["0"]["事業名"]}</h1>
      <h2 className="has-text-weight-bold">府省庁</h2>
      <p style={{ marginLeft: "0.75rem", marginbottom: "1.0rem" }}>
        {projectData["0"]["府省庁"]}
      </p>
      <h2 className="has-text-weight-bold">事業の目的</h2>
      <p style={{ marginLeft: "0.75rem", marginbottom: "0.8rem" }}>
        {projectData["0"]["事業の目的"]}
      </p>
      <h2 className="has-text-weight-bold">事業概要</h2>
      <p
        style={{
          marginLeft: "0.75rem",
          marginbottom: "0.8rem",
        }}
      >
        {projectData["0"]["事業概要"]}
      </p>
    </div>
  );
};
render(<App />, document.querySelector("#content"));
