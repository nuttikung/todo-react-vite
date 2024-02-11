# React + TypeScript + Vite

This is TodoList from React,Typescript, Vite and Styled Component.

The functionalities are Add, Update, Delete, Mark as Complete/Incomplete and Showing the progress.

## Tech Stack
- React
- Typescript
- Vite
- Styled Component
- Axios
- Normalize (CSS Reset)
- Biome (formatter, linter)
- Vitest, Jest, React testing lib (Test)

## Todo
- [ ] Add Unit Test (Context, App.ts)
- [ ] Refactoring Global style to theme
- [ ] Refactor by search TODO:
- [ ] Refactor Popover component
- [ ] Add storybook
- [ ] Move axios to new directory aka. api
- [ ] Support component width

## Code Standard
- Component
  ```ts
    // Do not use export default as a module.
    export const MyComponent = () => {

    }
    /** or */
    const MyComponent = () => {

    }
    export { MyComponent }
  ```