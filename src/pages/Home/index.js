import Button from 'components/Button/Button';
import React , {useState , useEffect} from 'react';

const Home = () => {

  const [noOfBoxes, setNoOfBoxes] = useState(0);
  const [arr, setArr] = useState([]);

  
  const bgChange = (e) => {
    const id = e.target.id;
    const box = document.getElementById(id);
    box.style.backgroundColor = "blue";
    setArr([...arr, id]); 
  }
  
  const reChange = () => {
    for (let i = arr.length - 1; i >= 0; i--) {
      setTimeout(() => {
        const id = arr[i].toString();
        const box = document.getElementById(id);
        box.style.backgroundColor = "red";
      }, (arr.length - 1 - i) * 1500); 
    }
  };
  
  useEffect(() => {
    if (arr.length == noOfBoxes && noOfBoxes > 0) {
      setTimeout(() => {
        reChange();
      }, 1000);
    }
  }, [arr, noOfBoxes]);



  return (
    <>
      <h1>Enter no. of boxes</h1>
      <input type="number" value={noOfBoxes} onChange={(e) => { setNoOfBoxes(e.target.value) }} />

      <div className="container">
          {Array.from({ length: noOfBoxes }, (_, i) => (
            <Button id={i} key={i} className="boxes" type="submit" onclick={bgChange} />
          ))}
      </div>
    </>
  
  );
};

export default Home;
