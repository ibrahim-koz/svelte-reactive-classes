# svelte-reactive-classes

`svelte-reactive-classes` is a convenient and lightweight library that allows you to create reactive class instances
with encapsulation in your Svelte applications. The library provides an easy way to convert your classes into Svelte
stores on the fly, while removing the `update` and `set` functions to improve encapsulation. It also supports the CQS (
Command Query Separation) pattern through the `@command` decorator.

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
    increment() {
        this.count++;
    }

    @command
    decrement() {
        this.count--;
    }
}
```

### 2. Use the `createReactiveInstanceOf` function in your Svelte component

In your Svelte component, import your class and the `createReactiveInstanceOf` function. Use the function to create a
reactive instance of your class.

```svelte
<!-- App.svelte -->
<script lang="ts">
  import { Counter } from "./Counter";
  import { createReactiveInstanceOf } from "svelte-reactive-classes";

  const count = createReactiveInstanceOf(Counter);
</script>
```

### 3. Interact with the reactive class instance in your Svelte markup

You can now use the reactive class instance in your Svelte component's markup. Access properties with the `$` syntax,
and call methods directly.

```svelte
<!-- App.svelte -->
<main>
  <h1>{$count.count}</h1>
  <button on:click={() => count.increment()}>Increase</button>
  <button on:click={() => count.decrement()}>Decrease</button>
</main>
```

## API

### `@command`

A decorator to mark methods as "commands" in the CQS pattern. These methods will trigger reactivity when called.

### `createReactiveInstanceOf(ClassConstructor)`

Creates a reactive instance of the given class constructor. The instance will have reactive properties and can be used
in Svelte components with the `$` syntax.

- `ClassConstructor`: The class constructor function.
- Returns: A reactive instance of the class.

## License

MIT License

## Contributing

Contributions are welcome! If you have any questions, suggestions, or issues, please feel free to open a GitHub issue or
submit a pull request.