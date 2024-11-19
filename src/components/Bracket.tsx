import 'bootstrap/dist/css/bootstrap.min.css';
import '../Match.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setVal } from '../redux/dataSlice';
import { useState } from 'react';
import { createAssign } from '../services/api';

type OptionType = {
  value: string;
  label: string;
};

const Diagram: React.FC = () => {
  const dispatch = useDispatch();

  let val: OptionType[];
  let vals: OptionType[];
  const items = useSelector((state: RootState) => state.data.value);
  const itemId = useSelector((state: RootState) => state.data.valId);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(10);

  val = items.blue;
  vals = items.red;

  const handleshuffle = async () => {
    setIsGenerating(true);
    setCountdown(10);
    const interval = setInterval(() => {
      val = shuffle(items.blue);
      vals = shuffle(items.red);
      dispatch(setVal({ 'blue': val, 'red': vals }));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsGenerating(false);
      clearInterval(countdownInterval);

      handleSubmit();
    }, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          clearInterval(countdownInterval);
        }
        return prevCountdown - 1;
      });
    }, 1000);


  };

  const handleSubmit = async () => {
    const req = {
      "liga": itemId,
      "blue": val,
      "red": vals
    };
    await createAssign(req);

    console.log(req);
  };


  const shuffle = (array: OptionType[]) => {
    const shuffled = array.slice();
    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }
    return shuffled;
  };

  if (val.length == 4) {
    return (
      <div className='container mx-auto d-block'>
        {isGenerating && (
          <div className="overlay">
            <div className="overlay-content">
              {countdown}
            </div>
          </div>
        )}
        <div className='position-relative'>
          {val.map((index, key) => (
            <div className="d-flex justify-content-start align-items-center position-relative mb-3" key={key}>
              <div className="col-3">
                <div className='d-flex justify-content-start align-items-center mb-5'>
                  <div className="border p-3 text-center bg-primary text-white">{index.label}</div>
                </div>
                <div className="vrChild borderU"></div>
              </div>
              <div className="col-3 position-absolute vs">
                <div className='position-relatvie'>
                  <div className='d-flex justify-content-start align-items-center mb-5'>
                    <div className="border p-3 text-center bg-danger text-white">{vals[key].label}</div>
                  </div>
                </div>
              </div>
              <div className='col-2 my-auto position-absolute' style={{ top: '30%', left: '15%' }}>
                <div className="border bg-white p-3 text-center z-1">{String.fromCharCode(key + 65)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="position-absolute borderU" style={{ top: '18%', width: '28%', height: '22%', zIndex: '-2' }}></div>
        <div className="position-absolute borderU" style={{ top: '60%', width: '28%', height: '22%', zIndex: '-2' }}></div>
        <div className='col-2 my-auto position-absolute' style={{ top: '24%', left: '40%' }}>
          <div className="border bg-white p-3 text-center z-1">X</div>
        </div>
        <div className="position-absolute borderU" style={{ top: '28%', left: '37%', width: '23%', height: '43%', zIndex: '-2' }}></div>
        <div className='col-2 my-auto position-absolute' style={{ top: '66%', left: '40%' }}>
          <div className="border bg-white p-3 text-center z-1">Y</div>
        </div>
        <button type="button" onClick={handleshuffle} disabled={isGenerating} className="btn btn-danger floating-btn">
          <i className="bi bi-shuffle"></i>
        </button>
      </div>
    );
  }

};

export default Diagram;
