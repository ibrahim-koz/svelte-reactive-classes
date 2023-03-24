import {writable} from "svelte/store";


export function createReactiveInstanceOf(
    constructor,
    ...args
) {
    const instance = new constructor(...args);
    const store = writable(instance)


    const commandsNames = constructor.prototype['commands'] ?? []

    const set = store.set

    const _set = () => {
        set.bind(store, {...instance})()
    }

    for (let methodName of commandsNames) {
        const method = constructor.prototype[methodName]
        const methodBound = method.bind(instance)
        store[methodName] = (...args) => {
            methodBound(...args)
            _set();
        }
    }

    delete store.set
    delete store.update

    return store
}


export function command(target, name, descriptor) {
    if (target.commands == undefined) {
        target.commands = new Set()
    }

    target.commands.add(name)
    return descriptor
}

