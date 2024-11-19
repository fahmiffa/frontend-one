import React, { useEffect, useState } from 'react';
import { createPeserta, deletePeserta, getPeserta, updatePeserta } from '../services/api';

const Peserta: React.FC = () => {
  const [name, setName] = useState('');
  const [kontingen, setKontingen] = useState('');
  const [bb, setBB] = useState('');
  const [gender, setGender] = useState('');
  const [id, setId] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [ShowData, setData] = useState<boolean>(false);
  const [ShowEdit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setGender(value);
  };

  const fetchData = async () => {
    getPeserta().then(data => setItems(data));
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
        name,
        bb,
        gender,
        kontingen
      };
      const ids = parseInt(id);
      await updatePeserta(ids, payload);
    }
    else {
      payload = {
        name,
        bb,
        gender,
        kontingen
      };
      await createPeserta(payload);
    }
    fetchData();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this ?');
    if (confirmed) {
      await deletePeserta(id);
      fetchData();
    }

  };

  const handleEdit = async (id: number) => {
    setEdit(true);
    const val = items.filter(item => item.id === id);
    setId(val[0].id);
    setName(val[0].name);
    setBB(val[0].bb);
    setKontingen(val[0].kontingen);
    setGender(val[0].gender);
    setData(false);
  };

  if (ShowData) {
    return (
      <div>
        <div className='container my-5'>
          <div className='d-flex mb-3 justify-content-start'>
            <div className='h5 me-3'>Peserta</div>
            <button className="btn btn-primary btn-sm" onClick={() => addData()}><i className='bi bi-plus'></i> Tambah</button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Kontingen</th>
                  <th>Berat Badan</th>
                  <th>Jenis Kelamin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.label}</td>
                    <td>{item.kontingen}</td>
                    <td>{item.bb}</td>
                    <td>{item.gender == 1 ? 'Pria' : 'Wanita'}</td>
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
            <div className='row mb-3'>
              <div className='col-6'>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nama</label>
                  <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              </div>
              <div className='col-6'>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Kontingen</label>
                  <input type="text" id="name" className="form-control" value={kontingen} onChange={(e) => setKontingen(e.target.value)} required />
                </div>
              </div>
            </div>
            <div className='row mb-3'>
              <div className='col-6'>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Berat Badan</label>
                  <input type="number" id="name" className="form-control" value={bb} onChange={(e) => setBB(e.target.value)} required />
                </div>
              </div>
              <div className='col-6'>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Gender</label>
                  <select
                    id="type"
                    name="type"
                    className="form-select"
                    value={gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih TIpe</option>
                    <option value="1">Pria</option>
                    <option value="2">Wanita</option>        
                  </select>
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

export default Peserta;
