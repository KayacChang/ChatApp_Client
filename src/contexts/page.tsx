import Context from './context'

type State = {
    history: string[]
}

type Action = { type: 'next', page: string } | { type: 'prev' }

function pageReducer(state: State, action: Action) {
    if (action.type === 'next') {
        return { history: [...state.history, action.page] }
    }

    if (action.type === 'prev') {
        return { history: state.history.splice(-1, 1) }
    }

    return state
}

export const {
    Provider: PageContextProvider,
    useState: usePageState,
    useDispatch: usePageDispatch
} = Context<State, Action>(pageReducer)