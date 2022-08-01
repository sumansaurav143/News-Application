import React from "react";


function NewsCard(props){
    // const {
    //     key,
    //     data
    // } = props;

    return (
         <div className='col-3' key={props.data.id}>
             <div className="card">
                 <div className="card-body">
                     <h5 className="card-title">{props.data.name}</h5>
                     <p className="card-text">{props.data.description}</p>
                    <a href={props.data.url} className="btn btn-primary">View</a>
                </div>
            </div>
         </div>
    )
};

export default NewsCard;