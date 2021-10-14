
const FILTER_OPEN = 'FILTER_OPEN'
const FILTER_CLOSE = 'FILTER_CLOSE'

export const openFilter = () => async(dispatch)=>{
    console.log('filter opened')
    dispatch({
        type:FILTER_OPEN,
        payload: true
    })
   

}

export const closeFilter = () =>async(dispatch)=>{
    console.log('filter closed')
    dispatch({
        type:FILTER_CLOSE,
        payload:false
    })

}

