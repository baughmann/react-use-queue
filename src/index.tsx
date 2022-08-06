import { useState, useEffect, useReducer } from "react";

///////////////////////////////
//// Type Definitions
///////////////////////////////
/**
 * @description A wrapper around a task to be performed
 */
export interface Job {
  /**
   * @description A task to be performed. It must return `void` or a `Promise<void>`
   */
  task?: () => void | Promise<void>;
}

export type JobOrFunction = Job | (() => void | Promise<void>);

/**
 * @description A simple async queue implementation
 */
export interface IQueue {
  /**
   * @description Adds a job to the end of the end of the queue
   * @param {Job} job The Job to be performed when this task is executed
   */
  addJob: (job: JobOrFunction) => void;

  /**
   * @description Clear jobs
   */
  empty: () => void;

  /**
   * @description What happens when the current work queue is empty
   * @param {() => void} callback The function to call when the current queue has been completed
   * @warning This is semi-reliable at best. Use at your own risk, and contribute if you know a better way to handle it
   */
  onEmpty: (callback: () => void) => void;

  /**
   * @description Whether or not the queue is currently busy
   * @warning This is semi-reliable at best. Use at your own risk, and contribute if you know a better way to handle it
   */
  isExecutingTask: boolean;
}

///////////////////////////////
//// Reducers
///////////////////////////////
// `ADD` is for adding a new task and `SHIFT` is for removing a completed job, i.e. shifting the window
enum ActionType {
  ADD,
  SHIFT,
  EMPTY,
}

// action to be dispatched
type Action = {
  type: ActionType;
  job?: JobOrFunction;
};

// all pretty self-explanatory
const jobsReducer = (jobs: Array<Job>, action: Action) => {
  switch (action.type) {
    case ActionType.ADD:
      return [...jobs, action.job];

    case ActionType.SHIFT:
      const next = jobs;
      next.shift();
      return next;

    case ActionType.EMPTY:
      return [];

    default:
      return jobs;
  }
};

// keeps track of whether or not the queue is executing a job

const isExecutingTaskReducer = (
  // eslint-disable-next-line TS6133
  status: boolean,
  action: boolean
) => {
  return action;
};

///////////////////////////////
//// Implementation
///////////////////////////////

export default (): IQueue => {
  // the current list of jobs to be performed
  const [jobs, dispatch] = useReducer(jobsReducer, []);
  // whether or not the queue is performing a job
  const [isExecutingTask, setIsExecutingTask] = useReducer(
    isExecutingTaskReducer,
    false
  );
  // the callback to be executed once all jobs are completed
  const [doneCallback, setDoneCallback] =
    useState<() => void | Promise<void>>();

  useEffect(() => {
    const func = async () => {
      if (jobs.length > 0 && !isExecutingTask) {
        setIsExecutingTask(true);
        const job = jobs[0];
        // cast the job's `.task()` attribute to a `Promise<void>` or just get the job itself as a `Promise<void>`
        const task = (job as any)?.task
          ? ((job as any).task as () => Promise<void>)
          : (job as () => Promise<void>);
        // execute the job
        await task();
        dispatch({ type: ActionType.SHIFT });

        if (jobs.length === 0) {
          doneCallback && doneCallback();
        }

        setIsExecutingTask(false);
      }
    };

    func();
  }, [jobs, isExecutingTask]);

  const addJob = async (job: JobOrFunction) => {
    dispatch({ type: ActionType.ADD, job });
  };

  const empty = async () => {
    dispatch({ type: ActionType.EMPTY });
  };

  const onEmpty = (callback: () => void) => {
    setDoneCallback(callback);
  };

  return { empty, addJob, onEmpty, isExecutingTask };
};
