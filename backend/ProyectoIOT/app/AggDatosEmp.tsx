import React from 'react';
import PantallaDatosEmpresa from '../componentes/PantallaDatosEmpresa';
import { useRouter } from 'expo-router';

export default function AgregarDatosEmpresaScreen() {
    const router = useRouter();

    // Función opcional para navegación después de guardar
    const handleSuccess = () => {
        router.push('/configuracion' as any); // Ajusta la ruta según tu necesidad
    };

    return (
        <PantallaDatosEmpresa />
    );
}