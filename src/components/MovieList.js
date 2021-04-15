import React from'react';
import {Link} from 'react-router-dom';
const MovieList =(props)=>{
    const truncateOverview=(string,maxLength)=>{
        if(!string) return null;
        if(string.length<=maxLength) return string;
        return `${string.substring(0,maxLength)}...`;
    }



        return(
<div className="row">
    {/*  app js dosyasinda statteden aldigimiz ozellikler array fakat burda map fonksiyonu ile tek tek alicaz  */}
{props.movies.map((movie,i)=>(
 
<div className="col-lg-4" key={i}>
        <div className="card mb-4 shadow-sm">
            <img src={movie.imageURL} className="card-img-top" alt="Sample Movie"></img>
            <div className="card-body">
            <h5 className="card-title">{movie.name}</h5>
            <p className="card-text">{truncateOverview(movie.overview,50)}</p>
            <div className="d-flex justify-content-between align-items-center">
                <button onClick={(event)=>props.deleteMovieProp(movie)} type="button"  className="btn btn-md btn-outline-danger">delete</button>
             <Link type="button"className="btn btn-outline-primary"to={`edit/${movie.id}`}>edit</Link>
             
                <h2><span className="badge badge-info">{movie.rating}</span></h2>
            </div>
        </div>
        </div>
    </div>)  )}

    
</div>
        ) 
}
export default MovieList;