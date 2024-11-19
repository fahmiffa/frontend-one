import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { createHead, getHead, deleteItem, getItems, getLiga, getPeserta, updateHead, getAssign } from '../services/api';
import Diagram from './Bracket';
import { useDispatch } from 'react-redux';
import { setVal, SetId } from '../redux/dataSlice';

type OptionType = {
  value: string;
  label: string;
};

interface User {
  name: string;
}

interface Join {
  id: number;
  peserta: number;
  sudut: number;
  user: User;
}

interface Liga {
  id: number;
  name: string;
}

interface DataItem {
  id: number;
  kelas: Liga;
  join: Join[];
  liga: Liga;
}

const Head: React.FC = () => {
  const [selectedRed, setSelectedRed] = useState<MultiValue<OptionType>>([]);
  const [selectedBlue, setSelectedBlue] = useState<MultiValue<OptionType>>([]);
  const [kelas, setKelas] = useState('');
  const [liga, setLiga] = useState('');
  const [itemsKelas, setItemsKelas] = useState<any[]>([]);
  const [itemsLiga, setItemLiga] = useState<any[]>([]);
  const [itemsPeserta, setItemPeserta] = useState<any[]>([]);
  const [id, setId] = useState('');
  const [items, setItems] = useState<DataItem[]>([]);
  const [ShowData, setData] = useState<boolean>(false);
  const [ShowForm, setForm] = useState<boolean>(false);
  const [ShowEdit, setEdit] = useState<boolean>(false);
  const [ShowDiagram, setDiagram] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeRed = (selected: MultiValue<OptionType>) => {
    setSelectedRed(selected);
  };

  const handleChangeBlue = (selected: MultiValue<OptionType>) => {
    setSelectedBlue(selected);
  };

  const fetchKelas = async () => {
    getItems().then(data => setItemsKelas(data));
  };

  const fetchLiga = async () => {
    getLiga().then(data => setItemLiga(data));
  };

  const fetchData = async () => {
    getHead().then(data => setItems(data));
    setData(true);
    setEdit(false);
  };

  const fetchPeserta = async () => {
    getPeserta().then(data => setItemPeserta(data));
  };

  const addData = async () => {
    fetchPeserta();
    fetchLiga();
    fetchKelas();
    setData(false);
    setForm(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload;
    if (ShowEdit) {
      payload = {
        liga,
        kelas,
        red: selectedRed,
        blue: selectedBlue
      };
      const ids = parseInt(id);
      await updateHead(ids, payload);
    }
    else {
      payload = {
        liga,
        kelas,
        red: selectedRed,
        blue: selectedBlue
      };
      await createHead(payload);
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
    fetchPeserta();
    fetchLiga();
    fetchKelas();
    setEdit(true);
    setForm(true);
    const val = items.filter(item => item.id === id);
    console.log(val);
    setId(val[0].id.toString());
    setLiga(val[0].liga.id.toString());
    setKelas(val[0].kelas.id.toString());
    setData(false);
    const valBLue = val[0].join.filter(j => j.sudut == 1)
      .map(item => ({ 'label': item.user.name, 'value': item.peserta.toString() }));
    setSelectedBlue(valBLue);
    const valRed = val[0].join.filter(j => j.sudut == 2)
      .map(item => ({ 'label': item.user.name, 'value': item.peserta.toString() }));
    setSelectedRed(valRed);
  };

  const handleDiagaram = async (id: number) => {    
    fetchData();
    console.log(items);
    const val = items.filter(item => item.id === id);
    const valBLue = val[0].join.filter(j => j.sudut == 1)
    .map(item => ({ 'label': item.user.name, 'value': item.peserta.toString() }));
    const valRed = val[0].join.filter(j => j.sudut == 2)
    .map(item => ({ 'label': item.user.name, 'value': item.peserta.toString() }));
    setData(false);
    setForm(false);
    setEdit(false);
    setDiagram(true);
    dispatch(SetId(id));
    getAssign(id).then(val => {
      if(val.blue.length > 0 && val.red.length > 0)
      {
        dispatch(setVal({ 'blue': val.blue, 'red': val.red }));     
      }
      else
      {
        dispatch(setVal({ 'blue': valBLue, 'red': valRed }));
      }

    })
  };


  if (ShowData) {
    return (
      <div>
        <div className='container my-5'>
          <div className='d-flex mb-3 justify-content-start'>
            <div className='h5 me-3' >Liga</div>
            <button className="btn btn-primary btn-sm" onClick={() => addData()}><i className='bi bi-plus'></i> Tambah</button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Liga</th>
                  <th>Kelas</th>
                  <th>Biru</th>
                  <th>Merah</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.liga.name}</td>
                    <td>{item.kelas.name}</td>
                    <td>
                      {item.join.filter(j => j.sudut === 1).map(j => (
                        <div key={j.id}>
                          <p>{j.user.name}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {item.join.filter(j => j.sudut === 2).map(j => (
                        <div key={j.id}>
                          <p>{j.user.name}</p>
                        </div>
                      ))}
                    </td>
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

                      <button
                        className="btn btn-primary btn-sm me-1"
                        onClick={() => handleDiagaram(item.id)}
                      >
                        <i className='bi bi-diagram-3-fill'></i>
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

  if (ShowForm) {
    return (
      <div>
        <div className="container my-5">
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-6 mb-3'>
                <div className="form-group">
                  <label htmlFor="name" className="form-label fw-bold">Liga</label>
                  <select
                    name="liga"
                    className="form-select"
                    value={liga}
                    onChange={(e) => setLiga(e.target.value)}
                    required
                  >
                    <option value="">Pilih</option>
                    {itemsLiga.map((item, index) => (
                      <option key={index} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-6 mb-3'>
                <div className="form-group">
                  <label htmlFor="name" className="form-label fw-bold">Kelas</label>
                  <select
                    name="kelas"
                    className="form-select"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    required
                  >
                    <option value="">Pilih</option>
                    {itemsKelas.map((item, index) => (
                      <option key={index} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-6 mb-3'>
                <label htmlFor="blue" className="form-label fw-bold text-primary">Blue</label>
                <Select
                  name="blue"
                  isMulti
                  value={selectedBlue}
                  onChange={handleChangeBlue}
                  options={itemsPeserta}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />

              </div>
              <div className='col-6 mb-3'>
                <label htmlFor="red" className="form-label fw-bold text-danger">Red</label>
                <Select
                  name="Red"
                  isMulti
                  value={selectedRed}
                  onChange={handleChangeRed}
                  options={itemsPeserta}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
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

  if (ShowDiagram) {
    return (
      <div>
        <Diagram />
      </div>
    );
  }

}

export default Head;
