// frontend/src/components/AdminObraEditor.tsx
import { useEffect, useState } from 'react';
import type { Obra } from '../types';
import {
  getObras,
  uploadObra,
  updateObra,
  deleteObra,
} from '../services/obrasService';
import '../styles/Admin.css';

const AdminObraEditor = () => {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newObra, setNewObra] = useState<Omit<Obra, 'id'>>({
    src: '',
    categoria: 'dibujo',
    titulo: '',
    tecnica: '',
    anio: new Date().getFullYear(),
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchObras();
  }, []);

  const fetchObras = async () => {
    try {
      const data = await getObras();
      setObras(data);
    } catch (err) {
      console.error('Error al cargar obras:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index: number, field: keyof Obra, value: string) => {
    const updated = [...obras];
    updated[index] = {
      ...updated[index],
      [field]: field === 'anio' ? parseInt(value) : value,
    };
    setObras(updated);
  };

  const handleSave = async (index: number) => {
    const obra = obras[index];
    try {
      const updated = await updateObra(obra.id, obra);
      const nuevas = [...obras];
      nuevas[index] = updated;
      setObras(nuevas);
    } catch (err) {
      console.error('Error al guardar obra:', err);
    }
  };

  const handleAdd = async () => {
    if (!file) {
      alert('Por favor, seleccione una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file); // Ensure the file is included
    formData.append('titulo', newObra.titulo || '');
    formData.append('tecnica', newObra.tecnica || '');
    formData.append('anio', newObra.anio?.toString() || '');
    formData.append('categoria', newObra.categoria);

    try {
      const added = await uploadObra(formData);
      setObras([...obras, added]);
      setNewObra({
        src: '', // Reset src after upload
        categoria: 'dibujo',
        titulo: '',
        tecnica: '',
        anio: new Date().getFullYear(),
      });
      setFile(null);
      setShowAddForm(false);
    } catch (err) {
      console.error('Error al agregar obra:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteObra(id);
      setObras(obras.filter((obra) => obra.id !== id));
    } catch (err) {
      console.error('Error al eliminar obra:', err);
    }
  };

  const handleNewObraChange = (field: keyof Omit<Obra, 'id'>, value: string | number) => {
    setNewObra({
      ...newObra,
      [field]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setNewObra({
      src: '',
      categoria: 'dibujo',
      titulo: '',
      tecnica: '',
      anio: new Date().getFullYear(),
    });
    setFile(null);
  };

  return (
    <div className="admin-section">
      <h2>Editor de Obras</h2>
      <button className='btnAgregarObra' onClick={() => setShowAddForm(true)}>Agregar Obra</button>

      {showAddForm && (
        <div className="add-obra-form">
          <h3>Nueva Obra</h3>
          <input
            type="text"
            value={newObra.titulo}
            onChange={(e) => handleNewObraChange('titulo', e.target.value)}
            placeholder="Título"
          />
          <input
            type="text"
            value={newObra.tecnica}
            onChange={(e) => handleNewObraChange('tecnica', e.target.value)}
            placeholder="Técnica"
          />
          <input
            type="number"
            value={newObra.anio}
            onChange={(e) => handleNewObraChange('anio', parseInt(e.target.value))}
            placeholder="Año"
          />
          <select
            value={newObra.categoria}
            onChange={(e) => handleNewObraChange('categoria', e.target.value)}
          >
            <option value="dibujo">Dibujo</option>
            <option value="grabado">Grabado</option>
            <option value="pintura">Pintura</option>
            <option value="escultura">Escultura</option>
          </select>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleAdd}>Guardar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      )}

      {loading ? (
        <p>Cargando obras...</p>
      ) : (
        obras.map((obra, index) => (
          <div key={obra.id} className="obra-form">
            <input
              value={obra.titulo || ''}
              onChange={(e) => handleChange(index, 'titulo', e.target.value)}
              placeholder="Título"
            />
            <input
              value={obra.tecnica || ''}
              onChange={(e) => handleChange(index, 'tecnica', e.target.value)}
              placeholder="Técnica"
            />
            <input
              value={obra.anio?.toString() || ''}
              onChange={(e) => handleChange(index, 'anio', e.target.value)}
              placeholder="Año"
            />
            <select
              value={obra.categoria}
              onChange={(e) => handleChange(index, 'categoria', e.target.value)}
            >
              <option value="dibujo">Dibujo</option>
              <option value="grabado">Grabado</option>
              <option value="pintura">Pintura</option>
              <option value="escultura">Escultura</option>
            </select>
            <input
              value={obra.src}
              onChange={(e) => handleChange(index, 'src', e.target.value)}
              placeholder="Ruta imagen (ej: /imgdibujo/dibujo1.webp)"
            />
            <button onClick={() => handleSave(index)}>Guardar</button>
            <button onClick={() => handleDelete(obra.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminObraEditor;