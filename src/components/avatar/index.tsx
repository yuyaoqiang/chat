import React, { useEffect, useState } from 'react';
import { Modal, Grid } from 'antd-mobile';
import "./style.scss"
const Avatar = (props: any) => {
    let { imgData, setVisible, submit } = props
    const [data, setData] = useState<any>([])
    const [img, setImg] = useState<any>("")
    useEffect(() => {
        let dataList = imgData.map((val: any, i: any) => ({
            icon: val,
            name: i
        }));
        setData(dataList)
    }, [])
    const selectImg = (img: any) => {
        setImg(img)
    }
    return (
        <Modal
            className="avatar-wrap"
            style={{ width: '80%' }}
            visible={true}
            transparent
            maskClosable={false}
            title="选择头像"
            footer={[
                {
                    text: '取消',
                    onPress: () => {
                        setVisible(false)
                    }
                },
                {
                    text: '确认',
                    onPress: () => {
                        submit(img.icon)
                    }
                }
            ]
            }
        >
            <div style={{ height: 200, overflow: 'scroll' }}>
                <Grid data={data} onClick={el => selectImg(el)}
                    renderItem={(dataItem: any, index: number) => (
                        <div style={{ padding: '12.5px' }} className={dataItem.name === img.name ? 'check' : ''} >
                            <img src={dataItem.icon} style={{ width: '100%', height: '100%' }} alt="" />
                        </div>
                    )} />
            </div>
        </Modal>
    )
}
export default Avatar;