import React,{useContext} from "react"
import { useDispatch } from 'react-redux'
import * as types from '../redux/constants/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecordVinyl, faPlay, faStop, faEraser } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from 'styled-components';


function RecordingButtons() {
    const dispatch = useDispatch();
    const themeContext = useContext(ThemeContext);
    
    return <React.Fragment>
        <div><FontAwesomeIcon title="Record" data-testid="recording" icon={faRecordVinyl} color={themeContext.icon.color} onClick={() => { dispatch({ type: types.IS_RECORDING, is_recording: true }); sessionStorage.setItem('Recording', true) }} cursor={'pointer'}>Record</FontAwesomeIcon></div>
        <div> <FontAwesomeIcon title="Play" data-testid="play" icon={faPlay} color={themeContext.icon.color} onClick={() => play_actions(dispatch)} cursor={'pointer'}>Play</FontAwesomeIcon></div>
        <div><FontAwesomeIcon title="Stop" data-testid="stop" icon={faStop} color={themeContext.icon.color} onClick={() => { dispatch({ type: types.IS_RECORDING, is_recording: false }); sessionStorage.setItem('Recording', false) }} cursor={'pointer'}>Stop</FontAwesomeIcon></div>
        <div><FontAwesomeIcon title="Clear" icon={faEraser} color={themeContext.icon.color} onClick={() => sessionStorage.removeItem('action_list')} cursor={'pointer'}>Clear</FontAwesomeIcon></div>
    </React.Fragment>
}

async function play_actions(dispatch) {
    let actions = JSON.parse(sessionStorage.getItem('action_list'));
    let is_recording_in_session = sessionStorage.getItem('Recording') === 'true'
    if (actions && actions.length > 0) {
        dispatch({ type: types.CLEAR_TODOS })
        dispatch({ type: types.IS_RECORDING, is_recording: false })
        dispatch({ type: types.IS_PLAYING, is_playing: true })
        if (is_recording_in_session)
            sessionStorage.setItem('Recording', false)
        for (let action of actions) {
            await delay(1000);
            dispatch(action);
        }
        dispatch({ type: types.IS_PLAYING, is_playing: false })
        if (is_recording_in_session) {
            sessionStorage.setItem('Recording', true)
            dispatch({ type: types.IS_RECORDING, is_recording: is_recording_in_session })
        }
    }

}

function delay(t) {
    return new Promise((resolve) => setTimeout(resolve, t))
}




export default RecordingButtons