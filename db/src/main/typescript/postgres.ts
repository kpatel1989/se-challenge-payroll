import { Utils } from './utils';

const dockerComposer = require('mydockerjs').dockerComposer;

export class Postgres {
    public static up() {
        dockerComposer.up(`${Utils.resourceRoot()}/postgres`, Utils.print, Utils.onData);
    }
    public static down() {
        dockerComposer.down(`${Utils.resourceRoot()}/postgres`, Utils.print, Utils.onData);
    }
}

