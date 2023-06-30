import { useQuery, gql } from '@apollo/client';
import React from 'react';
import { useState } from 'react';

const GET_CONTINENTS= gql`
query getcontinents{
  continents{
    name
    code
    countries {
      name
      code
      currency
      languages{
        name
      }
    }
  }
}
`

const GET_LANGUAGES= gql`
query getlanguages{
  languages{
    code
    name
    native
    rtl
  }
}
`
function ListContinents (){
  // const[continent,setContinents]=useState([])
  const {loading, error, data}=useQuery(GET_CONTINENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
  // setContinents(data)
  return  (
<div>
  
    {data?.continents?.map(({ name, code,countries }) => (
      <div key={code}>
        <h3>{name}</h3>

        <ul>
          {countries &&
              countries.map((c) => {
                return (<li key={c.code}><div>{c.name}</div><div><b>Currency: </b>{c.currency}</div>
                <div><b>Languages spoken: </b><span>
                {c.languages.map((language)=><span> {language.name}  </span>)}
                </span>
                </div>
                </li>
              
                );
              })}
        </ul>
      </div>
    ))}
    </div>
    )
  
  
      
    
  
}

function ListLanguages(){
  const{loading, error, data}=useQuery(GET_LANGUAGES);
  if(loading) return <p>Loading languages...</p>
  if(error) return <p>Error:{error.message}</p>
  console.log(data)

  return(
    <div>
      {data.languages?.map(({name,native,code})=>{
        <div key={code}>
        <p>{name}</p>
       
        </div>
      })}
    </div>
  )
}

export default function App() {
 
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br/>
     
      <ListContinents />
      <br/>
      <ListLanguages/>
    </div>
  );
}




