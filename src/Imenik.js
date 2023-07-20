import React, { useState, useEffect } from 'react';
import './Imenik.css';

const Imenik = () => {
  const [ime, setIme] = useState('');
  const [brojTelefona, setBrojTelefona] = useState('');
  const [imenikLista, setImenikLista] = useState([]);

  // Učitavanje zapisa iz Local Storage-a prilikom prvog renderovanja komponente
  useEffect(() => {
    const storedImenik = JSON.parse(localStorage.getItem('imenik'));
    if (storedImenik) {
      setImenikLista(storedImenik);
    }
  }, []);

  // Čuvanje zapisa u Local Storage-u i dodavanje u listu imenika
  const sacuvajZapis = () => {
    if (!ime || !brojTelefona) {
      alert('Morate uneti i ime i broj telefona!');
      return;
    }

    const zapis = {
      ime,
      brojTelefona
    };

    // Dodajemo novi zapis u listu imenika
    setImenikLista([...imenikLista, zapis]);

    // Čuvamo promene u Local Storage-u
    localStorage.setItem('imenik', JSON.stringify([...imenikLista, zapis]));

    // Resetujemo input polja
    setIme('');
    setBrojTelefona('');
  };

  // Brisanje zapisa iz imenika
  const obrisiZapis = (index) => {
    const noviImenik = [...imenikLista];
    noviImenik.splice(index, 1);
    setImenikLista(noviImenik);
    localStorage.setItem('imenik', JSON.stringify(noviImenik));
  };

  return (
    <div>
      <h1>Imenik</h1>
      <div>
        <input
          type="text"
          value={ime}
          onChange={(e) => setIme(e.target.value)}
          placeholder="Unesite ime"
        />
        <input
          type="tel"
          value={brojTelefona}
          onChange={(e) => setBrojTelefona(e.target.value)}
          placeholder="Unesite broj telefona"
        />
        <button onClick={sacuvajZapis}>Sacuvaj</button>
      </div>
      <h2>Lista imena i brojeva telefona</h2>
      <ul>
        {imenikLista.map((zapis, index) => (
          <li key={index}>
            {zapis.ime} - {zapis.brojTelefona}{' '}
            <button onClick={() => obrisiZapis(index)}>Obrisi</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Imenik;
