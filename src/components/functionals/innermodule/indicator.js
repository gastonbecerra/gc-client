import SelectContext, {useEffect} from '../selectContext';
import { useDispatch, useSelector } from "react-redux";
import MinMax from './charts/MinMax';

export default function Indicator() {
    const dispatch = useDispatch();
    const {auth, id: user_id} = useSelector(state => state.user);
    const { sample } = useSelector(state => state.indicator);

    return (
        <div className="px-2 py-2">
            <SelectContext/>
            <MinMax/>
            
            
        </div>
    )
}
