import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import axios from 'axios';

export default function PantallaRegistroDispositivo() {
    const [macAddress, setMacAddress] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    const handleRegisterDevice = async () => {
        try {
            // Supongamos que tienes el token almacenado (puede venir de un contexto o SecureStore)
            const token = 'TU_TOKEN_AQUI';

            const response = await axios.post(
                'http://192.168.8.6:8082/api/devices/register',
                { macAddress, name, location },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                setMessage('Dispositivo registrado con éxito');
            }
        } catch (error) {
            setMessage('Error al registrar el dispositivo');
        }
    };

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.cardContainer}>
                    <Text style={styles.title}>Registrar Dispositivo IoT</Text>

                    <Text style={styles.label}>Dirección MAC</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="00:1B:44:11:3A:B7"
                        value={macAddress}
                        onChangeText={setMacAddress}
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Nombre del Dispositivo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Sensor de Temperatura"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Ubicación</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Sala de servidores"
                        value={location}
                        onChangeText={setLocation}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleRegisterDevice}>
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>

                    {message ? <Text style={styles.message}>{message}</Text> : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

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
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
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
    message: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        color: 'green',
    },
});
