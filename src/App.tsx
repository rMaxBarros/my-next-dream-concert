import React, { use, useEffect } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header/Header';

// Interface para os itens da lista
interface ConcertItem {
  id: string;
  artist: string;
}

function App() {
  const [inputValue, setInputValue] = React.useState('');
  const [concerts, setConcerts] = React.useState<ConcertItem[]>([]);

  // carregar os dados do localStorage ao iniciar o app
  useEffect(() => {
    const storedConcerts = localStorage.getItem('dreamConcerts');
    if (storedConcerts) {
      setConcerts(JSON.parse(storedConcerts));
    }
  }, []);

  // salvar os dados no localStorage sempre que a lista de concertos mudar
  useEffect(() => {
    localStorage.setItem('dreamConcerts', JSON.stringify(concerts));
  }, [concerts]);

  // Adicionar os itens ao pressionar Enter
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newConcert: ConcertItem = {
        id: Date.now().toString(), // id simples baseado no timestamp
        artist: inputValue.trim(),
      };
      setConcerts((prevConcerts) => [...prevConcerts, newConcert]);
      setInputValue(''); // Limpar o input após adicionar
    }
  };

  return (
    <div className="App">
      <Header 
        inputValue={inputValue}
        onInputChange={setInputValue}
        onInputKeyDown={handleInputKeyDown}
      />

      <h2 className='your-list-title jersey-20'>Your list:</h2>

      {/* Renderizar a lista de shows com os nomes dos artistas */}
      <div className="concert-list-container">
        {concerts.length === 0 ? (
          <p className="no-concerts-message jersey-20">No dream concerts added yet. Start typing!</p>
        ) : (
          concerts.map((concert) => (
            <div key={concert.id} className="concert-item jersey-20">
              <span className="concert-artist">{concert.artist}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;