import createDataContext from './createDataContext';

const authReducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
	}
};


//signup 
const signup = (dispatch) ={
    return ({email,password})=>{
        // make api request to sigup with email and password

        //if we are signup, modify our state and say we are authenticatedd


        // if sigunup fails , reflect error mesg


    };
};

//signin 
const signin = (dispatch) ={
    return ({email,password})=>{ 
        // make api request to sigin with email and password

        //if we are signin  modify our state and say we are authenticatedd


        // if siguin fails , reflect error mesg


    };
};

//signout
const signout = (dispatch) ={
    return ()=>{
        //signout


    };
};



export const { Provider, Context } = createDataContext(
	authReducer,
	{signin,signout,signup},
	{ isSignedIn: false }
);
