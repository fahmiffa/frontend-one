const API_URL = 'http://localhost:3000/api';
const token = 'mysecrettoken';

// kelas
export const getItems = async () => {
  const response = await fetch(`${API_URL}/kelas`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res.data;
};

export const getItem = async (id: number) => {
  const response = await fetch(`${API_URL}/items/${id}`);
  return response.json();
};

export const createItem = async (item: any) => {
  const response = await fetch(`${API_URL}/kelas`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const updateItem = async (id: number, item: any) => {
  const response = await fetch(`${API_URL}/kelas/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const deleteItem = async (id: number) => {
  const response = await fetch(`${API_URL}/kelas/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

// gelanggang
export const getgeng = async () => {
  const response = await fetch(`${API_URL}/gelanggang`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res.data;
};

export const createGeng = async (item: any) => {
  const response = await fetch(`${API_URL}/gelanggang`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const updateGeng = async (id: number, item: any) => {
  const response = await fetch(`${API_URL}/gelanggang/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const deleteGeng = async (id: number) => {
  const response = await fetch(`${API_URL}/gelanggang/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

// peserta
export const getPeserta = async () => {
  const response = await fetch(`${API_URL}/peserta`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res.data;
};

export const createPeserta = async (item: any) => {
  const response = await fetch(`${API_URL}/peserta`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const updatePeserta = async (id: number, item: any) => {
  const response = await fetch(`${API_URL}/peserta/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const deletePeserta = async (id: number) => {
  const response = await fetch(`${API_URL}/peserta/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

//device
export const getDevice = async () => {
  const response = await fetch(`${API_URL}/device`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res.data;
};

export const deleteDevice = async (id: number) => {
  const response = await fetch(`${API_URL}/device/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const updateDevice = async (id: number, item: any) => {
  const response = await fetch(`${API_URL}/device/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const createDevice = async (item: any) => {
  console.log(item);
  const response = await fetch(`${API_URL}/device`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  console.log(response.json());
  return response.json();
};

// liga
export const getLiga = async () => {
  const response = await fetch(`${API_URL}/liga`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res.data;
};

export const createLiga = async (item: any) => {
  const response = await fetch(`${API_URL}/liga`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const updateLiga = async (id: number, item: any) => {
  const response = await fetch(`${API_URL}/liga/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const deleteLiga = async (id: number) => {
  const response = await fetch(`${API_URL}/liga/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

// head
export const getHead = async () => {
  const response = await fetch(`${API_URL}/head`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res.data;
};

export const createHead = async (item: any) => {
  const response = await fetch(`${API_URL}/head`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const updateHead = async (id: number, item: any) => {
  const response = await fetch(`${API_URL}/head/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

//assign
export const createAssign = async (item: any) => {
  const response = await fetch(`${API_URL}/assign`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const getAssign = async (id: number) => {
  const response = await fetch(`${API_URL}/assign/${id}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const res = await response.json();
  return res.data;
};

//match