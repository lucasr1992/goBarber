import React, { useRef, useCallback } from 'react';
import logoImg from '../../assets/logo.svg';
import Button from '../../componentes/Button/Index';
import Input from '../../componentes/Input/Index';
import { Link, useHistory } from 'react-router-dom';


import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Container, Content, AnimationContainer, Background } from "./styles";


interface SIgnInFormData{
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
     
    const { sigIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();
    
    
    const handleSubmit = useCallback(async (data: SIgnInFormData) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatorio').email('Digite e-amil valido'),
                password: Yup.string().required('Senha obrigatoria'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            await sigIn({
                email: data.email,
                password: data.password,
            });

            history.push('/dashboard');    
        } catch (err: any) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }
            
            addToast({
                type:'error',
                title: "Erro na Autendicação",
                description: 'Ocorreu um erro ao fazer login!',
            });
        }
    }, [sigIn, addToast, history]);
    
    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="LogoGOBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>

                        <Input name='email' icon={FiMail} placeholder='E-mail' />
                        <Input name='password' icon={FiLock} type='password' placeholder='Senha' />
                        <Button type='submit'>Entrar</Button>
                        
                        <a href="forgot">Esqueci minha senha</a>

                    </Form>

                    <Link to="/signup"><FiLogIn/>Criar Conta</Link>
                </AnimationContainer>
            </Content>
            <Background/>
        </Container>
    );
}

export default SignIn;