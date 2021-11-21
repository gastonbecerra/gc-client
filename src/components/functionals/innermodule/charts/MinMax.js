import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { Alert } from 'react-bootstrap' 

export default function MinMax() {
    const { sample } = useSelector(state => state.indicator);
    const { user_value } = useSelector(state => state.indicator); 
    return (
        <div>
            {sample && user_value ? 
            
                <Chart
                width={'95vw'}
                    height={'300px'}
                    chartType="ScatterChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['', sample.contexto], // columnas
                        [sample.values.val_max, 0], //min
                        [sample.values.val_min, 0], //max
                        [user_value.valor, 0], //max
                    ]}
                    options={{                        
                        title: 'Ahorro',
                        hAxis: { minValue: 0, maxValue: sample.values.val_max * 1.3 },
                        vAxis: { minValue: 0, maxValue: 0 },
                        legend: 'none',
                    }}
                    rootProps={{ 'data-testid': '1' }}/>

                : 
                <Alert variant={'danger'}> No hay un valor de muestra para el contexto seleccionado</Alert>
                }        
        </div>
    )
}
