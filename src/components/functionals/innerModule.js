import React from 'react'
import * as Chart from './charts/index';
import Inputer from './inputer';

export default function InnerModule(indicator) {

    function renderRequiredChart (){
        let type;
        if(indicator !== false && indicator !== undefined){
            switch (indicator.indicator.chart) {
                    case 'benchmark':
                    type = 'Benchmark'
                    break;
        
                    case 'barras':
                    type = 'BarChart'
                    break;

                    case 'wordcloud':
                    type = 'BarChart'
                    break;
            
                default:
                    type = 'Benchmark'
                    return 'no chart designed yet'
                    break;
            }
            const Component = Chart[type]
            return <Component/>
        }
        
     }

    return (
        <div>
            {renderRequiredChart()}            
            <Inputer/>
        </div>
        )
}
