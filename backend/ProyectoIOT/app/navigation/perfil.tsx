import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import PantallaPerfil from '@/componentes/PantallaPerfil';

export default function PerfilScreen() {
    const { userId } = useLocalSearchParams();
    return <PantallaPerfil userId={userId as string} />;
}