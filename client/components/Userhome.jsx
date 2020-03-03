import React from "react";

function Userhome(props){
    return(
        <div>
            <h2>Welcome {props.user.username}</h2>
            <img src="upload/profileImage-1583241857025.jpg" alt="profilepic"/>
            {
                props.user.intrests.map(intrest => {
                    return (
                        <button>{intrest}</button>
                    )
                })
            }
        </div>
    )
}

export default Userhome;