import React, { useState } from "react";
import '../App.css';

const SearchBar = ({handleSubmit}) => {

    const search=(event)=>{
        event.preventDefault();
        console.log("searching....")
        handleSubmit(searchby);
    }


    const [searchby,setsearchby]=useState();
   
    return (
        <form className="Search-Input" onSubmit={search}>
            <input 
                value={searchby}
                className="form-control"
                placeholder="Search News"
                name="value"
                // disabled={isLoading}
                onChange={(event) => setsearchby(event.target.value)}
            />   
        </form>
    )
};

export default SearchBar;