const storage = [
  {
    name: "Campaign1",
    status: "active",
    budget: 1000.00,
  }, 
  {
    name: "Campaign2",
    status: "paused",
    budget: 326.00,
  }, 
  {
    name: "Campaign3",
    status: "active",
    budget: 435.62,
  }, 
  {
    name: "Campaign4",
    status: "active",
    budget: 16000.00,
  }
];

const setInitialState = () => {

  localStorage.clear();
  localStorage.setItem('storage', JSON.stringify(storage));
  sessionStorage.setItem('sessionId', 1234);
}

const getData = (sessionId) => {

  if (sessionId === 1234) {

    const data = localStorage.getItem('storage');
    
    return {
      status: 200,
      message: 'Data fetched successfully',
      data,
    }
  } else {
    return {
      status: 400,
      message: 'Bad request! Incorrect sessionId',
    }
  }
}

const addToStorage = (payload) => {

  const {name, status, budget} = payload;

  if (name !== '' && status !== 'status' && budget > 0) {
    
    storage.push(payload);
    setInitialState();

    return {
      status: 200,
      message: 'Campaign added successfully',
    };
  }

  return {
    status: 400,
    message: 'Bad request! All inputs need to be filled.',
  };
}

const editStorageElement = (index, payload) => {

  const {name, status, budget} = payload;
  
  if(name !== '' && status !== 'status' && budget > 0) {
    
    storage[index] = payload;
    setInitialState();

    return {
      status: 200,
      message: 'Campaign edited successfully',
    };
  }

  return {
    status: 400,
    message: 'Bad request! All inputs need to be filled.',
  };
}

setInitialState();

export {
  getData,
  addToStorage,
  editStorageElement,
}
