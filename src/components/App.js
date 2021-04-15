import React from 'react'
import AddMovie from'./AddMovie';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import axios from 'axios'
import EditMovie from'./EditMovie'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import addMovie from './AddMovie';
  
class App extends React.Component{
state={
    movies:[],
searchQuery:""
}

async componentDidMount(){
    const response=await axios.get("http://localhost:3002/movies");

    this.setState({movies:response.data});

}

/* burda clickten yakaladigimiz idli filmi siliyoruz ve yeni listeyi onsuz olusturuyoruz this state ile de var olan dizinin yerine o diziyi koyuyuoruz */

 deleteMovie=async(movie)=>{
     const baseURL='http://localhost:3002/movies/${movie.id}'
     await  fetch(baseURL,{method:"DELETE"})
const newMovieList=this.state.movies.filter(m=>m.id!==movie.id);
this.setState(state=>({
movies:newMovieList
}))
 
 }
searchMovie=(event)=>{this.setState({searchQuery:event.target.value})}

addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie)
    this.setState(state => ({
        movies: state.movies.concat([movie])
    }))
}

render() {

    let filteredMovies=this.state.movies.filter(
    (movie)=>{
        return movie.name.indexOf(this.state.searchQuery)!==-1
    }
).sort((a,b)=>{
    return a.id<b.id ? 1:a.id>b.id ? -1:0;
});

        return(
         
            <Router>

            
            <div  className="container">
              <Switch>
                <Route path="/" exact render={()=>(
                <React.Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                
                </div>
                <MovieList
                movies={filteredMovies}
                deleteMovieProp={this.deleteMovie}
                />
                </React.Fragment>
                )}> 
                
             
                </Route>
               
                <Route path="/add" render={({history})=>(
<AddMovie
onAddMovie={(movie)=>{this.addMovie(movie)
    history.push("/")
}
}
/>


                )}></Route>
                
                {/* bu route edit alani icin  */}
                <Route path="/edit/:id" component={EditMovie}/>
                
                
                </Switch>
                </div>
            

            
            </Router>
           
        )
    }
}
export default App;
