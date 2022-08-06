/**
 * @description A wrapper around a task to be performed
 */
export interface Job {
    /**
     * @description A task to be performed. It must return `void` or a `Promise<void>`
     */
    task?: () => void | Promise<void>;
}
export declare type JobOrFunction = Job | (() => void | Promise<void>);
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
declare const _default: () => IQueue;
export default _default;
