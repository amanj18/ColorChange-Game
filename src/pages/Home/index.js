import Button from 'components/Button/Button';
import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [noOfBoxes, setNoOfBoxes] = useState(0);
  const [arr, setArr] = useState([]);
  const boxRefs = useRef([]);

  const bgChange = (i) => {
    const box = boxRefs.current[i];
    if (box) {
      box.style.backgroundColor = "blue";
    }
    setArr([...arr, i]);
  };

  const reChange = () => {
    for (let i = arr.length - 1; i >= 0; i--) {
      setTimeout(() => {
        const id = arr[i];
        const box = boxRefs.current[id];
        if (box) {
          box.style.backgroundColor = "red";
        }
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
          <Button
            key={i}
            id={i}
            ref={(el) => (boxRefs.current[i] = el)}
            className="boxes"
            type="submit"
            onClick={() => bgChange(i)}
          />
        ))}
      </div>
    </>
  );
};

export default Home;