import React, { useState } from 'react';
import { Modal, Grid } from 'antd-mobile';
import "./style.scss"
const Avatar = (props: any) => {
    let { imgData, setVisible, submit } = props
    const selectItem = () => {

    }
    return (
        <Modal
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
                        submit()
                    }
                }
            ]
            }
        >
            <div style={{ height: 100, overflow: 'scroll' }}>
                <Grid data={imgData} isCarousel={true} onClick={_el => console.log(_el)} />
            </div>
        </Modal>
    )
}
export default Avatar;