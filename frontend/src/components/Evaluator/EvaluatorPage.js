import React, {useEffect, useState} from 'react'

export default function EvaluatorPage() {
    const {recordId} = useParams();
    const [description,setDescription] = useState('');
    const [data,setData] = useState([]);

    // useEffect(() => {
	// 	//Need to fetch complete data of the class which evaluator has to fill
	// 	console.log(recordId);
	// 	fetch(`/data/evaluator/marksFetch/${recordId}`, {
	// 		headers: {
	// 			Authorization: `Bearer ${localStorage.getItem('CodeZone2_Token')}`
	// 		}
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			if(data?.success){
    //                 setDescription(data?.description);
    //                 setData(data?.data);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err)
	// 		});
	// }, [recordId])
  return (
    <div>EvaluatorPage</div>
  )
}
