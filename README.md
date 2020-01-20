# React useQueue
### A simple job-based asynchronous queue for `react` and `react-native`

A very small and basic implementation of an asyncronous queue. It's an easy way to add jobs to a list and add a callback to be fired when all of the jobs are complete.

While it's not exactly crammed full of features, it's a convenient and lightweight way to do work on unused cycles.

### Example Useage

First, add it to your project as you normally would.

`$ yarn add react-use-queue`

`import useQueue from "react-use-queue";`


Next, simply use the hook as so.

`const Queue = useQueue();`


Now, you can add tasks:
```
  Queue.addJob({
    task: () => doSomething()),
  });
```

You can even add promises and do something with their result:

```
  Queue.addJob({
    task: () => doSomething().then(result => doSomethingElse(result)),
  });
```

You should think about wrapping the `addJob()` function in a promise:

``` 
  const doSomethingAndReturn = () => {
    return new Promise<string>((resolve, reject) => {
      Queue.addJob({
        task: () => doSomething().then(result => resolve(result)),
      });
    });
  };
```
Which you can then use elsewhere like so...

`const result = await doSomethingAndReturn()`

### Note
If you're on `react` for the web, you can use this queue in your ServiceWorker to do tasks on a background thread. If you're using `react-native` like me, this will execute on the main JS thread, unless the job you're passing spawns it's own thread, like `react-native-ffmpeg` does for example.
