import { useEffect } from 'react';
import {
  // decrment,
  // incrementByAmount,
  // increment,
  incrementAsync,
} from '../../../state/counter/counterSlice';
import { AppDispatch, RootState } from '../../../state/store';
import { useDispatch, useSelector } from 'react-redux';

export default function Overview() {
  const counter = useSelector((state: RootState) => state.counter.value);
  const loading = useSelector((state: RootState) => state.counter.loading);
  const data = useSelector((state: RootState) => state.counter.data);

  console.log(loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(incrementAsync());
  }, []);

  return (
    <div>
      <div>
        {loading ? (
          <h1>loading....</h1>
        ) : (
          data.map((user, index) => <h4 key={index}>{user.name}</h4>)
        )}

        {/* <button onClick={() => dispatch(incrementByAmount(10))}>+</button> */}
        {/* <button onClick={() => dispatch(increment())}>-</button> */}
        {/* <button onClick={() => dispatch(incrementAsync(10))}>Asun +</button> */}
      </div>
    </div>
  );
}
