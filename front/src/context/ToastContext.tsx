import React, { createContext, useCallback, useContext, useState } from "react";

import { uuid } from 'uuidv4'

import ToastContainer from "../componentes/ToastContainer/Index";

export interface ToastMessage {
    id: number;
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
    
}

interface ToastContextData {
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: number): void;
}

function getRandom() {
    return Math.random();
  }

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessage] = useState<ToastMessage[]>([]);
   
    const addToast = useCallback(
        ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        const id = getRandom();
        const toast = {
            id,
            type,
            title,
            description,
        };
        

        setMessage(state => [...state, toast]);
    }, 
    [],
    );
    

    const removeToast = useCallback((id: number) => {
        setMessage((state) => state.filter(message => message.id !== id));
    }, []);


    
    return (
        
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('vc n pode usar toastprovider');
    }

    return context;
}

