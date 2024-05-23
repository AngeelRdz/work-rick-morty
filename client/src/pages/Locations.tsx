import React, { useEffect, useState, useRef } from "react";
import CardLocation from "../components/CardLocation/CardLocation";

interface LocationData {
    count: number;
    pages: number;
    next: string;
  }
  
  interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
  }

const Location: React.FC = () => {
    const [pageNumber, updatePageNumber] = useState(1);
    const [fetchedData, updateFetchedData] = useState<{
        info: LocationData | null;
        results: Location[];
    }>({ info: null, results: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const loader = useRef<HTMLDivElement | null>(null);

    const api = `https://rickandmortyapi.com/api/location?page=${pageNumber}`;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(api);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                
                const data = await response.json();
                const { info, results } = data;
                console.log("data location all", { info, results });
                updateFetchedData((prevData) => {
                    if (pageNumber === 1) {
                        return {
                            info,
                            results: results,
                        };
                    } else {
                        return {
                            info,
                            results: [...prevData.results, ...results],
                        };
                    }
                });
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
      
        fetchData();
    }, [api, pageNumber]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && fetchedData.info?.next) {
                updatePageNumber((prev) => prev + 1);
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
    }, [loading, fetchedData.info]);

    return (
        <div className="App">
            <h1 className="text-center mb-3">Locations Alls</h1>
            <h4 className="text-center">
                Total de locaciones: {fetchedData.info ? fetchedData.info.count : "Ninguno"}
            </h4>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-12">
                        <div className="row">
                            <CardLocation results={fetchedData.results} />
                        </div>
                    </div>
                </div>
            </div>
            {!loading &&
                <div className='loader-container'>
                    <div className="loader"></div>
                </div>}
            <div ref={loader} />
        </div>
    );
};

export default Location;
