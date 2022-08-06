var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useEffect, useReducer } from "react";
///////////////////////////////
//// Reducers
///////////////////////////////
// `ADD` is for adding a new task and `SHIFT` is for removing a completed job, i.e. shifting the window
var ActionType;
(function (ActionType) {
    ActionType[ActionType["ADD"] = 0] = "ADD";
    ActionType[ActionType["SHIFT"] = 1] = "SHIFT";
    ActionType[ActionType["EMPTY"] = 2] = "EMPTY";
})(ActionType || (ActionType = {}));
// all pretty self-explanatory
var jobsReducer = function (jobs, action) {
    switch (action.type) {
        case ActionType.ADD:
            return __spreadArray(__spreadArray([], jobs, true), [action.job], false);
        case ActionType.SHIFT:
            var next = jobs;
            next.shift();
            return next;
        case ActionType.EMPTY:
            return [];
        default:
            return jobs;
    }
};
// keeps track of whether or not the queue is executing a job
var isExecutingTaskReducer = function (
// eslint-disable-next-line TS6133
status, action) {
    return action;
};
///////////////////////////////
//// Implementation
///////////////////////////////
export default (function () {
    // the current list of jobs to be performed
    var _a = useReducer(jobsReducer, []), jobs = _a[0], dispatch = _a[1];
    // whether or not the queue is performing a job
    var _b = useReducer(isExecutingTaskReducer, false), isExecutingTask = _b[0], setIsExecutingTask = _b[1];
    // the callback to be executed once all jobs are completed
    var _c = useState(), doneCallback = _c[0], setDoneCallback = _c[1];
    useEffect(function () {
        var func = function () { return __awaiter(void 0, void 0, void 0, function () {
            var job, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(jobs.length > 0 && !isExecutingTask)) return [3 /*break*/, 2];
                        setIsExecutingTask(true);
                        job = jobs[0];
                        task = (job === null || job === void 0 ? void 0 : job.task)
                            ? job.task
                            : job;
                        // execute the job
                        return [4 /*yield*/, task()];
                    case 1:
                        // execute the job
                        _a.sent();
                        dispatch({ type: ActionType.SHIFT });
                        if (jobs.length === 0) {
                            doneCallback && doneCallback();
                        }
                        setIsExecutingTask(false);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        func();
    }, [jobs, isExecutingTask]);
    var addJob = function (job) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            dispatch({ type: ActionType.ADD, job: job });
            return [2 /*return*/];
        });
    }); };
    var empty = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            dispatch({ type: ActionType.EMPTY });
            return [2 /*return*/];
        });
    }); };
    var onEmpty = function (callback) {
        setDoneCallback(callback);
    };
    return { empty: empty, addJob: addJob, onEmpty: onEmpty, isExecutingTask: isExecutingTask };
});
