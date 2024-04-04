const IntialState={
    username:""
}

const reducer=(state=IntialState,action)=>{
    console.log(state);
    if(action?.type==="UpdateUser"){
        return {
            ...state,["username"]:action.payload
        }
    }
    else{
        return state;
    }
}
export default reducer