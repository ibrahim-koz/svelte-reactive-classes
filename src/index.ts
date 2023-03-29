import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

type Subscribable<T> = Omit<Writable<T>, "update" | "set">;
type ReactiveInstance<T> = T & Subscribable<T>

const commands = Symbol('commands')

type Command = (...args: unknown[]) => void;

const emptySet = Object.freeze(new Set<string>());

function collectCommandsNames(proto: unknown): Set<string> {
    if (proto === null || proto === Object.prototype) {
        return emptySet;
    }
    const currentCommands = (proto as Target<unknown>)[commands] ?? emptySet;
    const parentCommands = collectCommandsNames(Object.getPrototypeOf(proto));
    return new Set([...currentCommands, ...parentCommands]);
}

export function reactiveInstanceOf<T, S extends unknown[]>(
    constructor: new (...args: S) => T,
    ...args: S
): ReactiveInstance<T> {
    const instance = new constructor(...args);
    const store = writable(instance);

    const commandsNames: Set<string> = collectCommandsNames(constructor.prototype);

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
    }, {});

    const reactiveInstance = {
        ...instance,
        ...reactiveCommands,
        subscribe: store.subscribe,
    };

    Object.setPrototypeOf(reactiveInstance, Object.getPrototypeOf(instance))
    return reactiveInstance
}


type Target<T> = T & { [commands]?: Set<string> };

export function command<T, S>(target: Target<T>, name: string, descriptor: S): S {
    if (target[commands] === undefined) {
        target[commands] = new Set<string>();
    }

    target[commands].add(name);
    return descriptor;
}