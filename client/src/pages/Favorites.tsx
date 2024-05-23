import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { useEffect } from 'react';
import { useFavorite } from "../context/FavoritesContext";

import Card from "../components/Card/Card";

const Favorites: React.FC = () => {
    const { getFavorites, list } = useFavorite();

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <div className="App">
            <h1 className="text-center mb-3">Mis favoritos</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-12">
                        <div className="row">
                            {list.length > 0 ? (
                                    <Card page="/" results={list} />
                                ) : (
                                    <p>No hay favoritos.</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Favorites;
