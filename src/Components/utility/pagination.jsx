import { useState, useEffect } from 'react';
import Pagination from './Pagination'; // Pastikan jalur impor sesuai dengan lokasi komponen Pagination

const Page = () => {
  const [page, setPage] = useState(1);
  const [genreAnime, setGenreAnime] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Daftar genre ID yang populer dan nama-nama genre
  const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 4, name: "Drama" },
    { id: 8, name: "Mystery" },
    { id: 10, name: "Romance" },
    { id: 14, name: "Fantasy" },
    { id: 7, name: "Comedy" },
    { id: 22, name: "Supernatural" },
    { id: 24, name: "Sci-Fi" },
    { id: 36, name: "Slice of Life" },
  ];

  const fetchData = async (genreId) => {
    try {
      // Lakukan fetch langsung ke Jikan API berdasarkan genre yang dipilih dan urutkan berdasarkan popularitas
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}&sort=popularity`
      );
      const data = await response.json();

      setGenreAnime(data.data);
      setTotalPages(data.pagination.last_visible_page); // Atur total halaman dari data API
    } catch (error) {
      console.error("Fetch error:", error); // Tangani kesalahan jika terjadi
    }
  };

  useEffect(() => {
    if (selectedGenre !== null) {
      fetchData(selectedGenre);
    }
  }, [selectedGenre, page]); // Memanggil fetchData setiap kali genre atau page berubah

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Anime Berdasarkan Genre</h1>
      <div style={styles.genreButtons}>
        {genres.map((genre) => (
          <button
            key={genre.id}
            style={{
              ...styles.genreButton,
              backgroundColor:
                selectedGenre === genre.id ? "#0070f3" : "#333",
              color: selectedGenre === genre.id ? "#ffffff" : "#cccccc",
            }}
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div style={styles.animeList}>
        {genreAnime.map((anime) => (
          <div style={styles.animeItem} key={anime.mal_id}>
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              style={styles.animeImage}
            />
            <div style={styles.infoOverlay}>
              <p style={styles.animeTitle}>{anime.title}</p>
              <p style={styles.episodeCount}>Episodes: {anime.episodes || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination 
        page={page} 
        lastPage={totalPages} 
        setPage={setPage} 
      />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#121212",
    color: "#ffffff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  genreButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
    marginBottom: "16px",
  },
  genreButton: {
    padding: "10px 20px",
    border: "1px solid #444",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    outline: "none",
  },
  animeList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "center",
  },
  animeItem: {
    position: "relative",
    flex: "0 0 calc(20% - 16px)",
    boxSizing: "border-box",
    textAlign: "center",
    backgroundColor: "#1c1c1c",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  animeImage: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
    marginBottom: "8px",
    border: "1px solid #444",
  },
  infoOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#ffffff",
    padding: "8px",
    borderRadius: "0 0 8px 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  animeTitle: {
    fontSize: "14px",
    margin: "0",
  },
  episodeCount: {
    fontSize: "12px",
    margin: "0",
  },
};

export default Page;
