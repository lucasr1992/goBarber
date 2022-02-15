import styled, { keyframes } from 'styled-components';
import signUpBackgroundIMG from '../../assets/sign-up-background.png';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;

`;

export const Content = styled.div`
    
    
    width: 100%;
    max-width: 700px;
   
   
`;


const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(50px);
    } to {
        opacity: 1;
        transform: translateX(0px);
    }
`;


export const AnimationContainer = styled.div`
    
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    

    animation: ${appearFromLeft} 1s;
    form {
       margin: 24px 0;
       width: 340px;
       text-align: center;
       height: 350px;
   

        h1 {
            margin-bottom: 20px;
        }

        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover{
                color: ${shade(0.2, '#f4ede8')};
            }
        }
                   
    }

    > a {
        color: #F4EDE8;
        display: block;
        margin-top: 32px;
        
        text-decoration: none;
        transition: : color 0.2s;
        display: flex;
        align-items: center;
        

        svg {
            margin-right: 16px
        }

        &:hover {
           color: ${shade(0.2, '#F4EDE8')}; 
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signUpBackgroundIMG}) no-repeat center;
    background-size: cover;
`;
