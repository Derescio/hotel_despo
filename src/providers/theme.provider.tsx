import React from 'react'
import { ConfigProvider } from 'antd';

const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <ConfigProvider 
         theme={{
            token: {
                colorPrimary: '#00b96b',
                borderRadius: 5,
            },
            components: {
             Button: {
                controlHeight: 36, 
                defaultBorderColor: '#00b96b',   
            },
        Input: {
            controlHeight: 36,
            borderRadius: 5,
            boxShadow: 'none',
            colorBorder: '#ccc',
            hoverBorderColor: '#ccc',
        },
        }
        }}
        >
          
        {children}
        </ConfigProvider>
     
    </div>
  )
}

export default ThemeProvider
