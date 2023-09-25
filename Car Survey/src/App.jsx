import { useState, useEffect } from "react";
import data from "../data";
import "./App.css";

function FinalDataComp({answers}){
  let finalData = [
    { brand: "BMW X5", score: 0, img:"https://carsales.pxcrush.net/carsales//cars/private/54z00y9abqw54qk227usj57hu.jpg?pxc_method=gravityfill&pxc_bgtype=self&pxc_size=720,480", link:"https://en.wikipedia.org/wiki/BMW_X5_(E53)", 
desc:{year: 1995,
   transmition: "Manual",
    family: "Yes",
    electric: "No",
    fuel: "High",
    type: "SUV"} },
    { brand: "Daewoo Tico", score: 0, img:"https://blenderartists.org/uploads/default/optimized/4X/2/c/2/2c23558be18af8c2883dd8f3cee9be410e855615_2_1024x576.jpeg", link:"https://en.wikipedia.org/wiki/Daewoo_Tico", 
    desc:{year: 1998,
    transmition: "Manual",
     family: "No",
     electric: "No",
     fuel: "Low",
     type: "Hatchback"} },
    { brand: "Mercedes C200", score: 0, img:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Mercedes-Benz_C_200_CDI_BlueEFFICIENCY_Elegance_%28W_204%29_%E2%80%93_Frontansicht%2C_13._Mai_2011%2C_Velbert.jpg/1200px-Mercedes-Benz_C_200_CDI_BlueEFFICIENCY_Elegance_%28W_204%29_%E2%80%93_Frontansicht%2C_13._Mai_2011%2C_Velbert.jpg", link:"https://en.wikipedia.org/wiki/Mercedes-Benz_C-Class",
    desc:{year: 2008,
    transmition: "Manual",
     family: "Yes",
     electric: "No",
     fuel: "Medium",
     type: "Sedan"} },
    { brand: "Toyota CHR", score: 0, img:"https://upload.wikimedia.org/wikipedia/commons/e/e0/Toyota_C-HR_Hybrid_2017_%28cropped%29.jpg", link:"https://en.wikipedia.org/wiki/Toyota_C-HR", 
    desc:{year: 2020,
    transmition: "Automatic",
     family: "No",
     electric: "Hybrid",
     fuel: "Low",
     type: "Crossover"} },
    { brand: "Tesla Model S", score: 0, img:"https://images.prismic.io/carwow/a0b54c70-b58c-482c-8d28-b72884380e42_2023+Tesla+Model+S+front+quarter+static.jpg?fit=clip&q=60&w=750&cs=tinysrgb&auto=format", link:"https://en.wikipedia.org/wiki/Tesla_Model_S",
    desc:{year: 2020,
    transmition: "Automatic",
     family: "Yes",
     electric: "Yes",
     fuel: "Low",
     type: "Sport"} },
    { brand: "Porsche 911", score: 0, img:"https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/01-porsche-911-turbo-rt-2022-hero-track.jpg?itok=JCEypwNU", link:"https://en.wikipedia.org/wiki/Porsche_911", 
    desc:{year: 2016,
    transmition: "Manual",
     family: "No",
     electric: "Hybrid",
     fuel: "High",
     type: "Sport"} },
  ];
  for (const [key, value] of Object.entries(answers)) {
    console.log(`${key}: ` + JSON.stringify(value));
    const data = JSON.parse(JSON.stringify(value));
    data.brands.forEach((res) => {
      finalData.map((final) => {
        if(final.brand == res.brand){
          console.log(final.brand, res.brand)
          return final.score = final.score + res.score
        }
      });
    });
  }
  
  finalData = finalData.sort((a,b)=> b.score - a.score)
  console.log('finalDataSorted', finalData);
  return(
  <>
  <div className="d-flex gap-2">
    {finalData.map(car=>(
      <div className="card">
        <div className="">
          <h3>{car.brand}</h3>
          <img width={250} src={car.img} alt="" srcset="" />
          <h4 className="mt-3">Percentage of this brand fitting your answers: <br></br> {Math.floor(car.score / 600 * 100)}%</h4>
          <h3>Description:</h3>
          <p>Year: {car.desc.year}</p>
          <p>Transmition: {car.desc.transmition}</p>
          <p> Family car: {car.desc.family}</p>
          <p> Electric: {car.desc.electric}</p>
          <p>Fuel consumption: {car.desc.fuel}</p>
          <p>Type:  {car.desc.type}</p>
          <a href={car.link}>Read More</a>
        </div>
      </div>
    ))}
  </div>
  </>
  )
}

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    let shuldAllPass = true
    console.log(Array.from(6));
    [0, 1, 2, 3, 4, 5, 6].some((i) => {
      if (!answers[i]) {
        handleNext(i);
        shuldAllPass = false
        return true;
      }
    });
    setShowResult(shuldAllPass)
  };
  const [checked, setChecked] = useState([]);
  const [answers, setAnswer] = useState([]);
  const [showResult, setShowResult] = useState(false)
  const handleAnswer = (e) => {
    setAnswer((prevState) => ({
      ...prevState,
      [e.target.name]: data[e.target.name].answers.find(
        (car) => car.ans == e.target.value
      ),
    }));

    setChecked((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };
  const handleNext = (index) => {
    document
      .getElementById(index)
      .scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
  };
  // useEffect(() => {
  //   console.log(answers);
  // }, [answers]);
  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      {data.map((q, index) => (
        <div id={index} className="full">
          <h1 className="title">{index + 1 + ". " + q.question}</h1>

          {q.answers.map((a) => (
            <>
              <label htmlFor={a.ans}>{a.ans}</label>
              <input
                type="checkbox"
                onChange={handleAnswer}
                name={index}
                checked={checked[index] == a.ans}
                value={a.ans}
                id={a.ans}
              />
            </>
          ))}
          <button className="btn btn-primary" onClick={() => handleNext(index + 1)}>Next</button>
        </div>
      ))}
      <button className="mb-10" style={{marginBottom: "20px"}} onClick={handleSubmit} type="submit">
        Get the answer
      </button>
      {/* </form> */}
      {showResult && <FinalDataComp answers={answers}></FinalDataComp>}
      
    </>
  );
}


export default App;
