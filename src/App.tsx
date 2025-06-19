import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

// Interface para os itens da lista
interface ConcertItem {
  id: string;
  artist: string;
  date?: string; // Data opcional para o concerto
}

function App() {
  const [inputValue, setInputValue] = React.useState('');
  // Estado para armazenar a lista de concertos assim que a aplicação é iniciada
  const [concerts, setConcerts] = React.useState<ConcertItem[]>(() => {
    const storedConcerts = localStorage.getItem('dreamConcerts');
    return storedConcerts ? JSON.parse(storedConcerts) : [];
  });
  const [datePickerOpenFor, setDatePickerOpenFor] = React.useState<string | null>(null);

  // salvar os dados no localStorage sempre que a lista de concertos mudar
  useEffect(() => {
    localStorage.setItem('dreamConcerts', JSON.stringify(concerts));
  }, [concerts]);

  // Função para gerar um ID único para cada item
  const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  // clique do botão "Add Concert"
  const handleAddButtonClick = () => {
    if (inputValue.trim() !== '') {
      const newConcert: ConcertItem = {
        id: generateUniqueId(),
        artist: inputValue.trim(),
      };
      setConcerts((prevConcerts) => [...prevConcerts, newConcert]);
      setInputValue('');
    }
  };

  // Adicionar os itens ao pressionar Enter
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newConcert: ConcertItem = {
        id: generateUniqueId(), // usando a nova função para gerar um ID único
        artist: inputValue.trim(),
        // date: undefined, // Data opcional, pode ser definida posteriormente
      };
      setConcerts((prevConcerts) => [...prevConcerts, newConcert]);
      setInputValue(''); // Limpar o input após adicionar
    }
  };

  const handleDateChange = (date: Date | null, concertId: string) => {
    if (date) {
      const formattedDate = date.toLocaleDateString('pt-BR'); // Formatar a data para o padrão brasileiro
      setConcerts((prevConcerts) =>
        prevConcerts.map((concert): ConcertItem =>
          concert.id === concertId ? { ...concert, date: formattedDate } : concert
        )
      );
    }
    setDatePickerOpenFor(null); // Fecha o DatePicker após a seleção
  }

  // Abrir ou fechar o DatePicker para um concerto específico
  const toggleDatePicker = (concertId: string) => {
    setDatePickerOpenFor(datePickerOpenFor === concertId ? null : concertId);
  };

  // Abrir Spotify do artista
  // Esta função será chamada quando o usuário clicar no botão de play
  const handlePlayClick = (artistName: string) => {
    // Encodifica o nome do artista para ser seguro em uma URL
    const encodedArtistName = encodeURIComponent(artistName);
    const spotifySearchUrl = `https://open.spotify.com/search/${encodedArtistName}`;
    window.open(spotifySearchUrl, '_blank'); // Abre em uma nova aba
  };

  // Excluir um concerto da lista
  const handleDeleteItem = (id: string) => {
    setConcerts((prevConcerts) => prevConcerts.filter((concert) => concert.id !== id));
  };

  return (
    <div className="App">
      <Header 
        inputValue={inputValue}
        onInputChange={setInputValue}
        onInputKeyDown={handleInputKeyDown}
        onAddButtonClick={handleAddButtonClick}
      />

      <h2 className='your-list-title jersey-20'>Your list:</h2>

      {/* Renderizar a lista de shows com os nomes dos artistas */}
      <div className="concert-list-container">
        {concerts.length === 0 ? (
          <p className="no-concerts-message jersey-20">No dream concerts added yet. Start typing!</p>
        ) : (
          concerts.map((concert) => (
            <motion.div // Manter motion.div para as animações de entrada/saída
              key={concert.id}
              className="concert-item jersey-20"
            >

              {/* Conteúdo principal do item (artista e data) */}
              <div className="concert-content">
                  <span className="concert-artist">{concert.artist}</span>
                  {/* Exibir a data se ela existir */}
                  {concert.date && (
                    <span className="concert-date jersey-20" style={{ marginLeft: '5px' }}>{concert.date}</span>
                  )}
                  
                  {/* Botão do ícone de calendário */}
                  <button
                    className="action-button"
                    onClick={() => toggleDatePicker(concert.id)}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                          <path d="M0 0h24v24H0V0z" fill="none"/>
                          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5zm8-3h-2v2h2V4z"/>
                      </svg>
                  </button>

                  {datePickerOpenFor === concert.id && (
                    <div className="datepicker-portal">
                      <DatePicker
                        selected={concert.date ? new Date(concert.date.split('/').reverse().join('-')) : null}
                        onChange={(date) => handleDateChange(date, concert.id)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        inline
                        onClickOutside={() => setDatePickerOpenFor(null)}
                        showPopperArrow={false}
                      />
                    </div>
                  )}
              </div>

              {/* Botões de ação (play/pause e delete) */}
              <div className="concert-actions">
                  {/* Placeholder para o botão de play/pause */}
                  <button className="action-button" onClick={() => handlePlayClick(concert.artist)}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                          <path d="M0 0h24v24H0V0z" fill="none"/>
                          <path d="M8 5v14l11-7L8 5z"/>
                      </svg>
                  </button>
                  {/* Placeholder para o botão de excluir */}
                  <button className="action-button" onClick={() => handleDeleteItem(concert.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                          <path d="M0 0h24v24H0V0z" fill="none"/>
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z"/>
                      </svg>
                  </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;