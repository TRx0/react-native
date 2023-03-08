import {auth, storage } from "../../firebase/config"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer"

const { updateUserProfile, authStateChange , authSignOut} = authSlice.actions;

export const authSighUpUser = ({email, password,nickname }) => async (dispatch, getState) => {
    createUserWithEmailAndPassword(auth, email, password)
  .then(() => {
        updateProfile(auth.currentUser, {
          displayName: nickname,
          //photoURL: avatar,
        
        })
          .then(() => {
            const { uid, displayName, email } = auth.currentUser;
            dispatch(
              updateUserProfile({
                userId: uid,
                nickname: displayName,
                email: email,
                // avatar: photoURL,
              })
            );
          })
          .catch((error) => {
            console.error("error.code", error.code);
            console.error("error.message", error.message);
          });
      })
      .catch((error) => {
        console.error("error.code", error.code);
        console.error("error.message", error.message);
      });
}

export const authSighInUser = ({email,password} ) => async (dispatch, getState) => { 
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
  });
}

export const authSighOutUser = () => async (dispatch, getState) => {
     signOut(auth)
    .then(() => {
      dispatch(authSignOut());
    })
    .catch((error) => {
      console.error("error.code", error.code);
      console.error("error.message", error.message);
    }); 
}

export const authStateChangeUser = () => async (dispatсh, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
        dispatсh(
        updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
          email: user.email,
        })   
        )
         dispatсh(authStateChange({ stateChange: true }));
    } else {
      console.error("error.code", error.code);
      console.error("error.message", error.message);
    }
  });
};