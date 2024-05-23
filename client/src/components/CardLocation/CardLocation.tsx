import React from "react";

import styles from "./card-location.module.scss";

interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
}
  
interface CardLocationProps {
    results: Location[];
}

const CardLocation: React.FC<CardLocationProps> = ({ results }) => {
	let display: JSX.Element[] | null = null;

	if (results) {
        console.log('hello', results);
        display = results.map((x, index) => {
			const { id, name, type, dimension, residents } = x;

			return (
				<div
					key={index}
					className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark"
				>
					<div
						className={`${styles.card} d-flex flex-column justify-content-center`}
					>
						<div className={`${styles.content}`}>
							<div className="fs-5 fw-bold mb-4">{name}</div>
							<div className="">
                                <div className="fs-6 fw-normal">Locacion: {id} </div>
								<div className="fs-6 fw-normal"> {dimension} </div>
								<div className="fs-5">{type}</div>
                                <div className="fs-5">Total de personajes: {residents.length} </div>
							</div>
						</div>
                    </div>
				</div>
			);
		});
	}

	return <>{display}</>;
};

export default CardLocation;
