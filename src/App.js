import React, { useState, useEffect } from "react";
 
// icon from react-icon library 
import { FaAngleDoubleRight, FaIgloo } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
function App() {
  // its loading animation always use to confirm
  const [loading, setLoading] = useState(true);

  // it contains all the data that is fetched
  const [jobs, setJobs] = useState([]);

  //it will be used to fetch each value from data tograb property in it.
  const [value, setValue] = useState(0);


  //fetching data from API
  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };


  //what to do after rendering
  useEffect(() => {
    fetchJobs();
  }, []);



  //Loading  effect
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading.....</h1>
      </section>
    );
  }
  


//value is a state value initial 0
  const { company, dates, duties, title } = jobs[value];
   console.log(company,dates,duties,title)

  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* button container its for every job it has in API   */}

        <div className="btn-container">
          {
            jobs.map((item,index)=>{
              // grabbing the state value==to index as item has different index value
              return <button key={item.id} onClick={()=>setValue(index)}
              className={`job-btn ${index===value && 'active-btn'}`}

              //here the active-btn is for it tells by hovering that onwhich page(button) you are  underlined light blue
              //if index of the button matches current state value than show underline
              >
                {item.company}
              </button>
            })
          }
        </div>


        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>

          {/* here we are using map because duties is an array in API so to display data in arrayin javascript, REACT we use map funtion */}
          {duties.map((duty, index) => {
            return (
              <div className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
