import './App.css';
import React, { useEffect, useState } from "react";
import SearchBar from "./component/SearchBar";
import NewsCard from "./component/NewsCard";
import axios from 'axios'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [datas, setDatas] = useState([]);
  //const [State, setState] = useState({ Source: "" });
  const [ Source, setsource ] = useState("");
  const [ result, setResult ] = useState(JSON.parse(localStorage.getItem("category")));


  // useEffect(()=>{
  //   const selectSource =JSON.parse(localStorage.getItem("category"));
  //   setResult(selectSource);
  //   // if(selectSource !== "" ){
  //   //   setResult(JSON.parse(selectSource));
  //   // }
  // },[])


  // Fetching API from "newsapi.org"
  const getNews = () => {
    axios.get("https://newsapi.org/v2/top-headlines/sources?apiKey=ec845e9f56ff48b3a85a6a50a42f433a")
      .then((responce) => {
        console.log(responce.data.sources);
        setDatas(responce.data.sources)
        setIsLoading(false);
      }).catch(error =>{
          alert(error.message);
      })
  }

  //fetch filter


  const handleSubmit = (x) => {
    
    axios.get(`https://newsapi.org/v2/top-headlines/sources?${result}=${x}&apiKey=ec845e9f56ff48b3a85a6a50a42f433a`)
      .then((response) => {
        console.log(`SEARCHED NEWS:----${x}`);
        console.log(`SEARCHED NEWS:----${result}`);
        console.log(response.data.sources);
        setDatas(response.data.sources)
        setsource(x);
        setIsLoading(false);
      })
  }

  //  For Reload Page back to the same location.

  useEffect(()=>{
    const inputSource =JSON.parse(localStorage.getItem("news"));
   // const selectSource =JSON.parse(localStorage.getItem("result"));
    if(inputSource !== "" && result!==null){
      handleSubmit(inputSource);    }
  },[result])

  useEffect(()=>{
    localStorage.setItem("news",JSON.stringify(Source));
    localStorage.setItem("category",JSON.stringify(result));

  },[Source,result]);



  return (
    <>
      <h1 className='heading'>News Application</h1>
      <div className='container my-3'>
        <div className="Main">
          <SearchBar 
               name="Source"
               handleSubmit={handleSubmit} />
        </div>
        <select className="src_type" onChange={(e)=>{
          const selectSource = e.target.value;
          setResult(selectSource);
        }}>
          <option value=""></option>
          <option value="country">Country</option>
          <option value="category">Category</option>
        </select>
        <div>
          <button type="button" className='btn btn-dark' onClick={getNews}>Fetch News</button>
        </div>
      </div>
      <div className='container'>

          <div className='row'>
            {/* <p>{JSON.stringify(data)}</p> */}
            {
              datas ? datas.map(data =>
                <NewsCard
                  data={data} />) : "No Results."}
          </div>
        </div>

    </>

  );
}

export default App;
