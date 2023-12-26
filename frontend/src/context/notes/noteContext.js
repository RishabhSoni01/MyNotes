// consume data 
// we export this to consume the data in other components

import { createContext } from "react";

const noteContext = createContext();

export default noteContext;

// useContext is a hook provided by React that allows components to consume data from a React context. React context provides a way to pass data through the component tree without having to pass props manually at every level. It is useful when you have data that needs to be accessed by multiple components at different levels in the component tree.

// The typical flow for using useContext involves three main steps:

// Create a Context:
// First, you create a context using React.createContext.
// This function returns an object with two components: 
// Provider , Consumer 

// Provide Data:
// You wrap a part of your component tree with the Provider component and pass the data you want to share as a prop to the Provider. The data provided by the Provider will be accessible to all the components that are descendants of it.

// Consume Data:
// To access the data provided by the Provider, components can use the useContext hook. This hook takes the context object as an argument and returns the current context value.