import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import activity from '../assets/doing.json'
// style
import { Button,DatePicker,Form,Input, InputNumber, Radio,Spin, Checkbox } from "antd"
import dayjs from 'dayjs';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
);

const { TextArea } = Input;

export default function Bookorm(){
    const [_goWhere,_setGoWhere] = useState(1);
    const [_doWhat,_setDoWhat] = useState();
    const [_placeInputDisabled,_setPlaceInputDisabled] = useState(true);
    const [_submitLoading,_setSubmitLoading] = useState(false);
    const [_indeterminate,_setIndeterminate] = useState(true);
    const [_otherPlace , _setOtherPlace] = useState("");
    const [_formData, setFormData] = useState({
        "name":"",
        "date":"",
        "time":[],
        "place":1,
        "otherPlace":"",
        "doing":1,
        "memo":"",
    })
    const _navigate = useNavigate();

    const onFinish=()=>{
        _navigate('/success')
    }

    const onFinishFailed=()=>{
       
    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
      };

    const controlName = (e) => {
        setFormData((_formData)=>({..._formData, name:e.target.value}))
    }

    const controlDate = (value) =>{
        var date = `${value.$y} / ${value.$M + 1} / ${value.$D}`
        setFormData((_formData)=>({..._formData, date:value.$d}))
    }

    const controlTime = (value) => {
        setFormData((_formData) => ({..._formData, time:value}))
    }

    const controlPlace = (e) =>{
        if(e.target.value === 4){
            _setPlaceInputDisabled(false)
            _setOtherPlace('')
        }else{
            _setPlaceInputDisabled(true)
            _setOtherPlace('')
        }
        setFormData((_formData) => ({..._formData, place:e.target.value}))
    }

    const controlOtherPlace = (e) => {
        setFormData((_formData) => ({..._formData, otherPlace: e.target.value}))
    }

    const controlDo = (checkValue)=>{
        _setSubmitLoading(true);
        _setSubmitLoading(false);
        setFormData((_formData) => ({..._formData, doing: checkValue}))
    }

    const controlMemo = (e) => {
        setFormData((_formData) => ({..._formData, memo:e.target.value}))
    }

    return(
        <div className="px-6 py-8 w-2/3" style={{maxWidth:'600px'}}>
            <Form
                labelCol={{
                    span:24
                }}
                labelAlign='left'
                wrapperCol={{span:24}}
                initialValues={{
                    'place':_formData.place,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="text-base text-left"
            >
                <Form.Item
                    label={<div className="font-bold text-lg tracking-wider">姓名</div>}
                    name="username"
                    rules={[
                        {
                            required:true,
                            message:'你沒寫名字'
                        }
                    ]}
                    labelAlign="left"
                    className="mb-8"
                >
                    <Input size="large" onChange={controlName}/>
                </Form.Item>
                <Form.Item 
                    label={<div className="font-bold text-lg tracking-wider">預約日期</div>}
                    name="date"
                    rules={[
                        {
                            required:true,
                            message:'啊是要不要約？'
                        }
                    ]}
                    className="mb-8"
                >
                    <DatePicker className="w-full"
                        placeholder="只能選一天"
                        disabledDate={disabledDate}
                        onChange={controlDate}
                        showToday={false}
                        allowClear={false}
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    label={<div className="font-bold text-lg tracking-wider">時間</div>}
                    name="time"
                    className="mb-8"
                >
                    <Checkbox.Group onChange={controlTime} value={_formData.time}>
                        <Checkbox value={1}>早上</Checkbox>
                        <Checkbox value={2}>下午</Checkbox>
                        <Checkbox value={3}>晚上</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item
                    label={<div className="font-bold text-lg tracking-wider">去哪？</div>}
                    name="place"
                    className="mb-8"
                >
                    <div>
                        <Radio.Group onChange={controlPlace} value={_formData.place} className="mb-3">
                            <Radio value={1}>台北市</Radio>
                            <Radio value={2}>新北市</Radio>
                            <Radio value={3}>還沒想好</Radio>
                            <Radio value={4}>其他地方</Radio>
                        </Radio.Group>
                        <div className={`flex flex-row items-baseline ${_placeInputDisabled?`hidden`:`block`}`}>
                            <span className="whitespace-nowrap">讓你說說：</span>
                            <Input onChange={controlOtherPlace}></Input>
                        </div>
                    </div>
                </Form.Item>
                {/* <Form.Item
                    label={<div className="font-bold text-lg tracking-wider">做什麼？</div>}
                    name="doing"
                    className="mb-8"
                >
                    <Radio.Group onChange={controlDo} value={_doWhat}>
                        <Radio value={1}>讀書</Radio>
                        <Radio value={2}>吃飯</Radio>
                        <Radio value={3}>運動</Radio>
                        <Radio value={4}>逛街</Radio>
                        <Radio value={5}>還沒想好</Radio>
                    </Radio.Group>
                </Form.Item> */}
                <Form.Item
                    label={<div className="font-bold text-lg tracking-wider">做什麼？</div>}
                    name="doing"
                    className="mb-8"
                >
                    <Checkbox.Group
                        options={activity}
                        onChange={controlDo}
                    ></Checkbox.Group>
                </Form.Item>
                <Form.Item
                    label={<div className="font-bold text-lg tracking-wider">備註</div>}
                    name="memo"
                    className="mb-8"
                >
                    <TextArea
                        allowClear={true}
                        placeholder="給你200字說說"
                        maxLength={200}
                        onChange={controlMemo}
                    />
                </Form.Item>
                <div className="w-full flex items-center justify-center">
                    <Button type="primary" htmlType="submit"
                        className="bg-pink-100 text-gray-600 font-black tracking-wider mt-12"
                        size="large"
                        
                    >{
                        _submitLoading?
                        <Spin indicator={antIcon} />:`預約薇薇`
                    }
                    </Button>
                </div>
            </Form>
        </div>
    )
}