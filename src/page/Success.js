import { useNavigate } from "react-router-dom"
import { Button } from "antd";
import good from '../img/good.gif'

export default function SuccessBooking(){
    const _navigate = useNavigate();

    return(
        <div className="flex flex-col items-center py-8">
            <div>恭喜你預約成功</div>
            <img src={good} className="py-3"></img>
            <div>預約到薇薇很不容易喔</div>
            <Button onClick={()=>{_navigate('/')}}
                size='large'
                className="w-24 mt-8 bg-blue-500 text-white font-bolder tracking-wider"
            >再約一天</Button>
        </div>
    )
}