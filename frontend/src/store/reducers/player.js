const initialState = {
  currentSong: null,
  isPlaying: false,
  playlist: [],
  currentIndex: 0
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SONG':
      return {
        ...state,
        currentSong: action.payload
      };
    case 'SET_PLAYLIST':
      return {
        ...state,
        playlist: action.payload
      };
    case 'PLAY':
      return {
        ...state,
        isPlaying: true
      };
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false
      };
    default:
      return state;
  }
};

export default playerReducer;
