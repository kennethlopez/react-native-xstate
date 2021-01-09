import {Machine} from "xstate";
import config from "./config";
import implementation from "./implementation";

const signInMachine = Machine(config, implementation);

export default signInMachine;
