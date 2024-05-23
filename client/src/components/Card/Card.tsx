import React from "react";

import { Link, useLocation } from "react-router-dom";
import { useFavorite } from "../../context/FavoritesContext";

import styles from "./card.module.scss";

interface CardProps {
    page: string;
    results: Array<{
        _id: string;
        image: string;
        name: string;
        status: string;
        location?: {
            name: string;
        };
    }> | null;
}

const Card: React.FC<CardProps> = ({ results }) => {
	console.log("results:", results);
	const locationPath = useLocation();
	const { createFavorite, deleteFavorite } = useFavorite();
	const addToFavorites = async (id: number, image: string, name: string, status: string, location: { name: string }) => {
        await createFavorite({
			id, image, name, status, location: location?.name ?? 'Unknown',
			_id: 0
		});
		console.log("Mandar a favoritos:", { id, image, name, status, location });
    };

	const deleteToFavorites = async (id: number) => {
		await deleteFavorite(id);
		console.log("Borrar de favoritos:", id);
	}

	let display;

	if (results) {
        display = results.map((x, index) => {
			const { _id, image, name, status, location } = x;

			return (
				<div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark">
					<Link
						style={{ textDecoration: "none" }}
						// to={`${page}${_id}`}
						key={index}
						className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark"
						to={""}
					>
						<div
							className={`${styles.card} d-flex flex-column justify-content-center`}
						>
							<img className={`${styles.img} img-fluid`} src={image} alt="" />
							<div className={`${styles.content}`}>
								<div className="fs-5 fw-bold mb-4">{name}</div>
								<div className="">
									<div className="fs-6 fw-normal">Last Location</div>
									<div className="fs-5">
										{location?.name ?? 'Unknown'}
									</div>
								</div>
							</div>
					</div>

						{(() => {
							if (status === "Dead") {
								return (
									<div
										className={`${styles.badge} position-absolute badge bg-danger`}
									>
										{status}
									</div>
								);
							} else if (status === "Alive") {
								return (
									<div
										className={`${styles.badge} position-absolute badge bg-success`}
									>
										{status}
									</div>
								);
							} else {
								return (
									<div
										className={`${styles.badge} position-absolute badge bg-secondary`}
									>
										{status}
									</div>
								);
							}
						})()}
					</Link>
					<div>
						{locationPath.pathname === "/favorites" ? (
                            <button
                                className="badge bg-danger fs-5"
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteToFavorites(parseInt(_id));
                                }}
                            >
                                Quitar de Favorito
                            </button>
                        ) : (
                            <button
                                className="badge bg-success fs-5"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToFavorites(parseInt(_id), image, name, status, location || { name: 'Unknown' });
                                }}
                            >
                                Agregar a Favorito
                            </button>
                        )}
					</div>
				</div>
			);
		});
	} else {
        display = "No Characters Found :/";
	}

	return <>{display}</>;
};

export default Card;
