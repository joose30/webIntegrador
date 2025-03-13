import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';

type Props = {
    userId: string;
};

export default function PantallaPerfil({ userId }: Props) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/api/users/${userId}`);
            const user:any  = response.data;
            setName(user.name);
            setLastName(user.lastName);
            setSurname(user.surname);
            setPhone(user.phone);
            setEmail(user.email);
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    };

    const handleSubmit = async () => {
        const updateData: any = {
            name,
            lastName,
            surname,
            phone,
            email,
        };

        if (password) {
            updateData.password = password;
        }

        try {
            const response = await axios.put(`http://localhost:8082/api/users/update/${userId}`, updateData);
            if (response.status === 200) {
                Alert.alert('Éxito', 'Datos actualizados correctamente');
                setPassword('');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar la información');
            console.error('Error al actualizar:', error);
        }
    };

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.cardContainer}>
                    <View style={styles.topBar}>
                        <Text style={styles.logo}>Mi Perfil</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Feather name="user" size={80} color="black" style={styles.icon} />

                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Apellido paterno</Text>
                        <TextInput
                            style={styles.input}
                            value={lastName}
                            onChangeText={setLastName}
                        />

                        <Text style={styles.label}>Apellido materno</Text>
                        <TextInput
                            style={styles.input}
                            value={surname}
                            onChangeText={setSurname}
                        />

                        <Text style={styles.label}>Teléfono</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                        />

                        <Text style={styles.label}>Correo electrónico</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={styles.label}>Nueva Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Dejar en blanco para no cambiar"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Guardar Cambios</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Reutilizar los mismos estilos de PantallaRegistro1 o modificar según necesidad

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    topBar: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    contentContainer: {
        alignItems: 'center',
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});