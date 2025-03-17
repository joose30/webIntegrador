import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Switch,
    StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

export default function EmpresaScreen() {
    const router = useRouter();

    // Estado para controlar el menú desplegable
    const [menuVisible, setMenuVisible] = useState(false);

    // Funciones para cada apartado
    const handleMision = () => {
        router.push('/mision');
    };
    const handleVision = () => {
        router.push('/vision');
    };
    const handleValores = () => {
        router.push('/valores');
    };
    const handlePoliticas = () => {
        router.push('/politicas');
    };

    // Función para alternar la visibilidad del menú desplegable
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView style={{ flex: 1 }}>
                {/* Tarjeta principal */}
                <View style={styles.cardContainer}>
                    {/* Barra Superior */}
                    <View style={styles.topBar}>
                        <Text style={styles.logo} onPress={() => router.push('/')}>Segurix</Text>
                        <View style={styles.nav}>
                            <TouchableOpacity onPress={() => console.log('Ver productos')}>
                                <Text style={styles.navText}>Ver productos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sección Hero con imagen */}
                    <View style={styles.heroSection}>
                        <Image
                            source={require('../assets/images/puertaIOT-empresa.png')} // Ajusta la ruta de tu imagen
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Contenido principal */}
                    <View style={styles.mainContent}>
                        <Text style={styles.title}>¿Quiénes somos?</Text>
                        <Text style={styles.parrafo}>
                            Lorem ipsum is simply dummy text of the printing and typesetting industry.
                        </Text>

                        {/* Botón para mostrar el menú */}
                        <TouchableOpacity style={styles.dropdownButton} onPress={toggleMenu}>
                            <Text style={styles.dropdownButtonText}>¿Quiénes somos?</Text>
                        </TouchableOpacity>

                        {/* Menú desplegable */}
                        {menuVisible && (
                            <View style={styles.dropdownMenu}>
                                <TouchableOpacity style={styles.menuItem} onPress={handleMision}>
                                    <Text style={styles.menuItemText}>Misión</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={handleVision}>
                                    <Text style={styles.menuItemText}>Visión</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={handleValores}>
                                    <Text style={styles.menuItemText}>Valores</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={handlePoliticas}>
                                    <Text style={styles.menuItemText}>Políticas</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Sección inferior: Preguntas Frecuentes y contacto */}
                    <View style={styles.bottomSection}>
                        <View style={styles.faq}>
                            <Text style={styles.faqTitle}>Preguntas frecuentes</Text>
                            <Text style={styles.faqItem}>¿Para qué sirve?</Text>
                            <Text style={styles.faqItem}>¿Cómo conectar mi dispositivo IoT?</Text>
                        </View>

                        <View style={styles.contact}>
                            <Text style={styles.contactTitle}>Contáctanos</Text>
                            <Text style={styles.contactItem}>Col. Horacio Camargo</Text>
                            <Text style={styles.contactItem}>segurix@mail.com</Text>
                            <Text style={styles.contactItem}>+52 774 545 8510</Text>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View style={styles.footerLeft}>
                            <TouchableOpacity onPress={() => console.log('Términos y condiciones')}>
                                <Text style={styles.footerText}>Términos y condiciones</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Privacidad')}>
                                <Text style={styles.footerText}>Privacidad</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footerRight}>
                            <TouchableOpacity onPress={() => console.log('Instagram')}>
                                <Entypo name="instagram-with-circle" size={24} color="#1E1E1E" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Facebook')}>
                                <Entypo name="facebook-with-circle" size={24} color="#1E1E1E" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#CFE2FF',
    },
    cardContainer: {
        margin: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 10,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E1E1E',
    },
    nav: {
        flexDirection: 'row',
    },
    navText: {
        fontSize: 16,
        color: '#1E1E1E',
        marginLeft: 20,
    },
    heroSection: {
        marginTop: 10,
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
    mainContent: {
        marginTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 10,
        textAlign: 'center',
    },
    parrafo: {
        fontSize: 16,
        color: '#2C2C2C',
        lineHeight: 22,
        textAlign: 'center',
        marginBottom: 20,
    },
    dropdownButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginVertical: 8,
        width: '60%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    dropdownButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    dropdownMenu: {
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    menuItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    menuItemText: {
        fontSize: 16,
        color: '#1E1E1E',
        fontWeight: '600',
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    faq: {
        flex: 1,
        marginRight: 10,
    },
    faqTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 10,
    },
    faqItem: {
        fontSize: 16,
        color: '#2C2C2C',
        marginBottom: 4,
    },
    contact: {
        flex: 1,
        alignItems: 'flex-end',
        marginLeft: 10,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 10,
    },
    contactItem: {
        fontSize: 16,
        color: '#2C2C2C',
        marginBottom: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 10,
    },
    footerLeft: {
        flexDirection: 'row',
    },
    footerRight: {
        flexDirection: 'row',
    },
    footerText: {
        fontSize: 14,
        color: '#1E1E1E',
        marginRight: 20,
    },
    icon: {
        marginRight: 15,
    },
});
