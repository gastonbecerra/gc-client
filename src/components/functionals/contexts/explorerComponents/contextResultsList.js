import React, {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import ContextResultCard from './contextResultCard';

export default function ResultsList({ searchText }) {
    const [displayData, setDisplayData] = useState([]);
    var response = ['argentina', 'bolivia', 'coso'];
    const { context4user } = useSelector(state => state.context);
    const { contexts } = useSelector(state => state.context);

    useEffect(() => {
        if (searchText === '') {
          setDisplayData(contexts);
        } else {
          setDisplayData(
            contexts.filter((item) =>
              item.context.toLowerCase().includes(searchText.toLowerCase())
            )
          );
        }
      }, [searchText]);

  return (
    <>
    <section className='card-container'>
      
        {
            displayData && 

            displayData.map((item) => (
          <ContextResultCard key={item} context={item}/>
        ))}
      
    </section>
    </>
  )
}
