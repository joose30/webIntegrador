import React from 'react';
import PantallaAgregarProducto from '../componentes/PantallaAgregarProducto';
import { useRouter } from 'expo-router';

export default function AgregarProductoScreen() {
    const router = useRouter();
    const handleNext = () => {
        router.push('/productos' as any);
    };

    return (
        <PantallaAgregarProducto/>
    );
}