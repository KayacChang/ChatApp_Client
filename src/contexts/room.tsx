import Context from './context'

type Room = { id: string, title: string, people: number }

type State = {
    rooms: Room[]
}

type Action = { type: 'update', rooms: Room[] }

function roomReducer(state: State, action: Action) {
    if (action.type === 'update') {
        return { ...state, rooms: action.rooms }
    }
    return state
}

export const {
    Provider: RoomContextProvider,
    useState: useRoomState,
    useDispatch: useRoomDispatch
} = Context<State, Action>(roomReducer)