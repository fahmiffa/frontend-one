import React, { useEffect, useState } from 'react';
import { createItem, deleteItem, getItems, updateItem } from '../services/api';

const Kelas: React.FC = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [ShowData, setData] = useState<boolean>(false);
  const [ShowEdit, setEdit] = useState<boolean>(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    getItems().then(data => setItems(data));
    setData(true);
    setEdit(false);
  };

  const addData = async () => {
    setData(false);
  };

  const handleSubmit = async () => {
    let payload;
    if (ShowEdit) {
      payload = {
        id,
        name
      };
      const ids = parseInt(id);
      await updateItem(ids, payload);
    }
    else {
      payload = {
        name
      };
      await createItem(payload);
    }
    fetchData();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this ?');
    if (confirmed) {
      await deleteItem(id);
      fetchData();
    }

  };

  const handleEdit = async (id: number) => {
    setEdit(true);
    const val = items.filter(item => item.id === id);
    setId(val[0].id);
    setName(val[0].name);
    setData(false);
  };

  if (ShowData) {
    return (
      <div>
        <div className='container my-5'>
          <div className='d-flex mb-3 justify-content-start'>
            <div className='h5 me-3' >Kelas</div>
            <button className="btn btn-primary btn-sm" onClick={() => addData()}><i className='bi bi-plus'></i> Tambah</button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm me-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className='bi bi-trash'></i>
                      </button>

                      <button
                        className="btn btn-primary btn-sm me-1"
                        onClick={() => handleEdit(item.id)}
                      >
                        <i className='bi bi-pencil'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <div className="container my-5">
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-6 mb-3'>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nama</label>
                  <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              </div>
            </div>
            <div className='d-flex jusitfy-content-start'>
              <button type="submit" className="btn btn-primary btn-sm me-1"><i className='bi bi-save'></i> Save</button>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => setData(true)}><i className='bi bi-arrow-left'></i> Back</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default Kelas;
