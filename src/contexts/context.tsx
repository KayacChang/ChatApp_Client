import React, { createContext, useReducer, useContext } from 'react'

type Dispatch<A> = (action: A) => void
type Reducer<S, A> = (state: S, action: A) => S
type Props<S> = {
    children: React.ReactNode
    init: S
}

export default function Context<S, A>(reducer: Reducer<S, A>) {
    const StateContext = createContext<S | undefined>(undefined)
    const DispatchContext = createContext<Dispatch<A> | undefined>(undefined)

    function Provider({ children, init }: Props<S>) {
        const [state, dispatch] = useReducer(reducer, init)
        return (
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    {children}
                </DispatchContext.Provider>
            </StateContext.Provider>
        )
    }

    function useState() {
        const context = useContext(StateContext)
        if (context === undefined) {
            throw new Error(`must be used within a ContextProvider`)
        }
        return context
    }

    function useDispatch() {
        const context = useContext(DispatchContext)
        if (context === undefined) {
            throw new Error(`must be used within a ContextProvider`)
        }
        return context
    }

    return { Provider, useState, useDispatch }
}
