import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoriteProvider } from "./context/FavoritesContext";

import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import Location from "./pages/Locations";

import CardDetails from "./components/Card/CardDetails";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";

import ProtectedRoute from "./ProtectedRoute";

import './App.scss';

interface Character {
    id: number;
    name: string;
    location: {
        name: string;
    };
    origin: {
        name: string;
    };
    gender: string;
    image: string;
    status: string;
    species: string;
}

interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
}

function App() {
    return (
        <AuthProvider>
            <FavoriteProvider>
                <Router>
                    <div className="App">
                        <Navbar to={""} />
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/:id" element={<CardDetails />} />
                        <Route path="/location" element={<Location />} />

                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/favorites" element={<Favorites />} />
                        </Route>
                    </Routes>
                </Router>
            </FavoriteProvider>
        </AuthProvider>
    );
}

const Home: React.FC = () => {
    const [pageNumber, updatePageNumber] = useState(1);
    const [fetchedData, updateFetchedData] = useState<Character[]>([]);
    const [search, setSearch] = useState("");
    const [info, setInfo] = useState<Info | null>(null);
    const [loading, setLoading] = useState(false);
    const loader = useRef<HTMLDivElement>(null);

    const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}`;

    const fetchCharacters = useCallback(async () => {
        setLoading(true);
        try {
            console.log("Fetching data from API: ", api);
            const response = await fetch(api);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Fetched data: ", data);
            updateFetchedData(prev => {
                if (pageNumber === 1) {
                    return data.results;
                } else {
                    return [...prev, ...data.results];
                }
            });
            setInfo(data.info);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    }, [api, pageNumber]);

    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && info?.next) {
                updatePageNumber(prev => prev + 1);
            }
        });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loading, info]);

    const handleSearch = (searchTerm: string) => {
        updatePageNumber(1);
        setSearch(searchTerm);
        updateFetchedData([]);
    };

    return (
        <div className="App">
            <h1 className="text-center mb-3">Personajes</h1>
            <Search onSearch={handleSearch} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-12">
                        <div className="row">
                            {fetchedData.map((character) => (
                                <Card
                                    key={character.id}
                                    page="/"
                                    results={[
                                        {
                                            _id: character.id.toString(),
                                            image: character.image,
                                            name: character.name,
                                            status: character.status,
                                            location: character.location,
                                        },
                                    ]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {!loading && 
                <div className='loader-container'>
                    <div className="loader"></div>
                </div>
            }
            <div ref={loader} />
        </div>
    );
}

export default App;
