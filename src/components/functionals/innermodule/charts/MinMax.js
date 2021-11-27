import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { Alert, Container } from 'react-bootstrap' 

export default function MinMax({ref}) {
    const { sample } = useSelector(state => state.indicator);
    const { user_value } = useSelector(state => state.indicator); 
    const { inputs_faltantes } = useSelector(state => state.indicator); 
    
    return (
        <Container className="chart-container">
            {sample ? 
            
                <Chart
                    
                    height={'300px'}
                    chartType="ScatterChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['', sample.contexto], // columnas
                        [sample.values.val_max, 0], //min
                        [sample.values.val_min, 0], //max
                        [user_value ? user_value.value : 0, 0], //max
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

                { !user_value && inputs_faltantes &&
                    <Alert variant={'warning'}> Aún no ingresaste un valor para participar de la muestra</Alert>
                }

                { !user_value && !inputs_faltantes &&
                    <Alert variant={'warning'}> Aún no procesamos tus datos como parte de la muestra. Espera, en breve estará listo!</Alert>
                }
        </Container>
    )
}
