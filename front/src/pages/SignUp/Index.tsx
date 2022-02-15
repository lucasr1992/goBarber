import React, { useCallback, useRef } from 'react';
import logoImg from '../../assets/logo.svg';
import Button from '../../componentes/Button/Index';
import Input from '../../componentes/Input/Index';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../context/ToastContext';




import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import { Container, Content, AnimationContainer, Background } from "./styles";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}



const SignUp: React.FC = () => {    
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatorio'),
                email: Yup.string().required('E-mail obrigatorio').email('Digite e-amil valido'),
                password: Yup.string().min(6, 'No minimo 6 digitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);
            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro realizado',
                description: 'Ja pode fazer login',
            });
            
        } catch (err: any) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }
            
            addToast({
                type:'error',
                title: "Erro no cadastro",
                description: 'Ocorreu um erro ao cadastrar!',
            });
            
        }
    }, [addToast, history]);

    return (
        <Container>
            <Background/>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="LogoGOBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
                        <Input name='name' icon={FiUser} placeholder='Nome' />
                        <Input name='email' icon={FiMail} placeholder='E-mail' />
                        <Input name='password' icon={FiLock} type='password' placeholder='Senha' />
                        <Button type='submit'>Cadastrar</Button>   
                    </Form>

                    <Link to="/"><FiArrowLeft/>Voltar logon</Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignUp;