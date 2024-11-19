import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getHead } from '../services/api';

const Home: React.FC = () => {
    const { data, error, isLoading } = useQuery('head', getHead);
    const [ShowForm, setForm] = useState<boolean>(false);
    const [tipe, setTipe] = useState('');
    const [liga, setLiga] = useState('');

    const addData = async () => {
        setForm(true);
    };

    const backData = async () => {
        setForm(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    if (isLoading) return <div className="container mt-5"><div className="alert alert-info">Loading...</div></div>;
    if (error) return <div className="container mt-5"><div className="alert alert-info">Loading...</div></div>;

    if (data && !ShowForm) {
        return (
            <div className="container mt-5">
                <h1 className="mb-4">Data</h1>
                <button onClick={addData} className="btn btn-primary btn-sm mb-4 me-3 rounded-pill"><i className='bi bi-plus'></i> Tambah</button>
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
                            {data.map((item:any, index: number) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.liga.name}</td>                               
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm me-1"
                                        >
                                            <i className='bi bi-trash'></i>
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm"
                                        >
                                            <i className='bi bi-controller'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (ShowForm) {
        return (
            <div className="container mt-5">
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-6 mb-3'>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label fw-bold">Liga</label>
                            </div>
                        </div>
                        <div className='col-6 mb-3'>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label fw-bold">Kelas</label>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex jusitfy-content-start'>
                        <button type="submit" className="btn btn-primary btn-sm me-1"><i className='bi bi-save'></i> Save</button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={backData}><i className='bi bi-arrow-left'></i> Back</button>
                    </div>
                </form>
            </div>
        )
    }
};

export default Home;
