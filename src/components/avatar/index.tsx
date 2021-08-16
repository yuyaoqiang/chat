import React, {useState} from 'react';
import { Modal, Grid} from 'antd-mobile';
import "./style.scss"
const Avatar = (props: any) => {
    const [modal, setMdal] = useState(true)
    let {imgData} = props
    const selectItem = () => {

    }
    return (
        <Modal
        visible={modal}
        transparent
        maskClosable={false}
        title="选择头像"
        footer={[
            { 
                text: '取消', 
                onPress: () => { 
                    setMdal(false)
                } 
            },
            {
                text: '确认', 
                onPress: () => { 
                    console.log('确认头像'); 
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