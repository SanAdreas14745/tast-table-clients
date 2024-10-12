import {environment as envDev} from './environment.development';
import {Env} from "./env.interface";

export const environment: Env = {
    ...envDev
}
