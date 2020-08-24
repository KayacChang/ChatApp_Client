import Context from './context'

type State = {
    name: string
}

type Action = { type: 'login', name: string } | { type: 'logout' }

function userReducer(state: State, action: Action) {
    if (action.type === 'login') {
        return { ...state, name: action.name }
    }

    if (action.type === 'logout') {
        return { name: '' }
    }

    return state
}

export const {
    Provider: UserContextProvider,
    useState: useUserState,
    useDispatch: useUserDispatch,
} = Context<State, Action>(userReducer)
