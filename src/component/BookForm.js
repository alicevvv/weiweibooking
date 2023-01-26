import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// style
import { Button,DatePicker,Form,Input, InputNumber, Radio,Spin } from "antd"
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

export default function Bookorm(){
    const [_goWhere,_setGoWhere] = useState(1);
    const [_doWhat,_setDoWhat] = useState(1);
    const [_placeInputDisabled,_setPlaceInputDisabled] = useState(true);
    const [_submitLoading,_setSubmitLoading] = useState(false);
    const _navigate = useNavigate();

    const onFinish=(values)=>{
        _navigate('/success')
    }

    const onFinishFailed=(values)=>{
    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
      };

    const controlPlace = (e) =>{
        _setSubmitLoading(true);
        _setGoWhere(e.target.value)
        if(e.target.value === 4){
            _setPlaceInputDisabled(false)
        }else _setPlaceInputDisabled(true)
        _setSubmitLoading(false);
    }
    const controlDo = (e)=>{
        _setSubmitLoading(true);
        _setDoWhat(e.target.value)
        _setSubmitLoading(false);
    }

    return(
        <div className="px-6 py-8 w-4/12" style={{maxWidth:'600px'}}>
            <Form
                labelCol={{
                    span:24
                }}
                labelAlign='left'
                wrapperCol={{span:24}}
                initialValues={{
                    'peoples':1,
                    'place':_goWhere,
                    'doing':_doWhat
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="text-xl text-left"
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
                    <Input size="large"/>
                </Form.Item>
                <Form.Item
                    label={<div className="font-bold text-lg tracking-wider">幾位</div>}
                    name="peoples"
                    rules={[
                        {
                            required:true,
                            message:'到底幾位？'
                        }
                    ]}
                    className="mb-8"
                >
                    <InputNumber className="w-full" size="large"/>
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
                        showToday={false}
                        allowClear={false}
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    label={<div className="font-bold text-lg tracking-wider">去哪？</div>}
                    name="place"
                    className="mb-8"
                >
                    <div>
                        <Radio.Group onChange={controlPlace} value={_goWhere} className="mb-3">
                            <Radio value={1}>台北市</Radio>
                            <Radio value={2}>新北市</Radio>
                            <Radio value={3}>還沒想好</Radio>
                            <Radio value={4}>其他地方</Radio>
                        </Radio.Group>
                        <div className={`flex flex-row items-baseline ${_placeInputDisabled?`hidden`:`block`}`}>
                            <span className="whitespace-nowrap">讓你說說：</span>
                            <Input></Input>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
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
                </Form.Item>
                <div className="w-full flex items-center justify-center">
                    <Button type="primary" htmlType="submit"
                        className="bg-blue-500 font-black tracking-wider mt-12"
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