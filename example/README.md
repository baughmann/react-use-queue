# React useQueue Example

> NOTE: This points to the *local* version of `react-use-queue` (i.e. "file../). React doesn't like this much, so if you run `npm install` in the module before starting the example you will need to remove the `node_modules` folder in the module to avoid conflicting versions of React. No idea how to overcome this.

## Start

1. Simply clone the whole repo `git clone https://github.com/baughmann/react-use-queue`
2. `cd` into the `example` folder and run `npm install`
3. Run `npm start`

## How to use
The button group at the top allows you to select which type of of `Job` to submit. As of `react-use-queue` version `0.5.0`, `Job`s no longer need a full object. You can simly submit a callback function if you wish. You can read more about this in the [README](https://github.com/baughmann/react-use-queue/blob/master/README.md)

After selecting the job type, type some text in the textbox and click submit.