import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

type Subscribable<T> = Omit<Writable<T>, "update" | "set">;
type ReactiveInstance<T> = T & Subscribable<T>

const commands = Symbol('commands')

type Command = (...args: unknown[]) => void;

const emptySet = new Set();

export function createReactiveInstanceOf<T, S extends unknown[]>(
    constructor: new (...args: S) => T,
    ...args: S
): ReactiveInstance<T> {
    const instance = new constructor(...args);
    const store = writable(instance);

    const commandsNames: Set<string> = constructor.prototype[commands] ?? emptySet;

    const reactiveCommandOf = (command: Command) => {
        return (...args: unknown[]) => {
            command(...args);
            store.set({...instance});
        };
    };

    const commandPairs: [string, Command][] = [...commandsNames].map(it => [
        it,
        constructor.prototype[it].bind(instance),
    ]);

    const reactiveCommands = commandPairs.reduce((acc, [name, command]) => {
        return {...acc, [name]: reactiveCommandOf(command)};
    }, store);

    return {
        ...instance,
        ...reactiveCommands,
        subscribe: store.subscribe,
    }
}


type Target<T> = T & { [commands]?: Set<string> };

export function command<T, S>(target: Target<T>, name: string, descriptor: S): S {
    if (target[commands] == undefined) {
        target[commands] = new Set<string>();
    }

    target[commands].add(name);
    return descriptor;
}