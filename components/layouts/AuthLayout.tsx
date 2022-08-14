import { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';


interface Props {
    title: string;
}

console.log("pedro");

export const AuthLayout: FC<Props> = ({ children, title  }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>
        </Head>

        <main style={{ height: "100vh" }} className="degradadoBackground">
            <Box  display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 200px)">   
                { children }
            </Box>
        </main>
    
    </>
  )
}
