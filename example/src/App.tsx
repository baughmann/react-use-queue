import React, { useCallback } from "react";
import useQueue, { JobOrFunction } from "react-use-queue";

function App() {
  const Queue = useQueue();
  const [jobResults, setJobResults] = React.useState<string[]>([]);
  const [taskType, setTaskType] = React.useState<
    "job" | "promise" | "function"
  >("promise");
  const [text, setText] = React.useState("");

  const getJob = useCallback<(it: string) => JobOrFunction>(
    (value: string) => {
      switch (taskType) {
        case "job": {
          return {
            task: async () =>
              new Promise<void>((res) => {
                setTimeout(() => {
                  setJobResults((prev) => [...prev, value]);
                  res();
                }, 1000);
              }),
          };
        }
        case "promise": {
          return () =>
            new Promise<void>((res) => {
              setTimeout(() => {
                setJobResults((prev) => [...prev, value]);
                res();
              }, 1000);
            });
        }
        case "function": {
          return () => {
            setTimeout(() => {}, 1000);
            setJobResults((prev) => [...prev, value]);
          };
        }
      }
    },

    [taskType]
  );

  const submitJob = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (text.length > 0) Queue.addJob(getJob(text));
    },
    [taskType, text]
  );

  const getButton = (option: "job" | "promise" | "function") => {
    return (
      <button
        className={taskType === option ? "active" : ""}
        onClick={(e) => {
          e.preventDefault();
          setTaskType(option);
        }}
      >
        {option.toLocaleUpperCase()}
      </button>
    );
  };

  return (
    <div className="App">
      <form onSubmit={submitJob}>
        <div className="button-group">
          {getButton("job")}
          {getButton("promise")}
          {getButton("function")}
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text resulting from job"
        />
        <button className="submit" type="submit">Submit job</button>
      </form>
      <div className="results">
        <div className="list-header">
          Completed jobs
        </div>
        <ul>
          {jobResults.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
