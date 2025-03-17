import React from 'react';
import PantallaCatalogoProductos from '../componentes/PantallaCatalogoProductos';
import { useRouter } from 'expo-router';

export default function CatalogoProductosScreen() {
    const router = useRouter();

    // Función para navegar hacia atrás si es necesario
    const handleBack = () => {
        router.back();
    };

    return (
        <PantallaCatalogoProductos />
    ); 
}