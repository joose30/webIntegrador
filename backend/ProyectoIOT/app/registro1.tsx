// app/registro1.tsx
import React from 'react';
import PantallaRegistro1 from '@/componentes/PantallaRegistro1';
import { useRouter } from 'expo-router';

import { useState } from 'react';

export default function Registro1Screen() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleNext = async () => {
        try {
            const response = await axios.post('http://localhost:8082/api/users/register', {
                name,
                lastName,
                surname,
                phone,
                email,
                password,
            });
            if (response.status === 201) {
                const userId = (response.data as { _id: string })._id;
                router.push(`/perfil/${userId}` as any);
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

    return (
        <PantallaRegistro1 onNext={handleNext} />
    );
}
