import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSales(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const fetcher = async (url) => {
    const response = await fetch(url); // Effectue une requête GET vers l'URL
    if (!response.ok) {
      throw new Error("Failed to fetch data"); // Gère les erreurs de requête
    }
    return response.json(); // Renvoie les données au format JSON
  };

  const { data, error } = useSWR(
    "https://nextjs-course2-61e59-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          userName: data[key].userName,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-course2-61e59-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             userName: data[key].userName,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.userName} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course2-61e59-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          userName: data[key].userName,
          volume: data[key].volume,
        });
      }
      return { props: { sales: transformedSales } };
    });
  return response;
}

export default LastSales;
