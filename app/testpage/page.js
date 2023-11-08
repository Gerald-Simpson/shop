'use client';

import { useState } from 'react';

export default function Home() {
  const [testState, changeState] = useState('testing');
  const makeApiCall = async () => {
    let data = await fetch('/api/test', { method: 'GET' });
    let testData = await data.json();
    console.log(testData['hi']);
    changeState(testData['hi']);
  };
  let test = 'other test';
  let otherTest = makeApiCall;
  return (
    <div>
      <button onClick={makeApiCall}>make call</button>
      <p>test</p>
      <p>{test}</p>
      <p>{testState}</p>
    </div>
  );
}
