"use strict"

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BasicCreateUser from 'components/BasicCreateUser'
// class Home extends React.Component {
//     // idea here is that user would log in, which would then go to the /:schoolid/MainPortal link
//     // if log in is successful
//     state = {
//         username: 'jfong'
//     } 
    
//     handleChange = (event) => {
//         const {value} = event.target
//         this.setState({
//             username: value
//         })
//     }

//     basicLogInWithNoBackEnd() {
//         const {username} = this.state
//         return (
//             <div className='basicLogin'>
//                 Basic Login
//                 <div>
//                     <label>username:</label>
//                     <select value={username} onChange={this.handleChange}>
//                         <option value='jfong'>Jason Fong</option>
//                         <option value="rySayoc">Raymond Young</option>
//                         <option value="plYMA">Philip Ly</option>
//                         <option value="jfSayoc">Jason Sayoc Only</option>
//                         <option value="jfBMMA">Jason BMMA</option>
//                     </select>
//                     <Link to={`/${username}/MainPortal`}>
//                         <button>
//                             Login
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//         )
//     }
    
   

//     handleLogin() {

//     }
//     basicRealLogIn() {
//         return (
//             <form onSubmit={this.handleLogin}>

//             </form>
//         )
//     }
//     render() {
//         // console.log("Home", this.props);
//         return (
//             <div>
//                 <div className="Home">
//                     <header className="Home-header">
//                        {this.basicLogInWithNoBackEnd()} 

                        
//                     </header>
//                 </div>
//             </div>
//         )
//     }
// }
function Home() {
    return (
        <main>
            <Switch>
                <Route exact path = '/' component={BasicCreateUser}/>
                {/* <Route path='/login' component={Login}/> */}
                <Route render= {props => (<div>Snooping around? How'd you get here</div>)}/>
            </Switch>
        </main>   
    )
}
export default Home 