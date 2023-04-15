# svelte-reactive-classes

`svelte-reactive-classes` is a convenient and lightweight library that allows you to create reactive class instances
with encapsulation in your Svelte applications. The library provides an easy way to convert your classes into Svelte
stores on the fly, while removing the `update` and `set` functions to improve encapsulation. It also supports the CQS (
Command Query Separation) pattern through the `@command` decorator.

## Motivation

As a backend developer with a solid background in Object-Oriented Programming (OOP) and software architecture, I found the way state management is handled in many frontend frameworks to be quite annoying. In OOP, it is essential that only a class should change its state, without exposing its internal data outside. This principle ensures better encapsulation and maintainability.

Svelte provides a reactive store system that can be utilized to improve the state management in frontend applications. This inspired me to develop a solution that leverages Svelte's store values while maintaining the OOP principle of encapsulation.

The implementation presented here allows you to mark specific methods as commands that trigger reactivity. This approach aligns well with the Command Query Separation (CQS) principle, where commands are responsible for causing side effects, such as state changes, and should not return any data.

By combining the power of Svelte's reactive store system with the principles of OOP and CQS, this solution provides an elegant and maintainable approach to state management in frontend applications.

## Installation

You can install `svelte-reactive-classes` using npm:

`npm install svelte-reactive-classes`

## Usage

### 1. Create your class with methods decorated with `@command`

Create a TypeScript class and decorate the methods that will trigger reactivity with the `@command` decorator. These
methods are considered "commands" in the CQS pattern.

```ts
// Counter.ts
import {command} from "svelte-reactive-classes";

export class Counter {
    count = 0;

    @command
    increase() {
        this.count++;
    }

    @command
    decrease() {
        this.count--;
    }
}
```

### 2. Use the `reactiveInstanceOf` function in your Svelte component

In your Svelte component, import your class and the `reactiveInstanceOf` function. Use the function to create a
reactive instance of your class.

```svelte
<!-- App.svelte -->
<script lang="ts">
  import { Counter } from "./Counter";
  import { reactiveInstanceOf } from "svelte-reactive-classes";

  const count = reactiveInstanceOf(Counter);
</script>
```

### 3. Interact with the reactive class instance in your Svelte markup

You can now use the reactive class instance in your Svelte component's markup. Access properties with the `$` syntax,
and call methods directly.

```svelte
<!-- App.svelte -->
<main>
  <h1>{$count.count}</h1>
  <button on:click={() => count.increase()}>Increase</button>
  <button on:click={() => count.decrease()}>Decrease</button>
</main>
```

## API

### `@command`

A decorator to mark methods as "commands" in the CQS pattern. These methods will trigger reactivity when called.

### `reactiveInstanceOf(ClassConstructor)`

Creates a reactive instance of the given class constructor. The instance will have reactive properties and can be used
in Svelte components with the `$` syntax.

- `ClassConstructor`: The class constructor function.
- Returns: A reactive instance of the class.

## Keywords

-   Svelte
-   Reactive store
-   Object-Oriented Programming (OOP)
-   Encapsulation
-   Command Query Separation (CQS)
-   State management
-   Frontend architecture

## License

MIT License

## Contributing

Contributions are welcome! If you have any questions, suggestions, or issues, please feel free to open a GitHub issue or
submit a pull request.
