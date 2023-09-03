import logo from './logo.svg';
import './App.css';
import { fetchDataFromApi } from './utils/api';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import PageNotFound from './pages/404/PageNotFound';
import Explore from './pages/Explore/Explore';
import Header from './pages/header/Header';
import Footer from './pages/footer/Footer';
import useFetch from './useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './redux/features/homeSlice';
import {
  getLoading,
  getTrendingApiDayWise,
  getTrendingApiWeekWise,
} from './redux/features/trendingSlice';
import {
  getPopularMovies,
  getPopularSeries,
  getPopularLoading,
} from './redux/features/popularSlice';
import {
  getTopRatedLoading,
  getTopRatedMovies,
  getTopRatedSeries,
} from './redux/features/topRatedSlice';
function App() {
  // const { data, loading } = useFetch('/movie/popular');
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    apiConfigTesting();
    genresCall();
    trendingCalls();
    popularCalls();
    topRatedCalls();
  }, []);
  const apiConfigTesting = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        const url = {
          backdrop: res.data.images.secure_base_url + 'original',
          poster: res.data.images.secure_base_url + 'original',
          profile: res.data.images.secure_base_url + 'original',
        };

        dispatch(getApiConfiguration(url));
      })
      .catch((err) => console.log(err));
  };
  const trendingCalls = () => {
    fetchDataFromApi(`/trending/all/day`)
      .then((res) => {
        dispatch(getTrendingApiDayWise(res.data.results));
        // dispatch(getLoading(false));
      })
      .catch((err) => console.log(err));
    fetchDataFromApi(`/trending/all/week`)
      .then((res) => {
        dispatch(getTrendingApiWeekWise(res.data.results));
        dispatch(getLoading(false));
      })
      .catch((err) => console.log(err));
  };
  const popularCalls = () => {
    fetchDataFromApi(`/tv/popular`)
      .then((res) => {
        dispatch(getPopularSeries(res.data.results));
        // dispatch(getLoading(false));
      })
      .catch((err) => console.log(err));
    fetchDataFromApi(`/movie/popular`)
      .then((res) => {
        dispatch(getPopularMovies(res.data.results));
        dispatch(getPopularLoading(false));
      })
      .catch((err) => console.log(err));
  };
  const topRatedCalls = () => {
    fetchDataFromApi(`/tv/top_rated`)
      .then((res) => {
        dispatch(getTopRatedSeries(res.data.results));
        // dispatch(getLoading(false));
      })
      .catch((err) => console.log(err));
    fetchDataFromApi(`/movie/top_rated`)
      .then((res) => {
        dispatch(getTopRatedMovies(res.data.results));
        dispatch(getTopRatedLoading(false));
      })
      .catch((err) => console.log(err));
  };
  const genresCall = async () => {
    let promise = [];
    let endpoints = ['tv', 'movie'];
    let allGenres = {};

    endpoints.forEach((url) => {
      promise.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promise);

    const test = data.map((curr) => {
      curr.data.genres.map((genre) => (allGenres[genre.id] = { ...genre }));
    });

    dispatch(getGenres(allGenres));
  };
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
