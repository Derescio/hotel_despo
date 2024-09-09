'use client'
import React, { useState } from 'react'
import { Button, Form, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { uploadImage } from '@/helpers/imageUpload'
import { createHotel } from '@/server-actions/hotels'
import { useRouter } from 'next/navigation'


const initialValues = {
    name: '',
    owner: '',
    email: '',
    phone: '',
    address: '',
    media: ''
}

// const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//         return e;
//     }
//     return e?.fileList;
// };


const HotelForm = ({ type = 'add' }: { type: string }) => {

    const [uploadedfiles, setUploadedfiles] = useState([]) as any[];
    const [loading, setLoading] = React.useState(false);
    const { TextArea } = Input;
    const router = useRouter();

    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            const uploadedImageUrls = await uploadImage(uploadedfiles);
            values.media = uploadedImageUrls;

            let response: any = null;
            if (type === 'add') {
                response = await createHotel(values);
            }
            // console.log(response)
            if (response && response.success) {
                //   console.log('Hotel created successfully');
                router.push('/admin/hotels');
            } else {
                console.error('Error creating hotel:', response);
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        } finally {
            setLoading(false);
        }
    }
    // console.log(uploadedfiles)

    return (
        <Form layout='vertical' className='w-full grid grid-cols-3 mt-5' onFinish={handleSubmit} initialValues={initialValues}>
            <Form.Item label='Hotel Name' name='name' className='col-span-3' rules={[{ required: true, message: 'Name is required' }]}>
                <input type="text" className='w-full border border-gray-300 px-3 py-2 rounded-md' placeholder='Hotel Name' />
            </Form.Item>
            <Form.Item label='Hotel Owner' name='owner' className='col-span-3 md:col-span-1' rules={[{ required: true, message: 'Owner is required' }]}>
                <input type="text" className='w-max border border-gray-300 px-3 py-2 rounded-md' placeholder='Hotel Owner' />
            </Form.Item>
            <Form.Item label='Email' name='email' className='col-span-3 md:col-span-1' rules={[{ required: true, message: 'Email is required' }]}>
                <input type="text" className=' border border-gray-300 px-3 py-2 rounded-md' placeholder='Email' />
            </Form.Item>
            <Form.Item label='Phone' name='phone' className='col-span-3 md:col-span-1' rules={[{ required: true, message: 'Phone is required' }]}>
                <input type="text" className=' border border-gray-300 px-3 py-2 rounded-md' placeholder='Phone' />
            </Form.Item>
            <Form.Item label='Address' name='address' className='col-span-3 ' rules={[{ required: true, message: 'Address is required' }]}>
                <TextArea rows={4} className='w-[50%] border border-gray-300 px-3 py-2 rounded-md' placeholder='Address' />
            </Form.Item>
            <div className="cols-span-3">
                <Form.Item label="Upload Media">
                    <Upload
                        listType="picture-card"
                        beforeUpload={(file) => {
                            setUploadedfiles((prevFiles: any) => [...prevFiles, file])
                            return false;
                        }}
                        multiple
                    >

                        <span className='text-xs text-gray-500 p-3'>Upload Media</span>
                    </Upload>

                </Form.Item>
                <div className="flex justify-start gap-5">
                    <Button type="primary" htmlType='submit' className='bg-blue-500 text-white px-5 py-2 rounded-md' loading={loading}>Submit</Button>
                    <Button type="primary" htmlType='submit' className='bg-blue-500 text-white px-5 py-2 rounded-md' disabled={loading}>Cancel</Button>
                </div>
            </div>

        </Form>
    )
}

export default HotelForm
