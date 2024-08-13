export const getAnimeResponse = async (resource, query) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`
  );
  const anime = await response.json();
  return anime;
};

export const getNestedAnimeResponse = async (resource, objectProperty) => {
  const response = await getAnimeResponse(resource);
  return response.data.flatMap((item) => item[objectProperty]);
};

export const reproduce = (data, gap) => {
  if (gap >= data.length) {
    throw new Error("Gap is larger than or equal to data length");
  }

  const first = Math.floor(Math.random() * (data.length - gap));
  const last = first + gap;

  // Ensure valid range
  const response = {
    data: data.slice(first, last),
  };

  return response;
};
export const fetchAnimeData = async (id) => {
  try {
    const response = await getAnimeResponse(`anime/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Memanggil json() untuk mendapatkan data JSON
  } catch (error) {
    console.error('Fetch error:', error);
    return { data: null }; // Mengembalikan data default jika terjadi kesalahan
  }
};

export const fetchEpisodesData = async (id, page) => {
  try {
    const response = await getAnimeResponse(`anime/${id}/episodes?page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Memanggil json() untuk mendapatkan data JSON
  } catch (error) {
    console.error('Fetch error:', error);
    return { data: [] }; // Mengembalikan array kosong jika terjadi kesalahan
  }
};

